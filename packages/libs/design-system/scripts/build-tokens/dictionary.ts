import StyleDictionary from 'style-dictionary';
import { tokenSources } from './constants.ts';
import type { DictionaryToken, ThemeName, TokenTree } from './types.ts';

export const createDictionary = async (
  theme: ThemeName,
): Promise<{ tokens: TokenTree; allTokens: DictionaryToken[] }> => {
  const dictionary = new StyleDictionary(
    {
      usesDtcg: true,
      source: tokenSources(theme),
      platforms: {},
    },
    { verbosity: 'silent' },
  );

  await dictionary.hasInitialized;

  return {
    tokens: dictionary.tokens as TokenTree,
    allTokens: dictionary.allTokens as DictionaryToken[],
  };
};
