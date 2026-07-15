import { formatCssValue } from './format.ts';
import { NORMALIZE_GLOBAL_CSS } from './normalize.ts';
import {
  colorToken,
  dimensionCssToken,
  numberToken,
  shadowToken,
  tokenCssValue,
  typographyToken,
} from './token-access.ts';
import type { ChakraThemeConfig, FlatTokenTheme } from './types.ts';

type ChakraToken = {
  value: string;
};

interface ChakraTokenTree {
  [key: string]: ChakraToken | ChakraTokenTree;
}

const colorScales = ['neutral', 'red', 'orange', 'amber', 'green', 'teal', 'blue', 'purple'];
const colorSteps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

const DESIGN_SYSTEM_COLOR_GROUPS = {
  brand: 'color.brand',
  accent: 'color.accent',
  success: 'color.success',
  warning: 'color.warning',
  info: 'color.info',
  danger: 'color.danger',
} as const;

const CHAKRA_PALETTE_ALIASES = {
  red: 'color.danger',
  orange: 'color.brand',
  yellow: 'color.warning',
  green: 'color.success',
  teal: 'color.accent',
  blue: 'color.info',
} as const;

const CHAKRA_COLOR_ROLE_MAP = {
  solid: 'solid',
  contrast: 'contrast',
  fg: 'text',
  muted: 'soft',
  subtle: 'soft',
  emphasized: 'hard',
  border: 'border',
  focusRing: 'border',
} as const;

const { body: normalizeBodyCss, ...normalizeGlobalCssWithoutBody } = NORMALIZE_GLOBAL_CSS;

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

const fontWeightMap = (tokens: FlatTokenTheme): ChakraTokenTree => ({
  ...tokenMap(tokens, 'typography.weight'),
  normal: token(tokenCssValue(tokens, 'typography.weight.normal')),
});

const spacingMap = (tokens: FlatTokenTheme): ChakraTokenTree => ({
  ...tokenMap(tokens, 'space'),
  '0.5': token(tokenCssValue(tokens, 'space.0.5')),
  '1.5': token(tokenCssValue(tokens, 'space.1.5')),
  '2.5': token(tokenCssValue(tokens, 'space.2.5')),
  '3.5': token(tokenCssValue(tokens, 'space.3.5')),
});

const borderToken = (tokens: FlatTokenTheme, name: string): ChakraToken =>
  token(`${dimensionCssToken(tokens, name)} solid`);

const borderMap = (tokens: FlatTokenTheme): ChakraTokenTree => ({
  ...Object.fromEntries(
    entriesByPrefix(tokens, 'border').map((name) => [
      name.slice('border.'.length),
      borderToken(tokens, name),
    ]),
  ),
});

const animationMap = (tokens: FlatTokenTheme): ChakraTokenTree => ({
  spin: token(
    `spin ${tokenCssValue(tokens, 'duration.slower')} ${tokenCssValue(tokens, 'easing.linear')} infinite`,
  ),
  ping: token(
    `ping ${tokenCssValue(tokens, 'duration.slower')} ${tokenCssValue(tokens, 'easing.exit')} infinite`,
  ),
  pulse: token(
    `pulse ${tokenCssValue(tokens, 'duration.slower')} ${tokenCssValue(tokens, 'easing.standard')} infinite`,
  ),
  bounce: token(
    `bounce ${tokenCssValue(tokens, 'duration.slower')} ${tokenCssValue(tokens, 'easing.enter')} infinite`,
  ),
});

const breakpointMap = (tokens: FlatTokenTheme): Record<string, string> =>
  Object.fromEntries(
    entriesByPrefix(tokens, 'breakpoint').map((name) => [
      name.slice('breakpoint.'.length),
      dimensionCssToken(tokens, name),
    ]),
  );

const zIndexMap = (tokens: FlatTokenTheme): ChakraTokenTree => ({
  ...tokenMap(tokens, 'zIndex'),
  hide: token(tokenCssValue(tokens, 'zIndex.-1')),
  docked: token(tokenCssValue(tokens, 'zIndex.raised')),
  banner: token(tokenCssValue(tokens, 'zIndex.sticky')),
  skipNav: token(tokenCssValue(tokens, 'zIndex.tooltip')),
  max: token(2147483647),
});

const typographyMap = (tokens: FlatTokenTheme) => {
  const roles = [
    'display',
    'title',
    'heading',
    'subheading',
    'body',
    'bodySmall',
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
  gray: Object.fromEntries(
    colorSteps.map((step) => [step, token(colorToken(tokens, `color.neutral.${step}`))]),
  ),
  black: token(colorToken(tokens, 'color.common.black')),
  white: token(colorToken(tokens, 'color.common.white')),
});

const chakraBaseSemanticColors = (tokens: FlatTokenTheme): ChakraTokenTree => ({
  bg: {
    DEFAULT: token(colorToken(tokens, 'color.surface.canvas')),
    panel: token(colorToken(tokens, 'color.surface.panel')),
    elevated: token(colorToken(tokens, 'color.surface.elevated')),
    subtle: token(colorToken(tokens, 'color.surface.canvas')),
    muted: token(colorToken(tokens, 'color.action.hover')),
    emphasized: token(colorToken(tokens, 'color.action.focus')),
    inverted: token(colorToken(tokens, 'color.surface.inverse')),
    error: token(colorToken(tokens, 'color.danger.soft')),
    warning: token(colorToken(tokens, 'color.warning.soft')),
    success: token(colorToken(tokens, 'color.success.soft')),
    info: token(colorToken(tokens, 'color.info.soft')),
  },
  fg: {
    DEFAULT: token(colorToken(tokens, 'color.text.primary')),
    muted: token(colorToken(tokens, 'color.text.muted')),
    subtle: token(colorToken(tokens, 'color.text.secondary')),
    inverted: token(colorToken(tokens, 'color.text.inverse')),
    error: token(colorToken(tokens, 'color.danger.text')),
    warning: token(colorToken(tokens, 'color.warning.text')),
    success: token(colorToken(tokens, 'color.success.text')),
    info: token(colorToken(tokens, 'color.info.text')),
  },
  border: {
    DEFAULT: token(colorToken(tokens, 'color.border.default')),
    muted: token(colorToken(tokens, 'color.border.subtle')),
    subtle: token(colorToken(tokens, 'color.border.subtle')),
    emphasized: token(colorToken(tokens, 'color.border.strong')),
    inverted: token(colorToken(tokens, 'color.border.strong')),
    error: token(colorToken(tokens, 'color.danger.border')),
    warning: token(colorToken(tokens, 'color.warning.border')),
    success: token(colorToken(tokens, 'color.success.border')),
    info: token(colorToken(tokens, 'color.info.border')),
    focus: token(colorToken(tokens, 'color.border.focus')),
  },
});

const chakraPaletteSemanticRoles = (
  tokens: FlatTokenTheme,
  prefix:
    | (typeof DESIGN_SYSTEM_COLOR_GROUPS)[keyof typeof DESIGN_SYSTEM_COLOR_GROUPS]
    | (typeof CHAKRA_PALETTE_ALIASES)[keyof typeof CHAKRA_PALETTE_ALIASES],
): ChakraTokenTree =>
  Object.fromEntries(
    Object.entries(CHAKRA_COLOR_ROLE_MAP).map(([chakraRole, sourceRole]) => [
      chakraRole,
      token(colorToken(tokens, `${prefix}.${sourceRole}`)),
    ]),
  );

const isDarkTheme = (tokens: FlatTokenTheme): boolean =>
  colorToken(tokens, 'color.surface.canvas') === colorToken(tokens, 'color.neutral.950');

const chakraGraySemanticColors = (tokens: FlatTokenTheme): ChakraTokenTree => {
  const roles = isDarkTheme(tokens)
    ? {
        solid: '200',
        contrast: '950',
        fg: '300',
        muted: '800',
        subtle: '900',
        emphasized: '700',
        border: '700',
        focusRing: '400',
      }
    : {
        solid: '800',
        contrast: '0',
        fg: '700',
        muted: '100',
        subtle: '50',
        emphasized: '200',
        border: '300',
        focusRing: '500',
      };

  return Object.fromEntries(
    Object.entries(roles).map(([role, step]) => [
      role,
      token(colorToken(tokens, `color.neutral.${step}`)),
    ]),
  );
};

const chakraPurpleSemanticColors = (tokens: FlatTokenTheme): ChakraTokenTree => ({
  solid: token(colorToken(tokens, 'color.purple.600')),
  contrast: token(colorToken(tokens, 'color.common.white')),
  fg: token(colorToken(tokens, 'color.purple.700')),
  muted: token(colorToken(tokens, 'color.purple.100')),
  subtle: token(colorToken(tokens, 'color.purple.50')),
  emphasized: token(colorToken(tokens, 'color.purple.700')),
  border: token(colorToken(tokens, 'color.purple.300')),
  focusRing: token(colorToken(tokens, 'color.purple.500')),
});

const chakraPaletteAliasSemanticColors = (tokens: FlatTokenTheme): ChakraTokenTree => ({
  gray: chakraGraySemanticColors(tokens),
  ...Object.fromEntries(
    Object.entries(CHAKRA_PALETTE_ALIASES).map(([group, prefix]) => [
      group,
      chakraPaletteSemanticRoles(tokens, prefix),
    ]),
  ),
  purple: chakraPurpleSemanticColors(tokens),
});

const semanticColorTokens = (tokens: FlatTokenTheme): ChakraTokenTree =>
  ({
    ...chakraBaseSemanticColors(tokens),
    ...chakraPaletteAliasSemanticColors(tokens),
    ...Object.fromEntries(
      Object.entries(DESIGN_SYSTEM_COLOR_GROUPS).map(([group, prefix]) => [
        group,
        chakraPaletteSemanticRoles(tokens, prefix),
      ]),
    ),
  }) as ChakraTokenTree;

const semanticRadiusTokens = (tokens: FlatTokenTheme): ChakraTokenTree => ({
  l1: token(dimensionCssToken(tokens, 'radius.xs')),
  l2: token(dimensionCssToken(tokens, 'radius.sm')),
  l3: token(dimensionCssToken(tokens, 'radius.md')),
});

const semanticShadowTokens = (tokens: FlatTokenTheme): ChakraTokenTree => ({
  xs: token(shadowToken(tokens, 'shadow.xs')),
  sm: token(shadowToken(tokens, 'shadow.sm')),
  md: token(shadowToken(tokens, 'shadow.md')),
  lg: token(shadowToken(tokens, 'shadow.lg')),
  xl: token(shadowToken(tokens, 'shadow.xl')),
  '2xl': token(shadowToken(tokens, 'shadow.2xl')),
  inner: token(shadowToken(tokens, 'shadow.inner')),
  inset: token(shadowToken(tokens, 'shadow.inset')),
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
      fontWeights: fontWeightMap(tokens),
      lineHeights: tokenMap(tokens, 'typography.lineHeight'),
      letterSpacings: tokenMap(tokens, 'typography.letterSpacing'),
      spacing: spacingMap(tokens),
      sizes: {
        ...tokenMap(tokens, 'size'),
        measure: tokenMap(tokens, 'measure'),
      },
      radii: tokenMap(tokens, 'radius'),
      borders: borderMap(tokens),
      borderWidths: tokenMap(tokens, 'border'),
      shadows: {
        ...tokenMap(tokens, 'shadow'),
        surface: token(shadowToken(tokens, 'shadow.surface')),
        raised: token(shadowToken(tokens, 'shadow.raised')),
        overlay: token(shadowToken(tokens, 'shadow.overlay')),
        focus: token(shadowToken(tokens, 'shadow.focus')),
      },
      blurs: tokenMap(tokens, 'blur'),
      animations: animationMap(tokens),
      durations: tokenMap(tokens, 'duration'),
      easings: tokenMap(tokens, 'easing'),
      opacity: tokenMap(tokens, 'opacity'),
      zIndex: zIndexMap(tokens),
    },
    breakpoints: breakpointMap(tokens),
    textStyles: typographyMap(tokens),
    semanticTokens: {
      colors: semanticColorTokens(tokens),
      radii: semanticRadiusTokens(tokens),
      shadows: semanticShadowTokens(tokens),
    },
  },
  globalCss: {
    ...normalizeGlobalCssWithoutBody,
    ':where(body)': {
      ...normalizeBodyCss,
      bg: '{colors.bg}',
      color: '{colors.fg}',
      fontFamily: 'body',
    },
    '*::selection': {
      bg: '{colors.brand.subtle}',
      color: '{colors.brand.fg}',
    },
    '::placeholder': {
      color: '{colors.fg.muted}',
      opacity: numberToken(tokens, 'opacity.muted'),
    },
  },
});
