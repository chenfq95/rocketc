# Principles

## Direction

Rocketc Design System is a personal tool UI system: orange brand identity on quiet neutral chrome, dense enough for dashboards, portable enough for real products. Recognition comes from brand color, type hierarchy, and elevation—not from a multi-hue expressive palette.

## Principles

### Signature Through Brand and Hierarchy

Identity is carried by the brand orange on primary actions and key emphasis, plus a clear type and elevation ladder. Surfaces stay calm so the signature stays scannable. Do not invent a second “personality hue” to force distinctiveness.

Depth stays at three steps—`panel` (resting), `elevated` + `shadow.raised`, and `shadow.overlay` for top chrome. Light mode leans on border and shadow; dark mode leans on surface color steps.

### Quiet by Default, Brand on Focus

Default surfaces, chrome, and secondary actions stay neutral and readable. Brand color is reserved for primary actions, selected states, and important emphasis. Status colors stay in their own lane.

### Dense When Needed

Tools and dashboards need compact information density. Density should come from disciplined spacing and hierarchy, not cramped text or weak contrast.

### Color Has Meaning

Brand color expresses identity and primary action. Info communicates informational UI, while neutral surface, text, border, and action roles compose secondary chrome. State colors (success, warning, danger) communicate status only. These roles should not be mixed casually.

### Motion Should Confirm

Motion should confirm a change, reveal relationship, or reduce disorientation. Decorative motion is allowed only when it does not compete with task flow.

### Portable by Design

The system must work across CSS variables, Tailwind, React, Vue, Svelte, native apps, and Figma. Tokens and specifications come before framework-specific components.
