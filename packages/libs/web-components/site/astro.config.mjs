// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'astro/config';
import relativeLinks from 'astro-relative-links';

const siteRoot = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(siteRoot, '..');

/** Component usage site for @rocketc/web-components (not the design-system token preview). */
export default defineConfig({
  // Directory URLs + trailing slashes so relative links resolve to index.html
  // when opening dist locally or serving from a subdirectory.
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [relativeLinks()],
  vite: {
    resolve: {
      alias: {
        // Prefer built package output (tsc emits standard decorators).
        '@rocketc/web-components': path.resolve(packageRoot, 'dist/index.js'),
      },
    },
    server: {
      fs: {
        allow: [packageRoot, path.resolve(packageRoot, '../design-system')],
      },
    },
  },
});
