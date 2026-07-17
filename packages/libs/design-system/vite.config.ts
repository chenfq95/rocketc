import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: '.vite-preview',
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(import.meta.dirname, 'preview/src') },
      // Use built WC (tsc emits standard decorators). Run WC `build:watch` for HMR.
      {
        find: /^@rocketc\/web-components\/(.*)/,
        replacement: path.resolve(import.meta.dirname, '../web-components/dist/$1'),
      },
      {
        find: /^@rocketc\/web-components$/,
        replacement: path.resolve(import.meta.dirname, '../web-components/dist/index.js'),
      },
    ],
  },
});
