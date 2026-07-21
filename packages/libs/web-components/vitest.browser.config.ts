import babel from '@rolldown/plugin-babel';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

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

export default defineConfig({
  plugins: [
    babel({
      presets: [decoratorPreset({ version: '2023-11' })],
    }),
  ],
  test: {
    include: ['src/**/*.browser.test.ts'],
    browser: {
      enabled: true,
      headless: true,
      screenshotFailures: false,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
});
