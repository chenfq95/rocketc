import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: '.vite-preview',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'preview/src'),
      '@rocketc/web-components': path.resolve(
        import.meta.dirname,
        '../web-components/src/index.ts',
      ),
    },
  },
});
