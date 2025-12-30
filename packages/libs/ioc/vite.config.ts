import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: './tsconfig.lib.json',
    }),
  ],
  build: {
    sourcemap: true,
    minify: false,
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      input: {
        index: 'src/index.ts',
      },
      output: {
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[extname]',
      },
    },
  },
});
