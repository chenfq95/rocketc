import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        cli: 'bin/cli.ts',
      },
      output: {
        entryFileNames: 'cli.js',
        dir: 'dist/bin',
        format: 'es',
        sourcemap: true,
        chunkFileNames: 'dist/chunks/[name]-[hash].js',
        assetFileNames: 'dist/assets/[name]-[hash].[ext]',
      },
    },
  },
});
