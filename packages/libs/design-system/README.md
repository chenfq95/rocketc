# Rocketc Design System

Rocketc Design System is a framework-agnostic design system for expressive personal products, tools, dashboards, and content experiences.

It is not a React, Vue, or Tailwind component library. It defines the visual language, tokens, behavior rules, and compiled assets that component libraries can consume.

## Goals

- Define a recognizable personal product style.
- Keep design decisions portable across frameworks and UI libraries.
- Make tokens the source of truth for color, type, spacing, radius, shadow, and motion.
- Provide previews that make visual choices easy to compare.
- Keep component-specific decisions in tokens before binding them to any specific implementation.

## Package Structure

```text
packages/libs/design-system/
├── principles.md
├── tokens/
│   ├── primitive/
│   ├── semantic/
│   └── component/
├── dist/
│   ├── css/
│   ├── js/
│   ├── mui/
│   └── chakra/
└── preview/
    ├── index.html
    └── styles.css
```

## Token Layers

Rocketc uses three token layers:

- Primitive tokens: raw design values such as color scales and spacing values.
- Semantic tokens: role-based values such as `color.text.primary` and `color.action.primary`.
- Component tokens: component-specific mappings such as `button.primary.background`.

Component libraries and applications should consume semantic and component tokens. Primitive tokens are source values, not component API.

## Preview

Open `packages/libs/design-system/preview/index.html` directly in a browser to review the first visual directions.

The preview is intentionally plain HTML and CSS so it stays independent from any component library.

## Build Tokens

Build platform assets from strict DTCG token files with Style Dictionary:

```bash
bun run build:tokens
```

The build reads `tokens/primitive`, one semantic theme, and `tokens/component`, then writes:

```text
dist/
├── css/
│   ├── light.css
│   └── dark.css
├── js/
│   ├── index.js
│   ├── index.d.ts
│   ├── light.js
│   ├── light.d.ts
│   ├── dark.js
│   └── dark.d.ts
├── mui/
│   ├── index.js
│   ├── light.js
│   └── dark.js
└── chakra/
    ├── index.js
    ├── light.js
    └── dark.js
```

Package exports only expose compiled assets. Use `@rocketc/design-system/css/light.css` for the default theme and `@rocketc/design-system/css/dark.css` with `[data-theme='dark']`.

Use JS modules when a component library needs token values directly:

```ts
import { lightTokens, type TokenTheme } from '@rocketc/design-system/js';
```

Use framework adapter modules when a component library needs a native theme object:

```ts
import { lightMuiTheme } from '@rocketc/design-system/mui';
import { lightChakraTheme } from '@rocketc/design-system/chakra';
```
