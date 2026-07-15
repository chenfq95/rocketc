import fs from 'node:fs';
import path from 'node:path';
import { HEADER, OUT_DIR, THEMES } from './constants.ts';
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

const themeIdentifier = (theme: ThemeName): string =>
  theme.replace(/\.([a-z])/g, (_, letter: string) => letter.toUpperCase());

const themeExportName = (theme: ThemeName): string => `${themeIdentifier(theme)}Tokens`;

const themeExports = (suffix: string): string[] =>
  THEMES.map((theme) => `export { ${themeIdentifier(theme)}${suffix} } from './${theme}.js';`);

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
  typeModule = './types.js',
): void => {
  writeText(
    path.join(OUT_DIR, dir, `${fileName}.d.ts`),
    lines([
      `import type { ${typeName} } from '${typeModule}';`,
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
  const muiExportName = `${themeIdentifier(theme)}MuiTheme`;
  const chakraExportName = `${themeIdentifier(theme)}ChakraTheme`;

  writeText(path.join(OUT_DIR, 'css', `${theme}.css`), css);
  writeFrozenModule('js', theme, exportName, jsTokens);
  writeDefaultTypeDeclaration('js', theme, exportName, 'TokenTheme');
  writeFrozenModule('mui', theme, muiExportName, muiTheme);
  writeDefaultTypeDeclaration('mui', theme, muiExportName, 'MuiThemeOptions');
  writeFrozenModule('chakra', theme, chakraExportName, chakraTheme);
  writeDefaultTypeDeclaration(
    'chakra',
    theme,
    chakraExportName,
    'SystemConfig',
    '@chakra-ui/react',
  );
};

export const writeJsIndex = (): void => {
  writeIndexModule('js', themeExports('Tokens'), [
    "export type { DesignToken, TokenTheme, TokenValue } from './types.js';",
  ]);
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
  writeIndexModule('mui', themeExports('MuiTheme'), [
    "export type { MuiThemeOptions } from './types.js';",
  ]);
  writeText(
    path.join(OUT_DIR, 'mui', 'types.d.ts'),
    lines(["export type { ThemeOptions as MuiThemeOptions } from '@mui/material/styles';", '']),
  );
};
