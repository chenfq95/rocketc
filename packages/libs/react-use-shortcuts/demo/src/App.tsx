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
  Toaster,
} from '@rocketc/react';
import '@rocketc/react/style.css';

function App() {
  return (
    <main className="body">
      <ReactShortcutProvider
        options={{
          debug: true,
          strict: true,
          auto: false,
          alias: {
            Ctrl: 'Ct',
            i: 'I',
            p: 'o',
          },
        }}
      >
        <Main title="Global strict mode" enable={true} />
        <Toaster />
      </ReactShortcutProvider>
    </main>
  );
}

interface MainProps {
  title: string;
  enable: boolean;
}

const Main: FC<MainProps> = function Main(props) {
  const [keyPressed, setKeyPressed] = useState<string>('');

  const {
    onKeyup,
    onKeydown,
    getCurrentKeyPressed,
    setOptions,
    getOptions,
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

  const [options, setOptionsState] =
    useState<ReactShortcutOptions>(getOptions());
  const handleUpdateOptions = useCallback(
    (options: Partial<ReactShortcutOptions>) => {
      setOptionsState((prev) => ({ ...prev, ...options }));
      setOptions({ ...getOptions(), ...options });
    },
    [setOptions, setOptionsState, getOptions],
  );

  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (options.auto) {
      return attachElement(window);
    } else if (root.current) {
      return attachElement(root.current);
    }
  }, [options.auto, attachElement]);

  useEffect(() => {
    if (props.enable) {
      const dispose1 = onKeydown(() => {
        setKeyPressed(getCurrentKeyPressed());
      });
      const dispose2 = onKeyup(() => {
        if (acceleratorParser.validate(getCurrentKeyPressed())) {
          setKeyPressed(getCurrentKeyPressed());
        }
      });
      return () => {
        dispose1();
        dispose2();
      };
    }
  }, [props.enable, onKeydown, getCurrentKeyPressed, onKeyup]);

  const handleRegisterShortcut = useCallback(() => {
    registerShortcut(keyPressed, (event) => {
      console.log(event);
      toast.success(`You pressed: ${keyPressed}`);
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
          <CardAction className="flex items-center gap-2">
            <Label>
              Scoped:
              <Switch
                onCheckedChange={(checked) =>
                  handleUpdateOptions({ auto: !checked })
                }
                checked={!options.auto}
              />
            </Label>
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
          </CardAction>
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
