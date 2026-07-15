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
  fs.mkdirSync(path.join(OUT_DIR, 'chakra'), { recursive: true });
};

const writeText = (filePath: string, content: string): void => {
  fs.writeFileSync(filePath, content);
};

const lines = (items: string[]): string => items.join('\n');

const themeExportName = (theme: ThemeName): string => `${theme}Tokens`;

const writeFrozenModule = (
  dir: string,
  fileName: string,
  exportName: string,
  value: unknown,
): void => {
  writeText(
    path.join(OUT_DIR, dir, `${fileName}.js`),
    lines([
      HEADER,
      `const ${exportName} = Object.freeze(${JSON.stringify(value, null, 2)});`,
      '',
      `export { ${exportName} };`,
      `export default ${exportName};`,
      '',
    ]),
  );
};

const writeDefaultTypeDeclaration = (
  dir: string,
  fileName: string,
  exportName: string,
  typeName: string,
): void => {
  writeText(
    path.join(OUT_DIR, dir, `${fileName}.d.ts`),
    lines([
      `import type { ${typeName} } from './types.js';`,
      '',
      `export declare const ${exportName}: ${typeName};`,
      `export default ${exportName};`,
      '',
    ]),
  );
};

const writeIndexModule = (dir: string, exports: string[], typeExports: string[] = []): void => {
  writeText(path.join(OUT_DIR, dir, 'index.js'), lines([HEADER, ...exports, '']));
  writeText(path.join(OUT_DIR, dir, 'index.d.ts'), lines([...typeExports, ...exports, '']));
};

export const writeTheme = ({
  theme,
  css,
  jsTokens,
  muiTheme,
  chakraTheme,
}: ThemeBuildResult): void => {
  const exportName = themeExportName(theme);
  const muiExportName = `${theme}MuiTheme`;
  const chakraExportName = `${theme}ChakraTheme`;

  writeText(path.join(OUT_DIR, 'css', `${theme}.css`), css);
  writeFrozenModule('js', theme, exportName, jsTokens);
  writeDefaultTypeDeclaration('js', theme, exportName, 'TokenTheme');
  writeFrozenModule('mui', theme, muiExportName, muiTheme);
  writeDefaultTypeDeclaration('mui', theme, muiExportName, 'MuiThemeOptions');
  writeFrozenModule('chakra', theme, chakraExportName, chakraTheme);
  writeDefaultTypeDeclaration('chakra', theme, chakraExportName, 'ChakraThemeConfig');
};

export const writeJsIndex = (): void => {
  writeIndexModule(
    'js',
    ["export { darkTokens } from './dark.js';", "export { lightTokens } from './light.js';"],
    ["export type { DesignToken, TokenTheme, TokenValue } from './types.js';"],
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
  writeIndexModule(
    'mui',
    ["export { darkMuiTheme } from './dark.js';", "export { lightMuiTheme } from './light.js';"],
    ["export type { MuiThemeOptions } from './types.js';"],
  );
  writeText(
    path.join(OUT_DIR, 'mui', 'types.d.ts'),
    lines(["export type { ThemeOptions as MuiThemeOptions } from '@mui/material/styles';", '']),
  );
};

export const writeChakraIndex = (): void => {
  writeIndexModule(
    'chakra',
    [
      "export { darkChakraTheme } from './dark.js';",
      "export { lightChakraTheme } from './light.js';",
    ],
    ["export type { ChakraThemeConfig } from './types.js';"],
  );
  writeText(
    path.join(OUT_DIR, 'chakra', 'types.d.ts'),
    lines(["export type { SystemConfig as ChakraThemeConfig } from '@chakra-ui/react';", '']),
  );
};
