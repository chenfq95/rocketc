/* eslint-disable react-hooks/refs */
import React, {
  useEffect,
  useMemo,
  useRef,
  useCallback,
  type PropsWithChildren,
} from 'react';
import {
  ReactShortcutContext,
  type ReactShortcutContextValue,
} from './shortcut-context';
import { ShortcutRegistry, type Filter } from '@rocketc/shortcuts';

export interface ReactShortcutOptions {
  separator?: string;
  strict?: boolean;
  debug?: boolean | ((...args: any[]) => void);
  auto?: boolean;
  filter?: Filter;
  alias?: Record<string, string>;
}

export type ReactShortcutProviderProps = PropsWithChildren<{
  options?: ReactShortcutOptions;
}>;

const ReactShortcutProvider = function ReactShortcutProvider(
  props: ReactShortcutProviderProps,
) {
  const {
    children,
    options: {
      strict = false,
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
      setOptions: shortcutRegistry.current.setOptions.bind(
        shortcutRegistry.current,
      ),
      getOptions: shortcutRegistry.current.getOptions.bind(
        shortcutRegistry.current,
      ),
      getShortcutRegisters: shortcutRegistry.current.getShortcutRegisters.bind(
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
      isShortcutRegistered: shortcutRegistry.current.isShortcutRegistered.bind(
        shortcutRegistry.current,
      ),
      getCurrentKeyPressed: shortcutRegistry.current.getCurrentKeyPressed.bind(
        shortcutRegistry.current,
      ),
      onKeydown: shortcutRegistry.current.onKeydown.bind(
        shortcutRegistry.current,
      ),
      onKeyup: shortcutRegistry.current.onKeyup.bind(shortcutRegistry.current),
    };
  }, []);

  const attachElement = useCallback((ele: Window | HTMLElement) => {
    if (autoRef.current) {
      throw new Error('attachElement is not supported when auto is true');
    }
    return shortcutRegistry.current.attachElement(ele);
  }, []);

  useEffect(() => {
    if (auto) {
      return attachElement(window);
    }
  }, [auto, attachElement]);

  useEffect(() => {
    shortcutRegistry.current.setOptions({
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
