import { type ReactNode, type FC, useEffect, useMemo } from 'react';
import {
  ReactShortcutContext,
  type ReactShortcutContextValue,
  type Filter,
} from './shortcut-context';
import { ShortcutRegistry } from './shortcut-registry';

export interface ReactShortcutOptions {
  strict?: boolean;
  debug?: boolean;
  auto?: boolean;
  filter?: Filter;
}

export interface ReactShortcutProviderProps {
  options?: ReactShortcutOptions;
  children?: ReactNode;
}

export const ReactShortcutProvider: FC<ReactShortcutProviderProps> =
  function ReactShortcutProvider(props) {
    const {
      children,
      options: { strict = true, debug = false, auto = true, filter } = {},
    } = props;

    const shortcutRegistry = useMemo(() => {
      return new ShortcutRegistry({ strict, debug, filter });
    }, [strict, debug, filter]);

    const contextValue = useMemo<ReactShortcutContextValue>(() => {
      return {
        registerShortcut:
          shortcutRegistry.registerShortcut.bind(shortcutRegistry),
        unregisterShortcut:
          shortcutRegistry.unregisterShortcut.bind(shortcutRegistry),
        enableShortcut: shortcutRegistry.enableShortcut.bind(shortcutRegistry),
        disableShortcut:
          shortcutRegistry.disableShortcut.bind(shortcutRegistry),
        isShortcutRegistered:
          shortcutRegistry.isShortcutRegistered.bind(shortcutRegistry),
        getCurrentKeyPressed:
          shortcutRegistry.getCurrentKeyPressed.bind(shortcutRegistry),
        onKeydown: shortcutRegistry.onKeydown.bind(shortcutRegistry),
        onKeyup: shortcutRegistry.onKeyup.bind(shortcutRegistry),
        attachElement: auto
          ? () => {
              throw new Error(
                'attachElement is not supported when auto is true',
              );
            }
          : shortcutRegistry.attachElement.bind(shortcutRegistry),
      };
    }, [shortcutRegistry, auto]);

    useEffect(() => {
      if (auto) {
        return shortcutRegistry.attachElement(window);
      }
    }, [auto, shortcutRegistry]);

    return (
      <ReactShortcutContext.Provider value={contextValue}>
        {children}
      </ReactShortcutContext.Provider>
    );
  };

ReactShortcutProvider.displayName = 'ReactShortcutProvider';
