import { readdir, stat, writeFile } from 'fs/promises';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 获取项目根目录（scripts 目录的父目录）
const projectRoot = join(__dirname, '..');
const componentsDir = join(projectRoot, 'src', 'components');
const outputFile = join(projectRoot, 'src', 'index.ts');

/**
 * 递归获取所有组件文件
 * @param {string} dir - 要扫描的目录
 * @param {string[]} fileList - 文件列表
 * @param {string} baseDir - 基础目录（用于生成相对路径）
 */
async function getComponentFiles(dir, fileList = [], baseDir = componentsDir) {
  const files = await readdir(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const statResult = await stat(filePath);

    if (statResult.isDirectory()) {
      // 递归扫描子目录
      await getComponentFiles(filePath, fileList, baseDir);
    } else if (statResult.isFile()) {
      // 只处理 .tsx 和 .ts 文件，排除 index.ts
      if ((file.endsWith('.tsx') || file.endsWith('.ts')) && file !== 'index.ts') {
        // 获取相对于 components 目录的路径
        const relativePath = relative(baseDir, filePath);
        // 移除文件扩展名
        const pathWithoutExt = relativePath.replace(/\.(tsx|ts)$/, '');
        fileList.push(pathWithoutExt);
      }
    }
  }

  return fileList;
}

/**
 * 生成入口文件内容
 */
async function generateEntryFile() {
  try {
    // 获取所有组件文件
    const componentFiles = await getComponentFiles(componentsDir);

    // 按路径排序，确保输出顺序一致
    componentFiles.sort();

    // 生成导出语句
    const exports = componentFiles.map(file => {
      return `export * from './components/${file}';`;
    });

    // 生成完整的入口文件内容
    const content = [
      "import './index.css';",
      "",
      ...exports,
      ""
    ].join('\n');

    // 写入文件
    await writeFile(outputFile, content, 'utf-8');

    console.log(`✅ 成功生成入口文件: ${outputFile}`);
    console.log(`📦 导出了 ${componentFiles.length} 个组件:`);
    componentFiles.forEach(file => {
      console.log(`   - ${file}`);
    });
  } catch (error) {
    console.error('❌ 生成入口文件失败:', error);
    process.exit(1);
  }
}

// 执行生成
generateEntryFile();

