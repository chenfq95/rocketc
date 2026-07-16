import path from 'node:path';
import { buildChakraTheme } from './build-tokens/chakra.ts';
import { OUT_DIR, ROOT_DIR, THEMES } from './build-tokens/constants.ts';
import { buildCss } from './build-tokens/css.ts';
import { createDictionary } from './build-tokens/dictionary.ts';
import { flattenTokens } from './build-tokens/flatten.ts';
import { buildMuiTheme } from './build-tokens/mui.ts';
import type { ThemeBuildResult, ThemeName } from './build-tokens/types.ts';
import {
  cleanOutput,
  ensureOutputDirs,
  writeJsIndex,
  writeMuiIndex,
  writeTailwind,
  writeTheme,
} from './build-tokens/write.ts';

const buildTheme = async (theme: ThemeName): Promise<ThemeBuildResult> => {
  const { tokens, allTokens } = await createDictionary(theme);
  const jsTokens = flattenTokens(tokens, allTokens);

  return {
    theme,
    css: buildCss(theme, tokens, allTokens),
    jsTokens,
    muiTheme: buildMuiTheme(theme, jsTokens),
    chakraTheme: buildChakraTheme(theme, jsTokens),
  };
};

const build = async (): Promise<void> => {
  cleanOutput();
  ensureOutputDirs();

  const results = await Promise.all(THEMES.map((theme) => buildTheme(theme)));
  results.forEach(writeTheme);
  writeJsIndex();
  writeMuiIndex();
  // Bridge + @theme reference `--rds-*`; any theme's key set works for theme.css.
  writeTailwind(results[0]!.jsTokens);

  console.log(`Built ${results.length} token themes into ${path.relative(ROOT_DIR, OUT_DIR)}`);
};

await build();
