# Foundations

Visual building blocks compiled from tokens. Values below describe the **current system**; always treat `tokens/` as authoritative if docs and source diverge.

## Color

### Primitive scales

Available ramps include `neutral`, `orange`, `amber`, `red`, `green`, `teal`, `blue`, `purple`, plus `black` / `white`.

Semantic roles intentionally use only a subset. Extra hues exist for future recipes—do not use them ad hoc in product UI when a semantic role already fits.

### Semantic color roles

| Group                            | Roles                                          | Purpose                    |
| -------------------------------- | ---------------------------------------------- | -------------------------- |
| `surface`                        | canvas, panel, elevated, inverse               | Page and container fills   |
| `text`                           | primary, secondary, muted, inverse             | Content hierarchy          |
| `border`                         | subtle, default, strong, focus                 | Structure and focus chrome |
| `action`                         | active, hover, selected, disabled, …           | Shared interaction chrome  |
| `control.primary` / `secondary`  | bg, bgHover, bgActive, fg, fgContrast, borders | Complete control recipes   |
| `brand`                          | soft/solid states, fg, contrast, borders       | Identity color family      |
| `success` / `warning` / `danger` | ten-slot palette recipe                        | Status only                |
| `info`                           | ten-slot palette recipe                        | Informational chrome       |

The Sun theme brand solid resolves to **orange.500** (`#FF6900` / `rgb(255 105 0)`). Components consume `control.primary.*` and `control.secondary.*`; those recipes may alias brand, surface, text, border, and action roles differently in each theme.

### Palette recipe

Brand, info, and status families share the same slots:

- `soft`, `softHover`, `softActive` — low-emphasis fill states
- `solid`, `solidHover`, `solidActive` — filled-control states
- `fg` — foreground on soft or canvas backgrounds
- `contrast` — foreground on solid backgrounds
- `border` — outline
- `focusRing` — keyboard focus indicator

### Light surfaces

| Token              | Role                                                  |
| ------------------ | ----------------------------------------------------- |
| `surface.canvas`   | Stage (`neutral.100`)                                 |
| `surface.panel`    | Resting content (`neutral.0`)                         |
| `surface.elevated` | Floating fill (same white as panel; depth via shadow) |

### Dark surfaces

Dark theme overrides step the stage upward:

| Token              | Approx. step  |
| ------------------ | ------------- |
| `surface.canvas`   | `neutral.950` |
| `surface.panel`    | `neutral.900` |
| `surface.elevated` | `neutral.800` |

Brand solid stays orange across themes; soft/text/border retarget for contrast.

## Typography

### Families

- **Sans:** Noto Sans SC → Source Han Sans SC → PingFang SC → Microsoft YaHei → system UI sans (CJK-first)
- **Mono:** Noto Sans Mono → system mono

### Semantic roles

| Role                     | Character                                                      |
| ------------------------ | -------------------------------------------------------------- |
| `display`                | Largest hero type: weight 900, line-height 1, tighter tracking |
| `title`                  | Page/section title: bold, tight leading/tracking               |
| `heading` / `subheading` | In-page structure                                              |
| `body` / `bodySmall`     | Default UI copy (body at **14px**)                             |
| `label`                  | Control labels; slightly wider tracking                        |
| `caption`                | Meta / helper; wider tracking                                  |
| `code`                   | Mono, compact                                                  |

Letter-spacing primitives: `tighter` → `tight` → `normal` → `wide` → `wider`. Display/title tighten; label/caption open slightly so the stack has distinct “voices” without a second font family.

## Spacing, radius, measure

- **Space:** 4px grid (`space.1` = 4px, Tailwind-like steps)
- **Radius:** `none` → `full`; default product radius often **`radius.md` (6px)** (also MUI shape default)
- **Border widths:** 0 / 0.5 / 1 / 2 / 4px
- **Measure:** content widths including `measure.xl` (1180px) as page max
- **Breakpoints:** 640 / 768 / 1024 / 1280 / 1536

### Layout semantics

| Token                           | Typical use                    |
| ------------------------------- | ------------------------------ |
| `layout.page.maxWidth`          | Shell max width (`measure.xl`) |
| `layout.page.gutter`            | Page gutter (`space.2`)        |
| `layout.reading.maxWidth`       | Long-form reading (~720px)     |
| `layout.header.height`          | Top bar (`space.11` / 44px)    |
| `layout.toolbar.height`         | Toolbar (`space.8` / 32px)     |
| `layout.sidebar.width`          | Sidebar (248px)                |
| `layout.sidebar.collapsedWidth` | Collapsed rail (`space.12`)    |

## Elevation

Use **three** semantic depth steps. Do not invent Material-style elevation ladders for tool UI.

| Step       | Surface            | Shadow                       | Light recipe                                            | Dark recipe                       |
| ---------- | ------------------ | ---------------------------- | ------------------------------------------------------- | --------------------------------- |
| Resting    | `surface.panel`    | `shadow.surface`             | White + subtle border + weak shadow                     | Mid surface + subtle border       |
| Raised     | `surface.elevated` | `shadow.raised` **required** | Same white, transparent/no hard border, stronger shadow | One step lighter than panel       |
| Top chrome | elevated fill      | `shadow.overlay`             | Modal / menu / dialog                                   | Same idea; color steps still help |

Approximate compiled shadow steps (light):

- `shadow.surface` → xs ≈ `0 1px 1px / 0.05`
- `shadow.raised` → md ≈ `0 8px 20px -2px / 0.12`
- `shadow.overlay` → lg ≈ `0 18px 44px -4px / 0.2`
- `shadow.focus` → 3px spread ring (neutral), not brand glow

**Contract:** if a surface uses `surface.elevated`, pair it with `shadow.raised` (or `overlay` when it is top-layer chrome).

## Motion

Primitives only today (no semantic motion roles yet):

| Token               | Value                           |
| ------------------- | ------------------------------- |
| `duration.fast`     | 120ms                           |
| `duration.normal`   | 180ms                           |
| `duration.slow`     | 260ms                           |
| `duration.slower`   | 360ms                           |
| `easing.standard`   | `cubic-bezier(0.2, 0, 0, 1)`    |
| `easing.enter`      | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `easing.exit`       | `cubic-bezier(0.7, 0, 0.84, 0)` |
| `easing.emphasized` | slight overshoot                |

Prefer short confirmational motion on interaction; avoid ambient decoration.

## Z-index

Semantic stacking roles (low → high):

`base` → `raised` → `dropdown` → `sticky` → `overlay` → `modal` → `popover` → `toast` → `tooltip`

Pair stacking with elevation shadows: a modal should use both `zIndex.modal` (or overlay/popover as appropriate) and `shadow.overlay`.

## Opacity & blur

Primitive scales exist for overlays, scrims, and effects. Prefer semantic opacity roles when present; avoid magic numbers in components.
