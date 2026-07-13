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
import { useState } from 'react';

import { MuiPreviewIcon } from '../MuiPreviewIcon';
import {
  muiPaletteRoles,
  muiTypographyVariants,
  overlayAndUtilityComponents,
  startsTokenGroup,
} from '../previewModel';

export function MuiPanel() {
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
            {muiPaletteRoles.map(([label, color, sourceToken], index) => (
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
                <Typography className="token-source" color="text.secondary" variant="caption">
                  {sourceToken}
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
