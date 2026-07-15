import defaultDark from '../../tokens/theme/default.dark/color.tokens.json';
import semanticColors from '../../tokens/semantic/color.tokens.json';
import sunDark from '../../tokens/theme/sun.dark/color.tokens.json';
import sunLight from '../../tokens/theme/sun.light/color.tokens.json';

import type { DesignThemeName } from './previewModel';

type TokenTree = Record<string, unknown>;

const themeColors: Record<DesignThemeName, TokenTree | undefined> = {
  'default.light': undefined,
  'default.dark': defaultDark.color,
  'sun.light': sunLight.color,
  'sun.dark': sunDark.color,
};

const findToken = (tree: TokenTree | undefined, path: string): unknown =>
  path.split('.').reduce<unknown>((value, part) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
    return (value as TokenTree)[part];
  }, tree);

const tokenReference = (token: unknown): string | undefined => {
  if (!token || typeof token !== 'object' || Array.isArray(token)) return undefined;
  const value = (token as TokenTree).$value;
  return typeof value === 'string' ? value.replace(/^\{(.+)\}$/, '$1') : undefined;
};

export const displayTokenPath = (path: string): string => path.replace(/^color\./, '');

export const semanticColorSource = (theme: DesignThemeName, token: string): string => {
  const path = token.replace(/^color\./, '');
  const source =
    tokenReference(findToken(themeColors[theme], path)) ??
    tokenReference(findToken(semanticColors.color, path));

  return source ? displayTokenPath(source) : displayTokenPath(path);
};
