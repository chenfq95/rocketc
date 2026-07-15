# Themes & adapters

## Themes

Two theme families are built in light and dark modes.

| Theme           | Character                         | CSS selector                     |
| --------------- | --------------------------------- | -------------------------------- |
| `default.light` | Next.js-style neutral light       | `:root`, matching data attribute |
| `default.dark`  | Next.js-style neutral dark        | `[data-theme='default.dark']`    |
| `sun.light`     | Original orange brand, light mode | `[data-theme='sun.light']`       |
| `sun.dark`      | Original orange brand, dark mode  | `[data-theme='sun.dark']`        |

`tokens/theme/default.light/` is intentionally empty because it uses the semantic baseline directly.

### Switching themes in apps

Set the attribute on the document element (preview does this):

```ts
document.documentElement.dataset.theme = 'sun.dark';
```

Load both CSS files when you need runtime toggle:

```ts
import '@rocketc/design-system/css/default.light.css';
import '@rocketc/design-system/css/default.dark.css';
import '@rocketc/design-system/css/sun.light.css';
import '@rocketc/design-system/css/sun.dark.css';
```

`default.light` variables apply by default; explicit variants activate under their matching `data-theme` value.

## Output surfaces

| Export                                   | Purpose                              |
| ---------------------------------------- | ------------------------------------ |
| `@rocketc/design-system/css/<theme>.css` | CSS variables + normalize + baseline |
| `@rocketc/design-system/js`              | All token maps + types               |
| `@rocketc/design-system/js/<theme>`      | Per-theme map                        |
| `@rocketc/design-system/mui`             | All MUI `ThemeOptions`               |
| `@rocketc/design-system/chakra/<theme>`  | Per-theme Chakra v3 system config    |

CSS variable prefix: **`rds`** (`--rds-*`).

## CSS adapter

Best for plain HTML, custom components, and any stack that reads custom properties.

- Prefer semantic variables: `--rds-color-text-primary`, `--rds-shadow-raised`
- Typography roles expand to multiple properties (`font-size`, `font-weight`, `letter-spacing`, …)
- Baseline normalize is inlined in the generated CSS

## JS adapter

Use when you need token values in TypeScript (runtime theme builders, non-CSS targets):

```ts
import { defaultLightTokens, sunDarkTokens, type TokenTheme } from '@rocketc/design-system/js';

defaultLightTokens['color.brand.solid'];
```

Maps are flat DTCG-shaped entries (`$type` / `$value`).

## MUI adapter

```ts
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { defaultLightMuiTheme, sunDarkMuiTheme } from '@rocketc/design-system/mui';

const theme = createTheme(defaultLightMuiTheme);
```

Notes:

- `palette.primary` ← brand; secondary ← neutral surface/action roles; error ← danger
- Typography maps display → h1, title → h2, etc.
- Spacing unit follows `space.1` (4px)
- Shape radius uses `radius.md` (6px)
- Normalize/baseline ships via `MuiCssBaseline`—render `<CssBaseline />` inside the provider when using MUI alone

MUI peer dependency is optional.

## Chakra adapter

```ts
import { ChakraProvider } from '@chakra-ui/react';
import defaultLightChakraTheme from '@rocketc/design-system/chakra/default.light';

<ChakraProvider value={defaultLightChakraTheme}>{/* ... */}</ChakraProvider>
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
