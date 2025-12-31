import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'unplugin-dts/vite';
import packageJson from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
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
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.peerDependencies || {}),
      ],
    },
  },
});
