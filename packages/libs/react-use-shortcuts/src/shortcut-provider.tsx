/* eslint-disable react-hooks/refs */
import {
  type ReactNode,
  type FC,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import {
  ReactShortcutContext,
  type ReactShortcutContextValue,
  type Filter,
} from './shortcut-context';
import { ShortcutRegistry, type ShortcutRegister } from './shortcut-registry';

export { type ShortcutRegister };

export interface ReactShortcutOptions {
  separator?: string;
  strict?: boolean;
  debug?: boolean | ((...args: any[]) => void);
  auto?: boolean;
  filter?: Filter;
  alias?: Record<string, string>;
}

export interface ReactShortcutProviderProps {
  options?: ReactShortcutOptions;
  children?: ReactNode;
}

const ReactShortcutProvider: FC<ReactShortcutProviderProps> =
  function ReactShortcutProvider(props) {
    const {
      children,
      options: {
        strict = true,
        debug = false,
        auto = true,
        filter,
        separator,
        alias,
      } = {},
    } = props;

    const autoRef = useRef(auto);
    autoRef.current = auto;

    const shortcutRegistry = useRef<ShortcutRegistry>(
      new ShortcutRegistry({ strict, debug, filter, alias }),
    );

    const staticsContextValue = useMemo<
      Omit<ReactShortcutContextValue, 'attachElement'>
    >(() => {
      return {
        updateOptions: shortcutRegistry.current.updateOptions.bind(
          shortcutRegistry.current,
        ),
        getOptions: shortcutRegistry.current.getOptions.bind(
          shortcutRegistry.current,
        ),
        getShortcutRegisters:
          shortcutRegistry.current.getShortcutRegisters.bind(
            shortcutRegistry.current,
          ),
        registerShortcut: shortcutRegistry.current.registerShortcut.bind(
          shortcutRegistry.current,
        ),
        unregisterShortcut: shortcutRegistry.current.unregisterShortcut.bind(
          shortcutRegistry.current,
        ),
        enableShortcut: shortcutRegistry.current.enableShortcut.bind(
          shortcutRegistry.current,
        ),
        disableShortcut: shortcutRegistry.current.disableShortcut.bind(
          shortcutRegistry.current,
        ),
        isShortcutRegistered:
          shortcutRegistry.current.isShortcutRegistered.bind(
            shortcutRegistry.current,
          ),
        getCurrentKeyPressed:
          shortcutRegistry.current.getCurrentKeyPressed.bind(
            shortcutRegistry.current,
          ),
        onKeydown: shortcutRegistry.current.onKeydown.bind(
          shortcutRegistry.current,
        ),
        onKeyup: shortcutRegistry.current.onKeyup.bind(
          shortcutRegistry.current,
        ),
      };
    }, []);

    const attachElement = useCallback((ele: Window | HTMLElement) => {
      if (autoRef.current) {
        throw new Error('attachElement is not supported when auto is true');
      }
      return shortcutRegistry.current.attachElement(ele);
    }, []);

    useEffect(() => {
      shortcutRegistry.current.updateOptions({
        strict,
        debug,
        filter,
        separator,
        alias,
      });
    }, [strict, debug, filter, separator, alias]);

    return (
      <ReactShortcutContext.Provider
        value={{
          ...staticsContextValue,
          attachElement,
        }}
      >
        {children}
      </ReactShortcutContext.Provider>
    );
  };

ReactShortcutProvider.displayName = 'ReactShortcutProvider';

export default ReactShortcutProvider;
