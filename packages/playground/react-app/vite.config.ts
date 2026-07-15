import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svg from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svg(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          chakra: ['@chakra-ui/react', '@emotion/react'],
          charts: ['recharts'],
        },
      },
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
});
