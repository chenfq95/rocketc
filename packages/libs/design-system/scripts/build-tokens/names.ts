import { PREFIX } from './constants.ts';
import type { DictionaryToken } from './types.ts';

export const toKebab = (value: string): string =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

export const tokenParts = (token: DictionaryToken): string[] =>
  token.key.replace(/^\{|\}$/g, '').split('.');

export const tokenName = (parts: string[]): string => parts.join('.');

export const cssVarName = (parts: string[]): string =>
  `--${[PREFIX, ...parts.map(toKebab)].join('-')}`;
