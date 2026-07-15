import { Box, Button, Card, Flex, Grid, Input, Stack, Switch, Text } from '@chakra-ui/react';
import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactShortcutProvider,
  acceleratorParser,
  useShortcut,
  type KeyboardEventListener,
  type ReactShortcutOptions,
  type ShortcutRegister,
} from '@rocketc/react-use-shortcuts';

export default function Shortcuts() {
  const [options, setOptions] = useState<ReactShortcutOptions>({
    strict: false,
    debug: false,
    auto: true,
  });
  const filter = useCallback((event: KeyboardEvent) => !event.repeat && !event.isComposing, []);

  return (
    <Stack gap={4}>
      <Card.Root>
        <Card.Body>
          <Flex
            align={{ base: 'stretch', md: 'center' }}
            direction={{ base: 'column', md: 'row' }}
            gap={4}
            justify="space-between"
          >
            <div>
              <Card.Title>React Use Shortcuts</Card.Title>
              <Card.Description>Compare local and provider-backed registrations.</Card.Description>
            </div>
            <Flex gap={4} wrap="wrap">
              {(['strict', 'debug', 'auto'] as const).map((option) => (
                <Switch.Root
                  checked={Boolean(options[option])}
                  key={option}
                  onCheckedChange={(event) =>
                    setOptions((current) => ({ ...current, [option]: event.checked }))
                  }
                  size="sm"
                >
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label textTransform="capitalize">{option}</Switch.Label>
                </Switch.Root>
              ))}
            </Flex>
          </Flex>
        </Card.Body>
      </Card.Root>
      <Grid gap={4} templateColumns={{ base: '1fr', xl: 'repeat(2, minmax(0, 1fr))' }}>
        <ShortcutLab auto={options.auto ?? false} title="Without provider" />
        <ReactShortcutProvider options={{ ...options, filter }}>
          <ShortcutLab auto={options.auto ?? false} title="With provider" />
        </ReactShortcutProvider>
      </Grid>
    </Stack>
  );
}

const ShortcutLab: FC<{ title: string; auto: boolean }> = ({ title, auto }) => {
  const [keyPressed, setKeyPressed] = useState('');
  const [message, setMessage] = useState('Press a key combination to begin.');
  const root = useRef<HTMLDivElement>(null);
  const {
    onKeyPressedChanged,
    getCurrentKeyPressed,
    attachElement,
    registerShortcut,
    unregisterShortcut,
    getShortcutRegisters,
    isShortcutRegistered,
    enableShortcut,
    disableShortcut,
  } = useShortcut();
  const [registers, setRegisters] = useState<ShortcutRegister[]>(() => getShortcutRegisters());
  const refresh = useCallback(() => setRegisters(getShortcutRegisters()), [getShortcutRegisters]);

  useEffect(() => {
    if (root.current && !auto) return attachElement(root.current);
  }, [attachElement, auto]);

  useEffect(
    () =>
      onKeyPressedChanged((event) => {
        const current = getCurrentKeyPressed();
        if (event.detail === 'keydown' || acceleratorParser.validate(current))
          setKeyPressed(current);
      }),
    [getCurrentKeyPressed, onKeyPressedChanged],
  );

  const unregister = (accelerator: string, callback?: KeyboardEventListener) => {
    unregisterShortcut(accelerator, callback);
    setMessage(`Unregistered ${accelerator || 'shortcut'}`);
    refresh();
  };

  const toggle = (enabled: boolean, accelerator: string, callback?: KeyboardEventListener) => {
    if (enabled) disableShortcut(accelerator, callback);
    else enableShortcut(accelerator, callback);
    refresh();
  };

  return (
    <Box ref={root} tabIndex={-1}>
      <Card.Root minH="full">
        <Card.Header>
          <Card.Title>{title}</Card.Title>
          <Card.Description>{message}</Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap={3}>
            <Input readOnly value={keyPressed} />
            <Flex gap={2} wrap="wrap">
              <Button
                disabled={!keyPressed}
                onClick={() => {
                  registerShortcut(keyPressed, () => setMessage(`Triggered ${keyPressed}`));
                  setMessage(`Registered ${keyPressed}`);
                  refresh();
                }}
                size="sm"
              >
                Register
              </Button>
              <Button
                disabled={!keyPressed}
                onClick={() => unregister(keyPressed)}
                size="sm"
                variant="outline"
              >
                Unregister
              </Button>
              <Button
                disabled={!keyPressed}
                onClick={() => setMessage(`Registered: ${isShortcutRegistered(keyPressed)}`)}
                size="sm"
                variant="outline"
              >
                Check
              </Button>
              <Button onClick={refresh} size="sm" variant="ghost">
                Refresh
              </Button>
            </Flex>
            <Stack gap={2}>
              {registers.map((shortcut) => (
                <Flex
                  align="center"
                  borderWidth="sm"
                  gap={2}
                  justify="space-between"
                  key={shortcut.accelerator}
                  p={2}
                >
                  <Text fontFamily="mono" fontSize="sm">
                    {shortcut.accelerator}
                  </Text>
                  <Flex gap={2}>
                    <Button
                      onClick={() =>
                        toggle(shortcut.enabled, shortcut.accelerator, shortcut.callback)
                      }
                      size="xs"
                      variant="outline"
                    >
                      {shortcut.enabled ? 'Disable' : 'Enable'}
                    </Button>
                    <Button
                      onClick={() => unregister(shortcut.accelerator, shortcut.callback)}
                      size="xs"
                      variant="outline"
                    >
                      Remove
                    </Button>
                  </Flex>
                </Flex>
              ))}
            </Stack>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};
