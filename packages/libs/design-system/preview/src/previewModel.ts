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
  ['Brand soft', 'brand.soft', 'var(--rds-color-brand-soft)', 'color.orange.50 / color.orange.950'],
  [
    'Brand border',
    'brand.border',
    'var(--rds-color-brand-border)',
    'color.orange.300 / color.orange.600',
  ],
  [
    'Brand text',
    'brand.text',
    'var(--rds-color-brand-text)',
    'color.orange.700 / color.orange.300',
  ],
  ['Brand solid', 'brand.solid', 'var(--rds-color-brand-solid)', 'color.orange.500'],
  ['Brand hard', 'brand.hard', 'var(--rds-color-brand-hard)', 'color.orange.600'],
  ['Brand contrast', 'brand.contrast', 'var(--rds-color-brand-contrast)', 'color.white'],
  [
    'Accent soft',
    'accent.soft',
    'var(--rds-color-accent-soft)',
    'color.neutral.100 / color.neutral.800',
  ],
  [
    'Accent border',
    'accent.border',
    'var(--rds-color-accent-border)',
    'color.neutral.300 / color.neutral.700',
  ],
  [
    'Accent text',
    'accent.text',
    'var(--rds-color-accent-text)',
    'color.neutral.700 / color.neutral.200',
  ],
  [
    'Accent solid',
    'accent.solid',
    'var(--rds-color-accent-solid)',
    'color.neutral.200 / color.neutral.700',
  ],
  [
    'Accent hard',
    'accent.hard',
    'var(--rds-color-accent-hard)',
    'color.neutral.300 / color.neutral.600',
  ],
  [
    'Accent contrast',
    'accent.contrast',
    'var(--rds-color-accent-contrast)',
    'color.neutral.900 / color.neutral.50',
  ],
  [
    'Success soft',
    'success.soft',
    'var(--rds-color-success-soft)',
    'color.green.50 / color.green.950',
  ],
  [
    'Success border',
    'success.border',
    'var(--rds-color-success-border)',
    'color.green.300 / color.green.700',
  ],
  [
    'Success text',
    'success.text',
    'var(--rds-color-success-text)',
    'color.green.700 / color.green.300',
  ],
  ['Success solid', 'success.solid', 'var(--rds-color-success-solid)', 'color.green.500'],
  ['Success hard', 'success.hard', 'var(--rds-color-success-hard)', 'color.green.800'],
  ['Success contrast', 'success.contrast', 'var(--rds-color-success-contrast)', 'color.white'],
  [
    'Warning soft',
    'warning.soft',
    'var(--rds-color-warning-soft)',
    'color.amber.50 / color.amber.950',
  ],
  [
    'Warning border',
    'warning.border',
    'var(--rds-color-warning-border)',
    'color.amber.300 / color.amber.700',
  ],
  [
    'Warning text',
    'warning.text',
    'var(--rds-color-warning-text)',
    'color.amber.700 / color.amber.300',
  ],
  ['Warning solid', 'warning.solid', 'var(--rds-color-warning-solid)', 'color.amber.500'],
  ['Warning hard', 'warning.hard', 'var(--rds-color-warning-hard)', 'color.amber.800'],
  ['Warning contrast', 'warning.contrast', 'var(--rds-color-warning-contrast)', 'color.white'],
  ['Info soft', 'info.soft', 'var(--rds-color-info-soft)', 'color.neutral.100 / color.neutral.800'],
  [
    'Info border',
    'info.border',
    'var(--rds-color-info-border)',
    'color.neutral.300 / color.neutral.700',
  ],
  ['Info text', 'info.text', 'var(--rds-color-info-text)', 'color.neutral.700 / color.neutral.300'],
  [
    'Info solid',
    'info.solid',
    'var(--rds-color-info-solid)',
    'color.neutral.200 / color.neutral.700',
  ],
  ['Info hard', 'info.hard', 'var(--rds-color-info-hard)', 'color.neutral.300 / color.neutral.800'],
  [
    'Info contrast',
    'info.contrast',
    'var(--rds-color-info-contrast)',
    'color.neutral.900 / color.neutral.50',
  ],
  ['Danger soft', 'danger.soft', 'var(--rds-color-danger-soft)', 'color.red.50 / color.red.950'],
  [
    'Danger border',
    'danger.border',
    'var(--rds-color-danger-border)',
    'color.red.300 / color.red.700',
  ],
  ['Danger text', 'danger.text', 'var(--rds-color-danger-text)', 'color.red.700 / color.red.300'],
  ['Danger solid', 'danger.solid', 'var(--rds-color-danger-solid)', 'color.red.500'],
  ['Danger hard', 'danger.hard', 'var(--rds-color-danger-hard)', 'color.red.800'],
  ['Danger contrast', 'danger.contrast', 'var(--rds-color-danger-contrast)', 'color.white'],
  [
    'Action active',
    'action.active',
    'var(--rds-color-action-active)',
    'color.neutral.700 / color.neutral.300',
  ],
  [
    'Action hover',
    'action.hover',
    'var(--rds-color-action-hover)',
    'color.neutral.100 / color.neutral.800',
  ],
  [
    'Action selected',
    'action.selected',
    'var(--rds-color-action-selected)',
    'color.orange.50 / color.orange.950',
  ],
  [
    'Action disabled',
    'action.disabled',
    'var(--rds-color-action-disabled)',
    'color.neutral.500 / color.neutral.400',
  ],
  [
    'Action disabled bg',
    'action.disabledBackground',
    'var(--rds-color-action-disabled-background)',
    'color.neutral.100 / color.neutral.800',
  ],
  [
    'Action focus',
    'action.focus',
    'var(--rds-color-action-focus)',
    'color.neutral.200 / color.neutral.700',
  ],
  [
    'Canvas',
    'surface.canvas',
    'var(--rds-color-surface-canvas)',
    'color.neutral.100 / color.neutral.950',
  ],
  [
    'Panel',
    'surface.panel',
    'var(--rds-color-surface-panel)',
    'color.neutral.0 / color.neutral.900',
  ],
  [
    'Elevated',
    'surface.elevated',
    'var(--rds-color-surface-elevated)',
    'color.neutral.0 + shadow.raised / color.neutral.800',
  ],
  [
    'Inverse',
    'surface.inverse',
    'var(--rds-color-surface-inverse)',
    'color.neutral.950 / color.neutral.0',
  ],
  [
    'Text primary',
    'text.primary',
    'var(--rds-color-text-primary)',
    'color.neutral.950 / color.neutral.50',
  ],
  [
    'Text secondary',
    'text.secondary',
    'var(--rds-color-text-secondary)',
    'color.neutral.700 / color.neutral.300',
  ],
  [
    'Text muted',
    'text.muted',
    'var(--rds-color-text-muted)',
    'color.neutral.500 / color.neutral.400',
  ],
  [
    'Text inverse',
    'text.inverse',
    'var(--rds-color-text-inverse)',
    'color.neutral.0 / color.neutral.950',
  ],
  [
    'Border subtle',
    'border.subtle',
    'var(--rds-color-border-subtle)',
    'color.neutral.200 / color.neutral.800',
  ],
  [
    'Border default',
    'border.default',
    'var(--rds-color-border-default)',
    'color.neutral.300 / color.neutral.700',
  ],
  ['Border strong', 'border.strong', 'var(--rds-color-border-strong)', 'color.neutral.500'],
  ['Border focus', 'border.focus', 'var(--rds-color-border-focus)', 'color.neutral.500'],
  ['Common black', 'common.black', 'var(--rds-color-common-black)', 'color.black'],
  ['Common white', 'common.white', 'var(--rds-color-common-white)', 'color.white'],
];

export const colorScales = ['neutral', 'red', 'orange', 'amber', 'green', 'teal', 'blue', 'purple'];
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
  ['Display', 'typography.display', 'display', 'Personal Tool UI'],
  ['Title', 'typography.title', 'title', 'Design tokens that travel across frameworks'],
  ['Heading', 'typography.heading', 'heading', 'Controls composed from token roles'],
  ['Subheading', 'typography.subheading', 'subheading', 'Framework adapters'],
  ['Body', 'typography.body', 'body', 'Interface text stays direct, compact, and readable.'],
  [
    'Body small',
    'typography.bodySmall',
    'body-small',
    'Secondary interface text for dense surfaces.',
  ],
  ['Label', 'typography.label', 'label', 'Workspace name'],
  ['Caption', 'typography.caption', 'caption', 'Generated from semantic typography tokens'],
  ['Code', 'typography.code', 'code', 'color.brand.solid'],
];

/** Three-step depth ladder shown on the plain HTML preview. */
export const elevationSteps = [
  ['Canvas', 'surface.canvas', 'stage', 'Page background. No elevation shadow.'],
  [
    'Panel',
    'surface.panel + shadow.surface',
    'panel',
    'Resting content block. Border + weak shadow.',
  ],
  [
    'Elevated',
    'surface.elevated + shadow.raised',
    'elevated',
    'Floating card, popover, sticky bar. Raised shadow required.',
  ],
  [
    'Overlay',
    'surface.elevated + shadow.overlay',
    'overlay',
    'Modal, menu, and top chrome. Strongest shadow step.',
  ],
] as const;

export const muiTypographyVariants = [
  ['h1', 'Personal Tool UI'],
  ['h2', 'Design tokens that travel across frameworks'],
  ['h3', 'Controls composed from token roles'],
  ['h4', 'Framework adapters'],
  ['body1', 'Interface text stays direct, compact, and readable.'],
  ['body2', 'Secondary interface text for dense surfaces.'],
  ['button', 'Primary action'],
  ['caption', 'Generated from MUI ThemeOptions typography'],
] as const;

export const muiPaletteRoles = [
  ['Primary light', 'primary.light', 'color.brand.soft'],
  ['Primary main', 'primary.main', 'color.brand.solid'],
  ['Primary dark', 'primary.dark', 'color.brand.hard'],
  ['Secondary light', 'secondary.light', 'color.accent.soft'],
  ['Secondary main', 'secondary.main', 'color.accent.solid'],
  ['Secondary dark', 'secondary.dark', 'color.accent.hard'],
  ['Success light', 'success.light', 'color.success.soft'],
  ['Success main', 'success.main', 'color.success.solid'],
  ['Success dark', 'success.dark', 'color.success.hard'],
  ['Warning light', 'warning.light', 'color.warning.soft'],
  ['Warning main', 'warning.main', 'color.warning.solid'],
  ['Warning dark', 'warning.dark', 'color.warning.hard'],
  ['Error light', 'error.light', 'color.danger.soft'],
  ['Error main', 'error.main', 'color.danger.solid'],
  ['Error dark', 'error.dark', 'color.danger.hard'],
  ['Info light', 'info.light', 'color.info.soft'],
  ['Info main', 'info.main', 'color.info.solid'],
  ['Info dark', 'info.dark', 'color.info.hard'],
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
  ['Gray solid', 'colors.gray.solid', 'color.neutral.800 / color.neutral.200'],
  ['Gray contrast', 'colors.gray.contrast', 'color.neutral.0 / color.neutral.950'],
  ['Gray fg', 'colors.gray.fg', 'color.neutral.700 / color.neutral.300'],
  ['Gray muted', 'colors.gray.muted', 'color.neutral.100 / color.neutral.800'],
  ['Gray subtle', 'colors.gray.subtle', 'color.neutral.50 / color.neutral.900'],
  ['Gray emphasized', 'colors.gray.emphasized', 'color.neutral.200 / color.neutral.700'],
  ['Gray border', 'colors.gray.border', 'color.neutral.300 / color.neutral.700'],
  ['Gray focus ring', 'colors.gray.focusRing', 'color.neutral.500 / color.neutral.400'],
  ['Brand solid', 'colors.brand.solid', 'color.brand.solid'],
  ['Brand contrast', 'colors.brand.contrast', 'color.brand.contrast'],
  ['Brand fg', 'colors.brand.fg', 'color.brand.text'],
  ['Brand muted', 'colors.brand.muted', 'color.brand.soft'],
  ['Brand subtle', 'colors.brand.subtle', 'color.brand.soft'],
  ['Brand emphasized', 'colors.brand.emphasized', 'color.brand.hard'],
  ['Brand border', 'colors.brand.border', 'color.brand.border'],
  ['Brand focus ring', 'colors.brand.focusRing', 'color.brand.border'],
  ['Accent solid', 'colors.accent.solid', 'color.accent.solid'],
  ['Accent contrast', 'colors.accent.contrast', 'color.accent.contrast'],
  ['Accent fg', 'colors.accent.fg', 'color.accent.text'],
  ['Accent muted', 'colors.accent.muted', 'color.accent.soft'],
  ['Accent subtle', 'colors.accent.subtle', 'color.accent.soft'],
  ['Accent emphasized', 'colors.accent.emphasized', 'color.accent.hard'],
  ['Accent border', 'colors.accent.border', 'color.accent.border'],
  ['Accent focus ring', 'colors.accent.focusRing', 'color.accent.border'],
  ['Success solid', 'colors.success.solid', 'color.success.solid'],
  ['Success contrast', 'colors.success.contrast', 'color.success.contrast'],
  ['Success fg', 'colors.success.fg', 'color.success.text'],
  ['Success muted', 'colors.success.muted', 'color.success.soft'],
  ['Success subtle', 'colors.success.subtle', 'color.success.soft'],
  ['Success emphasized', 'colors.success.emphasized', 'color.success.hard'],
  ['Success border', 'colors.success.border', 'color.success.border'],
  ['Success focus ring', 'colors.success.focusRing', 'color.success.border'],
  ['Warning solid', 'colors.warning.solid', 'color.warning.solid'],
  ['Warning contrast', 'colors.warning.contrast', 'color.warning.contrast'],
  ['Warning fg', 'colors.warning.fg', 'color.warning.text'],
  ['Warning muted', 'colors.warning.muted', 'color.warning.soft'],
  ['Warning subtle', 'colors.warning.subtle', 'color.warning.soft'],
  ['Warning emphasized', 'colors.warning.emphasized', 'color.warning.hard'],
  ['Warning border', 'colors.warning.border', 'color.warning.border'],
  ['Warning focus ring', 'colors.warning.focusRing', 'color.warning.border'],
  ['Danger solid', 'colors.danger.solid', 'color.danger.solid'],
  ['Danger contrast', 'colors.danger.contrast', 'color.danger.contrast'],
  ['Danger fg', 'colors.danger.fg', 'color.danger.text'],
  ['Danger muted', 'colors.danger.muted', 'color.danger.soft'],
  ['Danger subtle', 'colors.danger.subtle', 'color.danger.soft'],
  ['Danger emphasized', 'colors.danger.emphasized', 'color.danger.hard'],
  ['Danger border', 'colors.danger.border', 'color.danger.border'],
  ['Danger focus ring', 'colors.danger.focusRing', 'color.danger.border'],
  ['Info solid', 'colors.info.solid', 'color.info.solid'],
  ['Info contrast', 'colors.info.contrast', 'color.info.contrast'],
  ['Info fg', 'colors.info.fg', 'color.info.text'],
  ['Info muted', 'colors.info.muted', 'color.info.soft'],
  ['Info subtle', 'colors.info.subtle', 'color.info.soft'],
  ['Info emphasized', 'colors.info.emphasized', 'color.info.hard'],
  ['Info border', 'colors.info.border', 'color.info.border'],
  ['Info focus ring', 'colors.info.focusRing', 'color.info.border'],
  ['Background', 'colors.bg', 'color.surface.canvas'],
  ['Background panel', 'colors.bg.panel', 'color.surface.panel'],
  ['Background elevated', 'colors.bg.elevated', 'color.surface.elevated'],
  ['Foreground', 'colors.fg', 'color.text.primary'],
  ['Foreground muted', 'colors.fg.muted', 'color.text.muted'],
  ['Foreground subtle', 'colors.fg.subtle', 'color.text.secondary'],
  ['Foreground inverted', 'colors.fg.inverted', 'color.text.inverse'],
  ['Border', 'colors.border', 'color.border.default'],
  ['Border subtle', 'colors.border.subtle', 'color.border.subtle'],
  ['Border emphasized', 'colors.border.emphasized', 'color.border.strong'],
] as const;

export const chakraTypographyRoles = [
  ['Display', 'display', 'Personal Tool UI'],
  ['Title', 'title', 'Design tokens that travel across frameworks'],
  ['Heading', 'heading', 'Controls composed from token roles'],
  ['Subheading', 'subheading', 'Framework adapters'],
  ['Body', 'body', 'Interface text stays direct, compact, and readable.'],
  ['Body small', 'bodySmall', 'Secondary interface text for dense surfaces.'],
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

  if (namespace === 'colors' && role) return `${namespace}.${role}`;

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

  const segments = path.split('.');
  let tokenNode: unknown = namespaceValue;

  for (let index = 0; index < segments.length; index += 1) {
    if (!isRecord(tokenNode)) {
      tokenNode = undefined;
      break;
    }

    const segment = segments[index];
    const remainder = segments.slice(index).join('.');

    if (remainder in tokenNode) {
      tokenNode = tokenNode[remainder];
      break;
    }

    tokenNode = tokenNode[segment];
  }

  if (!isRecord(tokenNode) || !('value' in tokenNode)) {
    if (isRecord(tokenNode) && isRecord(tokenNode.DEFAULT) && 'value' in tokenNode.DEFAULT) {
      tokenNode = tokenNode.DEFAULT;
    }
  }

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
