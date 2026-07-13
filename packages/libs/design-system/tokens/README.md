# Design Tokens

This folder stores Rocketc design tokens in a DTCG-compatible structure.

## Files

```text
tokens/
├── primitive/
│   ├── blur.tokens.json
│   ├── color.tokens.json
│   ├── dimension.tokens.json
│   ├── layout.tokens.json
│   ├── motion.tokens.json
│   ├── opacity.tokens.json
│   ├── shadow.tokens.json
│   ├── typography.tokens.json
│   └── z-index.tokens.json
├── semantic/
│   ├── light/
│   │   ├── color.tokens.json
│   │   ├── layout.tokens.json
│   │   ├── motion.tokens.json
│   │   ├── opacity.tokens.json
│   │   ├── shadow.tokens.json
│   │   ├── typography.tokens.json
│   │   └── z-index.tokens.json
│   └── dark/
│       ├── color.tokens.json
│       ├── layout.tokens.json
│       ├── motion.tokens.json
│       ├── opacity.tokens.json
│       ├── shadow.tokens.json
│       ├── typography.tokens.json
│       └── z-index.tokens.json
└── component/
    ├── button.tokens.json
    ├── card.tokens.json
    └── input.tokens.json
```

- `primitive/`: raw design values such as color scales, spacing, radius, and font families.
- `semantic/`: theme-specific role tokens such as brand colors, text colors, shadows, and motion.
- `component/`: component-level token mappings for controls and surfaces.

## Format

Each token uses DTCG-style `$value` and `$type` fields. Token references use curly-brace aliases such as `{color.orange.500}`.

Structured token values are preferred over CSS strings:

- `color`: `{ colorSpace, components, alpha }`
- `dimension`: `{ value, unit }`
- `duration`: `{ value, unit }`
- `cubicBezier`: `[x1, y1, x2, y2]`
- `shadow`: composite object with `color`, `offsetX`, `offsetY`, `blur`, and `spread`

Token files use the `.tokens.json` extension for DTCG exchange files. Keep adapter-specific metadata out of token values; transforms can derive CSS hex, RGB, or OKLCH strings from the structured token values.
