import { formatColor, formatCssValue, formatDimension, formatShadow } from './format.ts';
import type { Shadows } from '@mui/material/styles';
import type {
  ColorValue,
  DimensionValue,
  FlatTokenTheme,
  MuiThemeOptions,
  ShadowValue,
  ThemeName,
  TokenValue,
  TypographyValue,
} from './types.ts';

const tokenValue = (tokens: FlatTokenTheme, name: string): TokenValue => {
  const token = tokens[name];
  if (!token) throw new Error(`Missing token "${name}"`);

  return token.$value;
};

const colorToken = (tokens: FlatTokenTheme, name: string): string =>
  formatColor(tokenValue(tokens, name) as ColorValue);

const dimensionToken = (tokens: FlatTokenTheme, name: string): DimensionValue =>
  tokenValue(tokens, name) as unknown as DimensionValue;

const dimensionCssToken = (tokens: FlatTokenTheme, name: string): string =>
  formatDimension(dimensionToken(tokens, name));

const dimensionNumberToken = (tokens: FlatTokenTheme, name: string): number =>
  dimensionToken(tokens, name).value;

const numberToken = (tokens: FlatTokenTheme, name: string): number =>
  Number(tokenValue(tokens, name));

const typographyToken = (tokens: FlatTokenTheme, name: string): TypographyValue =>
  tokenValue(tokens, name) as TypographyValue;

const typographyCss = (tokens: FlatTokenTheme, name: string): Record<string, string | number> => {
  const typography = typographyToken(tokens, name);

  return {
    fontFamily: formatCssValue(typography.fontFamily, 'fontFamily'),
    fontSize: formatCssValue(typography.fontSize, 'dimension'),
    fontWeight: formatCssValue(typography.fontWeight, 'fontWeight'),
    lineHeight: formatCssValue(typography.lineHeight, 'number'),
    letterSpacing: formatCssValue(typography.letterSpacing, 'dimension'),
  };
};

const shadowToken = (tokens: FlatTokenTheme, name: string): string =>
  formatShadow(tokenValue(tokens, name) as unknown as ShadowValue);

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

const muiShadows = (tokens: FlatTokenTheme): Shadows => {
  const none = shadowToken(tokens, 'shadowScale.none');
  const xs = shadowToken(tokens, 'shadowScale.xs');
  const sm = shadowToken(tokens, 'shadow.sm');
  const md = shadowToken(tokens, 'shadow.md');
  const lg = shadowToken(tokens, 'shadow.lg');
  const xl = shadowToken(tokens, 'shadowScale.xl');

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

export const buildMuiTheme = (theme: ThemeName, tokens: FlatTokenTheme): MuiThemeOptions => ({
  palette: {
    mode: theme,
    contrastThreshold: numberToken(tokens, 'adapter.mui.palette.contrastThreshold'),
    tonalOffset: {
      light: numberToken(tokens, 'adapter.mui.palette.tonalOffset.light'),
      dark: numberToken(tokens, 'adapter.mui.palette.tonalOffset.dark'),
    },
    common: {
      black: colorToken(tokens, 'color.common.black'),
      white: colorToken(tokens, 'color.common.white'),
    },
    grey: muiGrey(tokens),
    primary: {
      main: colorToken(tokens, 'color.brand.solid'),
      dark: colorToken(tokens, 'color.brand.hard'),
      light: colorToken(tokens, 'color.brand.soft'),
      contrastText: colorToken(tokens, 'color.brand.contrastText'),
    },
    secondary: {
      main: colorToken(tokens, 'color.accent.solid'),
      dark: colorToken(tokens, 'color.accent.hard'),
      light: colorToken(tokens, 'color.accent.soft'),
      contrastText: colorToken(tokens, 'color.accent.contrastText'),
    },
    success: {
      main: colorToken(tokens, 'color.state.success.solid'),
      dark: colorToken(tokens, 'color.state.success.hard'),
      light: colorToken(tokens, 'color.state.success.soft'),
      contrastText: colorToken(tokens, 'color.state.success.contrastText'),
    },
    warning: {
      main: colorToken(tokens, 'color.state.warning.solid'),
      dark: colorToken(tokens, 'color.state.warning.hard'),
      light: colorToken(tokens, 'color.state.warning.soft'),
      contrastText: colorToken(tokens, 'color.state.warning.contrastText'),
    },
    error: {
      main: colorToken(tokens, 'color.state.danger.solid'),
      dark: colorToken(tokens, 'color.state.danger.hard'),
      light: colorToken(tokens, 'color.state.danger.soft'),
      contrastText: colorToken(tokens, 'color.state.danger.contrastText'),
    },
    info: {
      main: colorToken(tokens, 'color.state.info.solid'),
      dark: colorToken(tokens, 'color.state.info.hard'),
      light: colorToken(tokens, 'color.state.info.soft'),
      contrastText: colorToken(tokens, 'color.state.info.contrastText'),
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
  typography: {
    fontFamily: formatCssValue(tokenValue(tokens, 'typography.family.sans'), 'fontFamily'),
    h1: typographyCss(tokens, 'typography.display'),
    h2: typographyCss(tokens, 'typography.title'),
    h3: typographyCss(tokens, 'typography.heading'),
    h4: typographyCss(tokens, 'typography.subheading'),
    body1: typographyCss(tokens, 'typography.body'),
    body2: typographyCss(tokens, 'typography.label'),
    button: {
      ...typographyCss(tokens, 'typography.label'),
      textTransform: 'none',
    },
    caption: typographyCss(tokens, 'typography.caption'),
  },
  spacing: dimensionNumberToken(tokens, 'space.1'),
  shape: {
    borderRadius: dimensionNumberToken(tokens, 'radius.md'),
  },
  shadows: muiShadows(tokens),
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          ...typographyCss(tokens, 'button.typography'),
          minHeight: dimensionCssToken(tokens, 'button.height.md'),
          borderRadius: dimensionCssToken(tokens, 'button.radius'),
          paddingInline: dimensionCssToken(tokens, 'button.paddingX.md'),
          gap: dimensionCssToken(tokens, 'button.gap'),
          textTransform: 'none',
          '&.Mui-disabled': { opacity: numberToken(tokens, 'button.disabledOpacity') },
          '&.Mui-focusVisible': { boxShadow: shadowToken(tokens, 'button.focusRing') },
        },
        containedPrimary: {
          backgroundColor: colorToken(tokens, 'button.primary.background'),
          color: colorToken(tokens, 'button.primary.text'),
          '&:hover': { backgroundColor: colorToken(tokens, 'button.primary.backgroundHover') },
        },
        outlined: {
          borderColor: colorToken(tokens, 'button.secondary.border'),
          color: colorToken(tokens, 'button.secondary.text'),
          backgroundColor: colorToken(tokens, 'button.secondary.background'),
        },
        text: {
          color: colorToken(tokens, 'button.quiet.text'),
          '&:hover': { backgroundColor: colorToken(tokens, 'button.quiet.backgroundHover') },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colorToken(tokens, 'card.background'),
          border: `1px solid ${colorToken(tokens, 'card.border')}`,
          borderRadius: dimensionCssToken(tokens, 'card.radius'),
          boxShadow: shadowToken(tokens, 'card.shadow'),
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          minHeight: dimensionCssToken(tokens, 'input.height'),
          backgroundColor: colorToken(tokens, 'input.background'),
          borderRadius: dimensionCssToken(tokens, 'input.radius'),
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { borderColor: colorToken(tokens, 'input.border') },
        root: {
          minHeight: dimensionCssToken(tokens, 'input.height'),
          borderRadius: dimensionCssToken(tokens, 'input.radius'),
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colorToken(tokens, 'input.borderFocus'),
          },
        },
        input: {
          paddingBlock: dimensionCssToken(tokens, 'input.paddingY'),
          paddingInline: dimensionCssToken(tokens, 'input.paddingX'),
        },
      },
    },
    MuiSelect: {
      defaultProps: { size: 'small' },
      styleOverrides: {
        select: {
          paddingBlock: dimensionCssToken(tokens, 'input.paddingY'),
          paddingInlineStart: dimensionCssToken(tokens, 'input.paddingX'),
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          ...typographyCss(tokens, 'chip.typography'),
          minHeight: dimensionCssToken(tokens, 'chip.height'),
          borderRadius: dimensionCssToken(tokens, 'chip.radius'),
          paddingInline: dimensionCssToken(tokens, 'chip.paddingX'),
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: dimensionCssToken(tokens, 'alert.radius'),
          padding: dimensionCssToken(tokens, 'alert.padding'),
        },
        standardSuccess: {
          backgroundColor: colorToken(tokens, 'alert.success.background'),
          color: colorToken(tokens, 'alert.success.text'),
          border: `1px solid ${colorToken(tokens, 'alert.success.border')}`,
        },
        standardWarning: {
          backgroundColor: colorToken(tokens, 'alert.warning.background'),
          color: colorToken(tokens, 'alert.warning.text'),
          border: `1px solid ${colorToken(tokens, 'alert.warning.border')}`,
        },
        standardError: {
          backgroundColor: colorToken(tokens, 'alert.danger.background'),
          color: colorToken(tokens, 'alert.danger.text'),
          border: `1px solid ${colorToken(tokens, 'alert.danger.border')}`,
        },
        standardInfo: {
          backgroundColor: colorToken(tokens, 'alert.info.background'),
          color: colorToken(tokens, 'alert.info.text'),
          border: `1px solid ${colorToken(tokens, 'alert.info.border')}`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: colorToken(tokens, 'dialog.background'),
          border: `1px solid ${colorToken(tokens, 'dialog.border')}`,
          borderRadius: dimensionCssToken(tokens, 'dialog.radius'),
          boxShadow: shadowToken(tokens, 'dialog.shadow'),
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        track: { backgroundColor: colorToken(tokens, 'switch.trackBackground') },
        thumb: {
          backgroundColor: colorToken(tokens, 'switch.thumbBackground'),
          boxShadow: shadowToken(tokens, 'switch.shadow'),
        },
        switchBase: {
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: colorToken(tokens, 'switch.trackBackgroundChecked'),
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          ...typographyCss(tokens, 'table.cellTypography'),
          borderColor: colorToken(tokens, 'table.border'),
          paddingBlock: dimensionCssToken(tokens, 'table.cellPaddingY'),
          paddingInline: dimensionCssToken(tokens, 'table.cellPaddingX'),
          color: colorToken(tokens, 'table.cellText'),
        },
        head: {
          ...typographyCss(tokens, 'table.headerTypography'),
          color: colorToken(tokens, 'table.headerText'),
        },
      },
    },
  },
});
