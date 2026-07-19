import type { RcStyleResolver } from './style-properties';

const spaceAliases: Record<string, string> = {
  none: '0',
  xs: '1',
  sm: '2',
  md: '3',
  lg: '4',
  xl: '6',
  '2xl': '8',
};

const spaceTokens = new Set([
  '0',
  '0.5',
  '1',
  '1.5',
  '2',
  '2.5',
  '3',
  '3.5',
  '4',
  '4.5',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '14',
  '16',
  '20',
  '24',
  '28',
  '32',
  '40',
  '48',
  '56',
  '64',
  'px',
]);

const surfaceAliases: Record<string, string> = {
  canvas: 'var(--rc-color-surface-canvas)',
  'surface-canvas': 'var(--rc-color-surface-canvas)',
  panel: 'var(--rc-color-surface-panel)',
  'surface-panel': 'var(--rc-color-surface-panel)',
  elevated: 'var(--rc-color-surface-elevated)',
  'surface-elevated': 'var(--rc-color-surface-elevated)',
  inverse: 'var(--rc-color-surface-inverse)',
  'surface-inverse': 'var(--rc-color-surface-inverse)',
  transparent: 'transparent',
};

const textColorAliases: Record<string, string> = {
  primary: 'var(--rc-color-text-primary)',
  'text-primary': 'var(--rc-color-text-primary)',
  secondary: 'var(--rc-color-text-secondary)',
  'text-secondary': 'var(--rc-color-text-secondary)',
  muted: 'var(--rc-color-text-muted)',
  'text-muted': 'var(--rc-color-text-muted)',
  inverse: 'var(--rc-color-text-inverse)',
  'text-inverse': 'var(--rc-color-text-inverse)',
  inherit: 'inherit',
};

const borderColorAliases: Record<string, string> = {
  subtle: 'var(--rc-color-border-subtle)',
  'border-subtle': 'var(--rc-color-border-subtle)',
  default: 'var(--rc-color-border-default)',
  'border-default': 'var(--rc-color-border-default)',
  strong: 'var(--rc-color-border-strong)',
  'border-strong': 'var(--rc-color-border-strong)',
  focus: 'var(--rc-color-border-focus)',
  'border-focus': 'var(--rc-color-border-focus)',
};

const borderWidthAliases = new Set(['none', 'xs', 'sm', 'md', 'lg']);
const radiusAliases = new Set(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']);
const typographyAliases = new Set([
  'display',
  'title',
  'heading',
  'subheading',
  'body',
  'body-small',
  'label',
  'caption',
  'code',
]);
const fontWeightAliases = new Set(['regular', 'medium', 'semibold', 'bold']);

function tokenName(value: string) {
  return value.replace('.', '-');
}

function resolveSpaceToken(value: string) {
  const alias = spaceAliases[value] ?? value;
  return spaceTokens.has(alias) ? `var(--rc-space-${tokenName(alias)})` : value;
}

function resolveSpace(value: string) {
  if (value.includes('(')) return value;
  return value.split(/\s+/).map(resolveSpaceToken).join(' ');
}

function resolveSize(value: string) {
  return value === 'full' ? '100%' : resolveSpaceToken(value);
}

function resolveJustify(value: string) {
  const aliases: Record<string, string> = {
    start: 'flex-start',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  };
  return aliases[value] ?? value;
}

export function resolveRcStyleValue(resolver: RcStyleResolver, value: string): string {
  const normalized = value.trim();
  if (!normalized) return '';

  switch (resolver) {
    case 'space':
      return resolveSpace(normalized);
    case 'size':
      return resolveSize(normalized);
    case 'surface':
      return surfaceAliases[normalized] ?? normalized;
    case 'text-color':
      return textColorAliases[normalized] ?? normalized;
    case 'justify':
      return resolveJustify(normalized);
    case 'border':
      return borderWidthAliases.has(normalized)
        ? `var(--rc-border-${normalized}) solid var(--rc-color-border-default)`
        : normalized;
    case 'border-width':
      return borderWidthAliases.has(normalized) ? `var(--rc-border-${normalized})` : normalized;
    case 'border-color':
      return borderColorAliases[normalized] ?? normalized;
    case 'radius':
      return radiusAliases.has(normalized) ? `var(--rc-radius-${normalized})` : normalized;
    case 'font-size':
      return typographyAliases.has(normalized)
        ? `var(--rc-typography-${normalized}-font-size)`
        : normalized;
    case 'font-weight':
      return fontWeightAliases.has(normalized)
        ? `var(--rc-typography-weight-${normalized})`
        : normalized;
    case 'line-height':
      return typographyAliases.has(normalized)
        ? `var(--rc-typography-${normalized}-line-height)`
        : normalized;
    default:
      return normalized;
  }
}
