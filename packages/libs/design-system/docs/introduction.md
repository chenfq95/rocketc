# Introduction

## What it is

`@rocketc/design-system` defines the shared visual language for Rocketc products:

- Design principles for personal tool UI
- DTCG design tokens (primitive → semantic → theme)
- Compiled outputs: CSS variables, JS token maps, MUI themes, Chakra system configs
- A multi-surface preview (primitives, plain HTML recipes, MUI, Chakra)

It is the **source of truth for look and feel**, not a React/Vue/Svelte component kit.

## What it is not

- Not a component library (buttons, inputs, tables live in adapters or app packages)
- Not a Tailwind preset (yet)—principles allow it; this package does not ship one today
- Not a Figma library sync (tokens are code-first)

`@rocketc/design-system` replaces the deprecated `@rocketc/react` package as Rocketc's visual contract. Use its tokens and framework adapters with the component library appropriate for each application.

## Product direction

**Personal Tool UI**: orange brand identity on quiet neutral chrome, dense enough for dashboards, practical for real products. Recognition comes from brand color, type hierarchy, and elevation—not from a multi-hue “expressive” palette.

Typical surfaces:

- Tools and dashboards
- Dense settings and data views
- Content products that still need calm chrome

## Design goals

1. **Recognizable** — Brand orange + hierarchy are enough to feel owned without noisy decoration.
2. **Portable** — One token source compiles to CSS, JS, MUI, and Chakra.
3. **Semantic-first** — Apps consume roles (`color.text.primary`, `shadow.raised`), not raw oranges.
4. **Comparable** — Preview makes light/dark and framework parity easy to check.
5. **Thin shared core** — Component recipes stay in adapters/apps; the DS stays token-shaped.

## Package layout

```text
packages/libs/design-system/
├── docs/                 # This documentation
├── principles.md         # Short canonical principles
├── tokens/
│   ├── primitive/        # Raw scales
│   ├── semantic/         # Role aliases (light baseline)
│   └── theme/            # light / dark overrides
├── scripts/build-tokens/ # Style Dictionary pipeline
├── dist/                 # Compiled assets (build output)
└── preview/              # Vite playground
```

Published package contents are mainly `dist/` plus the package README. Source tokens and docs live in the repo for authors and consumers who work from source.

## Versioning note

The package is early (`0.0.1`). Token names and semantic roles should stay stable when possible; primitive scale tweaks and theme overrides are the preferred way to evolve the look.
