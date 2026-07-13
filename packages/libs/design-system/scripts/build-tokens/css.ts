import { HEADER, themeSelector, TYPOGRAPHY_PART_TYPES } from './constants.ts';
import { formatCssValue } from './format.ts';
import { cssVarName, tokenParts } from './names.ts';
import { resolveTokenValue } from './resolve.ts';
import type { DictionaryToken, ThemeName, TokenTree, TypographyValue } from './types.ts';

const typographyCssVars = (parts: string[], value: TypographyValue): string[] =>
  Object.entries(value).map(([part, partValue]) => {
    const partType = TYPOGRAPHY_PART_TYPES[part as keyof TypographyValue];
    return `  ${cssVarName([...parts, part])}: ${formatCssValue(partValue, partType)};`;
  });

const tokenCssVars = (tokens: TokenTree, token: DictionaryToken): string[] => {
  const parts = tokenParts(token);
  const value = resolveTokenValue(token.$value, tokens);

  if (token.$type === 'typography') {
    return typographyCssVars(parts, value as TypographyValue);
  }

  return [`  ${cssVarName(parts)}: ${formatCssValue(value, token.$type)};`];
};

export const buildCss = (
  theme: ThemeName,
  tokens: TokenTree,
  allTokens: DictionaryToken[],
): string =>
  [
    HEADER,
    `${themeSelector[theme]} {`,
    ...allTokens.flatMap((token) => tokenCssVars(tokens, token)),
    '}',
    '',
  ].join('\n');
