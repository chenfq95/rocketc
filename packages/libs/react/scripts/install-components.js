import { readFile, mkdir, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { constants } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 获取项目根目录
const projectRoot = join(__dirname, '..');
const componentsYaml = join(projectRoot, 'components.yaml');
const componentsDir = join(projectRoot, 'src', 'components', 'ui');

/**
 * 解析 YAML 文件（简单版本，只处理列表格式）
 */
async function parseYAML(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    const components = [];

    for (const line of lines) {
      const trimmed = line.trim();
      // 处理以 "- " 开头的列表项
      if (trimmed.startsWith('- ')) {
        const component = trimmed.substring(2).trim();
        if (component) {
          components.push(component);
        }
      }
    }

    return components;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`❌ 配置文件不存在: ${filePath}`);
      return [];
    }
    throw error;
  }
}

/**
 * 批量安装组件（一次性安装所有组件，更高效）
 */
async function installComponentsBatch(componentNames) {
  try {
    if (componentNames.length === 0) {
      return { success: true, installed: [] };
    }

    console.log(`📦 正在批量安装 ${componentNames.length} 个组件...\n`);
    console.log(`   组件列表: ${componentNames.join(', ')}\n`);

    // 使用 shadcn/ui CLI 批量安装组件
    const componentsList = componentNames.join(' ');
    const command = `npx --yes shadcn@latest add ${componentsList} --yes --overwrite`;

    execSync(command, {
      cwd: projectRoot,
      stdio: 'inherit',
      env: {
        ...process.env,
      },
    });

    console.log(`\n✅ 所有组件安装成功`);
    return { success: true, installed: componentNames };
  } catch (error) {
    console.error(`\n❌ 批量安装失败:`, error.message);
    return { success: false, installed: [] };
  }
}

/**
 * 单个安装组件（备用方案，用于批量安装失败时的回退）
 */
async function installComponent(componentName) {
  try {
    console.log(`📦 正在安装组件: ${componentName}...`);

    const command = `npx --yes shadcn@latest add ${componentName} --yes --overwrite`;

    execSync(command, {
      cwd: projectRoot,
      stdio: 'inherit',
      env: {
        ...process.env,
      },
    });

    console.log(`✅ 组件 ${componentName} 安装成功`);
    return true;
  } catch (error) {
    console.error(`❌ 组件 ${componentName} 安装失败:`, error.message);
    return false;
  }
}

/**
 * 检查组件文件是否已存在
 */
async function componentExists(componentName) {
  try {
    const componentFile = join(componentsDir, `${componentName}.tsx`);
    await access(componentFile, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * 过滤出需要安装的组件（排除已存在的）
 */
async function filterComponentsToInstall(componentNames) {
  const toInstall = [];
  const alreadyInstalled = [];

  for (const component of componentNames) {
    const exists = await componentExists(component);
    if (exists) {
      alreadyInstalled.push(component);
    } else {
      toInstall.push(component);
    }
  }

  return { toInstall, alreadyInstalled };
}

/**
 * 确保组件目录存在
 */
async function ensureComponentsDir() {
  try {
    await mkdir(componentsDir, { recursive: true });
  } catch (error) {
    // 目录已存在或其他错误，忽略
  }
}

/**
 * 主函数：根据 components.yaml 安装所有组件
 */
async function installComponents() {
  try {
    console.log('🚀 开始安装组件...\n');

    // 读取配置文件
    const components = await parseYAML(componentsYaml);

    if (components.length === 0) {
      console.log('⚠️  配置文件中没有找到组件');
      return;
    }

    console.log(`📋 找到 ${components.length} 个组件:\n`);
    components.forEach((comp, index) => {
      console.log(`   ${index + 1}. ${comp}`);
    });
    console.log('');

    // 确保组件目录存在
    await ensureComponentsDir();

    // 检查哪些组件已安装，哪些需要安装
    console.log('🔍 检查组件安装状态...\n');
    const { toInstall, alreadyInstalled } =
      await filterComponentsToInstall(components);

    if (alreadyInstalled.length > 0) {
      console.log(`⏭️  已安装的组件（跳过）: ${alreadyInstalled.length} 个\n`);
      alreadyInstalled.forEach((comp, index) => {
        console.log(`   ${index + 1}. ✅ ${comp}`);
      });
      console.log('');
    }

    if (toInstall.length === 0) {
      console.log('✨ 所有组件都已安装，无需重复安装！\n');
      return;
    }

    console.log(`📦 需要安装的组件: ${toInstall.length} 个\n`);
    toInstall.forEach((comp, index) => {
      console.log(`   ${index + 1}. ${comp}`);
    });
    console.log('');

    // 尝试批量安装所有组件（更高效）
    console.log('🔄 尝试批量安装所有组件...\n');
    const batchResult = await installComponentsBatch(toInstall);

    let results = [];

    // 先添加已安装的组件到结果中
    alreadyInstalled.forEach((comp) => {
      results.push({ component: comp, success: true, skipped: true });
    });

    if (batchResult.success) {
      // 批量安装成功
      toInstall.forEach((comp) => {
        results.push({ component: comp, success: true, skipped: false });
      });
    } else {
      // 批量安装失败，回退到逐个安装
      console.log('\n⚠️  批量安装失败，回退到逐个安装模式...\n');
      for (const component of toInstall) {
        const success = await installComponent(component);
        results.push({ component, success, skipped: false });
        console.log(''); // 添加空行分隔
      }
    }

    // 输出安装结果摘要
    console.log('\n📊 安装结果摘要:');
    const successCount = results.filter((r) => r.success && !r.skipped).length;
    const skippedCount = results.filter((r) => r.skipped).length;
    const failCount = results.filter((r) => !r.success && !r.skipped).length;

    results.forEach(({ component, success, skipped }) => {
      if (skipped) {
        console.log(`   ⏭️  ${component} (已存在，已跳过)`);
      } else {
        const icon = success ? '✅' : '❌';
        console.log(`   ${icon} ${component}`);
      }
    });

    console.log(
      `\n✨ 完成! 新安装: ${successCount}, 跳过: ${skippedCount}, 失败: ${failCount}`,
    );

    if (successCount > 0) {
      console.log('\n💡 提示: 运行 `pnpm gen-entry` 来更新入口文件');
    }
  } catch (error) {
    console.error('❌ 安装组件时发生错误:', error);
    process.exit(1);
  }
}

// 执行安装
installComponents();
