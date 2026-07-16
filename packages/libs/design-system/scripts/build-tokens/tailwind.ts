import { HEADER } from './constants.ts';
import { cssVarName, toKebab } from './names.ts';
import type { FlatTokenTheme } from './types.ts';

/**
 * shadcn / Tailwind short aliases → DS semantic paths.
 * Kept as a thin compatibility layer; full DS roles ship separately in `@theme`.
 */
/**
 * Official shadcn theme scaffold + status extensions.
 * @see https://ui.shadcn.com/docs/theming
 */
const SHADCN_COLOR_ALIASES = {
  // Core surfaces / chrome
  background: 'color.surface.canvas',
  foreground: 'color.text.primary',
  card: 'color.surface.panel',
  'card-foreground': 'color.text.primary',
  popover: 'color.surface.elevated',
  'popover-foreground': 'color.text.primary',
  // Controls
  primary: 'color.control.primary.bg',
  'primary-foreground': 'color.control.primary.fgContrast',
  // Filled muted control (not panel white — shadcn secondary is a solid chip).
  secondary: 'color.control.secondary.bgHover',
  'secondary-foreground': 'color.control.secondary.fg',
  muted: 'color.action.bgHover',
  'muted-foreground': 'color.text.muted',
  accent: 'color.brand.soft',
  'accent-foreground': 'color.brand.fg',
  destructive: 'color.danger.solid',
  'destructive-foreground': 'color.danger.contrast',
  border: 'color.border.default',
  input: 'color.border.default',
  ring: 'color.border.focus',
  // Charts (no dedicated DS chart roles yet — map to identity / status solids)
  'chart-1': 'color.brand.solid',
  'chart-2': 'color.info.solid',
  'chart-3': 'color.success.solid',
  'chart-4': 'color.warning.solid',
  'chart-5': 'color.danger.solid',
  // Sidebar block
  sidebar: 'color.surface.panel',
  'sidebar-foreground': 'color.text.primary',
  'sidebar-primary': 'color.control.primary.bg',
  'sidebar-primary-foreground': 'color.control.primary.fgContrast',
  'sidebar-accent': 'color.action.bgHover',
  'sidebar-accent-foreground': 'color.text.primary',
  'sidebar-border': 'color.border.subtle',
  'sidebar-ring': 'color.border.focus',
  // Extra status pairs (not in default shadcn scaffold; useful for apps)
  success: 'color.success.solid',
  'success-foreground': 'color.success.contrast',
  warning: 'color.warning.solid',
  'warning-foreground': 'color.warning.contrast',
  info: 'color.info.solid',
  'info-foreground': 'color.info.contrast',
} as const;

const SHADCN_RADIUS_ALIAS = 'radius.md';

/** Role-based color roots under `color.*` (excludes primitive ramps). */
const SEMANTIC_COLOR_ROOTS = new Set([
  'surface',
  'text',
  'border',
  'action',
  'control',
  'brand',
  'success',
  'warning',
  'danger',
  'info',
  'common',
]);

/** Typography composite roles → font-size theme keys. */
const TYPOGRAPHY_ROLES = [
  'display',
  'title',
  'heading',
  'subheading',
  'body',
  'bodySmall',
  'label',
  'caption',
  'code',
] as const;

const rdsVar = (tokenPath: string): string => `var(${cssVarName(tokenPath.split('.'))})`;

const themeKey = (parts: string[]): string => parts.map(toKebab).join('-');

const hasToken = (tokens: FlatTokenTheme, name: string): boolean => Boolean(tokens[name]);

const isSemanticColor = (name: string): boolean => {
  const parts = name.split('.');
  return parts[0] === 'color' && parts.length >= 2 && SEMANTIC_COLOR_ROOTS.has(parts[1]);
};

const push = (lines: string[], declaration: string): void => {
  lines.push(`  ${declaration}`);
};

/**
 * Single Tailwind / shadcn theme file:
 * - `:root` shadcn short names (`--background`, `--primary`, …) → `--rds-*`
 * - `@theme inline` utilities for shadcn + full DS semantic roles
 *
 * Short-name values resolve against whatever `--rds-*` the active `data-theme` sets.
 */
export const buildTailwindTheme = (tokens: FlatTokenTheme): string => {
  const rootLines = [
    ...Object.entries(SHADCN_COLOR_ALIASES).map(
      ([name, tokenPath]) => `  --${name}: ${rdsVar(tokenPath)};`,
    ),
    `  --radius: ${rdsVar(SHADCN_RADIUS_ALIAS)};`,
  ];

  const lines: string[] = [];

  // --- shadcn short color aliases (via :root bridge vars) ---
  for (const name of Object.keys(SHADCN_COLOR_ALIASES)) {
    push(lines, `--color-${name}: var(--${name});`);
  }

  // --- DS semantic colors ---
  for (const name of Object.keys(tokens).sort()) {
    if (!isSemanticColor(name)) continue;
    const parts = name.split('.').slice(1); // drop `color`
    push(lines, `--color-${themeKey(parts)}: ${rdsVar(name)};`);
  }

  // --- Font families ---
  if (hasToken(tokens, 'typography.family.sans')) {
    push(lines, `--font-sans: ${rdsVar('typography.family.sans')};`);
  }
  if (hasToken(tokens, 'typography.family.mono')) {
    push(lines, `--font-mono: ${rdsVar('typography.family.mono')};`);
  }

  // --- Type scale + role font sizes ---
  for (const name of Object.keys(tokens).sort()) {
    if (!name.startsWith('typography.size.')) continue;
    const step = themeKey(name.split('.').slice(2));
    push(lines, `--text-${step}: ${rdsVar(name)};`);
  }
  for (const role of TYPOGRAPHY_ROLES) {
    const sizeVar = cssVarName(['typography', role, 'fontSize']);
    // Composite roles always expand in CSS output when the typography token exists.
    if (hasToken(tokens, `typography.${role}`)) {
      push(lines, `--text-${toKebab(role)}: var(${sizeVar});`);
    }
  }

  // --- Font weights / leading / tracking ---
  for (const name of Object.keys(tokens).sort()) {
    if (name.startsWith('typography.weight.')) {
      push(lines, `--font-weight-${themeKey(name.split('.').slice(2))}: ${rdsVar(name)};`);
    }
    if (name.startsWith('typography.lineHeight.')) {
      push(lines, `--leading-${themeKey(name.split('.').slice(2))}: ${rdsVar(name)};`);
    }
    if (name.startsWith('typography.letterSpacing.')) {
      push(lines, `--tracking-${themeKey(name.split('.').slice(2))}: ${rdsVar(name)};`);
    }
  }

  // --- Spacing (space scale + layout dims that behave as spacing) ---
  for (const name of Object.keys(tokens).sort()) {
    if (!name.startsWith('space.')) continue;
    push(lines, `--spacing-${themeKey(name.split('.').slice(1))}: ${rdsVar(name)};`);
  }
  for (const name of Object.keys(tokens).sort()) {
    if (!name.startsWith('layout.')) continue;
    const leaf = name.split('.').at(-1);
    if (leaf === 'maxWidth') {
      push(lines, `--max-width-${themeKey(name.split('.').slice(1, -1))}: ${rdsVar(name)};`);
      continue;
    }
    push(lines, `--spacing-${themeKey(name.split('.'))}: ${rdsVar(name)};`);
  }

  // --- Size scale ---
  for (const name of Object.keys(tokens).sort()) {
    if (!name.startsWith('size.')) continue;
    push(lines, `--size-${themeKey(name.split('.').slice(1))}: ${rdsVar(name)};`);
  }

  // --- Radius (full scale + shadcn DEFAULT) ---
  for (const name of Object.keys(tokens).sort()) {
    if (!name.startsWith('radius.')) continue;
    push(lines, `--radius-${themeKey(name.split('.').slice(1))}: ${rdsVar(name)};`);
  }
  push(lines, `--radius-DEFAULT: var(--radius);`);

  // --- Border widths ---
  for (const name of Object.keys(tokens).sort()) {
    if (!name.startsWith('border.') || name.startsWith('color.border.')) continue;
    // dimension border.* only (border.sm, …)
    if (tokens[name]?.$type !== 'dimension') continue;
    push(lines, `--border-width-${themeKey(name.split('.').slice(1))}: ${rdsVar(name)};`);
  }

  // --- Shadows ---
  for (const name of Object.keys(tokens).sort()) {
    if (!name.startsWith('shadow.') || tokens[name]?.$type !== 'shadow') continue;
    push(lines, `--shadow-${themeKey(name.split('.').slice(1))}: ${rdsVar(name)};`);
  }

  // --- Blur ---
  for (const name of Object.keys(tokens).sort()) {
    if (!name.startsWith('blur.')) continue;
    push(lines, `--blur-${themeKey(name.split('.').slice(1))}: ${rdsVar(name)};`);
  }

  // --- Opacity (semantic + scale) ---
  // Tailwind v4 color-mix modifiers need percentages (`90%`), while RDS stores
  // unitless 0–1 numbers. Convert at the theme boundary.
  for (const name of Object.keys(tokens).sort()) {
    if (!name.startsWith('opacity.')) continue;
    push(lines, `--opacity-${themeKey(name.split('.').slice(1))}: calc(${rdsVar(name)} * 100%);`);
  }

  // --- Z-index (roles + scale) ---
  for (const name of Object.keys(tokens).sort()) {
    if (!name.startsWith('zIndex.')) continue;
    push(lines, `--z-index-${themeKey(name.split('.').slice(1))}: ${rdsVar(name)};`);
  }

  // --- Motion ---
  for (const name of Object.keys(tokens).sort()) {
    if (name.startsWith('duration.')) {
      push(lines, `--duration-${themeKey(name.split('.').slice(1))}: ${rdsVar(name)};`);
    }
    if (name.startsWith('easing.')) {
      push(lines, `--ease-${themeKey(name.split('.').slice(1))}: ${rdsVar(name)};`);
    }
  }

  return [HEADER, ':root {', ...rootLines, '}', '', '@theme inline {', ...lines, '}', ''].join(
    '\n',
  );
};
