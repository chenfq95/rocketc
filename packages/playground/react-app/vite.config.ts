import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svg from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svg()],
  build: {
    target: ['chrome107', 'edge107', 'firefox104', 'safari16'],
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'chakra',
              test: /node_modules[\\/](@chakra-ui[\\/]react|@emotion[\\/]react)/,
              includeDependenciesRecursively: true,
              priority: 20,
            },
            {
              name: 'charts',
              test: /node_modules[\\/]recharts/,
              includeDependenciesRecursively: true,
              priority: 10,
            },
          ],
        },
      },
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    tsconfigPaths: true,
  },
});
