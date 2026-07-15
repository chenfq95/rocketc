import {
  Accordion,
  Alert,
  AspectRatio,
  Avatar,
  AvatarGroup,
  Badge,
  Blockquote,
  Box,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  ChakraProvider,
  Circle,
  CloseButton,
  Clipboard,
  Code,
  Collapsible,
  Container,
  DataList,
  Dialog,
  Drawer,
  Editable,
  EmptyState,
  Field,
  Fieldset,
  Flex,
  Float,
  FormatByte,
  FormatNumber,
  Grid,
  Group,
  Heading,
  Highlight,
  HoverCard,
  IconButton,
  Image,
  Input,
  Kbd,
  Link,
  List,
  Loader,
  Mark,
  Menu,
  NativeSelect,
  NumberInput,
  Pagination,
  PinInput,
  Popover,
  Progress,
  ProgressCircle,
  QrCode,
  Quote,
  RadioGroup,
  RatingGroup,
  ScrollArea,
  SegmentGroup,
  Separator,
  SimpleGrid,
  Select,
  Skeleton,
  SkeletonCircle,
  Slider,
  Spacer,
  Spinner,
  Square,
  Stack,
  Stat,
  Status,
  Steps,
  Strong,
  Switch,
  Table,
  Tabs,
  Tag,
  TagsInput,
  Text,
  Textarea,
  Timeline,
  Toggle,
  Tooltip,
  Wrap,
  createListCollection,
  createSystem,
  defaultConfig,
  type SystemConfig,
} from '@chakra-ui/react';
import { useMemo } from 'react';

import defaultDarkChakraTheme from '../../../dist/chakra/default.dark';
import defaultLightChakraTheme from '../../../dist/chakra/default.light';
import sunDarkChakraTheme from '../../../dist/chakra/sun.dark';
import sunLightChakraTheme from '../../../dist/chakra/sun.light';
import {
  chakraColorRoles,
  chakraSemantic,
  chakraToken,
  chakraTypographyRoles,
  chakraTypographyStyle,
  startsTokenGroup,
  type DesignThemeName,
} from '../previewModel';
import { displayTokenPath } from '../tokenSource';

const chakraItems = createListCollection({
  items: [
    { label: 'Design tokens', value: 'tokens' },
    { label: 'Preview system', value: 'preview' },
    { label: 'Framework adapter', value: 'adapter' },
  ],
});

const chakraButtonPalettes = [
  { label: 'Default', value: undefined },
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Gray', value: 'gray' },
  { label: 'Brand', value: 'brand' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Danger', value: 'danger' },
  { label: 'Info', value: 'info' },
] as const;

const chakraButtonVariants = [
  { label: 'solid', disabled: false, variant: 'solid' },
  { label: 'subtle', disabled: false, variant: 'subtle' },
  { label: 'surface', disabled: false, variant: 'surface' },
  { label: 'outline', disabled: false, variant: 'outline' },
  { label: 'ghost', disabled: false, variant: 'ghost' },
  { label: 'plain', disabled: false, variant: 'plain' },
  { label: 'disabled', disabled: true, variant: 'solid' },
] as const;

function ChakraPreviewIcon() {
  return (
    <svg aria-hidden="true" focusable="false" height="1em" viewBox="0 0 24 24" width="1em">
      <path
        d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.3 6.7 3.7L12 11.7 5.3 8 12 4.3ZM5 9.8l6 3.3v6.1l-6-3.3V9.8Zm8 9.4v-6.1l6-3.3v6.1l-6 3.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

const chakraCoverageComponents = [
  'AbsoluteCenter',
  'ActionBar',
  'Bleed',
  'Carousel',
  'Center',
  'CheckboxCard',
  'Checkmark',
  'ClientOnly',
  'CodeBlock',
  'ColorPicker',
  'ColorSwatch',
  'Combobox',
  'DatePicker',
  'DownloadTrigger',
  'Environment',
  'FileUpload',
  'FloatingPanel',
  'FocusTrap',
  'For',
  'InputAddon',
  'InputElement',
  'InputGroup',
  'Listbox',
  'LocaleProvider',
  'Marquee',
  'Portal',
  'Presence',
  'RadioCard',
  'Radiomark',
  'Select',
  'Show',
  'SkipNav',
  'Span',
  'Splitter',
  'Sticky',
  'Toast',
  'TreeView',
  'VisuallyHidden',
] as const;

const chakraThemes: Record<DesignThemeName, SystemConfig> = {
  'default.light': defaultLightChakraTheme,
  'default.dark': defaultDarkChakraTheme,
  'sun.light': sunLightChakraTheme,
  'sun.dark': sunDarkChakraTheme,
};

export function ChakraPanel({ themeName }: { themeName: DesignThemeName }) {
  const chakraTheme = chakraThemes[themeName];
  const theme = chakraTheme as unknown as Record<string, unknown>;
  const chakraSystem = useMemo(() => createSystem(defaultConfig, chakraTheme), [chakraTheme]);

  return (
    <ChakraProvider value={chakraSystem}>
      <Box
        aria-label="Chakra preview"
        color="fg"
        display="grid"
        fontFamily="body"
        gap={3}
        gridTemplateColumns="minmax(0, 1fr)"
        pt={4}
      >
        <Card.Root minW={0}>
          <Card.Header>
            <p className="meta">Chakra</p>
            <Card.Title>Semantic color tokens</Card.Title>
          </Card.Header>
          <Card.Body>
            <SimpleGrid columns={{ base: 2, md: 6 }} gap={2}>
              {chakraColorRoles.map(([label, tokenPath, sourceToken], index) => (
                <Box
                  display="grid"
                  gap={1}
                  gridColumnStart={startsTokenGroup(chakraColorRoles, index) ? 1 : undefined}
                  key={tokenPath}
                  minW={0}
                >
                  <Box
                    bg={chakraSemantic(theme, tokenPath)}
                    borderColor="border.subtle"
                    borderRadius="sm"
                    borderWidth="sm"
                    h={8}
                  />
                  <Text as="strong" fontSize="xs" minW={0} overflowWrap="anywhere">
                    {label}
                  </Text>
                  <Code
                    color="fg.muted"
                    display="block"
                    fontSize="xs"
                    minW={0}
                    overflowWrap="anywhere"
                    whiteSpace="normal"
                  >
                    {tokenPath}
                  </Code>
                  <Code
                    color="fg.muted"
                    display="block"
                    fontSize="xs"
                    minW={0}
                    opacity={0.78}
                    overflowWrap="anywhere"
                    whiteSpace="normal"
                  >
                    {displayTokenPath(sourceToken)}
                  </Code>
                </Box>
              ))}
            </SimpleGrid>
          </Card.Body>
        </Card.Root>

        <Card.Root minW={0}>
          <Card.Header>
            <p className="meta">Typography</p>
            <Card.Title>Semantic text styles</Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack gap={2}>
              {chakraTypographyRoles.map(([label, tokenPath, sample]) => (
                <Grid
                  alignItems="baseline"
                  borderBottomWidth="sm"
                  borderColor="border.subtle"
                  gap={2}
                  gridTemplateColumns={{ base: '1fr', md: '120px minmax(0, 1fr) 190px' }}
                  key={tokenPath}
                  pb={2}
                  _last={{ borderBottomWidth: 0, pb: 0 }}
                >
                  <Code color="fg.muted" fontSize="xs" minW={0} overflowWrap="anywhere">
                    {label}
                  </Code>
                  <Text
                    as="span"
                    minW={0}
                    overflowWrap="anywhere"
                    style={chakraTypographyStyle(theme, tokenPath)}
                  >
                    {sample}
                  </Text>
                  <Code color="fg.muted" fontSize="xs" minW={0} overflowWrap="anywhere">
                    {tokenPath}
                  </Code>
                </Grid>
              ))}
            </Stack>
          </Card.Body>
        </Card.Root>

        <Card.Root gridColumn="1 / -1" minW={0}>
          <Card.Header>
            <p className="meta">Components</p>
            <Card.Title>Runtime themed Chakra controls</Card.Title>
          </Card.Header>
          <Card.Body>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
              <Card.Root gridColumn="1 / -1">
                <Card.Header>
                  <Card.Title>Buttons</Card.Title>
                  <Card.Description>Native Chakra Button and Badge components.</Card.Description>
                </Card.Header>
                <Card.Body>
                  <Stack gap={4}>
                    <Stack gap={3}>
                      {chakraButtonPalettes.map((palette) => (
                        <Grid
                          key={palette.label}
                          alignItems="center"
                          gap={2}
                          gridTemplateColumns={{
                            base: '1fr',
                            lg: '92px repeat(7, minmax(0, 1fr))',
                          }}
                          minW={0}
                        >
                          <Text color="fg.muted" fontSize="sm" fontWeight="medium">
                            {palette.label}
                          </Text>
                          {chakraButtonVariants.map((variant) => (
                            <Button
                              key={variant.label}
                              colorPalette={palette.value}
                              disabled={variant.disabled}
                              size="sm"
                              variant={variant.variant}
                            >
                              {variant.label}
                            </Button>
                          ))}
                        </Grid>
                      ))}
                    </Stack>
                    <Stack gap={2}>
                      <Text color="fg.muted" fontSize="sm" fontWeight="medium">
                        Related controls
                      </Text>
                      <Stack direction="row" flexWrap="wrap" gap={2}>
                        <ButtonGroup size="sm" variant="outline">
                          <Button>Day</Button>
                          <Button>Week</Button>
                          <Button>Month</Button>
                        </ButtonGroup>
                        <IconButton aria-label="IconButton" colorPalette="brand" size="sm">
                          <ChakraPreviewIcon />
                        </IconButton>
                        <IconButton
                          aria-label="Outline IconButton"
                          colorPalette="brand"
                          size="sm"
                          variant="outline"
                        >
                          <ChakraPreviewIcon />
                        </IconButton>
                        <CloseButton size="sm" />
                        <Button colorPalette="brand" loading loadingText="Loading" size="sm">
                          Loading
                        </Button>
                        <Menu.Root positioning={{ gutter: 4 }}>
                          <Menu.Trigger asChild>
                            <Button size="sm" variant="outline">
                              Dropdown
                            </Button>
                          </Menu.Trigger>
                          <Menu.Positioner>
                            <Menu.Content
                              bg="bg.elevated"
                              borderColor="border.subtle"
                              borderWidth="1px"
                              shadow="md"
                            >
                              <Menu.Item value="inspect">Inspect</Menu.Item>
                              <Menu.Item value="duplicate">Duplicate</Menu.Item>
                              <Menu.Item value="archive">Archive</Menu.Item>
                            </Menu.Content>
                          </Menu.Positioner>
                        </Menu.Root>
                      </Stack>
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={2}>
                      <Badge colorPalette="success">Success</Badge>
                      <Badge colorPalette="warning">Warning</Badge>
                      <Badge colorPalette="danger">Danger</Badge>
                      <Badge colorPalette="info">Info</Badge>
                    </Stack>
                  </Stack>
                </Card.Body>
              </Card.Root>

              <Card.Root>
                <Card.Header>
                  <Card.Title>Form controls</Card.Title>
                  <Card.Description>
                    Field, Input, Textarea, selectors, and switches.
                  </Card.Description>
                </Card.Header>
                <Card.Body>
                  <Stack gap={4}>
                    <Fieldset.Root>
                      <Fieldset.Legend>Fieldset</Fieldset.Legend>
                      <Fieldset.HelperText>
                        Form groups inherit generated sizing tokens.
                      </Fieldset.HelperText>
                    </Fieldset.Root>
                    <Field.Root>
                      <Field.Label>Workspace</Field.Label>
                      <Input defaultValue="Rocketc Studio" />
                      <Field.HelperText>Input uses the active Chakra system.</Field.HelperText>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Notes</Field.Label>
                      <Textarea defaultValue="Textarea preview" />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Native adapter</Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field defaultValue="chakra">
                          <option value="css">CSS variables</option>
                          <option value="mui">Material UI</option>
                          <option value="chakra">Chakra</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Adapter</Field.Label>
                      <Select.Root collection={chakraItems} defaultValue={['tokens']}>
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select adapter" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {chakraItems.items.map((item) => (
                              <Select.Item item={item} key={item.value}>
                                {item.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Field.Root>
                    <Switch.Root defaultChecked colorPalette="brand">
                      <Switch.HiddenInput />
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                      <Switch.Label>Use semantic tokens</Switch.Label>
                    </Switch.Root>
                    <Checkbox.Root defaultChecked colorPalette="brand">
                      <Checkbox.HiddenInput />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Label>Checkbox</Checkbox.Label>
                    </Checkbox.Root>
                    <RadioGroup.Root defaultValue="light" colorPalette="brand">
                      <RadioGroup.Label>RadioGroup</RadioGroup.Label>
                      <Stack direction="row" gap={4}>
                        {['light', 'dark'].map((value) => (
                          <RadioGroup.Item key={value} value={value}>
                            <RadioGroup.ItemHiddenInput />
                            <RadioGroup.ItemIndicator />
                            <RadioGroup.ItemText>{value}</RadioGroup.ItemText>
                          </RadioGroup.Item>
                        ))}
                      </Stack>
                    </RadioGroup.Root>
                    <NumberInput.Root defaultValue="24" display="grid" gap={1} min={0} max={100}>
                      <NumberInput.Label>NumberInput</NumberInput.Label>
                      <Box position="relative">
                        <NumberInput.Control />
                        <NumberInput.Input />
                      </Box>
                    </NumberInput.Root>
                    <PinInput.Root defaultValue={['2', '4', '0', '8']}>
                      <PinInput.Label>PinInput</PinInput.Label>
                      <PinInput.Control>
                        {[0, 1, 2, 3].map((index) => (
                          <PinInput.Input key={index} index={index} />
                        ))}
                      </PinInput.Control>
                    </PinInput.Root>
                    <TagsInput.Root defaultValue={['tokens', 'chakra']}>
                      <TagsInput.Label>TagsInput</TagsInput.Label>
                      <TagsInput.Control>
                        <TagsInput.Items />
                        <TagsInput.Input placeholder="Add tag" />
                      </TagsInput.Control>
                      <TagsInput.HiddenInput />
                    </TagsInput.Root>
                    <SegmentGroup.Root defaultValue="preview" colorPalette="brand">
                      <SegmentGroup.Indicator />
                      {chakraItems.items.map((item) => (
                        <SegmentGroup.Item key={item.value} value={item.value}>
                          <SegmentGroup.ItemText>{item.label}</SegmentGroup.ItemText>
                          <SegmentGroup.ItemHiddenInput />
                        </SegmentGroup.Item>
                      ))}
                    </SegmentGroup.Root>
                    <Slider.Root defaultValue={[64]} colorPalette="brand">
                      <Slider.Label>Slider</Slider.Label>
                      <Slider.Control>
                        <Slider.Track>
                          <Slider.Range />
                        </Slider.Track>
                        <Slider.Thumb index={0}>
                          <Slider.HiddenInput />
                        </Slider.Thumb>
                      </Slider.Control>
                    </Slider.Root>
                    <RatingGroup.Root defaultValue={4} count={5} colorPalette="brand">
                      <RatingGroup.Label>RatingGroup</RatingGroup.Label>
                      <RatingGroup.Control>
                        <RatingGroup.Items />
                      </RatingGroup.Control>
                      <RatingGroup.HiddenInput />
                    </RatingGroup.Root>
                  </Stack>
                </Card.Body>
              </Card.Root>

              <Card.Root>
                <Card.Header>
                  <Card.Title>Feedback</Card.Title>
                  <Card.Description>
                    Alert and Progress read generated token roles.
                  </Card.Description>
                </Card.Header>
                <Card.Body>
                  <Stack gap={4}>
                    <Alert.Root status="success">
                      <Alert.Indicator />
                      <Alert.Content>
                        <Alert.Title>Build complete</Alert.Title>
                        <Alert.Description>
                          Chakra SystemConfig was generated from resolved tokens.
                        </Alert.Description>
                      </Alert.Content>
                    </Alert.Root>
                    <Alert.Root status="warning">
                      <Alert.Indicator />
                      <Alert.Content>
                        <Alert.Title>Adapter note</Alert.Title>
                        <Alert.Description>
                          Projects can pass this config into createSystem.
                        </Alert.Description>
                      </Alert.Content>
                    </Alert.Root>
                    <Progress.Root colorPalette="brand" value={64}>
                      <Progress.Track>
                        <Progress.Range />
                      </Progress.Track>
                    </Progress.Root>
                    <ProgressCircle.Root colorPalette="brand" value={72}>
                      <ProgressCircle.Circle>
                        <ProgressCircle.Track />
                        <ProgressCircle.Range />
                      </ProgressCircle.Circle>
                      <ProgressCircle.ValueText />
                    </ProgressCircle.Root>
                    <Stack alignItems="center" direction="row" gap={3}>
                      <Spinner color="brand.solid" />
                      <Loader colorPalette="brand" />
                      <Skeleton height="8" width="32" />
                      <SkeletonCircle size="10" />
                    </Stack>
                    <Status.Root colorPalette="success">
                      <Status.Indicator />
                      System online
                    </Status.Root>
                  </Stack>
                </Card.Body>
              </Card.Root>

              <Card.Root>
                <Card.Header>
                  <Card.Title>Data display</Card.Title>
                  <Card.Description>
                    Avatar, tags, lists, stats, and formatted values.
                  </Card.Description>
                </Card.Header>
                <Card.Body>
                  <Stack gap={4}>
                    <Stack direction="row" flexWrap="wrap" gap={3}>
                      <Avatar.Root>
                        <Avatar.Fallback>R</Avatar.Fallback>
                      </Avatar.Root>
                      <AvatarGroup>
                        {['A', 'B', 'C'].map((name) => (
                          <Avatar.Root key={name}>
                            <Avatar.Fallback>{name}</Avatar.Fallback>
                          </Avatar.Root>
                        ))}
                      </AvatarGroup>
                      <Badge colorPalette="brand">Badge</Badge>
                      <Tag.Root colorPalette="gray">
                        <Tag.Label>Tag</Tag.Label>
                        <Tag.EndElement>x</Tag.EndElement>
                      </Tag.Root>
                    </Stack>
                    <Wrap gap={2}>
                      <Code>Code</Code>
                      <Kbd>⌘ K</Kbd>
                      <Mark>Mark</Mark>
                      <Quote>Quote</Quote>
                      <Strong>Strong</Strong>
                    </Wrap>
                    <Text>
                      <Highlight
                        query="tokens"
                        styles={{ color: 'brand.solid', fontWeight: '700' }}
                      >
                        Chakra components consume generated design tokens.
                      </Highlight>
                    </Text>
                    <List.Root>
                      <List.Item>
                        <List.Indicator color="brand.solid">•</List.Indicator>
                        List.Item with indicator
                      </List.Item>
                      <List.Item>
                        <List.Indicator color="success.solid">•</List.Indicator>
                        Semantic color roles
                      </List.Item>
                    </List.Root>
                    <DataList.Root orientation="horizontal">
                      <DataList.Item>
                        <DataList.ItemLabel>FormatNumber</DataList.ItemLabel>
                        <DataList.ItemValue>
                          <FormatNumber value={1280} />
                        </DataList.ItemValue>
                      </DataList.Item>
                      <DataList.Item>
                        <DataList.ItemLabel>FormatByte</DataList.ItemLabel>
                        <DataList.ItemValue>
                          <FormatByte value={2048000} />
                        </DataList.ItemValue>
                      </DataList.Item>
                    </DataList.Root>
                    <Stat.Root>
                      <Stat.Label>Build coverage</Stat.Label>
                      <Stat.ValueText>98%</Stat.ValueText>
                      <Stat.HelpText>
                        <Stat.UpIndicator /> Chakra adapter
                      </Stat.HelpText>
                    </Stat.Root>
                  </Stack>
                </Card.Body>
              </Card.Root>

              <Card.Root>
                <Card.Header>
                  <Card.Title>Navigation</Card.Title>
                  <Card.Description>
                    Breadcrumb, tabs, pagination, menu, and links.
                  </Card.Description>
                </Card.Header>
                <Card.Body>
                  <Stack gap={4}>
                    <Breadcrumb.Root>
                      <Breadcrumb.List>
                        <Breadcrumb.Item>
                          <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                          <Breadcrumb.Link href="#">Design</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                          <Breadcrumb.CurrentLink>Chakra</Breadcrumb.CurrentLink>
                        </Breadcrumb.Item>
                      </Breadcrumb.List>
                    </Breadcrumb.Root>
                    <Tabs.Root defaultValue="components" colorPalette="brand">
                      <Tabs.List>
                        <Tabs.Trigger value="color">Color</Tabs.Trigger>
                        <Tabs.Trigger value="components">Components</Tabs.Trigger>
                        <Tabs.Trigger value="docs">Docs</Tabs.Trigger>
                      </Tabs.List>
                      <Tabs.Content value="components">Tabs.Content preview</Tabs.Content>
                    </Tabs.Root>
                    <Pagination.Root count={6} pageSize={1} defaultPage={2}>
                      <ButtonGroup size="sm" variant="outline">
                        <Pagination.PrevTrigger>Prev</Pagination.PrevTrigger>
                        <Pagination.Items
                          render={(page) => (
                            <Pagination.Item {...page}>{page.value}</Pagination.Item>
                          )}
                        />
                        <Pagination.NextTrigger>Next</Pagination.NextTrigger>
                      </ButtonGroup>
                    </Pagination.Root>
                    <Menu.Root open>
                      <Menu.Trigger>Menu</Menu.Trigger>
                      <Menu.Positioner>
                        <Menu.Content>
                          <Menu.Item value="tokens">Tokens</Menu.Item>
                          <Menu.Item value="preview">Preview</Menu.Item>
                          <Menu.Separator />
                          <Menu.CheckboxItem value="enabled" checked>
                            Enabled
                          </Menu.CheckboxItem>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Menu.Root>
                    <Link href="#" colorPalette="brand">
                      Link component
                    </Link>
                  </Stack>
                </Card.Body>
              </Card.Root>

              <Card.Root>
                <Card.Header>
                  <Card.Title>Surfaces and layout</Card.Title>
                  <Card.Description>
                    Box, Container, Grid, Flex, shapes, and media.
                  </Card.Description>
                </Card.Header>
                <Card.Body>
                  <Stack gap={4}>
                    <Container borderWidth="1px" borderRadius="md" py={3}>
                      Container
                    </Container>
                    <SimpleGrid columns={2} gap={3}>
                      <Box borderWidth="1px" borderRadius="md" p={3}>
                        Box
                      </Box>
                      <Grid templateColumns="1fr 1fr" gap={2}>
                        <Box bg="brand.subtle" borderRadius="md" p={2}>
                          Grid
                        </Box>
                        <Box bg="gray.subtle" borderRadius="md" p={2}>
                          Item
                        </Box>
                      </Grid>
                    </SimpleGrid>
                    <Flex align="center" gap={3}>
                      <Circle bg="brand.solid" color="brand.contrast" size="10">
                        C
                      </Circle>
                      <Square bg="gray.subtle" color="gray.fg" size="10">
                        S
                      </Square>
                      <Spacer />
                      <Group attached>
                        <Button size="sm" variant="outline">
                          Group
                        </Button>
                        <Button size="sm" variant="outline">
                          Attached
                        </Button>
                      </Group>
                    </Flex>
                    <AspectRatio ratio={16 / 9}>
                      <Box
                        bgGradient="linear-gradient(135deg, rgb(249 115 22 / 0.86), rgb(244 63 94 / 0.72))"
                        bgColor="bg.muted"
                        borderRadius="md"
                        minH="100%"
                        position="relative"
                      >
                        <Float placement="top-end">
                          <Badge colorPalette="brand">Float</Badge>
                        </Float>
                      </Box>
                    </AspectRatio>
                    <Image
                      alt="Chakra gradient sample"
                      borderRadius="md"
                      height="96px"
                      objectFit="cover"
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 240'%3E%3Crect width='640' height='240' fill='%23fff7ed'/%3E%3Ccircle cx='180' cy='120' r='96' fill='%23f97316'/%3E%3Ccircle cx='440' cy='120' r='96' fill='%23f43f5e'/%3E%3C/svg%3E"
                      width="100%"
                    />
                    <Separator />
                  </Stack>
                </Card.Body>
              </Card.Root>

              <Card.Root>
                <Card.Header>
                  <Card.Title>Disclosure and overlays</Card.Title>
                  <Card.Description>
                    Accordion, Collapsible, Popover, Dialog, Drawer, and Tooltip.
                  </Card.Description>
                </Card.Header>
                <Card.Body>
                  <Stack gap={4}>
                    <Accordion.Root defaultValue={['tokens']} multiple>
                      <Accordion.Item value="tokens">
                        <Accordion.ItemTrigger>
                          Accordion.ItemTrigger
                          <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                          <Accordion.ItemBody>Accordion.ItemBody</Accordion.ItemBody>
                        </Accordion.ItemContent>
                      </Accordion.Item>
                    </Accordion.Root>
                    <Collapsible.Root open>
                      <Collapsible.Trigger>Collapsible.Trigger</Collapsible.Trigger>
                      <Collapsible.Content>Collapsible.Content preview</Collapsible.Content>
                    </Collapsible.Root>
                    <Popover.Root open>
                      <Popover.Trigger>Popover</Popover.Trigger>
                      <Popover.Positioner>
                        <Popover.Content>
                          <Popover.Arrow />
                          <Popover.Body>Popover.Content preview</Popover.Body>
                        </Popover.Content>
                      </Popover.Positioner>
                    </Popover.Root>
                    <HoverCard.Root open>
                      <HoverCard.Trigger>HoverCard</HoverCard.Trigger>
                      <HoverCard.Positioner>
                        <HoverCard.Content>HoverCard.Content preview</HoverCard.Content>
                      </HoverCard.Positioner>
                    </HoverCard.Root>
                    <Tooltip.Root open>
                      <Tooltip.Trigger>Tooltip</Tooltip.Trigger>
                      <Tooltip.Positioner>
                        <Tooltip.Content>Tooltip.Content preview</Tooltip.Content>
                      </Tooltip.Positioner>
                    </Tooltip.Root>
                    <Dialog.Root open={false}>
                      <Dialog.Trigger>Dialog.Trigger</Dialog.Trigger>
                      <Dialog.Positioner>
                        <Dialog.Content>
                          <Dialog.Header>
                            <Dialog.Title>Dialog.Title</Dialog.Title>
                          </Dialog.Header>
                          <Dialog.Body>Dialog.Body</Dialog.Body>
                          <Dialog.Footer>
                            <Button>Confirm</Button>
                          </Dialog.Footer>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Dialog.Root>
                    <Drawer.Root open={false}>
                      <Drawer.Trigger>Drawer.Trigger</Drawer.Trigger>
                      <Drawer.Positioner>
                        <Drawer.Content>
                          <Drawer.Header>
                            <Drawer.Title>Drawer.Title</Drawer.Title>
                          </Drawer.Header>
                          <Drawer.Body>Drawer.Body</Drawer.Body>
                        </Drawer.Content>
                      </Drawer.Positioner>
                    </Drawer.Root>
                  </Stack>
                </Card.Body>
              </Card.Root>

              <Card.Root>
                <Card.Header>
                  <Card.Title>Editing and utilities</Card.Title>
                  <Card.Description>
                    Clipboard, Editable, EmptyState, QR code, Timeline, and Steps.
                  </Card.Description>
                </Card.Header>
                <Card.Body>
                  <Stack gap={4}>
                    <Clipboard.Root value="color.brand.solid">
                      <Clipboard.Label>Clipboard</Clipboard.Label>
                      <Clipboard.Control>
                        <Clipboard.Input />
                        <Clipboard.Trigger>Copy</Clipboard.Trigger>
                      </Clipboard.Control>
                    </Clipboard.Root>
                    <Editable.Root defaultValue="Editable preview">
                      <Editable.Area>
                        <Editable.Preview />
                        <Editable.Input />
                      </Editable.Area>
                      <Editable.Control>
                        <Editable.EditTrigger>Edit</Editable.EditTrigger>
                      </Editable.Control>
                    </Editable.Root>
                    <EmptyState.Root>
                      <EmptyState.Content>
                        <EmptyState.Indicator>
                          <Circle bg="brand.subtle" color="brand.fg" size="8">
                            ◎
                          </Circle>
                        </EmptyState.Indicator>
                        <EmptyState.Title>EmptyState.Title</EmptyState.Title>
                        <EmptyState.Description>EmptyState.Description</EmptyState.Description>
                      </EmptyState.Content>
                    </EmptyState.Root>
                    <QrCode.Root value="https://example.com/design-system" size="lg">
                      <QrCode.Frame>
                        <QrCode.Pattern />
                      </QrCode.Frame>
                    </QrCode.Root>
                    <Timeline.Root>
                      <Timeline.Item>
                        <Timeline.Connector />
                        <Timeline.Content>
                          <Timeline.Title>Timeline.Title</Timeline.Title>
                          <Timeline.Description>Token build</Timeline.Description>
                        </Timeline.Content>
                      </Timeline.Item>
                    </Timeline.Root>
                    <Steps.Root defaultStep={1} count={3}>
                      <Steps.List>
                        {[0, 1, 2].map((step) => (
                          <Steps.Item key={step} index={step}>
                            <Steps.Trigger>
                              <Steps.Indicator />
                              <Steps.Title>Step {step + 1}</Steps.Title>
                            </Steps.Trigger>
                            <Steps.Separator />
                          </Steps.Item>
                        ))}
                      </Steps.List>
                    </Steps.Root>
                    <Toggle.Root defaultPressed colorPalette="brand">
                      <Toggle.Indicator />
                      Toggle
                    </Toggle.Root>
                  </Stack>
                </Card.Body>
              </Card.Root>

              <Card.Root gridColumn="1 / -1">
                <Card.Header>
                  <Card.Title>Data table and scroll</Card.Title>
                  <Card.Description>
                    Table and ScrollArea with generated token styling.
                  </Card.Description>
                </Card.Header>
                <Card.Body>
                  <Stack gap={4}>
                    <Table.ScrollArea borderWidth="1px" rounded="md">
                      <Table.Root size="sm">
                        <Table.Header>
                          <Table.Row>
                            <Table.ColumnHeader>Component</Table.ColumnHeader>
                            <Table.ColumnHeader>Token source</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="end">Status</Table.ColumnHeader>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {[
                            ['Button', 'colorPalette.brand', 'Ready'],
                            ['Input', 'semantic surface tokens', 'Ready'],
                            ['Alert', 'state colors', 'Ready'],
                          ].map(([component, source, status]) => (
                            <Table.Row key={component}>
                              <Table.Cell>{component}</Table.Cell>
                              <Table.Cell>{source}</Table.Cell>
                              <Table.Cell textAlign="end">
                                <Badge colorPalette="success">{status}</Badge>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table.Root>
                    </Table.ScrollArea>
                    <ScrollArea.Root height="120px" borderWidth="1px" borderRadius="md">
                      <ScrollArea.Viewport height="100%">
                        <ScrollArea.Content p={3}>
                          {chakraCoverageComponents.slice(0, 18).map((component) => (
                            <Text key={component}>{component}</Text>
                          ))}
                        </ScrollArea.Content>
                      </ScrollArea.Viewport>
                      <ScrollArea.Scrollbar>
                        <ScrollArea.Thumb />
                      </ScrollArea.Scrollbar>
                    </ScrollArea.Root>
                  </Stack>
                </Card.Body>
              </Card.Root>

              <Card.Root gridColumn="1 / -1">
                <Card.Header>
                  <Card.Title>Additional export coverage</Card.Title>
                  <Card.Description>
                    Complex, environment, or disruptive exports represented without forcing overlays
                    open.
                  </Card.Description>
                </Card.Header>
                <Card.Body>
                  <Wrap gap={2}>
                    {chakraCoverageComponents.map((component) => (
                      <Tag.Root key={component} variant="outline">
                        <Tag.Label>{component}</Tag.Label>
                      </Tag.Root>
                    ))}
                  </Wrap>
                </Card.Body>
              </Card.Root>

              <Card.Root>
                <Card.Header>
                  <Card.Title>Theme scale</Card.Title>
                  <Card.Description>
                    Generated values exported through SystemConfig.
                  </Card.Description>
                </Card.Header>
                <Card.Body>
                  <Stack gap={3}>
                    {[
                      ['spacing.4', chakraToken(theme, 'spacing.4')],
                      ['radii.md', chakraToken(theme, 'radii.md')],
                      ['shadows.md', chakraToken(theme, 'shadows.md')],
                      ['durations.normal', chakraToken(theme, 'durations.normal')],
                    ].map(([label, value]) => (
                      <Stack key={label} direction="row" justify="space-between" gap={4}>
                        <Text as="code" color="fg.muted">
                          {label}
                        </Text>
                        <Text as="span" color="fg.muted" fontFamily="mono">
                          {value}
                        </Text>
                      </Stack>
                    ))}
                    <Heading size="sm">ChakraProvider is active</Heading>
                    <Text color="fg.muted">
                      This panel renders real Chakra components with the generated theme config.
                    </Text>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </SimpleGrid>
          </Card.Body>
        </Card.Root>
      </Box>
    </ChakraProvider>
  );
}
