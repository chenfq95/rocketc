# Rocketc 设计系统 / Rocketc Design System

Rocketc 设计系统是一套框架无关的设计系统，面向个人工具、仪表盘与内容产品，提供可移植 Token，以及两套品牌族：**`default`**（黑）与 **`sun`**（橙），各含亮色和暗色模式。

Rocketc Design System is a framework-agnostic design system for personal tools, dashboards, and content products, with portable tokens and two brand families: **`default`** (black) and **`sun`** (orange), each in light and dark modes.

它不是 React、Vue 或 Tailwind 组件库。它定义视觉语言、Token、行为规则，以及供组件库消费的编译产物。

It is not a React, Vue, or Tailwind component library. It defines the visual language, tokens, behavior rules, and compiled assets that component libraries can consume.

> **语言 / Language：** 包文档采用中英对照，中文在前，英文紧随其后。<br>
> Package documentation is bilingual, with Chinese first and the corresponding English immediately after.

## 文档目录 / Documentation

| 文档 / Document                                                  | 主题 / Topic                                                                        |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [介绍与原则 / Introduction & Principles](./docs/introduction.md) | 定位、目标与设计原则 / Scope, goals, and design rules                               |
| [基础 / Foundations](./docs/foundations.md)                      | 色彩、字体、间距、纵深、动效 / Color, type, space, elevation, and motion            |
| [用法 / Usage](./docs/usage.md)                                  | 主题、适配器与常用配方 / Themes, adapters, and recipes                              |
| [贡献 / Contributing](./docs/contributing.md)                    | Token 分层、格式、构建与改动流程 / Token layers, format, build, and change workflow |

本地预览 / Local preview：`bun run dev`

## 目标 / Goals

- 通过可切换的品牌族定义可识别的个人产品风格。<br>
  Define a recognizable personal product style with switchable brand families.
- 保持设计决策跨框架、跨 UI 库可移植。<br>
  Keep design decisions portable across frameworks and UI libraries.
- 让 Token 成为色彩、字体、间距、圆角、阴影与动效的事实来源。<br>
  Make tokens the source of truth for color, type, spacing, radius, shadow, and motion.
- 提供便于对比视觉选择的预览。<br>
  Provide previews that make visual choices easy to compare.
- 把组件级决策留在适配器或应用中，而不是共享 Token 源中。<br>
  Keep component-specific decisions in adapters or applications instead of the shared token source.

## 包结构 / Package Structure

```text
packages/libs/design-system/
├── README.md             # 本文件（唯一入口） / This file (single entry)
├── docs/                 # 中英详细指南 / Detailed bilingual guides
├── tokens/
│   ├── primitive/
│   ├── semantic/
│   └── theme/            # default|sun × light|dark
├── dist/
│   ├── css/
│   ├── js/
│   ├── mui/
│   ├── chakra/
│   └── tailwind/
└── site/                 # 主题预览 / Astro theme playground
```

## Token 分层 / Token Layers

Rocketc 使用三层 Token：

Rocketc uses three token layers:

- 原始 Token：色阶、间距等原始设计值。<br>
  Primitive tokens: raw design values such as color scales and spacing values.
- 语义 Token：基于角色的基线值（以 `default.light` 为基线）。<br>
  Semantic tokens: baseline role-based values, using `default.light` as the baseline.
- 主题 Token：品牌族和颜色模式覆盖（`default|sun` × `light|dark`）。<br>
  Theme tokens: family and color-mode overrides (`default|sun` × `light|dark`).

组件库与应用应优先消费语义 Token；仅在组合本地组件配方时再使用原始 Token。

Component libraries and applications should consume semantic tokens first and use primitive tokens only when composing local component recipes.

详见 [docs/contributing.md](./docs/contributing.md)（Token 源与构建）和 [docs/foundations.md](./docs/foundations.md)（角色含义）。

See [docs/contributing.md](./docs/contributing.md) for token sources and builds, and [docs/foundations.md](./docs/foundations.md) for role semantics.

## 预览 / Preview

```bash
bun run dev
```

预览包含原始刻度、纯 HTML 语义配方，以及覆盖全部四套主题的 MUI、Chakra 和 shadcn 适配界面。

The preview includes primitive scales, plain HTML semantic recipes, and MUI, Chakra, and shadcn adapter surfaces across all four themes.

## 构建 Token / Build Tokens

```bash
bun run build:tokens
```

```text
dist/
├── css/
│   ├── default.light.css
│   ├── default.dark.css
│   ├── sun.light.css
│   └── sun.dark.css
├── js/
│   ├── index.js
│   ├── index.d.ts
│   └── {default,sun}.{light,dark}.{js,d.ts}
├── mui/
│   ├── index.js
│   └── {default,sun}.{light,dark}.{js,d.ts}
├── chakra/
│   └── {default,sun}.{light,dark}.{js,d.ts}
└── tailwind/
    └── theme.css
```

包导出仅暴露编译产物。`default.light` 是 `:root` 回退；其他变体通过 `sun.dark` 等 `data-theme` 值激活。

Package exports expose only compiled assets. `default.light` is the `:root` fallback; other variants activate through `data-theme` values such as `sun.dark`.

```ts
import { defaultLightTokens, type TokenTheme } from '@rocketc/design-system/js';
import { defaultLightMuiTheme, sunDarkMuiTheme } from '@rocketc/design-system/mui';
import defaultLightChakraTheme from '@rocketc/design-system/chakra/default.light';
// Tailwind / shadcn：导入 CSS 桥接，详见 docs/usage.md。
// Tailwind / shadcn: import CSS bridges; see docs/usage.md.
```

CSS 主题文件内联 `normalize.css`。MUI 经 `theme.components.MuiCssBaseline` 获得同一基线；单独使用 MUI 适配器时请渲染 `<CssBaseline />`。Chakra 在把生成的系统配置传给 `ChakraProvider` 时经 `globalCss` 获得基线。

The CSS theme files inline `normalize.css`. MUI receives the same baseline through `theme.components.MuiCssBaseline`; render `<CssBaseline />` when using the MUI adapter alone. Chakra receives the baseline through `globalCss` when the generated system config is passed to `ChakraProvider`.

完整用法请参阅 [docs/usage.md](./docs/usage.md)。

See [docs/usage.md](./docs/usage.md) for complete usage recipes.
