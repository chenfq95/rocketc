import type { ThemeOptions } from '@mui/material/styles';

export type ThemeName = 'light' | 'dark';

export type TokenType =
  | 'color'
  | 'cubicBezier'
  | 'dimension'
  | 'duration'
  | 'fontFamily'
  | 'fontWeight'
  | 'number'
  | 'shadow'
  | 'typography'
  | string;

export type DimensionValue = {
  value: number;
  unit: string;
};

export type ColorValue =
  | string
  | {
      components: number[];
      alpha?: number;
    };

export type ShadowValue = {
  color: ColorValue;
  offsetX: DimensionValue;
  offsetY: DimensionValue;
  blur: DimensionValue;
  spread: DimensionValue;
};

export type TypographyValue = {
  fontFamily: TokenValue;
  fontSize: TokenValue;
  fontWeight: TokenValue;
  lineHeight: TokenValue;
  letterSpacing: TokenValue;
};

export type TokenValue =
  | string
  | number
  | boolean
  | null
  | TokenValue[]
  | { [key: string]: TokenValue };

export type DictionaryToken = {
  key: string;
  $type: TokenType;
  $value: TokenValue;
};

export type TokenTree = Record<string, unknown>;

export type FlatToken = {
  $type: TokenType;
  $value: TokenValue;
};

export type FlatTokenTheme = Record<string, FlatToken>;

export type MuiThemeOptions = ThemeOptions;

export type ThemeBuildResult = {
  theme: ThemeName;
  css: string;
  jsTokens: FlatTokenTheme;
  muiTheme: MuiThemeOptions;
};
