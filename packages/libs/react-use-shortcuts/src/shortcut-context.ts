import { createContext } from 'react';
import { ShortcutRegistry } from '@rocketc/shortcuts';
import type { ReactShortcutOptions } from './shortcut-provider';
import type {
  Accelerator,
  ShortcutRegister,
  KeyboardEventListener,
  Dispose,
  KeyPressedChangedEventListener,
} from '@rocketc/shortcuts';

export interface ReactShortcutContextValue {
  registerShortcut(
    accelerator: Accelerator,
    callback: KeyboardEventListener,
  ): boolean;
  unregisterShortcut(
    accelerator: Accelerator,
    cb?: KeyboardEventListener,
  ): boolean;
  enableShortcut(accelerator: Accelerator, cb?: KeyboardEventListener): boolean;
  disableShortcut(
    accelerator: Accelerator,
    cb?: KeyboardEventListener,
  ): boolean;
  isShortcutRegistered(accelerator: Accelerator): boolean;
  getCurrentKeyPressed(): Accelerator;
  onKeyPressedChanged(listener: KeyPressedChangedEventListener): Dispose;
  attachElement(ele: Window | HTMLElement): Dispose;
  getOptions(): ReactShortcutOptions;
  getShortcutRegisters(accelerator?: Accelerator): Array<ShortcutRegister>;
}

// Create a default ShortcutRegistry instance for use without Provider
const defaultShortcutRegistry = new ShortcutRegistry({
  strict: false, // Default to loose mode
  debug: false,
});

// Track the dispose function for auto-attached window
// Since attachElement returns different dispose functions each time,
// we only track the one created by auto option
let autoWindowDispose: Dispose | null = null;

// Auto-attach to window by default
if (typeof window !== 'undefined') {
  autoWindowDispose = defaultShortcutRegistry.attachElement(window);
}

// Create default context value
const createDefaultContextValue = (): ReactShortcutContextValue => {
  return {
    registerShortcut: defaultShortcutRegistry.registerShortcut.bind(
      defaultShortcutRegistry,
    ),
    unregisterShortcut: defaultShortcutRegistry.unregisterShortcut.bind(
      defaultShortcutRegistry,
    ),
    enableShortcut: defaultShortcutRegistry.enableShortcut.bind(
      defaultShortcutRegistry,
    ),
    disableShortcut: defaultShortcutRegistry.disableShortcut.bind(
      defaultShortcutRegistry,
    ),
    isShortcutRegistered: defaultShortcutRegistry.isShortcutRegistered.bind(
      defaultShortcutRegistry,
    ),
    getCurrentKeyPressed: defaultShortcutRegistry.getCurrentKeyPressed.bind(
      defaultShortcutRegistry,
    ),
    onKeyPressedChanged: defaultShortcutRegistry.onKeyPressedChanged.bind(
      defaultShortcutRegistry,
    ),
    attachElement: (ele: Window | HTMLElement) => {
      // Simply delegate to the registry
      // The registry handles reference counting internally
      return defaultShortcutRegistry.attachElement(ele);
    },
    getOptions: () => {
      const options = defaultShortcutRegistry.getOptions();
      return {
        strict: options.strict ?? false,
        debug: options.debug ?? false,
        auto: autoWindowDispose !== null,
        filter: options.filter,
        alias: options.alias,
        separator: options.separator,
      };
    },
    getShortcutRegisters: defaultShortcutRegistry.getShortcutRegisters.bind(
      defaultShortcutRegistry,
    ),
  };
};

export const ReactShortcutContext = createContext<ReactShortcutContextValue>(
  createDefaultContextValue(),
);
