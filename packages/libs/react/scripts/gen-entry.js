import { readdir, stat, writeFile } from 'fs/promises';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 获取项目根目录（scripts 目录的父目录）
const projectRoot = join(__dirname, '..');
const componentsDir = join(projectRoot, 'src', 'components');
const hooksDir = join(projectRoot, 'src', 'hooks');
const outputFile = join(projectRoot, 'src', 'index.ts');

/**
 * 递归获取所有 TS/TSX 文件
 * @param {string} dir - 要扫描的目录
 * @param {string} baseDir - 基础目录（用于生成相对路径）
 * @param {string[]} fileList - 文件列表
 */
async function getFiles(dir, baseDir, fileList = []) {
  try {
    const files = await readdir(dir);

    for (const file of files) {
      const filePath = join(dir, file);
      const statResult = await stat(filePath);

      if (statResult.isDirectory()) {
        // 递归扫描子目录
        await getFiles(filePath, baseDir, fileList);
      } else if (statResult.isFile()) {
        // 只处理 .tsx 和 .ts 文件，排除 index.ts
        if (
          (file.endsWith('.tsx') || file.endsWith('.ts')) &&
          file !== 'index.ts'
        ) {
          // 获取相对于 baseDir 目录的路径
          const relativePath = relative(baseDir, filePath);
          // 将 Windows 的反斜杠转换为正斜杠
          const normalizedPath = relativePath.replace(/\\/g, '/');
          // 移除文件扩展名
          const pathWithoutExt = normalizedPath.replace(/\.(tsx|ts)$/, '');
          fileList.push(pathWithoutExt);
        }
      }
    }
  } catch (error) {
    // 如果目录不存在，忽略错误
    if (error.code !== 'ENOENT') throw error;
  }

  return fileList;
}

/**
 * 生成入口文件内容
 */
async function generateEntryFile() {
  try {
    // 获取所有组件文件
    const componentFiles = await getFiles(componentsDir, componentsDir);
    // 获取所有 Hooks 文件
    const hookFiles = await getFiles(hooksDir, hooksDir);

    // 排序
    componentFiles.sort();
    hookFiles.sort();

    // 生成导出语句
    const componentExports = componentFiles.map(
      (file) => `export * from './components/${file}';`,
    );
    const hookExports = hookFiles.map(
      (file) => `export * from './hooks/${file}';`,
    );

    // 生成完整的入口文件内容
    const content = [
      "import './index.css';",
      '',
      '// Components',
      ...componentExports,
      '',
      '// Hooks',
      ...hookExports,
      '',
    ].join('\n');

    // 写入文件
    await writeFile(outputFile, content, 'utf-8');

    console.log(`✅ 成功生成入口文件: ${outputFile}`);
    console.log(
      `📦 导出了 ${componentFiles.length} 个组件和 ${hookFiles.length} 个 Hooks。`,
    );
  } catch (error) {
    console.error('❌ 生成入口文件失败:', error);
    process.exit(1);
  }
}

// 执行生成
generateEntryFile();
