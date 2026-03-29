#!/usr/bin/env node

/**
 * Build script for @rocketc/react package
 * Executes all build steps and copies CSS file
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

/**
 * Execute a command and handle errors
 */
function exec(command, options = {}) {
  try {
    execSync(command, {
      cwd: projectRoot,
      stdio: 'inherit',
      ...options,
    });
  } catch (error) {
    console.error(`❌ Command: ${command} failed: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Main build function
 */
async function build() {
  console.log('🚀 Starting build process for @rocketc/react...\n');

  // Step 1: Install components
  console.log('📦 Step 1: Installing components...');
  exec('bun run install-components');

  // Step 2: Generate entry file
  console.log('\n📝 Step 2: Generating entry file...');
  exec('bun run gen-entry');

  // Step 3: TypeScript compilation
  console.log('\n🔨 Step 3: Compiling TypeScript...');
  exec('tsc -b');

  // Step 4: Vite build
  console.log('\n⚡ Step 4: Building with Vite...');
  exec('vite build');

  // Step 5: Copy CSS file and remove @source directive
  console.log('\n📋 Step 5: Copying CSS file...');
  const srcCssPath = join(projectRoot, 'src', 'index.css');
  const distDir = join(projectRoot, 'dist');
  const distCssPath = join(distDir, 'tailwind.css');

  if (!existsSync(srcCssPath)) {
    console.error(`❌ Source CSS file not found: ${srcCssPath}`);
    process.exit(1);
  }

  // Ensure dist directory exists
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }

  // Read source CSS file
  let cssContent = readFileSync(srcCssPath, 'utf-8');

  // Remove @source directive and its preceding comment if present
  // Match pattern: optional comment line + @source directive line
  cssContent = cssContent.replace(
    /\/\*[^\n]*明确指定要扫描的内容路径[^\n]*\*\/\s*\n\s*@source[^\n]*\n?/g,
    '',
  );
  // Also match standalone @source directive
  cssContent = cssContent.replace(/^\s*@source[^\n]*\n?/gm, '');

  // Write to destination
  writeFileSync(distCssPath, cssContent, 'utf-8');
  console.log(`✅ Copied ${srcCssPath} to ${distCssPath} (removed @source directive)`);

  console.log('\n✨ Build completed successfully!');
}

build();
