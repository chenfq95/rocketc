import { defineConfig } from 'vite';
import babel from '@rolldown/plugin-babel';
import dts from 'unplugin-dts/vite';

function decoratorPreset(options: Record<string, unknown>) {
  return {
    preset: () => ({
      plugins: [['@babel/plugin-proposal-decorators', options]],
    }),
    rolldown: {
      filter: {
        code: '@',
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    babel({
      presets: [decoratorPreset({ version: '2023-11' })],
    }),
    dts({
      tsconfigPath: './tsconfig.lib.json',
    }),
  ],
  build: {
    target: ['chrome107', 'edge107', 'firefox104', 'safari16'],
    sourcemap: true,
    minify: false,
    rolldownOptions: {
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
