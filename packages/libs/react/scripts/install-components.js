#!/usr/bin/env node

/**
 * Install components script for @rocketc/react package
 * Runs shadcn CLI in non-interactive mode suitable for CI environments
 */

import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

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

    // Use execSync with input option to auto-answer all prompts cross-platform
    const command = 'pnpm dlx shadcn@latest add -ay';

    // Execute shadcn add with all components
    // -a: accept all
    // -y: yes to all prompts
    // input handles any remaining interactive prompts cross-platform
    execSync(command, {
      cwd: projectRoot,
      stdio: ['pipe', 'inherit', 'inherit'],
      // input: 'y\n'.repeat(100),
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
