# @rocketc/web-components

Web Components (Lit) built on [`@rocketc/design-system`](../design-system) semantic tokens (`--rds-*`).

## Install

```bash
bun add @rocketc/web-components @rocketc/design-system
```

Load a theme stylesheet, then register components:

```ts
import '@rocketc/design-system/css/default.light.css';
import '@rocketc/web-components/register';
```

```html
<rds-button variant="solid">Save</rds-button>
<rds-badge variant="success">Ready</rds-badge>
<rds-input placeholder="Name"></rds-input>
```

## Components

| Element      | Role                                                               |
| ------------ | ------------------------------------------------------------------ |
| `rds-button` | Actions (`solid` / `subtle` / `outline` / `ghost` / `destructive`) |
| `rds-badge`  | Status chips                                                       |
| `rds-input`  | Text field (form-associated)                                       |
| `rds-label`  | Form label                                                         |
| `rds-switch` | Toggle (form-associated)                                           |
| `rds-card`   | Surface container (`header` / default / `footer` slots)            |
| `rds-alert`  | Feedback (`default` / status soft surfaces)                        |

## Theming

Components read CSS variables from the active design-system theme. Switch with:

```ts
document.documentElement.dataset.theme = 'sun.dark';
```

Import every theme CSS file you need for runtime toggling.

## Preview

Component demos live in the design-system preview under the **Web Components** tab:

```bash
cd packages/libs/design-system
bun run build:tokens
bun run dev
```

## Build

```bash
bun run build
```
