import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dts from 'unplugin-dts/vite';
import packageJson from './package.json';
import tailwindcss from '@tailwindcss/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.lib.json',
      bundleTypes: true,
    }),
    tailwindcss(),
  ],
  build: {
    sourcemap: true,
    minify: false,
    cssMinify: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'style',
    },
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.peerDependencies || {}),
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
