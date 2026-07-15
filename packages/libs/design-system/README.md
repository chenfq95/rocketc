# Rocketc Design System

Rocketc Design System is a framework-agnostic design system for personal tools, dashboards, and content products—quiet chrome, orange brand focus, portable tokens.

It is not a React, Vue, or Tailwind component library. It defines the visual language, tokens, behavior rules, and compiled assets that component libraries can consume.

**Detailed documentation:** [`docs/`](./docs/README.md)

## Goals

- Define a recognizable personal product style.
- Keep design decisions portable across frameworks and UI libraries.
- Make tokens the source of truth for color, type, spacing, radius, shadow, and motion.
- Provide previews that make visual choices easy to compare.
- Keep component-specific decisions in adapters or applications instead of the shared token source.

## Package Structure

```text
packages/libs/design-system/
├── docs/                 # Detailed documentation
├── principles.md         # Short canonical principles
├── tokens/
│   ├── primitive/
│   ├── semantic/
│   └── theme/
├── dist/
│   ├── css/
│   ├── js/
│   ├── mui/
│   └── chakra/
└── preview/              # Vite theme playground
```

## Token Layers

Rocketc uses three token layers:

- Primitive tokens: raw design values such as color scales and spacing values.
- Semantic tokens: baseline role-based values such as `color.text.primary` and `color.brand.solid`.
- Theme tokens: light and dark overrides for semantic roles.

Component libraries and applications should consume semantic tokens first and reach for primitive tokens only when composing local component recipes. The shared design system does not publish component-specific token mappings.

See [docs/tokens.md](./docs/tokens.md) and [docs/foundations.md](./docs/foundations.md).

## Preview

```bash
bun run dev
```

The preview includes primitive scales, plain HTML semantic recipes, and MUI / Chakra adapter surfaces.

## Build Tokens

```bash
bun run build:tokens
```

The build includes `tokens/primitive` and `tokens/semantic` as baseline layers, then loads one theme from `tokens/theme` as the override source before writing:

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

The CSS theme files inline `normalize.css`. MUI receives the same baseline through `theme.components.MuiCssBaseline`, so render MUI's `<CssBaseline />` inside the theme provider when using the MUI adapter by itself. Chakra receives the baseline through `globalCss` when the generated system config is passed to `ChakraProvider`.

Full usage recipes: [docs/usage.md](./docs/usage.md).
