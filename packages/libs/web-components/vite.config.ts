/// <reference types="vitest/config" />

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

export default defineConfig(({ mode }) => {
  const isMinified = mode === 'min';

  return {
    plugins: [
      babel({
        runtimeVersion: '^7.29.0',
        presets: [decoratorPreset({ version: '2023-11' })],
      }),
      ...(!isMinified
        ? [
            dts({
              tsconfigPath: './tsconfig.lib.json',
            }),
          ]
        : []),
    ],
    test: {
      environment: 'happy-dom',
    },
    build: {
      target: ['chrome107', 'edge107', 'firefox104', 'safari16'],
      sourcemap: true,
      minify: false,
      emptyOutDir: !isMinified,
      lib: {
        entry: 'src/index.ts',
        formats: ['es'],
        fileName: isMinified ? 'index.min' : 'index',
      },
      rolldownOptions: isMinified
        ? {
            output: {
              minify: true,
            },
          }
        : {
            external: [
              /^@babel\/runtime(?:\/|$)/,
              /^@lit\/context(?:\/|$)/,
              /^lit(?:\/|$)/,
              /^@rocketc\/design-system(?:\/|$)/,
            ],
            preserveEntrySignatures: 'strict',
            output: {
              preserveModules: true,
              preserveModulesRoot: 'src',
              entryFileNames: '[name].js',
              chunkFileNames: '[name].js',
              assetFileNames: '[name].[extname]',
            },
          },
    },
  };
});
