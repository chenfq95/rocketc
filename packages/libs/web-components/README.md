# @rocketc/web-components

Web Components (Lit) built on [`@rocketc/design-system`](../design-system) semantic tokens (`--rds-*`).

Reactive properties use **standard decorators** (`@property` + `accessor`). The package is compiled with `tsc` so decorator output runs in current browsers.

## Install

```bash
bun add @rocketc/web-components @rocketc/design-system
```

```ts
import '@rocketc/design-system/css/default.light.css';
import { registerRocketcCustomElements } from '@rocketc/web-components';

registerRocketcCustomElements();
```

## Structure

```
src/components/
  basic/button/
    button.ts
    icon-button.ts
    close-button.ts
    demo/                # HTML usage snippets
  navigation/tabs/
    tabs.ts
    tab.ts
    demo/
  …
```

Each component (or compound family) lives in its own folder with an `index.ts` barrel.
Related parts share a folder — e.g. `tabs/` holds both `tabs.ts` and `tab.ts`.
Every folder has a `demo/` with HTML usage snippets. The Astro **usage site** gives each component one page (preview + API from source):

```bash
bun run build
bun run site:dev
```

The design-system Vite preview stays token/theme-only; component usage lives in this package's `site/`.

## Components

### `basic/`

| Element                                                              | Role                         |
| -------------------------------------------------------------------- | ---------------------------- |
| `rds-button` / `rds-icon-button` / `rds-close-button`                | Actions                      |
| `rds-link`                                                           | Link                         |
| `rds-typography`                                                     | Text / headings              |
| `rds-field`                                                          | Label + helper + error shell |
| `rds-input` / `rds-textarea` / `rds-select`                          | Native fields                |
| `rds-number-input` / `rds-password-input` / `rds-pin-input`          | Specialized inputs           |
| `rds-tags-input` / `rds-combobox` / `rds-combobox-option`            | Multi / search select        |
| `rds-color-picker` / `rds-file-upload`                               | Pickers                      |
| `rds-checkbox` / `rds-radio` / `rds-radio-group`                     | Selection                    |
| `rds-segment` / `rds-segment-item`                                   | Segmented control            |
| `rds-switch` / `rds-slider` / `rds-rating`                           | Toggles & range              |
| `rds-label` / `rds-fieldset`                                         | Form chrome                  |
| `rds-dialog` / `rds-details`                                         | Disclosure                   |
| `rds-progress` / `rds-progress-circle` / `rds-spinner` / `rds-meter` | Progress                     |

### `feedback/`

`rds-alert` · `rds-badge` · `rds-tag` · `rds-banner` · `rds-toast` · `rds-snackbar` · `rds-skeleton`

### `surfaces/`

`rds-card` · `rds-panel` · `rds-sheet` · `rds-popover`

### `navigation/`

`rds-tabs` / `rds-tab` · `rds-breadcrumb` · `rds-menu` / `rds-menu-item` · `rds-pagination` · `rds-sidebar` · `rds-accordion` / `rds-accordion-item` · `rds-steps` / `rds-step` · `rds-timeline` / `rds-timeline-item`

### `overlay/`

`rds-drawer` · `rds-dropdown` · `rds-tooltip` · `rds-hover-card` · `rds-toggle-tip`

### `data/`

`rds-table` · `rds-list` / `rds-list-item` · `rds-avatar` · `rds-empty` · `rds-stat`

### `layout/`

`rds-box` · `rds-flex` · `rds-center` · `rds-stack` · `rds-grid` · `rds-separator` · `rds-divider` · `rds-scroll-area`

## Forms

Form-associated: `rds-input`, `rds-textarea`, `rds-select`, `rds-checkbox`, `rds-radio`, `rds-switch`, `rds-slider`, `rds-number-input`, `rds-password-input`, `rds-pin-input`, `rds-tags-input`, `rds-combobox`, `rds-rating`, `rds-color-picker`, `rds-file-upload` via `mixinElementInternals` + `mixinFormAssociated`.

## Accessibility

Interactive controls use **ARIA delegation** (`mixinDelegatesAria`). IDREFs such as `aria-labelledby` stay on the host.

## Preview

```bash
cd packages/libs/design-system
bun run build:tokens
bun run dev
```

## Build

```bash
bun run build
bun run build:watch
```
