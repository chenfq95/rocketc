# Rocketc Design System / Rocketc 设计系统

Rocketc Design System is a framework-agnostic design system for personal tools, dashboards, and content products—with portable tokens and two brand families: **`default`** (black) and **`sun`** (orange), each in light and dark modes.

Rocketc 设计系统是一套框架无关的设计系统，面向个人工具、仪表盘与内容产品——提供可移植 Token，以及两套品牌族：**`default`**（黑）与 **`sun`**（橙），各含亮色/暗色模式。

It is not a React, Vue, or Tailwind component library. It defines the visual language, tokens, behavior rules, and compiled assets that component libraries can consume.

它不是 React / Vue / Tailwind 组件库。它定义视觉语言、Token、行为规则，以及供组件库消费的编译产物。

> **Language / 语言：** Package docs are bilingual—English first, Chinese immediately after.  
> 包文档为中英对照：英文在前，中文紧随其后。

## Docs / 文档目录

| Doc / 文档                                                       | Topic / 主题                                                                        |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [Introduction & Principles / 介绍与原则](./docs/introduction.md) | Scope, goals, and design rules / 定位、目标与设计原则                               |
| [Foundations / 基础](./docs/foundations.md)                      | Color, type, space, elevation, motion / 色彩、字体、间距、纵深、动效                |
| [Usage / 用法](./docs/usage.md)                                  | Themes, adapters (CSS/JS/MUI/Chakra/Tailwind), and recipes / 主题、适配器与常用配方 |
| [Contributing / 贡献](./docs/contributing.md)                    | Token layers, format, build, and change workflow / Token 分层、格式、构建与改动流程 |

Local preview / 本地预览：`bun run dev`

## Goals / 目标

- Define a recognizable personal product style with switchable brand families.  
  以可切换品牌族定义可识别的个人产品风格。
- Keep design decisions portable across frameworks and UI libraries.  
  保持设计决策跨框架、跨 UI 库可移植。
- Make tokens the source of truth for color, type, spacing, radius, shadow, and motion.  
  让 Token 成为色彩、字体、间距、圆角、阴影与动效的事实来源。
- Provide previews that make visual choices easy to compare.  
  提供便于对比视觉选择的预览。
- Keep component-specific decisions in adapters or applications instead of the shared token source.  
  把组件级决策留在适配器或应用，而不是共享 Token 源。

## Package Structure / 包结构

```text
packages/libs/design-system/
├── README.md             # This file (single entry) / 本文件（唯一入口）
├── docs/                 # Detailed bilingual guides / 中英详细指南
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
└── site/                 # Astro theme playground / 主题预览
```

## Token Layers / Token 分层

Rocketc uses three token layers / 使用三层 Token：

- Primitive tokens: raw design values such as color scales and spacing values. / 原始设计值
- Semantic tokens: baseline role-based values (`default.light` baseline). / 语义角色（`default.light` 基线）
- Theme tokens: family and color-mode overrides (`default|sun` × `light|dark`). / 品牌族与明暗覆盖

Component libraries and applications should consume semantic tokens first and reach for primitive tokens only when composing local component recipes.

组件库与应用应优先消费语义 Token；仅在组合本地配方时再使用原始 Token。

See / 详见 [docs/contributing.md](./docs/contributing.md)（Token 源与构建）and [docs/foundations.md](./docs/foundations.md)（角色含义）。

## Preview / 预览

```bash
bun run dev
```

The preview includes primitive scales, plain HTML semantic recipes, and MUI / Chakra / shadcn adapter surfaces across all four themes.

预览包含原始刻度、纯 HTML 语义配方，以及覆盖全部四套主题的 MUI / Chakra / shadcn 适配表面。

## Build Tokens / 构建 Token

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

Package exports only expose compiled assets. `default.light` is the `:root` fallback; other variants activate through `data-theme` values such as `sun.dark`.

包导出仅暴露编译产物。`default.light` 是 `:root` 回退；其他变体通过如 `sun.dark` 的 `data-theme` 激活。

```ts
import { defaultLightTokens, type TokenTheme } from '@rocketc/design-system/js';
import { defaultLightMuiTheme, sunDarkMuiTheme } from '@rocketc/design-system/mui';
import defaultLightChakraTheme from '@rocketc/design-system/chakra/default.light';
// Tailwind / shadcn: import CSS bridges — see docs/usage.md
```

The CSS theme files inline `normalize.css`. MUI receives the same baseline through `theme.components.MuiCssBaseline`—render `<CssBaseline />` when using the MUI adapter alone. Chakra receives the baseline through `globalCss` when the generated system config is passed to `ChakraProvider`.

CSS 主题文件内联 `normalize.css`。MUI 经 `MuiCssBaseline` 获得同一基线——单独使用 MUI 适配器时请渲染 `<CssBaseline />`。Chakra 在把生成配置交给 `ChakraProvider` 时经 `globalCss` 获得基线。

Full usage recipes / 完整用法：[docs/usage.md](./docs/usage.md).
