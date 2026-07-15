# Themes & adapters

## Themes

Two themes are built today: **light** and **dark**.

| Theme | Source of truth                          | CSS selector          |
| ----- | ---------------------------------------- | --------------------- |
| Light | Semantic baseline (`tokens/semantic`)    | `:root`               |
| Dark  | Semantic + `tokens/theme/dark` overrides | `[data-theme='dark']` |

`tokens/theme/light/` is intentionally empty: light _is_ the semantic layer.

### Switching themes in apps

Set the attribute on the document element (preview does this):

```ts
document.documentElement.dataset.theme = 'dark'; // or 'light'
```

Load both CSS files when you need runtime toggle:

```ts
import '@rocketc/design-system/css/light.css';
import '@rocketc/design-system/css/dark.css';
```

Light variables apply by default; dark overrides activate under `[data-theme='dark']`.

## Output surfaces

| Export                                         | Purpose                              |
| ---------------------------------------------- | ------------------------------------ |
| `@rocketc/design-system/css/light.css`         | CSS variables + normalize + baseline |
| `@rocketc/design-system/css/dark.css`          | Dark overrides                       |
| `@rocketc/design-system/js`                    | `lightTokens` / `darkTokens` + types |
| `@rocketc/design-system/js/light` / `…/dark`   | Per-theme maps                       |
| `@rocketc/design-system/mui` (+ light/dark)    | MUI `ThemeOptions`                   |
| `@rocketc/design-system/chakra` (+ light/dark) | Chakra v3 system config              |

CSS variable prefix: **`rds`** (`--rds-*`).

## CSS adapter

Best for plain HTML, custom components, and any stack that reads custom properties.

- Prefer semantic variables: `--rds-color-text-primary`, `--rds-shadow-raised`
- Typography roles expand to multiple properties (`font-size`, `font-weight`, `letter-spacing`, …)
- Baseline normalize is inlined in the generated CSS

## JS adapter

Use when you need token values in TypeScript (runtime theme builders, non-CSS targets):

```ts
import { lightTokens, darkTokens, type TokenTheme } from '@rocketc/design-system/js';

lightTokens['color.brand.solid'];
```

Maps are flat DTCG-shaped entries (`$type` / `$value`).

## MUI adapter

```ts
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { lightMuiTheme, darkMuiTheme } from '@rocketc/design-system/mui';

const theme = createTheme(lightMuiTheme);
```

Notes:

- `palette.primary` ← brand; secondary ← accent; error ← danger
- Typography maps display → h1, title → h2, etc.
- Spacing unit follows `space.1` (4px)
- Shape radius uses `radius.md` (6px)
- Normalize/baseline ships via `MuiCssBaseline`—render `<CssBaseline />` inside the provider when using MUI alone

MUI peer dependency is optional.

## Chakra adapter

```ts
import { ChakraProvider } from '@chakra-ui/react';
import { lightChakraTheme } from '@rocketc/design-system/chakra';

<ChakraProvider value={lightChakraTheme}>{/* … */}</ChakraProvider>
```

Notes:

- Semantic color roles become Chakra semantic tokens / palettes
- Text styles map to typography roles
- Baseline styles apply through generated `globalCss`
- Some Chakra color aliases remap library defaults (e.g. orange ← brand); prefer semantic token names in product code

Chakra peer dependency is optional.

## Parity expectations

Adapters remap the **same semantic roles**. They do not restyle every default MUI/Chakra component recipe. For strict visual parity:

1. Prefer semantic tokens / text styles from the generated theme
2. Override component recipes in the app when library defaults leak
3. Check the preview’s MUI and Chakra tabs after token changes

## Not shipped yet

- Tailwind / CSS-first utility bridge
- Native iOS/Android token exports
- Figma Tokens sync

Portable-by-design still applies: add adapters without forking the semantic model.
