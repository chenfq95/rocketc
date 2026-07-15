import { formatCssValue } from './format.ts';
import { themeMode } from './constants.ts';
import { NORMALIZE_CSS_WITH_LOW_SPECIFICITY_BODY } from './normalize.ts';
import {
  colorToken,
  dimensionCssToken,
  dimensionNumberToken,
  numberToken,
  shadowToken,
  tokenCssValue,
  tokenValue,
  typographyCss,
} from './token-access.ts';
import type { Shadows } from '@mui/material/styles';
import type { FlatTokenTheme, MuiThemeOptions, ThemeName } from './types.ts';

const MUI_CONTRAST_THRESHOLD = 3;
const MUI_TONAL_OFFSET = {
  light: 0.2,
  dark: 0.3,
};

const muiGrey = (tokens: FlatTokenTheme) => ({
  50: colorToken(tokens, 'color.neutral.50'),
  100: colorToken(tokens, 'color.neutral.100'),
  200: colorToken(tokens, 'color.neutral.200'),
  300: colorToken(tokens, 'color.neutral.300'),
  400: colorToken(tokens, 'color.neutral.400'),
  500: colorToken(tokens, 'color.neutral.500'),
  600: colorToken(tokens, 'color.neutral.600'),
  700: colorToken(tokens, 'color.neutral.700'),
  800: colorToken(tokens, 'color.neutral.800'),
  900: colorToken(tokens, 'color.neutral.900'),
  A100: colorToken(tokens, 'color.neutral.100'),
  A200: colorToken(tokens, 'color.neutral.200'),
  A400: colorToken(tokens, 'color.neutral.400'),
  A700: colorToken(tokens, 'color.neutral.700'),
});

const muiControlPalette = (tokens: FlatTokenTheme, role: 'primary' | 'secondary') => ({
  main: colorToken(tokens, `color.control.${role}.bg`),
  dark: colorToken(tokens, `color.control.${role}.bgActive`),
  light: colorToken(tokens, `color.control.${role}.bgHover`),
  contrastText: colorToken(tokens, `color.control.${role}.fgContrast`),
});

const muiControlComponentStyles = (
  tokens: FlatTokenTheme,
  role: 'primary' | 'secondary',
  foreground: 'fg' | 'fgContrast' = 'fgContrast',
) => ({
  backgroundColor: colorToken(tokens, `color.control.${role}.bg`),
  border: `${dimensionCssToken(tokens, 'border.sm')} solid ${colorToken(tokens, `color.control.${role}.border`)}`,
  color: colorToken(tokens, `color.control.${role}.${foreground}`),
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: colorToken(tokens, `color.control.${role}.bgHover`),
    borderColor: colorToken(tokens, `color.control.${role}.borderHover`),
    boxShadow: 'none',
  },
  '&:active': {
    backgroundColor: colorToken(tokens, `color.control.${role}.bgActive`),
    borderColor: colorToken(tokens, `color.control.${role}.borderHover`),
    boxShadow: 'none',
  },
});

const muiButtonOverrides = (tokens: FlatTokenTheme) => ({
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    root: {
      '&.MuiButton-containedPrimary': muiControlComponentStyles(tokens, 'primary'),
      '&.MuiButton-containedSecondary': muiControlComponentStyles(tokens, 'secondary'),
      '&.MuiButton-outlinedSecondary': muiControlComponentStyles(tokens, 'secondary', 'fg'),
      '&.MuiButton-textSecondary': {
        color: colorToken(tokens, 'color.control.secondary.fg'),
        '&:hover': {
          backgroundColor: colorToken(tokens, 'color.control.secondary.bgHover'),
        },
        '&:active': {
          backgroundColor: colorToken(tokens, 'color.control.secondary.bgActive'),
        },
      },
    },
  },
});

const muiChipOverrides = (tokens: FlatTokenTheme) => ({
  styleOverrides: {
    root: {
      '&.MuiChip-colorPrimary': muiControlComponentStyles(tokens, 'primary'),
      '&.MuiChip-colorSecondary': muiControlComponentStyles(tokens, 'secondary'),
    },
  },
});

const muiShadows = (tokens: FlatTokenTheme): Shadows => {
  const none = shadowToken(tokens, 'shadow.none');
  const xs = shadowToken(tokens, 'shadow.xs');
  const sm = shadowToken(tokens, 'shadow.surface');
  const md = shadowToken(tokens, 'shadow.raised');
  const lg = shadowToken(tokens, 'shadow.overlay');
  const xl = shadowToken(tokens, 'shadow.xl');

  return [
    none,
    xs,
    xs,
    sm,
    sm,
    sm,
    md,
    md,
    md,
    md,
    lg,
    lg,
    lg,
    lg,
    lg,
    xl,
    xl,
    xl,
    xl,
    xl,
    xl,
    xl,
    xl,
    xl,
    xl,
  ] as Shadows;
};

const muiBreakpoints = (tokens: FlatTokenTheme) => ({
  values: {
    xs: 0,
    sm: dimensionNumberToken(tokens, 'breakpoint.sm'),
    md: dimensionNumberToken(tokens, 'breakpoint.md'),
    lg: dimensionNumberToken(tokens, 'breakpoint.lg'),
    xl: dimensionNumberToken(tokens, 'breakpoint.xl'),
  },
});

const muiTransitions = (tokens: FlatTokenTheme) => ({
  duration: {
    shortest: dimensionNumberToken(tokens, 'duration.fast'),
    shorter: dimensionNumberToken(tokens, 'duration.fast'),
    short: dimensionNumberToken(tokens, 'duration.normal'),
    standard: dimensionNumberToken(tokens, 'duration.normal'),
    complex: dimensionNumberToken(tokens, 'duration.slow'),
    enteringScreen: dimensionNumberToken(tokens, 'duration.normal'),
    leavingScreen: dimensionNumberToken(tokens, 'duration.fast'),
  },
  easing: {
    easeInOut: tokenCssValue(tokens, 'easing.standard'),
    easeOut: tokenCssValue(tokens, 'easing.enter'),
    easeIn: tokenCssValue(tokens, 'easing.exit'),
    sharp: tokenCssValue(tokens, 'easing.emphasized'),
  },
});

const muiZIndex = (tokens: FlatTokenTheme) => ({
  mobileStepper: numberToken(tokens, 'zIndex.base'),
  fab: numberToken(tokens, 'zIndex.raised'),
  speedDial: numberToken(tokens, 'zIndex.raised'),
  appBar: numberToken(tokens, 'zIndex.sticky'),
  drawer: numberToken(tokens, 'zIndex.overlay'),
  modal: numberToken(tokens, 'zIndex.modal'),
  snackbar: numberToken(tokens, 'zIndex.toast'),
  tooltip: numberToken(tokens, 'zIndex.tooltip'),
});

const muiTypography = (tokens: FlatTokenTheme) => ({
  fontFamily: formatCssValue(tokenValue(tokens, 'typography.family.sans'), 'fontFamily'),
  fontSize: dimensionNumberToken(tokens, 'typography.size.sm'),
  htmlFontSize: dimensionNumberToken(tokens, 'typography.size.md'),
  fontWeightLight: numberToken(tokens, 'typography.weight.light'),
  fontWeightRegular: numberToken(tokens, 'typography.weight.normal'),
  fontWeightMedium: numberToken(tokens, 'typography.weight.medium'),
  fontWeightBold: numberToken(tokens, 'typography.weight.bold'),
  h1: typographyCss(tokens, 'typography.display'),
  h2: typographyCss(tokens, 'typography.title'),
  h3: typographyCss(tokens, 'typography.heading'),
  h4: typographyCss(tokens, 'typography.subheading'),
  h5: typographyCss(tokens, 'typography.subheading'),
  h6: typographyCss(tokens, 'typography.label'),
  subtitle1: typographyCss(tokens, 'typography.body'),
  subtitle2: typographyCss(tokens, 'typography.bodySmall'),
  body1: typographyCss(tokens, 'typography.body'),
  body2: typographyCss(tokens, 'typography.bodySmall'),
  button: {
    ...typographyCss(tokens, 'typography.label'),
    textTransform: 'none',
  },
  caption: typographyCss(tokens, 'typography.caption'),
  overline: {
    ...typographyCss(tokens, 'typography.caption'),
    textTransform: 'uppercase',
  },
  inherit: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
  },
});

export const buildMuiTheme = (theme: ThemeName, tokens: FlatTokenTheme): MuiThemeOptions => ({
  breakpoints: muiBreakpoints(tokens),
  palette: {
    mode: themeMode(theme),
    contrastThreshold: MUI_CONTRAST_THRESHOLD,
    tonalOffset: MUI_TONAL_OFFSET,
    common: {
      black: colorToken(tokens, 'color.common.black'),
      white: colorToken(tokens, 'color.common.white'),
    },
    grey: muiGrey(tokens),
    primary: muiControlPalette(tokens, 'primary'),
    secondary: muiControlPalette(tokens, 'secondary'),
    success: {
      main: colorToken(tokens, 'color.success.solid'),
      dark: colorToken(tokens, 'color.success.solidHover'),
      light: colorToken(tokens, 'color.success.soft'),
      contrastText: colorToken(tokens, 'color.success.contrast'),
    },
    warning: {
      main: colorToken(tokens, 'color.warning.solid'),
      dark: colorToken(tokens, 'color.warning.solidHover'),
      light: colorToken(tokens, 'color.warning.soft'),
      contrastText: colorToken(tokens, 'color.warning.contrast'),
    },
    error: {
      main: colorToken(tokens, 'color.danger.solid'),
      dark: colorToken(tokens, 'color.danger.solidHover'),
      light: colorToken(tokens, 'color.danger.soft'),
      contrastText: colorToken(tokens, 'color.danger.contrast'),
    },
    info: {
      main: colorToken(tokens, 'color.info.solid'),
      dark: colorToken(tokens, 'color.info.solidHover'),
      light: colorToken(tokens, 'color.info.soft'),
      contrastText: colorToken(tokens, 'color.info.contrast'),
    },
    background: {
      default: colorToken(tokens, 'color.surface.canvas'),
      paper: colorToken(tokens, 'color.surface.panel'),
    },
    text: {
      primary: colorToken(tokens, 'color.text.primary'),
      secondary: colorToken(tokens, 'color.text.secondary'),
      disabled: colorToken(tokens, 'color.text.muted'),
    },
    divider: colorToken(tokens, 'color.border.subtle'),
    action: {
      active: colorToken(tokens, 'color.action.active'),
      hover: colorToken(tokens, 'color.action.hover'),
      hoverOpacity: numberToken(tokens, 'opacity.action.hover'),
      selected: colorToken(tokens, 'color.action.selected'),
      selectedOpacity: numberToken(tokens, 'opacity.action.selected'),
      disabled: colorToken(tokens, 'color.action.disabled'),
      disabledOpacity: numberToken(tokens, 'opacity.action.disabled'),
      disabledBackground: colorToken(tokens, 'color.action.disabledBackground'),
      focus: colorToken(tokens, 'color.action.focus'),
      focusOpacity: numberToken(tokens, 'opacity.action.focus'),
      activatedOpacity: numberToken(tokens, 'opacity.action.activated'),
    },
  },
  typography: muiTypography(tokens),
  spacing: dimensionNumberToken(tokens, 'space.1'),
  shape: {
    borderRadius: dimensionNumberToken(tokens, 'radius.md'),
  },
  shadows: muiShadows(tokens),
  transitions: muiTransitions(tokens),
  zIndex: muiZIndex(tokens),
  components: {
    MuiButton: muiButtonOverrides(tokens),
    MuiChip: muiChipOverrides(tokens),
    MuiCssBaseline: {
      styleOverrides: [
        NORMALIZE_CSS_WITH_LOW_SPECIFICITY_BODY,
        `
:where(body) {
  background-color: ${colorToken(tokens, 'color.surface.canvas')};
  color: ${colorToken(tokens, 'color.text.primary')};
  font-family: ${formatCssValue(tokenValue(tokens, 'typography.family.sans'), 'fontFamily')};
}

*::selection {
  background-color: ${colorToken(tokens, 'color.brand.soft')};
  color: ${colorToken(tokens, 'color.brand.fg')};
}

:focus-visible {
  outline-color: ${colorToken(tokens, 'color.border.focus')};
  outline-offset: ${dimensionCssToken(tokens, 'space.1')};
}

::placeholder {
  color: ${colorToken(tokens, 'color.text.muted')};
  opacity: ${numberToken(tokens, 'opacity.muted')};
}
`.trim(),
      ].join('\n\n'),
    },
  },
});
