import { HEADER, themeSelector, TYPOGRAPHY_PART_TYPES } from './constants.ts';
import { formatCssValue } from './format.ts';
import { cssVarName, tokenParts } from './names.ts';
import { NORMALIZE_CSS } from './normalize.ts';
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

const GLOBAL_CSS = [
  'body {',
  '  background: var(--rds-color-surface-canvas);',
  '  color: var(--rds-color-text-primary);',
  '  font-family: var(--rds-typography-family-sans);',
  '}',
  '',
  '*::selection {',
  '  background: var(--rds-color-brand-soft);',
  '  color: var(--rds-color-brand-text);',
  '}',
  '',
  ':focus-visible:not(:where(input, textarea, select, button, [role="button"], [role="checkbox"], [role="combobox"], [role="radio"], [role="slider"], [role="switch"], [role="textbox"], [contenteditable="true"])) {',
  '  outline-color: var(--rds-color-border-focus);',
  '  outline-offset: var(--rds-space-1);',
  '}',
  '',
  '::placeholder {',
  '  color: var(--rds-color-text-muted);',
  '  opacity: var(--rds-opacity-muted);',
  '}',
].join('\n');

export const buildCss = (
  theme: ThemeName,
  tokens: TokenTree,
  allTokens: DictionaryToken[],
): string =>
  [
    HEADER,
    NORMALIZE_CSS,
    '',
    `${themeSelector[theme]} {`,
    ...allTokens.flatMap((token) => tokenCssVars(tokens, token)),
    '}',
    '',
    GLOBAL_CSS,
    '',
  ].join('\n');
