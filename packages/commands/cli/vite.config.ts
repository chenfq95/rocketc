import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'node22',
    sourcemap: true,
    rolldownOptions: {
      input: {
        cli: 'bin/cli.ts',
      },
      output: {
        entryFileNames: 'cli.js',
        dir: 'dist/bin',
        format: 'es',
        chunkFileNames: 'dist/chunks/[name]-[hash].js',
        assetFileNames: 'dist/assets/[name]-[hash].[ext]',
      },
    },
  },
});
