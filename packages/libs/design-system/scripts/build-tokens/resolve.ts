import { resolveReferences } from 'style-dictionary/utils';
import type { PreprocessedTokens } from 'style-dictionary/types';
import type { TokenTree, TokenValue } from './types.ts';

const isReference = (value: string): boolean => value.startsWith('{') && value.endsWith('}');

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const resolveTokenValue = (value: TokenValue, tokens: TokenTree): TokenValue => {
  if (typeof value === 'string') {
    if (!isReference(value)) return value;

    const resolved = resolveReferences(value, tokens as PreprocessedTokens, {
      usesDtcg: true,
    }) as TokenValue;
    return resolveTokenValue(resolved, tokens);
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveTokenValue(item, tokens));
  }

  if (isObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, childValue]) => [
        key,
        resolveTokenValue(childValue as TokenValue, tokens),
      ]),
    );
  }

  return value;
};
