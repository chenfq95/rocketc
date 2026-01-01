import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: './tsconfig.lib.json',
      bundleTypes: true,
    }),
  ],
  build: {
    sourcemap: true,
    minify: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
  },
});
