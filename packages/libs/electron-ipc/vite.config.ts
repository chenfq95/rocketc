import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite';
import packageJson from './package.json';

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
        dir: 'dist',
        format: 'es',
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        chunkFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      external: [
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.peerDependencies || {}),
      ],
    },
  },
});
