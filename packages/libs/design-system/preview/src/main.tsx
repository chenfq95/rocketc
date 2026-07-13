import '../styles.css';
import '../../dist/css/light.css';
import '../../dist/css/dark.css';

import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  AppBar,
  Autocomplete,
  Avatar,
  AvatarGroup,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Breadcrumbs,
  Button,
  ButtonBase,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Collapse,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  GridLegacy,
  Icon,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  MenuItem,
  MenuList,
  MobileStepper,
  NativeSelect,
  NoSsr,
  OutlinedInput,
  Pagination,
  PaginationItem,
  Paper,
  Radio,
  RadioGroup,
  Rating,
  ScopedCssBaseline,
  Select,
  Skeleton,
  Slider,
  SnackbarContent,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Step,
  StepButton,
  StepConnector,
  StepContent,
  StepIcon,
  StepLabel,
  Stepper,
  SvgIcon,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tabs,
  TextField,
  TextareaAutosize,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
} from '@mui/material';
import type { ThemeOptions } from '@mui/material/styles';
import { StrictMode, useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';

import { darkMuiTheme, lightMuiTheme } from '../../dist/mui';

type PreviewTab = 'primitive' | 'plain-html' | 'mui';
type ThemeMode = 'light' | 'dark';

const tabs: Array<{ label: string; value: PreviewTab }> = [
  { label: 'Primitive', value: 'primitive' },
  { label: 'Plain HTML', value: 'plain-html' },
  { label: 'MUI', value: 'mui' },
];

const colorRoles = [
  ['Brand solid', 'brand.solid', 'var(--rds-color-brand-solid)'],
  ['Brand hard', 'brand.hard', 'var(--rds-color-brand-hard)'],
  ['Brand soft', 'brand.soft', 'var(--rds-color-brand-soft)'],
  ['Brand text', 'brand.text', 'var(--rds-color-brand-text)'],
  ['Brand border', 'brand.border', 'var(--rds-color-brand-border)'],
  ['Brand contrast', 'brand.contrastText', 'var(--rds-color-brand-contrast-text)'],
  ['Accent solid', 'accent.solid', 'var(--rds-color-accent-solid)'],
  ['Accent hard', 'accent.hard', 'var(--rds-color-accent-hard)'],
  ['Accent soft', 'accent.soft', 'var(--rds-color-accent-soft)'],
  ['Accent text', 'accent.text', 'var(--rds-color-accent-text)'],
  ['Accent border', 'accent.border', 'var(--rds-color-accent-border)'],
  ['Accent contrast', 'accent.contrastText', 'var(--rds-color-accent-contrast-text)'],
  ['Success solid', 'state.success.solid', 'var(--rds-color-state-success-solid)'],
  ['Success hard', 'state.success.hard', 'var(--rds-color-state-success-hard)'],
  ['Success soft', 'state.success.soft', 'var(--rds-color-state-success-soft)'],
  [
    'Success contrast',
    'state.success.contrastText',
    'var(--rds-color-state-success-contrast-text)',
  ],
  ['Warning solid', 'state.warning.solid', 'var(--rds-color-state-warning-solid)'],
  ['Warning hard', 'state.warning.hard', 'var(--rds-color-state-warning-hard)'],
  ['Warning soft', 'state.warning.soft', 'var(--rds-color-state-warning-soft)'],
  [
    'Warning contrast',
    'state.warning.contrastText',
    'var(--rds-color-state-warning-contrast-text)',
  ],
  ['Info solid', 'state.info.solid', 'var(--rds-color-state-info-solid)'],
  ['Info hard', 'state.info.hard', 'var(--rds-color-state-info-hard)'],
  ['Info soft', 'state.info.soft', 'var(--rds-color-state-info-soft)'],
  ['Info contrast', 'state.info.contrastText', 'var(--rds-color-state-info-contrast-text)'],
  ['Danger solid', 'state.danger.solid', 'var(--rds-color-state-danger-solid)'],
  ['Danger hard', 'state.danger.hard', 'var(--rds-color-state-danger-hard)'],
  ['Danger soft', 'state.danger.soft', 'var(--rds-color-state-danger-soft)'],
  ['Danger contrast', 'state.danger.contrastText', 'var(--rds-color-state-danger-contrast-text)'],
  ['Action active', 'action.active', 'var(--rds-color-action-active)'],
  ['Action hover', 'action.hover', 'var(--rds-color-action-hover)'],
  ['Action selected', 'action.selected', 'var(--rds-color-action-selected)'],
  ['Action disabled', 'action.disabled', 'var(--rds-color-action-disabled)'],
  [
    'Action disabled bg',
    'action.disabledBackground',
    'var(--rds-color-action-disabled-background)',
  ],
  ['Action focus', 'action.focus', 'var(--rds-color-action-focus)'],
  ['Canvas', 'surface.canvas', 'var(--rds-color-surface-canvas)'],
  ['Panel', 'surface.panel', 'var(--rds-color-surface-panel)'],
  ['Raised', 'surface.raised', 'var(--rds-color-surface-raised)'],
  ['Inverse', 'surface.inverse', 'var(--rds-color-surface-inverse)'],
  ['Text primary', 'text.primary', 'var(--rds-color-text-primary)'],
  ['Text secondary', 'text.secondary', 'var(--rds-color-text-secondary)'],
  ['Text muted', 'text.muted', 'var(--rds-color-text-muted)'],
  ['Text inverse', 'text.inverse', 'var(--rds-color-text-inverse)'],
  ['Border subtle', 'border.subtle', 'var(--rds-color-border-subtle)'],
  ['Border default', 'border.default', 'var(--rds-color-border-default)'],
  ['Border strong', 'border.strong', 'var(--rds-color-border-strong)'],
  ['Border focus', 'border.focus', 'var(--rds-color-border-focus)'],
  ['Common black', 'common.black', 'var(--rds-color-common-black)'],
  ['Common white', 'common.white', 'var(--rds-color-common-white)'],
];

const colorScales = ['neutral', 'orange', 'coral', 'cyan', 'green', 'blue', 'amber', 'red'];
const colorSteps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

const plainTypographyRoles = [
  ['Display', 'typography.display', 'display', 'Expressive Personal UI'],
  ['Title', 'typography.title', 'title', 'Design tokens that travel across frameworks'],
  ['Heading', 'typography.heading', 'heading', 'Controls composed from token roles'],
  ['Subheading', 'typography.subheading', 'subheading', 'Framework adapters'],
  ['Body', 'typography.body', 'body', 'Interface text stays direct, compact, and readable.'],
  ['Body Strong', 'typography.bodyStrong', 'body-strong', 'Important interface text'],
  ['Label', 'typography.label', 'label', 'Workspace name'],
  ['Caption', 'typography.caption', 'caption', 'Generated from semantic typography tokens'],
  ['Code', 'typography.code', 'code', 'color.brand.solid'],
];

const muiTypographyVariants = [
  ['h1', 'Expressive Personal UI'],
  ['h2', 'Design tokens that travel across frameworks'],
  ['h3', 'Controls composed from token roles'],
  ['h4', 'Framework adapters'],
  ['body1', 'Interface text stays direct, compact, and readable.'],
  ['body2', 'Secondary interface text for dense surfaces.'],
  ['button', 'Primary action'],
  ['caption', 'Generated from MUI ThemeOptions typography'],
] as const;

const muiPaletteRoles = [
  ['Primary main', 'primary.main'],
  ['Primary dark', 'primary.dark'],
  ['Primary light', 'primary.light'],
  ['Secondary main', 'secondary.main'],
  ['Secondary dark', 'secondary.dark'],
  ['Secondary light', 'secondary.light'],
  ['Success main', 'success.main'],
  ['Success dark', 'success.dark'],
  ['Success light', 'success.light'],
  ['Warning main', 'warning.main'],
  ['Warning dark', 'warning.dark'],
  ['Warning light', 'warning.light'],
  ['Error main', 'error.main'],
  ['Error dark', 'error.dark'],
  ['Error light', 'error.light'],
  ['Info main', 'info.main'],
  ['Info dark', 'info.dark'],
  ['Info light', 'info.light'],
  ['Background default', 'background.default'],
  ['Background paper', 'background.paper'],
  ['Text primary', 'text.primary'],
  ['Text secondary', 'text.secondary'],
  ['Text disabled', 'text.disabled'],
  ['Divider', 'divider'],
  ['Action active', 'action.active'],
  ['Action hover', 'action.hover'],
  ['Action selected', 'action.selected'],
  ['Action disabled', 'action.disabled'],
  ['Action disabled bg', 'action.disabledBackground'],
  ['Action focus', 'action.focus'],
] as const;

const overlayAndUtilityComponents = [
  'Backdrop',
  'ClickAwayListener',
  'Drawer',
  'Fade',
  'GlobalStyles',
  'Grow',
  'Menu',
  'Modal',
  'Popover',
  'Popper',
  'Portal',
  'Slide',
  'Snackbar',
  'SwipeableDrawer',
  'TabScrollButton',
  'TablePaginationActions',
  'Unstable_TrapFocus',
  'Zoom',
  'darkScrollbar',
  'generateUtilityClass',
  'generateUtilityClasses',
  'useAutocomplete',
  'useMediaQuery',
  'useScrollTrigger',
];

const tokenGroup = (token: string): string => {
  const [namespace, role] = token.split('.');

  return namespace === 'state' && role ? `${namespace}.${role}` : (namespace ?? token);
};

const startsTokenGroup = (items: readonly (readonly string[])[], index: number) => {
  const current = items[index]?.[1];
  const previous = items[index - 1]?.[1];

  return Boolean(index > 0 && current && previous && tokenGroup(current) !== tokenGroup(previous));
};

function MuiPreviewIcon() {
  return (
    <SvgIcon fontSize="small" viewBox="0 0 24 24">
      <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.3 6.7 3.7L12 11.7 5.3 8 12 4.3ZM5 9.8l6 3.3v6.1l-6-3.3V9.8Zm8 9.4v-6.1l6-3.3v6.1l-6 3.3Z" />
    </SvgIcon>
  );
}

function App() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [activeTab, setActiveTab] = useState<PreviewTab>('primitive');

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const muiTheme = useMemo(
    () => createTheme((mode === 'dark' ? darkMuiTheme : lightMuiTheme) as ThemeOptions),
    [mode],
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <main className="shell">
        <header className="hero">
          <div>
            <p className="eyebrow">Rocketc Design System</p>
            <h1>Expressive Personal UI</h1>
            <p className="lede">
              A framework-agnostic visual system for personal products, tools, dashboards, and
              content surfaces.
            </p>
          </div>
          <div className="hero-actions" aria-label="Theme controls">
            <button
              className="theme-switch"
              type="button"
              role="switch"
              aria-checked={mode === 'dark'}
              onClick={() => setMode((current) => (current === 'dark' ? 'light' : 'dark'))}
            >
              <span className="theme-switch-track" aria-hidden="true">
                <span className="theme-switch-thumb" />
              </span>
              <span className="theme-switch-label">Dark</span>
            </button>
          </div>
        </header>

        <nav className="tabs" aria-label="Preview sections">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`tab${activeTab === tab.value ? ' is-active' : ''}`}
              type="button"
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <section className={`tab-panel${activeTab === 'primitive' ? ' is-active' : ''}`}>
          <PrimitivePanel />
        </section>

        <section className={`tab-panel${activeTab === 'plain-html' ? ' is-active' : ''}`}>
          <PlainHtmlPanel />
        </section>

        <section className={`tab-panel${activeTab === 'mui' ? ' is-active' : ''}`}>
          <MuiPanel />
        </section>
      </main>
    </ThemeProvider>
  );
}

function PlainHtmlPanel() {
  return (
    <div className="overview-layout" aria-label="Plain HTML preview">
      <article className="panel feature overview-section">
        <div className="panel-header">
          <div>
            <p className="meta">Plain HTML</p>
            <h2>Brand, accent, and state roles</h2>
          </div>
          <span className="badge">Semantic</span>
        </div>
        <p>
          Color is assigned by role first. Brand color carries identity and primary actions; accent
          and state colors keep emphasis and feedback separate.
        </p>
        <div className="overview-swatches">
          {colorRoles.map(([label, token, color], index) => (
            <div
              className={startsTokenGroup(colorRoles, index) ? 'starts-color-group' : undefined}
              key={token}
              style={{ '--swatch-color': color } as CSSProperties}
            >
              <span />
              <strong>{label}</strong>
              <code>{token}</code>
            </div>
          ))}
        </div>
      </article>

      <article className="panel overview-section">
        <div className="panel-header">
          <div>
            <p className="meta">Typography</p>
            <h2>Clear hierarchy for tools and docs</h2>
          </div>
        </div>
        <div className="overview-type">
          {plainTypographyRoles.map(([label, token, cssName, sample]) => (
            <div key={token}>
              <code>{label}</code>
              <span
                className="type-sample"
                style={
                  {
                    fontFamily: `var(--rds-typography-${cssName}-font-family)`,
                    fontSize: `var(--rds-typography-${cssName}-font-size)`,
                    fontWeight: `var(--rds-typography-${cssName}-font-weight)`,
                    lineHeight: `var(--rds-typography-${cssName}-line-height)`,
                    letterSpacing: `var(--rds-typography-${cssName}-letter-spacing)`,
                  } as CSSProperties
                }
              >
                {sample}
              </span>
              <code>{token}</code>
            </div>
          ))}
        </div>
      </article>

      <article className="panel overview-section overview-section-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Components</p>
            <h2>Controls composed from the same token roles</h2>
          </div>
          <span className="badge">Portable</span>
        </div>
        <div className="overview-components">
          <div className="component-demo">
            <h3>Actions</h3>
            <div className="button-row">
              <button className="button primary" type="button">
                Primary action
              </button>
              <button className="button secondary" type="button">
                Secondary
              </button>
              <button className="button quiet" type="button">
                Quiet
              </button>
            </div>
            <div className="status-list">
              <span className="status success">Success</span>
              <span className="status warning">Warning</span>
              <span className="status danger">Danger</span>
              <span className="status info">Info</span>
            </div>
          </div>

          <div className="component-demo">
            <h3>Inputs</h3>
            <label className="field">
              <span>Workspace name</span>
              <input readOnly value="Rocketc Studio" />
            </label>
            <label className="field">
              <span>Status</span>
              <select defaultValue="Designing tokens">
                <option>Designing tokens</option>
                <option>Building assets</option>
                <option>Ready to ship</option>
              </select>
            </label>
          </div>

          <div className="component-demo">
            <h3>Selection</h3>
            <div className="choice-list">
              <button className="choice-row is-selected" type="button">
                <span className="choice-indicator checkmark" />
                <span>
                  <strong>CSS variables</strong>
                  <em>Generate light and dark CSS outputs.</em>
                </span>
              </button>
              <button className="choice-row" type="button">
                <span className="choice-indicator checkmark" />
                <span>
                  <strong>Material UI theme</strong>
                  <em>Use generated theme options at runtime.</em>
                </span>
              </button>
            </div>
            <div className="segmented-control" aria-label="Preview adapter">
              <span className="is-selected">Tokens</span>
              <span>CSS</span>
              <span>MUI</span>
            </div>
          </div>

          <div className="component-demo">
            <h3>Status</h3>
            <div className="alert success">
              <strong>Build complete</strong>
              <span>Token outputs were generated successfully.</span>
            </div>
            <div className="alert warning">
              <strong>Review needed</strong>
              <span>Contrast should be checked before release.</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function PrimitivePanel() {
  return (
    <div className="primitive-layout">
      <article className="panel primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Primitive color</p>
            <h2>Raw color scales</h2>
          </div>
          <span className="badge">Source values</span>
        </div>
        <div className="primitive-color-stack">
          {colorScales.map((scale) => (
            <div className="primitive-row" key={scale}>
              <strong>{scale}</strong>
              <div className="primitive-scale">
                {(scale === 'neutral' ? ['0', ...colorSteps] : colorSteps).map((step) => (
                  <span
                    key={step}
                    style={
                      { '--swatch-color': `var(--rds-color-${scale}-${step})` } as CSSProperties
                    }
                  >
                    {step}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="panel primitive-panel primitive-panel-wide">
        <div className="panel-header">
          <div>
            <p className="meta">Primitive dimension</p>
            <h2>Spacing, radius, and shadow</h2>
          </div>
        </div>
        <div className="primitive-measure-grid">
          <div className="measure-list">
            <h3>Space</h3>
            {['1', '2', '4', '8', '16'].map((step) => (
              <div
                className="measure-item"
                key={step}
                style={{ '--measure': `var(--rds-space-${step})` } as CSSProperties}
              >
                <code>space.{step}</code>
                <span />
                <em>{Number(step) * 4}px</em>
              </div>
            ))}
          </div>
          <div className="measure-list">
            <h3>Radius</h3>
            <div className="radius-grid">
              {['xs', 'sm', 'md', 'lg', '2xl', 'full'].map((radius) => (
                <span
                  key={radius}
                  style={{ '--radius': `var(--rds-radius-${radius})` } as CSSProperties}
                >
                  <code>{radius}</code>
                </span>
              ))}
            </div>
          </div>
          <div className="measure-list">
            <h3>Shadow</h3>
            <div className="shadow-grid">
              {['xs', 'sm', 'md', 'lg'].map((shadow) => (
                <span
                  key={shadow}
                  style={
                    { '--shadow-sample': `var(--rds-shadow-scale-${shadow})` } as CSSProperties
                  }
                >
                  <code>{shadow}</code>
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function MuiPanel() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="mui-layout">
      <Box className="mui-overview-layout">
        <Paper className="mui-showcase mui-section" variant="outlined">
          <Box className="mui-section-header">
            <Typography variant="overline">Color</Typography>
            <Typography variant="h2">Palette roles</Typography>
          </Box>

          <Box className="mui-color-grid">
            {muiPaletteRoles.map(([label, color], index) => (
              <Box
                className={`mui-color-swatch${
                  startsTokenGroup(muiPaletteRoles, index) ? ' starts-color-group' : ''
                }`}
                key={color}
              >
                <Box sx={{ bgcolor: color }} />
                <Typography variant="body2">{label}</Typography>
                <Typography color="text.secondary" variant="caption">
                  {color}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        <Paper className="mui-showcase mui-section" variant="outlined">
          <Box className="mui-section-header">
            <Typography variant="overline">Typography</Typography>
            <Typography variant="h2">MUI variants</Typography>
          </Box>

          <Stack className="mui-type-list" spacing={2}>
            {muiTypographyVariants.map(([variant, sample]) => (
              <Box key={variant}>
                <Typography color="text.secondary" variant="caption">
                  {variant}
                </Typography>
                <Typography variant={variant}>{sample}</Typography>
              </Box>
            ))}
          </Stack>
        </Paper>

        <Paper className="mui-showcase mui-section mui-section-wide" variant="outlined">
          <Box className="mui-section-header">
            <Typography variant="overline">Components</Typography>
            <Typography variant="h2">Runtime themed controls</Typography>
          </Box>

          <Box className="mui-grid">
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h3">Buttons</Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1.5}>
                    <Button variant="contained">Primary action</Button>
                    <Button variant="outlined">Secondary</Button>
                    <Button variant="text">Quiet action</Button>
                    <ButtonGroup variant="outlined">
                      <Button>Day</Button>
                      <Button>Week</Button>
                      <Button>Month</Button>
                    </ButtonGroup>
                    <Tooltip arrow title="IconButton">
                      <IconButton color="primary">
                        <MuiPreviewIcon />
                      </IconButton>
                    </Tooltip>
                    <Fab color="primary" size="small">
                      <MuiPreviewIcon />
                    </Fab>
                    <ButtonBase className="mui-button-base">ButtonBase</ButtonBase>
                    <Button disabled variant="contained">
                      Disabled
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h3">Inputs and Selectors</Typography>
                  <TextField label="Workspace" defaultValue="Rocketc Studio" />
                  <FormControl>
                    <InputLabel htmlFor="mui-input">Input</InputLabel>
                    <Input id="mui-input" defaultValue="Primitive input" />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="mui-filled">FilledInput</InputLabel>
                    <FilledInput id="mui-filled" defaultValue="Filled input" />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="mui-outlined">OutlinedInput</InputLabel>
                    <OutlinedInput
                      id="mui-outlined"
                      defaultValue="Outlined input"
                      endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                      label="OutlinedInput"
                    />
                  </FormControl>
                  <InputBase placeholder="InputBase" />
                  <TextField select label="Adapter" defaultValue="mui">
                    <MenuItem value="css">CSS variables</MenuItem>
                    <MenuItem value="mui">Material UI</MenuItem>
                    <MenuItem value="tailwind">Tailwind preset</MenuItem>
                  </TextField>
                  <FormControl>
                    <InputLabel id="mui-select-label">Select</InputLabel>
                    <Select label="Select" labelId="mui-select-label" defaultValue="tokens">
                      <MenuItem value="tokens">Tokens</MenuItem>
                      <MenuItem value="preview">Preview</MenuItem>
                    </Select>
                  </FormControl>
                  <NativeSelect defaultValue="plain">
                    <option value="plain">NativeSelect</option>
                    <option value="mui">MUI</option>
                  </NativeSelect>
                  <TextareaAutosize minRows={3} placeholder="TextareaAutosize" />
                  <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Switch" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Checkbox" />
                    <FormLabel>RadioGroup</FormLabel>
                    <RadioGroup defaultValue="light" row>
                      <FormControlLabel control={<Radio />} label="Light" value="light" />
                      <FormControlLabel control={<Radio />} label="Dark" value="dark" />
                    </RadioGroup>
                    <FormHelperText>FormHelperText follows selector groups.</FormHelperText>
                  </FormGroup>
                  <Autocomplete
                    options={['Material UI', 'CSS variables', 'Design tokens']}
                    renderInput={(params) => <TextField {...params} label="Autocomplete" />}
                    defaultValue="Material UI"
                  />
                  <Slider defaultValue={64} />
                  <Rating defaultValue={4} />
                  <ToggleButtonGroup exclusive value="center">
                    <ToggleButton value="left">Left</ToggleButton>
                    <ToggleButton value="center">Center</ToggleButton>
                    <ToggleButton value="right">Right</ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h3">Feedback</Typography>
                  <Alert severity="success">
                    <AlertTitle>AlertTitle</AlertTitle>
                    MUI theme object is loaded.
                  </Alert>
                  <Alert severity="error">Invalid token references should fail build.</Alert>
                  <LinearProgress />
                  <Stack alignItems="center" direction="row" gap={2}>
                    <CircularProgress size={28} />
                    <Skeleton height={32} variant="rounded" width={160} />
                  </Stack>
                  <SnackbarContent message="SnackbarContent preview" />
                  <Collapse in>
                    <Alert severity="info">Collapse transition content</Alert>
                  </Collapse>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h3">Data Display</Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    <Avatar>R</Avatar>
                    <AvatarGroup max={3}>
                      <Avatar>A</Avatar>
                      <Avatar>B</Avatar>
                      <Avatar>C</Avatar>
                      <Avatar>D</Avatar>
                    </AvatarGroup>
                    <Badge badgeContent={4} color="primary">
                      <Avatar>M</Avatar>
                    </Badge>
                  </Stack>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    <Chip color="primary" label="Tokens" />
                    <Chip color="secondary" label="MUI" />
                    <Chip label="CSS" variant="outlined" />
                  </Stack>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    <Chip color="primary" label="Primary" />
                    <Chip color="secondary" label="Secondary" />
                    <Chip color="success" label="Success" />
                    <Chip color="warning" label="Warning" />
                    <Chip color="error" label="Error" />
                    <Chip color="info" label="Info" />
                  </Stack>
                  <List dense subheader={<ListSubheader>ListSubheader</ListSubheader>}>
                    <ListItem disablePadding secondaryAction={<ListItemSecondaryAction />}>
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar>1</Avatar>
                        </ListItemAvatar>
                        <ListItemIcon>
                          <MuiPreviewIcon />
                        </ListItemIcon>
                        <ListItemText primary="ListItemText" secondary="ListItemButton" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                  <Typography variant="body2">
                    <Link href="#">Link</Link> and <Icon fontSize="small">star</Icon> use theme
                    color.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h3">Navigation</Typography>
                  <AppBar color="default" position="static">
                    <Toolbar variant="dense">
                      <Typography variant="h4">Toolbar</Typography>
                    </Toolbar>
                  </AppBar>
                  <Breadcrumbs>
                    <Link href="#">Home</Link>
                    <Link href="#">Design</Link>
                    <Typography color="text.primary">MUI</Typography>
                  </Breadcrumbs>
                  <Tabs value={1}>
                    <Tab label="Color" />
                    <Tab label="Components" />
                    <Tab label="Docs" />
                  </Tabs>
                  <BottomNavigation showLabels value={1}>
                    <BottomNavigationAction label="Tokens" />
                    <BottomNavigationAction label="Preview" />
                    <BottomNavigationAction label="Build" />
                  </BottomNavigation>
                  <Pagination
                    count={6}
                    page={2}
                    renderItem={(item) => <PaginationItem {...item} />}
                  />
                  <MobileStepper
                    activeStep={1}
                    backButton={<Button size="small">Back</Button>}
                    nextButton={<Button size="small">Next</Button>}
                    position="static"
                    steps={4}
                  />
                  <MenuList dense>
                    <MenuItem selected>MenuItem</MenuItem>
                    <MenuItem>MenuList</MenuItem>
                  </MenuList>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h3">Surfaces and Layout</Typography>
                  <Paper className="mui-paper-sample" variant="outlined">
                    Paper inside Card
                  </Paper>
                  <Container className="mui-container-sample" maxWidth="sm">
                    Container
                  </Container>
                  <Grid container spacing={1}>
                    <Grid size={6}>
                      <Paper className="mui-grid-cell" variant="outlined">
                        Grid
                      </Paper>
                    </Grid>
                    <Grid size={6}>
                      <Box className="mui-grid-cell">Box</Box>
                    </Grid>
                  </Grid>
                  <ScopedCssBaseline>
                    <Paper className="mui-paper-sample" variant="outlined">
                      ScopedCssBaseline
                    </Paper>
                  </ScopedCssBaseline>
                  <Card variant="outlined">
                    <CardActionArea>
                      <CardMedia className="mui-card-media" component="div" />
                    </CardActionArea>
                    <CardHeader title="CardHeader" subheader="Card subheader" />
                    <CardContent>
                      <Typography variant="body2">CardContent</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">CardActions</Button>
                    </CardActions>
                  </Card>
                  <Button variant="contained" onClick={() => setDialogOpen(true)}>
                    Open Dialog
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h3">Disclosure and Steps</Typography>
                  <Accordion defaultExpanded>
                    <AccordionSummary>AccordionSummary</AccordionSummary>
                    <AccordionDetails>AccordionDetails</AccordionDetails>
                    <AccordionActions>
                      <Button size="small">AccordionActions</Button>
                    </AccordionActions>
                  </Accordion>
                  <Stack alignItems="center" direction="row" gap={1}>
                    <StepIcon active icon={1} />
                    <Typography variant="body2">StepIcon</Typography>
                  </Stack>
                  <Stepper activeStep={1} orientation="vertical">
                    <Step>
                      <StepButton>StepButton</StepButton>
                    </Step>
                    <Step>
                      <StepLabel>StepLabel</StepLabel>
                      <StepContent>StepContent</StepContent>
                    </Step>
                    <Step>
                      <StepLabel>Review</StepLabel>
                    </Step>
                    <StepConnector />
                  </Stepper>
                  <GridLegacy container spacing={1}>
                    <GridLegacy item xs={6}>
                      <Paper className="mui-grid-cell" variant="outlined">
                        GridLegacy
                      </Paper>
                    </GridLegacy>
                    <GridLegacy item xs={6}>
                      <Paper className="mui-grid-cell" variant="outlined">
                        Legacy item
                      </Paper>
                    </GridLegacy>
                  </GridLegacy>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h3">Media</Typography>
                  <ImageList cols={3} rowHeight={72}>
                    {[1, 2, 3].map((item) => (
                      <ImageListItem key={item}>
                        <Box className="mui-image-sample" />
                        <ImageListItemBar title={`ImageListItem ${item}`} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Stack>
              </CardContent>
            </Card>

            <Card className="mui-component-wide" variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h3">Data Table</Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <TableSortLabel active direction="asc">
                              Component
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>Token source</TableCell>
                          <TableCell align="right">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[
                          ['MuiButton', 'component.button + semantic.color', 'Ready'],
                          ['MuiTextField', 'component.input + shadow.focus', 'Ready'],
                          ['MuiAlert', 'component.alert + state colors', 'Ready'],
                        ].map(([component, source, status]) => (
                          <TableRow key={component}>
                            <TableCell>{component}</TableCell>
                            <TableCell>{source}</TableCell>
                            <TableCell align="right">
                              <Chip color="primary" label={status} size="small" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            count={3}
                            onPageChange={() => undefined}
                            page={0}
                            rowsPerPage={3}
                            rowsPerPageOptions={[3]}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Stack>
              </CardContent>
            </Card>

            <Card className="mui-component-wide" variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h3">Overlay and Utility Coverage</Typography>
                  <Typography color="text.secondary" variant="body2">
                    These exports are represented without keeping disruptive overlays open in the
                    page.
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {overlayAndUtilityComponents.map((component) => (
                      <Chip key={component} label={component} variant="outlined" />
                    ))}
                    <NoSsr>
                      <Chip color="primary" label="NoSsr" />
                    </NoSsr>
                  </Stack>
                  <SpeedDial
                    ariaLabel="SpeedDial preview"
                    className="mui-speed-dial"
                    icon={<SpeedDialIcon />}
                    open
                  >
                    <SpeedDialAction icon={<MuiPreviewIcon />} tooltipTitle="SpeedDialAction" />
                  </SpeedDial>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Paper>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Publish MUI adapter?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            DialogContentText uses the generated MUI typography and palette.
          </DialogContentText>
          <Typography color="text.secondary">
            Generated theme options will be available through the package exports.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setDialogOpen(false)}>
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Preview root element was not found.');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
