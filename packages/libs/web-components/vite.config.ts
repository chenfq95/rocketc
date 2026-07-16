import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite';

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: './tsconfig.lib.json',
      bundleTypes: false,
      entryRoot: 'src',
    }),
  ],
  build: {
    sourcemap: true,
    minify: false,
    lib: {
      entry: {
        index: 'src/index.ts',
        register: 'src/register.ts',
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [/^lit(?:\/|$)/],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
});
