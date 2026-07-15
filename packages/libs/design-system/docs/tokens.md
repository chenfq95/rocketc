# Tokens

Source notes also live in [`../tokens/README.md`](../tokens/README.md).

## Layers

Rocketc uses three DTCG layers. Build merges them in order:

1. **Primitive** — raw scales (color ramps, space, radius, type primitives, motion…)
2. **Semantic** — role aliases; this layer is the `default.light` baseline
3. **Theme** — named overrides for family and mode differences

```text
tokens/
├── primitive/**/*.tokens.json
├── semantic/**/*.tokens.json
└── theme/
    ├── default.light/
    ├── default.dark/
    ├── sun.light/
    └── sun.dark/
```

**Consumption rule:** apps and adapters should use **semantic** tokens first. Reach for primitives only when composing a local recipe that has no semantic role yet.

## Format

Files use `.tokens.json` with DTCG-style `$value` / `$type`.

References use curly braces:

```json
{
  "color": {
    "brand": {
      "solid": {
        "$value": "{color.orange.500}",
        "$type": "color"
      }
    }
  }
}
```

Preferred structured values (not CSS strings):

| Type                     | Shape                                                    |
| ------------------------ | -------------------------------------------------------- |
| `color`                  | `{ colorSpace, components, alpha }`                      |
| `dimension` / `duration` | `{ value, unit }`                                        |
| `cubicBezier`            | `[x1, y1, x2, y2]`                                       |
| `shadow`                 | `{ color, offsetX, offsetY, blur, spread, inset? }`      |
| `typography`             | composite of family/size/weight/lineHeight/letterSpacing |
| `fontFamily`             | string array                                             |
| `fontWeight` / `number`  | number                                                   |

Keep adapter-specific metadata out of token JSON. Transforms derive CSS/JS/MUI/Chakra shapes.

## Naming

- Logical path ≈ token path: `color.brand.solid`, `typography.body`, `shadow.raised`
- CSS variables use prefix **`rds`**: `--rds-color-brand-solid`, `--rds-shadow-raised`
- Typography composites expand to parts: `--rds-typography-body-font-size`, `…-letter-spacing`, etc.

## Build pipeline

```bash
bun run build:tokens
# or
bun run build
```

Pipeline (`scripts/build-tokens.ts` + Style Dictionary):

1. Load primitive + semantic for each theme
2. Apply `tokens/theme/<theme>` overrides
3. Emit:

```text
dist/
├── css/{default,sun}.{light,dark}.css
├── js/{default,sun}.{light,dark}.*
├── mui/{default,sun}.{light,dark}.*
└── chakra/{default,sun}.{light,dark}.*
```

- Default selector: `:root`, `[data-theme='default.light']`
- Variant selectors: `[data-theme='<family>.<mode>']`
- CSS files inline `normalize.css` baseline styles

Do not edit `dist/` by hand.

## Token groups (by folder)

### Primitive

| File                     | Contents                                          |
| ------------------------ | ------------------------------------------------- |
| `color.tokens.json`      | `neutral`, `orange`, status hues, black/white     |
| `typography.tokens.json` | family, size, weight, lineHeight, letterSpacing   |
| `dimension.tokens.json`  | space, radius, border, size, measure, breakpoints |
| `shadow.tokens.json`     | none → 2xl, inner/inset                           |
| `motion.tokens.json`     | duration, easing                                  |
| `opacity.tokens.json`    | opacity scale                                     |
| `blur.tokens.json`       | blur scale                                        |
| `z-index.tokens.json`    | numeric ladder                                    |

### Semantic

| File                     | Contents                                                    |
| ------------------------ | ----------------------------------------------------------- |
| `color.tokens.json`      | surface, text, border, action, control, brand, status, info |
| `typography.tokens.json` | display → code roles                                        |
| `shadow.tokens.json`     | surface, raised, overlay, focus                             |
| `layout.tokens.json`     | page, reading, header, toolbar, sidebar, content            |
| `opacity.tokens.json`    | UI opacity roles                                            |
| `z-index.tokens.json`    | base → tooltip roles                                        |

## Extending tokens

1. Prefer adding or adjusting a **semantic** role if product language needs a new meaning.
2. Add primitives only when a new raw scale step is required.
3. Put theme-only differences under `tokens/theme/<theme>/`.
4. Rebuild and check preview (especially Plain HTML + both framework tabs).
5. Document role intent in these docs if the role is public API.
