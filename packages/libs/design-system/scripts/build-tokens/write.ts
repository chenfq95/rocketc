import fs from 'node:fs';
import path from 'node:path';
import { HEADER, OUT_DIR } from './constants.ts';
import type { ThemeBuildResult, ThemeName } from './types.ts';

export const cleanOutput = (): void => {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
};

export const ensureOutputDirs = (): void => {
  fs.mkdirSync(path.join(OUT_DIR, 'css'), { recursive: true });
  fs.mkdirSync(path.join(OUT_DIR, 'js'), { recursive: true });
  fs.mkdirSync(path.join(OUT_DIR, 'mui'), { recursive: true });
};

const writeText = (filePath: string, content: string): void => {
  fs.writeFileSync(filePath, content);
};

const lines = (items: string[]): string => items.join('\n');

const themeExportName = (theme: ThemeName): string => `${theme}Tokens`;

export const writeTheme = ({ theme, css, jsTokens, muiTheme }: ThemeBuildResult): void => {
  const exportName = themeExportName(theme);
  const muiExportName = `${theme}MuiTheme`;

  writeText(path.join(OUT_DIR, 'css', `${theme}.css`), css);
  writeText(
    path.join(OUT_DIR, 'js', `${theme}.js`),
    lines([
      HEADER,
      `const ${exportName} = Object.freeze(${JSON.stringify(jsTokens, null, 2)});`,
      '',
      `export { ${exportName} };`,
      `export default ${exportName};`,
      '',
    ]),
  );
  writeText(
    path.join(OUT_DIR, 'js', `${theme}.d.ts`),
    lines([
      "import type { TokenTheme } from './types.js';",
      '',
      `export declare const ${exportName}: TokenTheme;`,
      `export default ${exportName};`,
      '',
    ]),
  );
  writeText(
    path.join(OUT_DIR, 'mui', `${theme}.js`),
    lines([
      HEADER,
      `const ${muiExportName} = Object.freeze(${JSON.stringify(muiTheme, null, 2)});`,
      '',
      `export { ${muiExportName} };`,
      `export default ${muiExportName};`,
      '',
    ]),
  );
  writeText(
    path.join(OUT_DIR, 'mui', `${theme}.d.ts`),
    lines([
      "import type { MuiThemeOptions } from './types.js';",
      '',
      `export declare const ${muiExportName}: MuiThemeOptions;`,
      `export default ${muiExportName};`,
      '',
    ]),
  );
};

export const writeJsIndex = (): void => {
  writeText(
    path.join(OUT_DIR, 'js', 'index.js'),
    lines([
      HEADER,
      "export { darkTokens } from './dark.js';",
      "export { lightTokens } from './light.js';",
      '',
    ]),
  );
  writeText(
    path.join(OUT_DIR, 'js', 'index.d.ts'),
    lines([
      "export type { DesignToken, TokenTheme, TokenValue } from './types.js';",
      "export { darkTokens } from './dark.js';",
      "export { lightTokens } from './light.js';",
      '',
    ]),
  );
  writeText(
    path.join(OUT_DIR, 'js', 'types.d.ts'),
    lines([
      'export type TokenValue =',
      '  | string',
      '  | number',
      '  | boolean',
      '  | null',
      '  | TokenValue[]',
      '  | { [key: string]: TokenValue };',
      '',
      'export interface DesignToken {',
      '  $type: string;',
      '  $value: TokenValue;',
      '}',
      '',
      'export type TokenTheme = Record<string, DesignToken>;',
      '',
    ]),
  );
};

export const writeMuiIndex = (): void => {
  writeText(
    path.join(OUT_DIR, 'mui', 'index.js'),
    lines([
      HEADER,
      "export { darkMuiTheme } from './dark.js';",
      "export { lightMuiTheme } from './light.js';",
      '',
    ]),
  );
  writeText(
    path.join(OUT_DIR, 'mui', 'index.d.ts'),
    lines([
      "export type { MuiThemeOptions } from './types.js';",
      "export { darkMuiTheme } from './dark.js';",
      "export { lightMuiTheme } from './light.js';",
      '',
    ]),
  );
  writeText(
    path.join(OUT_DIR, 'mui', 'types.d.ts'),
    lines(["export type { ThemeOptions as MuiThemeOptions } from '@mui/material/styles';", '']),
  );
};
