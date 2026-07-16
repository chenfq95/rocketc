import type { CSSProperties } from 'react';

export type PreviewTab = 'primitive' | 'plain-html' | 'mui' | 'chakra';
export type ThemeFamily = 'default' | 'sun';
export type ThemeMode = 'light' | 'dark';
export type DesignThemeName = `${ThemeFamily}.${ThemeMode}`;

export const tabs: Array<{ label: string; value: PreviewTab }> = [
  { label: 'Primitive', value: 'primitive' },
  { label: 'Plain HTML', value: 'plain-html' },
  { label: 'MUI', value: 'mui' },
  { label: 'Chakra', value: 'chakra' },
];

export const colorRoles = [
  ['Brand soft', 'brand.soft', 'var(--rds-color-brand-soft)', 'color.orange.50 / color.orange.950'],
  [
    'Brand soft hover',
    'brand.softHover',
    'var(--rds-color-brand-soft-hover)',
    'color.orange.100 / color.orange.900',
  ],
  [
    'Brand soft active',
    'brand.softActive',
    'var(--rds-color-brand-soft-active)',
    'color.orange.200 / color.orange.800',
  ],
  [
    'Brand border',
    'brand.border',
    'var(--rds-color-brand-border)',
    'color.orange.300 / color.orange.600',
  ],
  [
    'Brand focus ring',
    'brand.focusRing',
    'var(--rds-color-brand-focus-ring)',
    'color.brand.border',
  ],
  [
    'Brand foreground',
    'brand.fg',
    'var(--rds-color-brand-fg)',
    'color.orange.700 / color.orange.300',
  ],
  ['Brand solid', 'brand.solid', 'var(--rds-color-brand-solid)', 'color.orange.500'],
  [
    'Brand solid hover',
    'brand.solidHover',
    'var(--rds-color-brand-solid-hover)',
    'color.orange.600',
  ],
  [
    'Brand solid active',
    'brand.solidActive',
    'var(--rds-color-brand-solid-active)',
    'color.orange.700',
  ],
  ['Brand contrast', 'brand.contrast', 'var(--rds-color-brand-contrast)', 'color.white'],
  [
    'Success soft',
    'success.soft',
    'var(--rds-color-success-soft)',
    'color.green.50 / color.green.950',
  ],
  [
    'Success soft hover',
    'success.softHover',
    'var(--rds-color-success-soft-hover)',
    'color.green.100 / color.green.900',
  ],
  [
    'Success soft active',
    'success.softActive',
    'var(--rds-color-success-soft-active)',
    'color.green.200 / color.green.800',
  ],
  [
    'Success border',
    'success.border',
    'var(--rds-color-success-border)',
    'color.green.300 / color.green.700',
  ],
  [
    'Success focus ring',
    'success.focusRing',
    'var(--rds-color-success-focus-ring)',
    'color.success.border',
  ],
  [
    'Success foreground',
    'success.fg',
    'var(--rds-color-success-fg)',
    'color.green.700 / color.green.300',
  ],
  ['Success solid', 'success.solid', 'var(--rds-color-success-solid)', 'color.green.500'],
  [
    'Success solid hover',
    'success.solidHover',
    'var(--rds-color-success-solid-hover)',
    'color.green.600 / color.green.400',
  ],
  [
    'Success solid active',
    'success.solidActive',
    'var(--rds-color-success-solid-active)',
    'color.green.700 / color.green.300',
  ],
  ['Success contrast', 'success.contrast', 'var(--rds-color-success-contrast)', 'color.white'],
  [
    'Warning soft',
    'warning.soft',
    'var(--rds-color-warning-soft)',
    'color.amber.50 / color.amber.950',
  ],
  [
    'Warning soft hover',
    'warning.softHover',
    'var(--rds-color-warning-soft-hover)',
    'color.amber.100 / color.amber.900',
  ],
  [
    'Warning soft active',
    'warning.softActive',
    'var(--rds-color-warning-soft-active)',
    'color.amber.200 / color.amber.800',
  ],
  [
    'Warning border',
    'warning.border',
    'var(--rds-color-warning-border)',
    'color.amber.300 / color.amber.700',
  ],
  [
    'Warning focus ring',
    'warning.focusRing',
    'var(--rds-color-warning-focus-ring)',
    'color.warning.border',
  ],
  [
    'Warning foreground',
    'warning.fg',
    'var(--rds-color-warning-fg)',
    'color.amber.700 / color.amber.300',
  ],
  ['Warning solid', 'warning.solid', 'var(--rds-color-warning-solid)', 'color.amber.500'],
  [
    'Warning solid hover',
    'warning.solidHover',
    'var(--rds-color-warning-solid-hover)',
    'color.amber.600 / color.amber.400',
  ],
  [
    'Warning solid active',
    'warning.solidActive',
    'var(--rds-color-warning-solid-active)',
    'color.amber.700 / color.amber.300',
  ],
  ['Warning contrast', 'warning.contrast', 'var(--rds-color-warning-contrast)', 'color.white'],
  ['Info soft', 'info.soft', 'var(--rds-color-info-soft)', 'color.neutral.100 / color.neutral.800'],
  [
    'Info soft hover',
    'info.softHover',
    'var(--rds-color-info-soft-hover)',
    'color.neutral.200 / color.neutral.700',
  ],
  [
    'Info soft active',
    'info.softActive',
    'var(--rds-color-info-soft-active)',
    'color.neutral.300 / color.neutral.600',
  ],
  [
    'Info border',
    'info.border',
    'var(--rds-color-info-border)',
    'color.neutral.300 / color.neutral.700',
  ],
  ['Info focus ring', 'info.focusRing', 'var(--rds-color-info-focus-ring)', 'color.info.border'],
  [
    'Info foreground',
    'info.fg',
    'var(--rds-color-info-fg)',
    'color.neutral.700 / color.neutral.300',
  ],
  [
    'Info solid',
    'info.solid',
    'var(--rds-color-info-solid)',
    'color.neutral.200 / color.neutral.700',
  ],
  [
    'Info solid hover',
    'info.solidHover',
    'var(--rds-color-info-solid-hover)',
    'color.neutral.300 / color.neutral.600',
  ],
  [
    'Info solid active',
    'info.solidActive',
    'var(--rds-color-info-solid-active)',
    'color.neutral.400 / color.neutral.500',
  ],
  [
    'Info contrast',
    'info.contrast',
    'var(--rds-color-info-contrast)',
    'color.neutral.900 / color.neutral.50',
  ],
  ['Danger soft', 'danger.soft', 'var(--rds-color-danger-soft)', 'color.red.50 / color.red.950'],
  [
    'Danger soft hover',
    'danger.softHover',
    'var(--rds-color-danger-soft-hover)',
    'color.red.100 / color.red.900',
  ],
  [
    'Danger soft active',
    'danger.softActive',
    'var(--rds-color-danger-soft-active)',
    'color.red.200 / color.red.800',
  ],
  [
    'Danger border',
    'danger.border',
    'var(--rds-color-danger-border)',
    'color.red.300 / color.red.700',
  ],
  [
    'Danger focus ring',
    'danger.focusRing',
    'var(--rds-color-danger-focus-ring)',
    'color.danger.border',
  ],
  ['Danger foreground', 'danger.fg', 'var(--rds-color-danger-fg)', 'color.red.700 / color.red.300'],
  ['Danger solid', 'danger.solid', 'var(--rds-color-danger-solid)', 'color.red.500'],
  [
    'Danger solid hover',
    'danger.solidHover',
    'var(--rds-color-danger-solid-hover)',
    'color.red.600 / color.red.400',
  ],
  [
    'Danger solid active',
    'danger.solidActive',
    'var(--rds-color-danger-solid-active)',
    'color.red.700 / color.red.300',
  ],
  ['Danger contrast', 'danger.contrast', 'var(--rds-color-danger-contrast)', 'color.white'],
  [
    'Action fg',
    'action.fg',
    'var(--rds-color-action-fg)',
    'color.text.primary / color.text.secondary',
  ],
  [
    'Action fg disabled',
    'action.fgDisabled',
    'var(--rds-color-action-fg-disabled)',
    'color.text.muted',
  ],
  [
    'Action bg hover',
    'action.bgHover',
    'var(--rds-color-action-bg-hover)',
    'color.neutral.100 / color.neutral.800',
  ],
  [
    'Action bg active',
    'action.bgActive',
    'var(--rds-color-action-bg-active)',
    'color.neutral.200 / color.neutral.700',
  ],
  [
    'Action bg selected',
    'action.bgSelected',
    'var(--rds-color-action-bg-selected)',
    'color.neutral.200 / brand.soft',
  ],
  [
    'Action bg disabled',
    'action.bgDisabled',
    'var(--rds-color-action-bg-disabled)',
    'color.neutral.100 / color.neutral.800',
  ],
  [
    'Action bg focus',
    'action.bgFocus',
    'var(--rds-color-action-bg-focus)',
    'color.neutral.100 / color.neutral.800',
  ],
  ['Primary bg', 'control.primary.bg', 'var(--rds-color-control-primary-bg)', 'color.brand.solid'],
  [
    'Primary hover',
    'control.primary.bgHover',
    'var(--rds-color-control-primary-bg-hover)',
    'color.brand.solidHover',
  ],
  [
    'Primary active',
    'control.primary.bgActive',
    'var(--rds-color-control-primary-bg-active)',
    'color.neutral.700 / color.orange.700',
  ],
  ['Primary fg', 'control.primary.fg', 'var(--rds-color-control-primary-fg)', 'color.brand.fg'],
  [
    'Primary fg contrast',
    'control.primary.fgContrast',
    'var(--rds-color-control-primary-fg-contrast)',
    'color.brand.contrast',
  ],
  [
    'Primary border',
    'control.primary.border',
    'var(--rds-color-control-primary-border)',
    'color.brand.solid',
  ],
  [
    'Primary border hover',
    'control.primary.borderHover',
    'var(--rds-color-control-primary-border-hover)',
    'color.brand.solidHover',
  ],
  [
    'Secondary bg',
    'control.secondary.bg',
    'var(--rds-color-control-secondary-bg)',
    'color.surface.panel',
  ],
  [
    'Secondary hover',
    'control.secondary.bgHover',
    'var(--rds-color-control-secondary-bg-hover)',
    'color.action.bgHover',
  ],
  [
    'Secondary active',
    'control.secondary.bgActive',
    'var(--rds-color-control-secondary-bg-active)',
    'color.action.bgActive',
  ],
  [
    'Secondary fg',
    'control.secondary.fg',
    'var(--rds-color-control-secondary-fg)',
    'color.text.primary',
  ],
  [
    'Secondary fg contrast',
    'control.secondary.fgContrast',
    'var(--rds-color-control-secondary-fg-contrast)',
    'color.text.primary',
  ],
  [
    'Secondary border',
    'control.secondary.border',
    'var(--rds-color-control-secondary-border)',
    'color.border.default',
  ],
  [
    'Secondary border hover',
    'control.secondary.borderHover',
    'var(--rds-color-control-secondary-border-hover)',
    'color.border.strong',
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
  ['Primary light', 'primary.light', 'color.control.primary.bgHover'],
  ['Primary main', 'primary.main', 'color.control.primary.bg'],
  ['Primary dark', 'primary.dark', 'color.control.primary.bgActive'],
  ['Secondary light', 'secondary.light', 'color.control.secondary.bgHover'],
  ['Secondary main', 'secondary.main', 'color.control.secondary.bg'],
  ['Secondary dark', 'secondary.dark', 'color.control.secondary.bgActive'],
  ['Success light', 'success.light', 'color.success.soft'],
  ['Success main', 'success.main', 'color.success.solid'],
  ['Success dark', 'success.dark', 'color.success.solidHover'],
  ['Warning light', 'warning.light', 'color.warning.soft'],
  ['Warning main', 'warning.main', 'color.warning.solid'],
  ['Warning dark', 'warning.dark', 'color.warning.solidHover'],
  ['Error light', 'error.light', 'color.danger.soft'],
  ['Error main', 'error.main', 'color.danger.solid'],
  ['Error dark', 'error.dark', 'color.danger.solidHover'],
  ['Info light', 'info.light', 'color.info.soft'],
  ['Info main', 'info.main', 'color.info.solid'],
  ['Info dark', 'info.dark', 'color.info.solidHover'],
  ['Background default', 'background.default', 'color.surface.canvas'],
  ['Background paper', 'background.paper', 'color.surface.panel'],
  ['Text primary', 'text.primary', 'color.text.primary'],
  ['Text secondary', 'text.secondary', 'color.text.secondary'],
  ['Text disabled', 'text.disabled', 'color.text.muted'],
  ['Divider', 'divider', 'color.border.subtle'],
  ['Action active', 'action.active', 'color.action.fg'],
  ['Action hover', 'action.hover', 'color.action.bgHover'],
  ['Action selected', 'action.selected', 'color.action.bgSelected'],
  ['Action disabled', 'action.disabled', 'color.action.fgDisabled'],
  ['Action disabled bg', 'action.disabledBackground', 'color.action.bgDisabled'],
  ['Action focus', 'action.focus', 'color.action.bgFocus'],
] as const;

const chakraPaletteSlotRows = (
  label: string,
  palette: string,
  source: Record<
    'solid' | 'contrast' | 'fg' | 'muted' | 'subtle' | 'emphasized' | 'border' | 'focusRing',
    string
  >,
): Array<[string, string, string]> =>
  (
    [
      ['solid', 'solid'],
      ['contrast', 'contrast'],
      ['fg', 'fg'],
      ['muted', 'muted'],
      ['subtle', 'subtle'],
      ['emphasized', 'emphasized'],
      ['border', 'border'],
      ['focus ring', 'focusRing'],
    ] as const
  ).map(([slotLabel, slot]) => [
    `${label} ${slotLabel}`,
    `colors.${palette}.${slot}`,
    source[slot],
  ]);

/** Chakra preview swatches for chrome + control/status palettes (not hue aliases / teal|purple scales). */
export const chakraColorRoles = [
  // Chrome
  ['Background', 'colors.bg', 'color.surface.canvas'],
  ['Background panel', 'colors.bg.panel', 'color.surface.panel'],
  ['Background elevated', 'colors.bg.elevated', 'color.surface.elevated'],
  ['Background subtle', 'colors.bg.subtle', 'color.surface.canvas'],
  ['Background muted', 'colors.bg.muted', 'color.action.bgHover'],
  ['Background emphasized', 'colors.bg.emphasized', 'color.action.bgActive'],
  ['Background inverted', 'colors.bg.inverted', 'color.surface.inverse'],
  ['Background error', 'colors.bg.error', 'color.danger.soft'],
  ['Background warning', 'colors.bg.warning', 'color.warning.soft'],
  ['Background success', 'colors.bg.success', 'color.success.soft'],
  ['Background info', 'colors.bg.info', 'color.info.soft'],
  ['Foreground', 'colors.fg', 'color.text.primary'],
  ['Foreground muted', 'colors.fg.muted', 'color.text.muted'],
  ['Foreground subtle', 'colors.fg.subtle', 'color.text.secondary'],
  ['Foreground inverted', 'colors.fg.inverted', 'color.text.inverse'],
  ['Foreground error', 'colors.fg.error', 'color.danger.fg'],
  ['Foreground warning', 'colors.fg.warning', 'color.warning.fg'],
  ['Foreground success', 'colors.fg.success', 'color.success.fg'],
  ['Foreground info', 'colors.fg.info', 'color.info.fg'],
  ['Border', 'colors.border', 'color.border.default'],
  ['Border muted', 'colors.border.muted', 'color.border.subtle'],
  ['Border subtle', 'colors.border.subtle', 'color.border.subtle'],
  ['Border emphasized', 'colors.border.emphasized', 'color.border.strong'],
  ['Border inverted', 'colors.border.inverted', 'color.border.strong'],
  ['Border focus', 'colors.border.focus', 'color.border.focus'],
  ['Border error', 'colors.border.error', 'color.danger.border'],
  ['Border warning', 'colors.border.warning', 'color.warning.border'],
  ['Border success', 'colors.border.success', 'color.success.border'],
  ['Border info', 'colors.border.info', 'color.info.border'],
  // Controls
  ...chakraPaletteSlotRows('Primary', 'primary', {
    solid: 'color.control.primary.bg',
    contrast: 'color.control.primary.fgContrast',
    fg: 'color.control.primary.fg',
    muted: 'color.brand.softHover',
    subtle: 'color.brand.soft',
    emphasized: 'color.brand.softActive',
    border: 'color.brand.border',
    focusRing: 'color.border.focus',
  }),
  ...chakraPaletteSlotRows('Secondary', 'secondary', {
    solid: 'color.control.secondary.bg',
    contrast: 'color.control.secondary.fgContrast',
    fg: 'color.control.secondary.fg',
    muted: 'color.control.secondary.bgActive',
    subtle: 'color.control.secondary.bgHover',
    emphasized: 'color.control.secondary.bgActive',
    border: 'color.control.secondary.border',
    focusRing: 'color.border.focus',
  }),
  ...chakraPaletteSlotRows('Gray', 'gray', {
    solid: 'color.neutral.800 / color.neutral.200',
    contrast: 'color.neutral.0 / color.neutral.950',
    fg: 'color.neutral.700 / color.neutral.300',
    muted: 'color.neutral.100 / color.neutral.800',
    subtle: 'color.neutral.50 / color.neutral.900',
    emphasized: 'color.neutral.200 / color.neutral.700',
    border: 'color.neutral.300 / color.neutral.700',
    focusRing: 'color.neutral.500 / color.neutral.400',
  }),
  // Identity / status
  ...chakraPaletteSlotRows('Brand', 'brand', {
    solid: 'color.brand.solid',
    contrast: 'color.brand.contrast',
    fg: 'color.brand.fg',
    muted: 'color.brand.softHover',
    subtle: 'color.brand.soft',
    emphasized: 'color.brand.softActive',
    border: 'color.brand.border',
    focusRing: 'color.brand.focusRing',
  }),
  ...chakraPaletteSlotRows('Success', 'success', {
    solid: 'color.success.solid',
    contrast: 'color.success.contrast',
    fg: 'color.success.fg',
    muted: 'color.success.softHover',
    subtle: 'color.success.soft',
    emphasized: 'color.success.softActive',
    border: 'color.success.border',
    focusRing: 'color.success.focusRing',
  }),
  ...chakraPaletteSlotRows('Warning', 'warning', {
    solid: 'color.warning.solid',
    contrast: 'color.warning.contrast',
    fg: 'color.warning.fg',
    muted: 'color.warning.softHover',
    subtle: 'color.warning.soft',
    emphasized: 'color.warning.softActive',
    border: 'color.warning.border',
    focusRing: 'color.warning.focusRing',
  }),
  ...chakraPaletteSlotRows('Danger', 'danger', {
    solid: 'color.danger.solid',
    contrast: 'color.danger.contrast',
    fg: 'color.danger.fg',
    muted: 'color.danger.softHover',
    subtle: 'color.danger.soft',
    emphasized: 'color.danger.softActive',
    border: 'color.danger.border',
    focusRing: 'color.danger.focusRing',
  }),
  ...chakraPaletteSlotRows('Info', 'info', {
    solid: 'color.info.solid',
    contrast: 'color.info.contrast',
    fg: 'color.info.fg',
    muted: 'color.info.softHover',
    subtle: 'color.info.soft',
    emphasized: 'color.info.softActive',
    border: 'color.info.border',
    focusRing: 'color.info.focusRing',
  }),
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

  if ((namespace === 'colors' || namespace === 'control') && role) {
    return `${namespace}.${role}`;
  }

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
