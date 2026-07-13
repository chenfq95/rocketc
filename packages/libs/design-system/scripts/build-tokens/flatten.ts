import { tokenName, tokenParts } from './names.ts';
import { resolveTokenValue } from './resolve.ts';
import type { DictionaryToken, FlatTokenTheme, TokenTree } from './types.ts';

export const flattenTokens = (tokens: TokenTree, allTokens: DictionaryToken[]): FlatTokenTheme => {
  const flatTokens: FlatTokenTheme = {};

  for (const token of allTokens) {
    const parts = tokenParts(token);

    flatTokens[tokenName(parts)] = {
      $type: token.$type,
      $value: resolveTokenValue(token.$value, tokens),
    };
  }

  return flatTokens;
};
