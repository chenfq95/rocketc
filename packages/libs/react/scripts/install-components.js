#!/usr/bin/env node

/**
 * Install components script for @rocketc/react package
 * Runs shadcn CLI in non-interactive mode suitable for CI environments
 */

import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

/**
 * Execute shadcn add command in non-interactive mode
 */
function installComponents() {
  console.log('📦 Installing components with shadcn CLI...\n');

  try {
    // Set CI environment variable to disable interactive prompts
    const env = {
      ...process.env,
      CI: 'true',
      FORCE_COLOR: '1',
    };

    // Use shell command with yes to auto-answer all prompts
    // On Windows, use PowerShell's equivalent, on Unix use yes command
    const isWindows = platform() === 'win32';
    let command;

    if (isWindows) {
      // Windows: use PowerShell to pipe yes
      command = 'powershell -Command "$yes = \'y\' * 100; $yes | pnpm dlx shadcn@latest add -ay"';
    } else {
      // Unix/Linux/macOS: use yes command to pipe y answers
      command = 'yes | pnpm dlx shadcn@latest add -ay';
    }

    // Execute shadcn add with all components
    // -a: accept all
    // -y: yes to all prompts
    // yes command pipes 'y' to handle any remaining interactive prompts
    execSync(command, {
      cwd: projectRoot,
      stdio: 'inherit',
      env,
      shell: true,
    });

    console.log('\n✅ Components installed successfully!');
  } catch (error) {
    console.error('❌ Failed to install components:', error.message);
    process.exit(1);
  }
}

installComponents();

