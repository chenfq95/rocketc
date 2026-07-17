// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const siteRoot = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(siteRoot, '..');
const webComponentsRoot = path.resolve(packageRoot, '../web-components');
// Bun hoists deps to the monorepo root (e.g. @astrojs/react client runtime).
const monorepoRoot = path.resolve(packageRoot, '../../..');

/** Theme / adapter playground for @rocketc/design-system. */
export default defineConfig({
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(siteRoot, 'src') },
        {
          find: /^@rocketc\/web-components\/(.*)/,
          replacement: path.resolve(webComponentsRoot, 'dist/$1'),
        },
        {
          find: /^@rocketc\/web-components$/,
          replacement: path.resolve(webComponentsRoot, 'dist/index.js'),
        },
      ],
    },
    server: {
      fs: {
        allow: [packageRoot, webComponentsRoot, monorepoRoot],
      },
    },
  },
});
