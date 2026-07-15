# Usage

## Install & build

From the monorepo workspace, the package is available as `@rocketc/design-system`.

Compiled assets are produced by:

```bash
cd packages/libs/design-system
bun run build:tokens
```

Consumers of the published package use `dist/` via package exports. Working from git, run the build before importing CSS/JS adapters if `dist/` is not committed.

## Prefer semantic tokens

```css
/* Good */
color: var(--rds-color-text-primary);
background: var(--rds-color-surface-panel);
box-shadow: var(--rds-shadow-surface);

/* Avoid when a role exists */
color: var(--rds-color-neutral-950);
```

```ts
// Good: theme roles through adapters
theme.palette.primary.main; // primary control recipe via MUI adapter

// Avoid: hardcoding brand hex in components
```

## CSS-only app

```ts
import '@rocketc/design-system/css/default.light.css';
import '@rocketc/design-system/css/default.dark.css';
import '@rocketc/design-system/css/sun.light.css';
import '@rocketc/design-system/css/sun.dark.css';

document.documentElement.dataset.theme = `${preferredFamily}.${preferredMode}`;
```

```css
.card {
  border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
  border-radius: var(--rds-radius-md);
  background: var(--rds-color-surface-panel);
  box-shadow: var(--rds-shadow-surface);
  color: var(--rds-color-text-primary);
  font: var(--rds-typography-body-font-weight) var(--rds-typography-body-font-size) /
    var(--rds-typography-body-line-height) var(--rds-typography-body-font-family);
}

.card.floating {
  border-color: transparent;
  background: var(--rds-color-surface-elevated);
  box-shadow: var(--rds-shadow-raised);
}
```

## Elevation recipes

| UI                             | Surface            | Shadow           |
| ------------------------------ | ------------------ | ---------------- |
| Page background                | `surface.canvas`   | none             |
| Section / card at rest         | `surface.panel`    | `shadow.surface` |
| Popover, sticky, floating card | `surface.elevated` | `shadow.raised`  |
| Dialog / menu                  | `surface.elevated` | `shadow.overlay` |

## Color recipes

| Need                  | Use                   |
| --------------------- | --------------------- |
| Primary control       | `control.primary.*`   |
| Secondary control     | `control.secondary.*` |
| Destructive           | `danger.*` only       |
| Success feedback      | `success.*` only      |
| Informational callout | `info.*`              |

## Typography recipes

| Need                                 | Role                      |
| ------------------------------------ | ------------------------- |
| Marketing/hero line in product shell | `display`                 |
| Page title                           | `title`                   |
| Card / section title                 | `heading` or `subheading` |
| Body copy                            | `body`                    |
| Field label                          | `label`                   |
| Helper / meta                        | `caption`                 |
| Code / token names                   | `code`                    |

## MUI

```tsx
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { defaultDarkMuiTheme, defaultLightMuiTheme } from '@rocketc/design-system/mui';

const theme = createTheme(mode === 'dark' ? defaultDarkMuiTheme : defaultLightMuiTheme);

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

You may still import CSS variables alongside MUI if custom islands need `--rds-*`.

## Chakra UI v3

```tsx
import { ChakraProvider } from '@chakra-ui/react';
import defaultLightChakraTheme from '@rocketc/design-system/chakra/default.light';

export function AppShell({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={defaultLightChakraTheme}>{children}</ChakraProvider>;
}
```

Switch themes by selecting the matching generated Chakra config, and keep `data-theme` in sync if CSS variables are also loaded.

## Preview

From the package root:

```bash
bun run dev
```

Tabs:

1. **Primitive** — raw scales
2. **Plain HTML** — semantic recipes (color, type, elevation, controls)
3. **MUI** — adapter stress surface
4. **Chakra** — adapter stress surface

Use the family control and theme switch to verify all four variants.
