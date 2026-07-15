import { formatColor, formatCssValue, formatDimension, formatShadow } from './format.ts';
import type {
  ColorValue,
  DimensionValue,
  FlatTokenTheme,
  ShadowValue,
  TokenType,
  TokenValue,
  TypographyValue,
} from './types.ts';

export const tokenValue = (tokens: FlatTokenTheme, name: string): TokenValue => {
  const token = tokens[name];
  if (!token) throw new Error(`Missing token "${name}"`);

  return token.$value;
};

export const tokenType = (tokens: FlatTokenTheme, name: string): TokenType => {
  const token = tokens[name];
  if (!token) throw new Error(`Missing token "${name}"`);

  return token.$type;
};

export const tokenCssValue = (tokens: FlatTokenTheme, name: string): string =>
  formatCssValue(tokenValue(tokens, name), tokenType(tokens, name));

export const colorToken = (tokens: FlatTokenTheme, name: string): string =>
  formatColor(tokenValue(tokens, name) as ColorValue);

export const dimensionToken = (tokens: FlatTokenTheme, name: string): DimensionValue =>
  tokenValue(tokens, name) as unknown as DimensionValue;

export const dimensionCssToken = (tokens: FlatTokenTheme, name: string): string =>
  formatDimension(dimensionToken(tokens, name));

export const dimensionNumberToken = (tokens: FlatTokenTheme, name: string): number =>
  dimensionToken(tokens, name).value;

export const numberToken = (tokens: FlatTokenTheme, name: string): number =>
  Number(tokenValue(tokens, name));

export const shadowToken = (tokens: FlatTokenTheme, name: string): string =>
  formatShadow(tokenValue(tokens, name) as unknown as ShadowValue);

export const typographyToken = (tokens: FlatTokenTheme, name: string): TypographyValue =>
  tokenValue(tokens, name) as TypographyValue;

export const typographyCss = (
  tokens: FlatTokenTheme,
  name: string,
): Record<string, string | number> => {
  const typography = typographyToken(tokens, name);

  return {
    fontFamily: formatCssValue(typography.fontFamily, 'fontFamily'),
    fontSize: formatCssValue(typography.fontSize, 'dimension'),
    fontWeight: formatCssValue(typography.fontWeight, 'fontWeight'),
    lineHeight: formatCssValue(typography.lineHeight, 'number'),
    letterSpacing: formatCssValue(typography.letterSpacing, 'dimension'),
  };
};
