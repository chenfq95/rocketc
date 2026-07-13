import { GENERIC_FONT_FAMILIES } from './constants.ts';
import type { ColorValue, DimensionValue, ShadowValue, TokenType, TokenValue } from './types.ts';

export const formatDimension = ({ value, unit }: DimensionValue): string =>
  value === 0 ? '0' : `${value}${unit}`;

export const formatColor = (color: ColorValue): string => {
  if (typeof color === 'string') return color;

  const { components, alpha = 1 } = color;
  const [r, g, b] = components.map((component) => Math.round(component * 255));

  return alpha === 1 ? `rgb(${r} ${g} ${b})` : `rgb(${r} ${g} ${b} / ${alpha})`;
};

export const formatFontFamily = (families: string | string[]): string => {
  if (typeof families === 'string') return families;

  return families
    .map((family) =>
      GENERIC_FONT_FAMILIES.has(family) ? family : `'${family.replaceAll("'", "\\'")}'`,
    )
    .join(', ');
};

export const formatShadow = ({ color, offsetX, offsetY, blur, spread }: ShadowValue): string =>
  `${[offsetX, offsetY, blur, spread].map(formatDimension).join(' ')} ${formatColor(color)}`;

export const formatCssValue = (value: TokenValue, type: TokenType): string => {
  switch (type) {
    case 'color':
      return formatColor(value as ColorValue);
    case 'dimension':
    case 'duration':
      return formatDimension(value as unknown as DimensionValue);
    case 'cubicBezier':
      return `cubic-bezier(${(value as number[]).join(', ')})`;
    case 'fontFamily':
      return formatFontFamily(value as string | string[]);
    case 'fontWeight':
    case 'number':
      return String(value);
    case 'shadow':
      return formatShadow(value as unknown as ShadowValue);
    default:
      return typeof value === 'string' ? value : JSON.stringify(value);
  }
};
