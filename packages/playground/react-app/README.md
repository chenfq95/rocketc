# React + TypeScript + Vite 演练场 / Playground

此模板提供了让 React 在 Vite 中运行的最小配置，包括热模块替换（HMR）和部分 ESLint 规则。

This template provides a minimal setup for running React in Vite with Hot Module Replacement (HMR) and selected ESLint rules.

目前有两个官方插件可用：

Two official plugins are currently available:

- [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) 使用 [Babel](https://babeljs.io/)（在 [rolldown-vite](https://vite.dev/guide/rolldown) 中使用时也可采用 [oxc](https://oxc.rs)）实现快速刷新。<br>
  [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh.
- [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) 使用 [SWC](https://swc.rs/) 实现快速刷新。<br>
  [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh.

## React 编译器 / React Compiler

React 编译器目前与 SWC 不兼容。进展请参阅[此问题](https://github.com/vitejs/vite-plugin-react/issues/428)。

The React Compiler is currently incompatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for progress updates.

## 扩展 ESLint 配置 / Expanding the ESLint Configuration

如果正在开发生产应用，建议更新配置以启用类型感知的 lint 规则：

If you are developing a production application, update the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // 其他配置…… / Other configs...

      // 移除 tseslint.configs.recommended 并替换为此配置。
      // Remove tseslint.configs.recommended and replace it with this.
      tseslint.configs.recommendedTypeChecked,
      // 如需更严格的规则，请改用此配置。 / Alternatively, use this for stricter rules.
      tseslint.configs.strictTypeChecked,
      // 可选：添加此配置以启用样式规则。 / Optionally, add this for stylistic rules.
      tseslint.configs.stylisticTypeChecked,

      // 其他配置…… / Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // 其他选项…… / Other options...
    },
  },
]);
```

还可以安装 [`eslint-plugin-react-x`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) 和 [`eslint-plugin-react-dom`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)，以启用 React 专用的 lint 规则：

You can also install [`eslint-plugin-react-x`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [`eslint-plugin-react-dom`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) to enable React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // 其他配置…… / Other configs...
      // 启用 React lint 规则。 / Enable lint rules for React.
      reactX.configs['recommended-typescript'],
      // 启用 React DOM lint 规则。 / Enable lint rules for React DOM.
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // 其他选项…… / Other options...
    },
  },
]);
```
