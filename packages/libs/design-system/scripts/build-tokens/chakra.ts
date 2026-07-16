import { formatCssValue } from './format.ts';
import { themeMode } from './constants.ts';
import { NORMALIZE_GLOBAL_CSS } from './normalize.ts';
import {
  colorToken,
  dimensionCssToken,
  numberToken,
  shadowToken,
  tokenCssValue,
  typographyToken,
} from './token-access.ts';
import type { ChakraThemeConfig, FlatTokenTheme, ThemeName } from './types.ts';

type ChakraToken = {
  value: string;
};

interface ChakraTokenTree {
  [key: string]: ChakraToken | ChakraTokenTree;
}

const colorScales = ['neutral', 'red', 'orange', 'amber', 'green', 'teal', 'blue', 'purple'];
const colorSteps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

/**
 * Single source of Chakra ← design-system semantic mappings.
 * Prefer editing this table when wiring changes; builders below only resolve it.
 */
const CHAKRA_SEMANTIC_MAP = {
  /** Chakra palette slot → DS palette recipe suffix (`brand.soft` etc.). */
  paletteSlots: {
    solid: 'solid',
    contrast: 'contrast',
    fg: 'fg',
    muted: 'softHover',
    subtle: 'soft',
    emphasized: 'softActive',
    border: 'border',
    focusRing: 'focusRing',
  },

  /**
   * Nested Chakra color keys → absolute DS token paths.
   * Covers chrome (`bg`/`fg`/`border`) and control recipes (`primary`/`secondary`).
   */
  colors: {
    bg: {
      DEFAULT: 'color.surface.canvas',
      panel: 'color.surface.panel',
      elevated: 'color.surface.elevated',
      subtle: 'color.surface.canvas',
      muted: 'color.action.bgHover',
      // Stronger chrome wash (e.g. Switch off track)—not focus blue.
      emphasized: 'color.action.bgActive',
      inverted: 'color.surface.inverse',
      error: 'color.danger.soft',
      warning: 'color.warning.soft',
      success: 'color.success.soft',
      info: 'color.info.soft',
    },
    fg: {
      DEFAULT: 'color.text.primary',
      muted: 'color.text.muted',
      subtle: 'color.text.secondary',
      inverted: 'color.text.inverse',
      error: 'color.danger.fg',
      warning: 'color.warning.fg',
      success: 'color.success.fg',
      info: 'color.info.fg',
    },
    border: {
      DEFAULT: 'color.border.default',
      muted: 'color.border.subtle',
      subtle: 'color.border.subtle',
      emphasized: 'color.border.strong',
      inverted: 'color.border.strong',
      error: 'color.danger.border',
      warning: 'color.warning.border',
      success: 'color.success.border',
      info: 'color.info.border',
      focus: 'color.border.focus',
    },
    primary: {
      solid: 'color.control.primary.bg',
      contrast: 'color.control.primary.fgContrast',
      fg: 'color.control.primary.fg',
      muted: 'color.brand.softHover',
      subtle: 'color.brand.soft',
      emphasized: 'color.brand.softActive',
      border: 'color.brand.border',
      focusRing: 'color.border.focus',
    },
    secondary: {
      solid: 'color.control.secondary.bg',
      contrast: 'color.control.secondary.fgContrast',
      fg: 'color.control.secondary.fg',
      muted: 'color.control.secondary.bgActive',
      subtle: 'color.control.secondary.bgHover',
      emphasized: 'color.control.secondary.bgActive',
      border: 'color.control.secondary.border',
      focusRing: 'color.border.focus',
    },
  },

  /** Status / identity palettes → DS `color.<family>` prefix (resolved via `paletteSlots`). */
  palettes: {
    brand: 'color.brand',
    success: 'color.success',
    warning: 'color.warning',
    info: 'color.info',
    danger: 'color.danger',
    // Chakra built-in hue aliases
    red: 'color.danger',
    orange: 'color.brand',
    yellow: 'color.warning',
    green: 'color.success',
    blue: 'color.info',
  },

  /**
   * Mode-step palettes built from primitive ramps (not DS semantic families).
   * `contrast` may be a fixed token path instead of a scale step.
   */
  scalePalettes: {
    gray: {
      scale: 'neutral',
      light: {
        solid: '800',
        contrast: '0',
        fg: '700',
        muted: '100',
        subtle: '50',
        emphasized: '200',
        border: '300',
        focusRing: '500',
      },
      dark: {
        solid: '200',
        contrast: '950',
        fg: '300',
        muted: '800',
        subtle: '900',
        emphasized: '700',
        border: '700',
        focusRing: '400',
      },
    },
    teal: {
      scale: 'teal',
      contrast: 'color.common.white',
      light: {
        solid: '600',
        fg: '700',
        muted: '100',
        subtle: '50',
        emphasized: '700',
        border: '300',
        focusRing: '500',
      },
      dark: {
        solid: '600',
        fg: '300',
        muted: '900',
        subtle: '950',
        emphasized: '700',
        border: '700',
        focusRing: '400',
      },
    },
    purple: {
      scale: 'purple',
      contrast: 'color.common.white',
      light: {
        solid: '600',
        fg: '700',
        muted: '100',
        subtle: '50',
        emphasized: '700',
        border: '300',
        focusRing: '500',
      },
      dark: {
        solid: '600',
        fg: '300',
        muted: '900',
        subtle: '950',
        emphasized: '700',
        border: '700',
        focusRing: '400',
      },
    },
  },

  radii: {
    l1: 'radius.xs',
    l2: 'radius.sm',
    l3: 'radius.md',
  },

  shadows: {
    xs: 'shadow.xs',
    sm: 'shadow.sm',
    md: 'shadow.md',
    lg: 'shadow.lg',
    xl: 'shadow.xl',
    '2xl': 'shadow.2xl',
    inner: 'shadow.inner',
    inset: 'shadow.inset',
  },
} as const;

const CHAKRA_DARK_CONDITION =
  ".dark &, [data-theme$='.dark'] &, .dark .chakra-theme:not(.light) &, [data-theme$='.dark'] .chakra-theme &";

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

const mapTokenPaths = (
  tokens: FlatTokenTheme,
  paths: Record<string, string>,
  resolve: (tokens: FlatTokenTheme, path: string) => string = colorToken,
): ChakraTokenTree =>
  Object.fromEntries(
    Object.entries(paths).map(([key, path]) => [key, token(resolve(tokens, path))]),
  );

const mapNestedTokenPaths = (
  tokens: FlatTokenTheme,
  groups: Record<string, Record<string, string>>,
): ChakraTokenTree =>
  Object.fromEntries(
    Object.entries(groups).map(([group, paths]) => [group, mapTokenPaths(tokens, paths)]),
  );

const paletteFromPrefix = (tokens: FlatTokenTheme, prefix: string): ChakraTokenTree =>
  mapTokenPaths(
    tokens,
    Object.fromEntries(
      Object.entries(CHAKRA_SEMANTIC_MAP.paletteSlots).map(([chakraSlot, dsSuffix]) => [
        chakraSlot,
        `${prefix}.${dsSuffix}`,
      ]),
    ),
  );

const scalePaletteColors = (
  theme: ThemeName,
  tokens: FlatTokenTheme,
  name: keyof typeof CHAKRA_SEMANTIC_MAP.scalePalettes,
): ChakraTokenTree => {
  const recipe = CHAKRA_SEMANTIC_MAP.scalePalettes[name];
  const steps = themeMode(theme) === 'dark' ? recipe.dark : recipe.light;
  const fromSteps = mapTokenPaths(
    tokens,
    Object.fromEntries(
      Object.entries(steps).map(([slot, step]) => [slot, `color.${recipe.scale}.${step}`]),
    ),
  );

  if (!('contrast' in recipe)) {
    return fromSteps;
  }

  return {
    ...fromSteps,
    contrast: token(colorToken(tokens, recipe.contrast)),
  };
};

const semanticColorTokens = (theme: ThemeName, tokens: FlatTokenTheme): ChakraTokenTree =>
  ({
    ...mapNestedTokenPaths(tokens, CHAKRA_SEMANTIC_MAP.colors),
    ...Object.fromEntries(
      Object.entries(CHAKRA_SEMANTIC_MAP.palettes).map(([name, prefix]) => [
        name,
        paletteFromPrefix(tokens, prefix),
      ]),
    ),
    ...Object.fromEntries(
      (
        Object.keys(CHAKRA_SEMANTIC_MAP.scalePalettes) as Array<
          keyof typeof CHAKRA_SEMANTIC_MAP.scalePalettes
        >
      ).map((name) => [name, scalePaletteColors(theme, tokens, name)]),
    ),
  }) as ChakraTokenTree;

const semanticRadiusTokens = (tokens: FlatTokenTheme): ChakraTokenTree =>
  mapTokenPaths(tokens, CHAKRA_SEMANTIC_MAP.radii, dimensionCssToken);

const semanticShadowTokens = (tokens: FlatTokenTheme): ChakraTokenTree =>
  mapTokenPaths(tokens, CHAKRA_SEMANTIC_MAP.shadows, shadowToken);
export const buildChakraTheme = (theme: ThemeName, tokens: FlatTokenTheme): ChakraThemeConfig => ({
  conditions: {
    dark: CHAKRA_DARK_CONDITION,
  },
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
      colors: semanticColorTokens(theme, tokens),
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
