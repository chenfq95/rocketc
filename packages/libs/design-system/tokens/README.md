# Design Tokens

This folder stores Rocketc design tokens in a DTCG-compatible structure.

## Files

```text
tokens/
├── primitive/
│   ├── blur.tokens.json
│   ├── color.tokens.json
│   ├── dimension.tokens.json
│   ├── motion.tokens.json
│   ├── opacity.tokens.json
│   ├── shadow.tokens.json
│   ├── typography.tokens.json
│   └── z-index.tokens.json
├── semantic/
│   ├── color.tokens.json
│   ├── layout.tokens.json
│   ├── opacity.tokens.json
│   ├── shadow.tokens.json
│   ├── typography.tokens.json
│   └── z-index.tokens.json
├── theme/
│   ├── light/
│   │   └── README.md
│   └── dark/
│       ├── color.tokens.json
│       └── opacity.tokens.json
```

- `primitive/`: raw design values such as color scales, spacing, measure scale, radius, and font families.
- `semantic/`: baseline role tokens such as brand colors, text colors, layout regions, shadows, and stacking roles.
- `theme/`: theme-specific overrides for semantic roles. A theme only needs files for values that differ from the semantic baseline.

## Elevation

Use three semantic depth steps. Do not invent extra elevation levels for tool UI.

| Surface                  | Light recipe                        | Dark recipe                          | Shadow                     |
| ------------------------ | ----------------------------------- | ------------------------------------ | -------------------------- |
| `color.surface.canvas`   | Stage / page background             | Darkest stage                        | none                       |
| `color.surface.panel`    | White + `border.subtle`             | Mid surface + subtle border          | `shadow.surface` (resting) |
| `color.surface.elevated` | Same white as panel; no hard border | One step lighter than panel          | `shadow.raised` (required) |
| Overlay UI (modal, menu) | Same fill as elevated               | Same fill as elevated or one step up | `shadow.overlay`           |

Contract:

- `panel` rests on the canvas with border + weak shadow.
- `elevated` must pair with `shadow.raised` (popover, sticky bar, floating card).
- Top-layer chrome (dialog, menu) uses `shadow.overlay`.
- Light mode separates depth mainly by shadow and border; dark mode mainly by surface color steps.

## Format

Each token uses DTCG-style `$value` and `$type` fields. Token references use curly-brace aliases such as `{color.orange.500}`.

Structured token values are preferred over CSS strings:

- `color`: `{ colorSpace, components, alpha }`
- `dimension`: `{ value, unit }`
- `duration`: `{ value, unit }`
- `cubicBezier`: `[x1, y1, x2, y2]`
- `shadow`: composite object with `color`, `offsetX`, `offsetY`, `blur`, and `spread`

Token files use the `.tokens.json` extension for DTCG exchange files. Keep adapter-specific metadata out of token values; transforms can derive CSS hex, RGB, or OKLCH strings from the structured token values.
