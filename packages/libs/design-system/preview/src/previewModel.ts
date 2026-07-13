import type { CSSProperties } from 'react';

export type PreviewTab = 'primitive' | 'plain-html' | 'mui' | 'chakra';
export type ThemeMode = 'light' | 'dark';

export const tabs: Array<{ label: string; value: PreviewTab }> = [
  { label: 'Primitive', value: 'primitive' },
  { label: 'Plain HTML', value: 'plain-html' },
  { label: 'MUI', value: 'mui' },
  { label: 'Chakra', value: 'chakra' },
];

export const colorRoles = [
  ['Brand solid', 'brand.solid', 'var(--rds-color-brand-solid)'],
  ['Brand hard', 'brand.hard', 'var(--rds-color-brand-hard)'],
  ['Brand soft', 'brand.soft', 'var(--rds-color-brand-soft)'],
  ['Brand text', 'brand.text', 'var(--rds-color-brand-text)'],
  ['Brand border', 'brand.border', 'var(--rds-color-brand-border)'],
  ['Brand contrast', 'brand.contrastText', 'var(--rds-color-brand-contrast-text)'],
  ['Accent solid', 'accent.solid', 'var(--rds-color-accent-solid)'],
  ['Accent hard', 'accent.hard', 'var(--rds-color-accent-hard)'],
  ['Accent soft', 'accent.soft', 'var(--rds-color-accent-soft)'],
  ['Accent text', 'accent.text', 'var(--rds-color-accent-text)'],
  ['Accent border', 'accent.border', 'var(--rds-color-accent-border)'],
  ['Accent contrast', 'accent.contrastText', 'var(--rds-color-accent-contrast-text)'],
  ['Success solid', 'state.success.solid', 'var(--rds-color-state-success-solid)'],
  ['Success hard', 'state.success.hard', 'var(--rds-color-state-success-hard)'],
  ['Success soft', 'state.success.soft', 'var(--rds-color-state-success-soft)'],
  [
    'Success contrast',
    'state.success.contrastText',
    'var(--rds-color-state-success-contrast-text)',
  ],
  ['Warning solid', 'state.warning.solid', 'var(--rds-color-state-warning-solid)'],
  ['Warning hard', 'state.warning.hard', 'var(--rds-color-state-warning-hard)'],
  ['Warning soft', 'state.warning.soft', 'var(--rds-color-state-warning-soft)'],
  [
    'Warning contrast',
    'state.warning.contrastText',
    'var(--rds-color-state-warning-contrast-text)',
  ],
  ['Info solid', 'state.info.solid', 'var(--rds-color-state-info-solid)'],
  ['Info hard', 'state.info.hard', 'var(--rds-color-state-info-hard)'],
  ['Info soft', 'state.info.soft', 'var(--rds-color-state-info-soft)'],
  ['Info contrast', 'state.info.contrastText', 'var(--rds-color-state-info-contrast-text)'],
  ['Danger solid', 'state.danger.solid', 'var(--rds-color-state-danger-solid)'],
  ['Danger hard', 'state.danger.hard', 'var(--rds-color-state-danger-hard)'],
  ['Danger soft', 'state.danger.soft', 'var(--rds-color-state-danger-soft)'],
  ['Danger contrast', 'state.danger.contrastText', 'var(--rds-color-state-danger-contrast-text)'],
  ['Action active', 'action.active', 'var(--rds-color-action-active)'],
  ['Action hover', 'action.hover', 'var(--rds-color-action-hover)'],
  ['Action selected', 'action.selected', 'var(--rds-color-action-selected)'],
  ['Action disabled', 'action.disabled', 'var(--rds-color-action-disabled)'],
  [
    'Action disabled bg',
    'action.disabledBackground',
    'var(--rds-color-action-disabled-background)',
  ],
  ['Action focus', 'action.focus', 'var(--rds-color-action-focus)'],
  ['Canvas', 'surface.canvas', 'var(--rds-color-surface-canvas)'],
  ['Panel', 'surface.panel', 'var(--rds-color-surface-panel)'],
  ['Raised', 'surface.raised', 'var(--rds-color-surface-raised)'],
  ['Inverse', 'surface.inverse', 'var(--rds-color-surface-inverse)'],
  ['Text primary', 'text.primary', 'var(--rds-color-text-primary)'],
  ['Text secondary', 'text.secondary', 'var(--rds-color-text-secondary)'],
  ['Text muted', 'text.muted', 'var(--rds-color-text-muted)'],
  ['Text inverse', 'text.inverse', 'var(--rds-color-text-inverse)'],
  ['Border subtle', 'border.subtle', 'var(--rds-color-border-subtle)'],
  ['Border default', 'border.default', 'var(--rds-color-border-default)'],
  ['Border strong', 'border.strong', 'var(--rds-color-border-strong)'],
  ['Border focus', 'border.focus', 'var(--rds-color-border-focus)'],
  ['Common black', 'common.black', 'var(--rds-color-common-black)'],
  ['Common white', 'common.white', 'var(--rds-color-common-white)'],
];

export const colorScales = ['neutral', 'orange', 'coral', 'cyan', 'green', 'blue', 'amber', 'red'];
export const colorSteps = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
];

export const plainTypographyRoles = [
  ['Display', 'typography.display', 'display', 'Expressive Personal UI'],
  ['Title', 'typography.title', 'title', 'Design tokens that travel across frameworks'],
  ['Heading', 'typography.heading', 'heading', 'Controls composed from token roles'],
  ['Subheading', 'typography.subheading', 'subheading', 'Framework adapters'],
  ['Body', 'typography.body', 'body', 'Interface text stays direct, compact, and readable.'],
  ['Body Strong', 'typography.bodyStrong', 'body-strong', 'Important interface text'],
  ['Label', 'typography.label', 'label', 'Workspace name'],
  ['Caption', 'typography.caption', 'caption', 'Generated from semantic typography tokens'],
  ['Code', 'typography.code', 'code', 'color.brand.solid'],
];

export const muiTypographyVariants = [
  ['h1', 'Expressive Personal UI'],
  ['h2', 'Design tokens that travel across frameworks'],
  ['h3', 'Controls composed from token roles'],
  ['h4', 'Framework adapters'],
  ['body1', 'Interface text stays direct, compact, and readable.'],
  ['body2', 'Secondary interface text for dense surfaces.'],
  ['button', 'Primary action'],
  ['caption', 'Generated from MUI ThemeOptions typography'],
] as const;

export const muiPaletteRoles = [
  ['Primary main', 'primary.main', 'color.brand.solid'],
  ['Primary dark', 'primary.dark', 'color.brand.hard'],
  ['Primary light', 'primary.light', 'color.brand.soft'],
  ['Secondary main', 'secondary.main', 'color.accent.solid'],
  ['Secondary dark', 'secondary.dark', 'color.accent.hard'],
  ['Secondary light', 'secondary.light', 'color.accent.soft'],
  ['Success main', 'success.main', 'color.state.success.solid'],
  ['Success dark', 'success.dark', 'color.state.success.hard'],
  ['Success light', 'success.light', 'color.state.success.soft'],
  ['Warning main', 'warning.main', 'color.state.warning.solid'],
  ['Warning dark', 'warning.dark', 'color.state.warning.hard'],
  ['Warning light', 'warning.light', 'color.state.warning.soft'],
  ['Error main', 'error.main', 'color.state.danger.solid'],
  ['Error dark', 'error.dark', 'color.state.danger.hard'],
  ['Error light', 'error.light', 'color.state.danger.soft'],
  ['Info main', 'info.main', 'color.state.info.solid'],
  ['Info dark', 'info.dark', 'color.state.info.hard'],
  ['Info light', 'info.light', 'color.state.info.soft'],
  ['Background default', 'background.default', 'color.surface.canvas'],
  ['Background paper', 'background.paper', 'color.surface.panel'],
  ['Text primary', 'text.primary', 'color.text.primary'],
  ['Text secondary', 'text.secondary', 'color.text.secondary'],
  ['Text disabled', 'text.disabled', 'color.text.muted'],
  ['Divider', 'divider', 'color.border.subtle'],
  ['Action active', 'action.active', 'color.action.active'],
  ['Action hover', 'action.hover', 'color.action.hover'],
  ['Action selected', 'action.selected', 'color.action.selected'],
  ['Action disabled', 'action.disabled', 'color.action.disabled'],
  ['Action disabled bg', 'action.disabledBackground', 'color.action.disabledBackground'],
  ['Action focus', 'action.focus', 'color.action.focus'],
] as const;

export const chakraColorRoles = [
  ['Brand solid', 'colors.brand.solid', 'color.brand.solid'],
  ['Brand contrast', 'colors.brand.contrast', 'color.brand.contrastText'],
  ['Brand fg', 'colors.brand.fg', 'color.brand.text'],
  ['Brand muted', 'colors.brand.muted', 'color.brand.soft'],
  ['Brand subtle', 'colors.brand.subtle', 'color.brand.soft'],
  ['Brand emphasized', 'colors.brand.emphasized', 'color.brand.hard'],
  ['Brand border', 'colors.brand.border', 'color.brand.border'],
  ['Brand focus ring', 'colors.brand.focusRing', 'color.brand.border'],
  ['Accent solid', 'colors.accent.solid', 'color.accent.solid'],
  ['Accent contrast', 'colors.accent.contrast', 'color.accent.contrastText'],
  ['Accent fg', 'colors.accent.fg', 'color.accent.text'],
  ['Accent muted', 'colors.accent.muted', 'color.accent.soft'],
  ['Accent subtle', 'colors.accent.subtle', 'color.accent.soft'],
  ['Accent emphasized', 'colors.accent.emphasized', 'color.accent.hard'],
  ['Accent border', 'colors.accent.border', 'color.accent.border'],
  ['Accent focus ring', 'colors.accent.focusRing', 'color.accent.border'],
  ['Success solid', 'colors.success.solid', 'color.state.success.solid'],
  ['Success contrast', 'colors.success.contrast', 'color.state.success.contrastText'],
  ['Success fg', 'colors.success.fg', 'color.state.success.hard'],
  ['Success muted', 'colors.success.muted', 'color.state.success.soft'],
  ['Success subtle', 'colors.success.subtle', 'color.state.success.soft'],
  ['Success emphasized', 'colors.success.emphasized', 'color.state.success.hard'],
  ['Success border', 'colors.success.border', 'color.state.success.solid'],
  ['Success focus ring', 'colors.success.focusRing', 'color.state.success.solid'],
  ['Warning solid', 'colors.warning.solid', 'color.state.warning.solid'],
  ['Warning contrast', 'colors.warning.contrast', 'color.state.warning.contrastText'],
  ['Warning fg', 'colors.warning.fg', 'color.state.warning.hard'],
  ['Warning muted', 'colors.warning.muted', 'color.state.warning.soft'],
  ['Warning subtle', 'colors.warning.subtle', 'color.state.warning.soft'],
  ['Warning emphasized', 'colors.warning.emphasized', 'color.state.warning.hard'],
  ['Warning border', 'colors.warning.border', 'color.state.warning.solid'],
  ['Warning focus ring', 'colors.warning.focusRing', 'color.state.warning.solid'],
  ['Info solid', 'colors.info.solid', 'color.state.info.solid'],
  ['Info contrast', 'colors.info.contrast', 'color.state.info.contrastText'],
  ['Info fg', 'colors.info.fg', 'color.state.info.hard'],
  ['Info muted', 'colors.info.muted', 'color.state.info.soft'],
  ['Info subtle', 'colors.info.subtle', 'color.state.info.soft'],
  ['Info emphasized', 'colors.info.emphasized', 'color.state.info.hard'],
  ['Info border', 'colors.info.border', 'color.state.info.solid'],
  ['Info focus ring', 'colors.info.focusRing', 'color.state.info.solid'],
  ['Danger solid', 'colors.danger.solid', 'color.state.danger.solid'],
  ['Danger contrast', 'colors.danger.contrast', 'color.state.danger.contrastText'],
  ['Danger fg', 'colors.danger.fg', 'color.state.danger.hard'],
  ['Danger muted', 'colors.danger.muted', 'color.state.danger.soft'],
  ['Danger subtle', 'colors.danger.subtle', 'color.state.danger.soft'],
  ['Danger emphasized', 'colors.danger.emphasized', 'color.state.danger.hard'],
  ['Danger border', 'colors.danger.border', 'color.state.danger.solid'],
  ['Danger focus ring', 'colors.danger.focusRing', 'color.state.danger.solid'],
] as const;

export const chakraTypographyRoles = [
  ['Display', 'display', 'Expressive Personal UI'],
  ['Title', 'title', 'Design tokens that travel across frameworks'],
  ['Heading', 'heading', 'Controls composed from token roles'],
  ['Subheading', 'subheading', 'Framework adapters'],
  ['Body', 'body', 'Interface text stays direct, compact, and readable.'],
  ['Body Strong', 'bodyStrong', 'Important interface text'],
  ['Label', 'label', 'Workspace name'],
  ['Caption', 'caption', 'Generated from Chakra text styles'],
  ['Code', 'code', 'colors.brand.solid'],
] as const;

export const overlayAndUtilityComponents = [
  'Backdrop',
  'ClickAwayListener',
  'Drawer',
  'Fade',
  'GlobalStyles',
  'Grow',
  'Menu',
  'Modal',
  'Popover',
  'Popper',
  'Portal',
  'Slide',
  'Snackbar',
  'SwipeableDrawer',
  'TabScrollButton',
  'TablePaginationActions',
  'Unstable_TrapFocus',
  'Zoom',
  'darkScrollbar',
  'generateUtilityClass',
  'generateUtilityClasses',
  'useAutocomplete',
  'useMediaQuery',
  'useScrollTrigger',
];

export const tokenGroup = (token: string): string => {
  const parts = token.split('.');
  const [namespace, role, variant] = parts;

  if (namespace === 'colors' && role && variant) return `${namespace}.${role}`;

  return namespace === 'state' && role ? `${namespace}.${role}` : (namespace ?? token);
};

export const startsTokenGroup = (items: readonly (readonly string[])[], index: number) => {
  const current = items[index]?.[1];
  const previous = items[index - 1]?.[1];

  return Boolean(index > 0 && current && previous && tokenGroup(current) !== tokenGroup(previous));
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readChakraToken = (theme: Record<string, unknown>, namespace: string, path: string) => {
  const root = theme.theme;
  if (!isRecord(root)) throw new Error('Invalid Chakra theme output.');

  const namespaceValue = root[namespace];
  if (!isRecord(namespaceValue)) throw new Error(`Missing Chakra theme namespace "${namespace}".`);

  const tokenNode = path
    .split('.')
    .reduce<unknown>(
      (current, segment) => (isRecord(current) ? current[segment] : undefined),
      namespaceValue,
    );

  if (!isRecord(tokenNode) || !('value' in tokenNode)) {
    throw new Error(`Missing Chakra token "${namespace}.${path}".`);
  }

  const value = tokenNode.value;
  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new Error(`Unsupported Chakra token value for "${namespace}.${path}".`);
  }

  return value;
};

export const chakraSemantic = (theme: Record<string, unknown>, path: string): string =>
  String(readChakraToken(theme, 'semanticTokens', path));

export const chakraToken = (theme: Record<string, unknown>, path: string): string =>
  String(readChakraToken(theme, 'tokens', path));

const chakraTextStyle = (theme: Record<string, unknown>, path: string) => {
  const root = theme.theme;
  if (!isRecord(root)) throw new Error('Invalid Chakra theme output.');

  const textStyles = root.textStyles;
  if (!isRecord(textStyles)) throw new Error('Missing Chakra textStyles.');

  const styleNode = path
    .split('.')
    .reduce<unknown>(
      (current, segment) => (isRecord(current) ? current[segment] : undefined),
      textStyles,
    );

  if (!isRecord(styleNode) || !isRecord(styleNode.value)) {
    throw new Error(`Missing Chakra text style "${path}".`);
  }

  return styleNode.value;
};

export const chakraTypographyStyle = (
  theme: Record<string, unknown>,
  path: string,
): CSSProperties => chakraTextStyle(theme, path) as CSSProperties;
