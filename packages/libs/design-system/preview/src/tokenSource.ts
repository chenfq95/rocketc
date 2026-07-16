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

const themeMode = (theme: DesignThemeName): 'light' | 'dark' =>
  theme.endsWith('.dark') ? 'dark' : 'light';

export const displayTokenPath = (path: string): string => path.replace(/^color\./, '');

/** Expand dark-side shorthand like `.200` using the light-side path family. */
const expandSourceShorthand = (side: string, lightSide: string): string => {
  const trimmed = side.trim();
  if (!trimmed.startsWith('.')) return trimmed;
  const base = lightSide.trim().replace(/\.[^.]+$/, '');
  return `${base}${trimmed}`;
};

/** Pick the mode-specific side from legacy `light / dark` source notes. */
const pickModeSource = (theme: DesignThemeName, source: string): string => {
  if (!source.includes(' / ')) return source.trim();

  const [lightSide = source, darkSide = source] = source.split(' / ');
  const picked =
    themeMode(theme) === 'dark' ? expandSourceShorthand(darkSide, lightSide) : lightSide.trim();

  // Drop annotations like "+ shadow.raised"
  return picked.split(/\s+\+/)[0]?.trim() ?? picked;
};

/**
 * Resolve one hop to the token reference for the active theme.
 * Shows alias targets (e.g. `brand.solid`), not deeply resolved primitives.
 */
export const semanticColorSource = (theme: DesignThemeName, token: string): string => {
  const path = pickModeSource(theme, token).replace(/^color\./, '');
  const source =
    tokenReference(findToken(themeColors[theme], path)) ??
    tokenReference(findToken(semanticColors.color, path));

  return source ? displayTokenPath(source) : displayTokenPath(path);
};

/** Display mapping under swatches: theme-aware reference, never `light / dark`. */
export const displayColorSource = (theme: DesignThemeName, source: string): string =>
  semanticColorSource(theme, source);
