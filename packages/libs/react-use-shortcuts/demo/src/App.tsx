import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactShortcutProvider,
  useShortcut,
  type ReactShortcutOptions,
  type ShortcutRegister,
  type KeyboardEventListener,
  acceleratorParser,
} from '@rocketc/react-use-shortcuts';
import { toast } from 'sonner';
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
  Label,
  Switch,
} from '@rocketc/react';
import '@rocketc/react/style.css';

function App() {
  const [options, setOptionsState] = useState<ReactShortcutOptions>({
    strict: false,
    debug: false,
    auto: true,
  });
  const handleUpdateOptions = useCallback(
    (options: Partial<ReactShortcutOptions>) => {
      setOptionsState((prev) => ({ ...prev, ...options }));
    },
    [setOptionsState],
  );

  const filter = useCallback((event: KeyboardEvent) => {
    return !event.repeat && !event.isComposing;
  }, []);

  return (
    <main className="body">
      <Item>
        <ItemContent>
          <ItemTitle>React Use Shortcuts</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Label>
            Strict:
            <Switch
              onCheckedChange={(checked) =>
                handleUpdateOptions({ strict: checked })
              }
              checked={options.strict}
            />
          </Label>
          <Label>
            Debug:
            <Switch
              onCheckedChange={(checked) =>
                handleUpdateOptions({ debug: checked })
              }
              checked={!!options.debug}
            />
          </Label>
          <Label>
            Auto:
            <Switch
              onCheckedChange={(checked) =>
                handleUpdateOptions({ auto: checked })
              }
              checked={!!options.auto}
            />
          </Label>
        </ItemActions>
      </Item>
      <div className="flex flex-row gap-4">
        <Main title="Without Provider" auto={options.auto ?? false} />
        <ReactShortcutProvider options={{ ...options, filter }}>
          <Main title="With Provider" auto={options.auto ?? false} />
        </ReactShortcutProvider>
      </div>
    </main>
  );
}

interface MainProps {
  title: string;
  auto: boolean;
}

const Main: FC<MainProps> = function Main(props) {
  const [keyPressed, setKeyPressed] = useState<string>('');

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

  const [shortcutRegisters, setShortcutRegisters] = useState<
    Array<ShortcutRegister>
  >(() => {
    return getShortcutRegisters();
  });

  const refreshShortcutRegisters = useCallback(() => {
    setShortcutRegisters(getShortcutRegisters());
  }, [getShortcutRegisters]);

  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (root.current && !props.auto) {
      return attachElement(root.current);
    }
  }, [attachElement, props.auto]);

  useEffect(() => {
    return onKeyPressedChanged((event) => {
      const currentKeyPressed = getCurrentKeyPressed();
      // if (currentKeyPressed) {
      //   toast.info(`Key pressed: ${currentKeyPressed}`);
      // } else {
      //   toast.info('No key pressed');
      // }
      if (event.detail === 'keydown') {
        setKeyPressed(currentKeyPressed);
      } else if (event.detail === 'keyup') {
        if (acceleratorParser.validate(currentKeyPressed)) {
          setKeyPressed(currentKeyPressed);
        }
      }
    });
  }, [onKeyPressedChanged, getCurrentKeyPressed]);

  const handleRegisterShortcut = useCallback(() => {
    registerShortcut(keyPressed, (event) => {
      console.log(event);
      toast.error(`You pressed: ${keyPressed}`);
    });
    refreshShortcutRegisters();
  }, [keyPressed, registerShortcut, refreshShortcutRegisters]);

  const handleUnregisterShortcut = useCallback(
    (accelerator: string, cb?: KeyboardEventListener) => {
      unregisterShortcut(accelerator, cb);
      refreshShortcutRegisters();
    },
    [unregisterShortcut, refreshShortcutRegisters],
  );

  const handleIsShortcutRegistered = useCallback(
    (accelerator: string) => {
      toast.success(
        `Is shortcut registered: ${isShortcutRegistered(accelerator)}`,
      );
    },
    [isShortcutRegistered],
  );

  const handleToggleEnableShortcut = useCallback(
    (enabled: boolean, accelerator: string, cb?: KeyboardEventListener) => {
      if (enabled) {
        disableShortcut(accelerator, cb);
      } else {
        enableShortcut(accelerator, cb);
      }
      refreshShortcutRegisters();
    },
    [enableShortcut, disableShortcut, refreshShortcutRegisters],
  );

  return (
    <div ref={root} className="w-full">
      <Card className="w-full" tabIndex={-1}>
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardAction className="flex items-center gap-2"></CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <h3>You Pressed: {keyPressed}</h3>
            <Input value={keyPressed} readOnly />
            <Button onClick={handleRegisterShortcut}>register shortcut</Button>
            <Button onClick={() => handleUnregisterShortcut(keyPressed)}>
              unregister shortcut
            </Button>
            <Button onClick={() => handleIsShortcutRegistered(keyPressed)}>
              is register shortcut
            </Button>
            <Button
              onClick={() => handleToggleEnableShortcut(true, keyPressed)}
            >
              enable shortcut
            </Button>
            <Button
              onClick={() => handleToggleEnableShortcut(false, keyPressed)}
            >
              disable shortcut
            </Button>
            <Button onClick={refreshShortcutRegisters}>
              refresh shortcut registers
            </Button>
            {shortcutRegisters.map((shortcut, index) => (
              <Item variant="outline" size="sm" key={index}>
                <ItemContent>
                  <ItemTitle>{shortcut.accelerator}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUnregisterShortcut(
                        shortcut.accelerator,
                        shortcut.callback,
                      )
                    }
                  >
                    unregister
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleToggleEnableShortcut(
                        shortcut.enabled,
                        shortcut.accelerator,
                        shortcut.callback,
                      )
                    }
                  >
                    {shortcut.enabled ? 'disable' : 'enable'}
                  </Button>
                </ItemActions>
              </Item>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
