# Principles

Canonical short form: [`../principles.md`](../principles.md).

This page expands each principle with intent and practical consequences for tokens and UI work.

## Direction

Rocketc Design System is a **personal tool UI** system:

- Orange brand on quiet neutral chrome
- Dense when the task needs it
- Portable across frameworks
- Signature from brand + type + elevation—not a second personality hue

## Signature Through Brand and Hierarchy

**Intent:** Important surfaces feel owned without hurting scanability.

**Do:**

- Use brand orange on primary actions, selected states, and key emphasis
- Keep type roles distinct (display / title / body / label / caption)
- Keep elevation to three intentional steps (panel / elevated / overlay)

**Don’t:**

- Add a second saturated “accent brand” just for personality
- Cover the UI in brand fill
- Invent elevation.1…n for tool density

## Quiet by Default, Brand on Focus

**Intent:** Chrome stays calm; energy appears where the user acts.

**Do:**

- Default surfaces, borders, and secondary actions stay neutral
- Reserve brand for primary CTAs, selection, and important focus moments
- Keep status colors in the status lane

**Don’t:**

- Tint every card with brand soft
- Use danger/success as decoration

## Dense When Needed

**Intent:** Tools need compact information, not cramped type.

**Do:**

- Prefer 14px body and a 4px spacing grid
- Tighten with spacing and hierarchy, not by dropping contrast
- Use layout tokens for header/toolbar/sidebar rhythm

**Don’t:**

- Shrink text below readable sizes to “fit more”
- Add cozy/comfortable density modes unless product need is proven

## Color Has Meaning

Roles are contracts:

| Role                           | Meaning                                                         |
| ------------------------------ | --------------------------------------------------------------- |
| **Brand**                      | Identity + primary action (`orange`)                            |
| **Accent**                     | Muted secondary chrome (`neutral`)—not a second brand hue       |
| **Info**                       | Informational chrome (`neutral`)—not a blue “system info” brand |
| **Success / Warning / Danger** | Status only                                                     |

**Don’t** mix these casually (e.g. brand orange for errors, or success green for primary CTAs).

## Motion Should Confirm

**Intent:** Motion confirms change; it does not entertain.

**Do:**

- Prefer `duration.fast` / `normal` (120–180ms) for hover, focus, and toggles
- Use `easing.enter` / `exit` when showing or hiding layers
- Respect reduced-motion preferences in applications

**Don’t:**

- Add ambient looping motion on tool chrome
- Use long decorative transitions on dense workflows

## Portable by Design

**Intent:** Tokens travel; components can differ.

**Do:**

- Change look in `tokens/`, then rebuild
- Prefer semantic tokens in apps and adapters
- Keep framework-specific recipes out of the shared token JSON

**Don’t:**

- Hardcode hex/rgb in components when a semantic token exists
- Fork a second visual system in Tailwind/Radix packages without a migration plan

## Depth (elevation)

Depth stays at three steps:

1. **Panel** — resting content (`shadow.surface` + subtle border)
2. **Elevated** — floating UI (`shadow.raised` required)
3. **Overlay** — top chrome (`shadow.overlay`)

Light mode leans on border + shadow. Dark mode leans on surface color steps. See [Foundations → Elevation](./foundations.md#elevation).
