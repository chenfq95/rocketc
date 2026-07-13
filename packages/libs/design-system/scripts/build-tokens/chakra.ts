import { formatColor, formatCssValue, formatDimension, formatShadow } from './format.ts';
import type {
  ChakraThemeConfig,
  ColorValue,
  DimensionValue,
  FlatTokenTheme,
  ShadowValue,
  TokenType,
  TokenValue,
  TypographyValue,
} from './types.ts';

type ChakraToken = {
  value: string;
};

interface ChakraTokenTree {
  [key: string]: ChakraToken | ChakraTokenTree;
}

const colorScales = ['neutral', 'orange', 'coral', 'cyan', 'green', 'blue', 'amber', 'red'];
const colorSteps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

const semanticColorGroups = {
  brand: 'color.brand',
  accent: 'color.accent',
  success: 'color.state.success',
  warning: 'color.state.warning',
  info: 'color.state.info',
  danger: 'color.state.danger',
} as const;

const chakraPaletteRoles: Record<keyof typeof semanticColorGroups, Record<string, string>> = {
  brand: {
    solid: 'solid',
    border: 'border',
    contrast: 'contrastText',
    fg: 'text',
    muted: 'soft',
    subtle: 'soft',
    emphasized: 'hard',
    focusRing: 'border',
  },
  accent: {
    solid: 'solid',
    border: 'border',
    contrast: 'contrastText',
    fg: 'text',
    muted: 'soft',
    subtle: 'soft',
    emphasized: 'hard',
    focusRing: 'border',
  },
  success: {
    solid: 'solid',
    contrast: 'contrastText',
    fg: 'hard',
    muted: 'soft',
    subtle: 'soft',
    emphasized: 'hard',
    border: 'solid',
    focusRing: 'solid',
  },
  warning: {
    solid: 'solid',
    contrast: 'contrastText',
    fg: 'hard',
    muted: 'soft',
    subtle: 'soft',
    emphasized: 'hard',
    border: 'solid',
    focusRing: 'solid',
  },
  info: {
    solid: 'solid',
    contrast: 'contrastText',
    fg: 'hard',
    muted: 'soft',
    subtle: 'soft',
    emphasized: 'hard',
    border: 'solid',
    focusRing: 'solid',
  },
  danger: {
    solid: 'solid',
    contrast: 'contrastText',
    fg: 'hard',
    muted: 'soft',
    subtle: 'soft',
    emphasized: 'hard',
    border: 'solid',
    focusRing: 'solid',
  },
};

const tokenValue = (tokens: FlatTokenTheme, name: string): TokenValue => {
  const token = tokens[name];
  if (!token) throw new Error(`Missing token "${name}"`);

  return token.$value;
};

const tokenType = (tokens: FlatTokenTheme, name: string): TokenType => {
  const token = tokens[name];
  if (!token) throw new Error(`Missing token "${name}"`);

  return token.$type;
};

const tokenCssValue = (tokens: FlatTokenTheme, name: string): string =>
  formatCssValue(tokenValue(tokens, name), tokenType(tokens, name));

const colorToken = (tokens: FlatTokenTheme, name: string): string =>
  formatColor(tokenValue(tokens, name) as ColorValue);

const dimensionToken = (tokens: FlatTokenTheme, name: string): string =>
  formatDimension(tokenValue(tokens, name) as unknown as DimensionValue);

const numberToken = (tokens: FlatTokenTheme, name: string): number =>
  Number(tokenValue(tokens, name));

const shadowToken = (tokens: FlatTokenTheme, name: string): string =>
  formatShadow(tokenValue(tokens, name) as unknown as ShadowValue);

const typographyToken = (tokens: FlatTokenTheme, name: string): TypographyValue =>
  tokenValue(tokens, name) as TypographyValue;

const token = (value: string | number): ChakraToken => ({ value: String(value) });

const entriesByPrefix = (tokens: FlatTokenTheme, prefix: string): string[] =>
  Object.keys(tokens)
    .filter((name) => name.startsWith(`${prefix}.`))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

const tokenMap = (tokens: FlatTokenTheme, prefix: string): ChakraTokenTree =>
  Object.fromEntries(
    entriesByPrefix(tokens, prefix).map((name) => [
      name.slice(prefix.length + 1),
      token(tokenCssValue(tokens, name)),
    ]),
  );

const typographyMap = (tokens: FlatTokenTheme) => {
  const roles = [
    'display',
    'title',
    'heading',
    'subheading',
    'body',
    'bodyStrong',
    'label',
    'caption',
    'code',
  ];

  return Object.fromEntries(
    roles.map((role) => {
      const typography = typographyToken(tokens, `typography.${role}`);

      return [
        role,
        {
          value: {
            fontFamily: formatCssValue(typography.fontFamily, 'fontFamily'),
            fontSize: formatCssValue(typography.fontSize, 'dimension'),
            fontWeight: formatCssValue(typography.fontWeight, 'fontWeight'),
            lineHeight: formatCssValue(typography.lineHeight, 'number'),
            letterSpacing: formatCssValue(typography.letterSpacing, 'dimension'),
          },
        },
      ];
    }),
  );
};

const colorTokens = (tokens: FlatTokenTheme): ChakraTokenTree => ({
  ...Object.fromEntries(
    colorScales.map((scale) => [
      scale,
      Object.fromEntries(
        colorSteps.map((step) => [step, token(colorToken(tokens, `color.${scale}.${step}`))]),
      ),
    ]),
  ),
  black: token(colorToken(tokens, 'color.common.black')),
  white: token(colorToken(tokens, 'color.common.white')),
});

const semanticColorTokens = (tokens: FlatTokenTheme): ChakraTokenTree =>
  Object.fromEntries(
    Object.entries(semanticColorGroups).map(([group, prefix]) => [
      group,
      Object.fromEntries(
        Object.entries(chakraPaletteRoles[group as keyof typeof chakraPaletteRoles]).map(
          ([chakraRole, sourceRole]) => [
            chakraRole,
            token(colorToken(tokens, `${prefix}.${sourceRole}`)),
          ],
        ),
      ),
    ]),
  );

const buttonRecipe = (tokens: FlatTokenTheme) => ({
  className: 'chakra-button',
  base: {
    borderRadius: dimensionToken(tokens, 'button.radius'),
    fontFamily: 'body',
    fontWeight: tokenCssValue(tokens, 'typography.weight.medium'),
    lineHeight: tokenCssValue(tokens, 'typography.lineHeight.snug'),
    focusVisibleRing: 'outside',
    _disabled: {
      opacity: numberToken(tokens, 'button.disabledOpacity'),
    },
  },
  variants: {
    size: {
      sm: {
        h: dimensionToken(tokens, 'button.height.sm'),
        minW: dimensionToken(tokens, 'button.height.sm'),
        px: dimensionToken(tokens, 'button.paddingX.sm'),
        gap: dimensionToken(tokens, 'button.gap'),
        textStyle: 'label',
      },
      md: {
        h: dimensionToken(tokens, 'button.height.md'),
        minW: dimensionToken(tokens, 'button.height.md'),
        px: dimensionToken(tokens, 'button.paddingX.md'),
        gap: dimensionToken(tokens, 'button.gap'),
        textStyle: 'label',
      },
      lg: {
        h: dimensionToken(tokens, 'button.height.lg'),
        minW: dimensionToken(tokens, 'button.height.lg'),
        px: dimensionToken(tokens, 'button.paddingX.lg'),
        gap: dimensionToken(tokens, 'button.gap'),
        textStyle: 'label',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const buildChakraTheme = (tokens: FlatTokenTheme): ChakraThemeConfig => ({
  theme: {
    tokens: {
      colors: colorTokens(tokens),
      fonts: {
        body: token(tokenCssValue(tokens, 'typography.family.sans')),
        heading: token(tokenCssValue(tokens, 'typography.family.sans')),
        mono: token(tokenCssValue(tokens, 'typography.family.mono')),
      },
      fontSizes: tokenMap(tokens, 'typography.size'),
      fontWeights: tokenMap(tokens, 'typography.weight'),
      lineHeights: tokenMap(tokens, 'typography.lineHeight'),
      letterSpacings: tokenMap(tokens, 'typography.letterSpacing'),
      spacing: tokenMap(tokens, 'space'),
      sizes: tokenMap(tokens, 'size'),
      radii: tokenMap(tokens, 'radius'),
      shadows: {
        ...tokenMap(tokens, 'shadowScale'),
        sm: token(shadowToken(tokens, 'shadow.sm')),
        md: token(shadowToken(tokens, 'shadow.md')),
        lg: token(shadowToken(tokens, 'shadow.lg')),
        focus: token(shadowToken(tokens, 'shadow.focus')),
      },
      durations: tokenMap(tokens, 'duration'),
      easings: tokenMap(tokens, 'easing'),
      opacity: tokenMap(tokens, 'opacity'),
      zIndex: tokenMap(tokens, 'zIndex'),
    },
    textStyles: typographyMap(tokens),
    recipes: {
      button: buttonRecipe(tokens),
    },
    semanticTokens: {
      colors: semanticColorTokens(tokens),
      shadows: {
        card: token(shadowToken(tokens, 'card.shadow')),
        dialog: token(shadowToken(tokens, 'dialog.shadow')),
        switch: token(shadowToken(tokens, 'switch.shadow')),
        focusRing: token(shadowToken(tokens, 'button.focusRing')),
      },
    },
  },
  globalCss: {
    body: {
      bg: '{colors.bg}',
      color: '{colors.fg}',
      fontFamily: 'body',
    },
    '*::selection': {
      bg: '{colors.brand.subtle}',
      color: '{colors.brand.fg}',
    },
    ':focus-visible': {
      outlineColor: '{colors.brand.focusRing}',
      outlineOffset: dimensionToken(tokens, 'space.1'),
    },
    '::placeholder': {
      color: '{colors.fg.muted}',
      opacity: numberToken(tokens, 'opacity.muted'),
    },
  },
});
