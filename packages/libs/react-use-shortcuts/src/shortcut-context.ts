import { createContext } from 'react';
import type { ReactShortcutOptions } from './shortcut-provider';
import type {
  Accelerator,
  ShortcutRegister,
  KeyboardEventListener,
  Dispose,
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
  onKeydown(listener: (event: CustomEvent<KeyboardEvent>) => void): Dispose;
  onKeyup(listener: (event: CustomEvent<KeyboardEvent>) => void): Dispose;
  attachElement(ele: Window | HTMLElement): Dispose;
  setOptions(options: Partial<ReactShortcutOptions>): void;
  getOptions(): ReactShortcutOptions;
  getShortcutRegisters(accelerator?: Accelerator): Array<ShortcutRegister>;
}

export const ReactShortcutContext = createContext<ReactShortcutContextValue>({
  registerShortcut: () => throwProviderNotFoundError(),
  unregisterShortcut: () => throwProviderNotFoundError(),
  enableShortcut: () => throwProviderNotFoundError(),
  disableShortcut: () => throwProviderNotFoundError(),
  isShortcutRegistered: () => throwProviderNotFoundError(),
  getCurrentKeyPressed: () => throwProviderNotFoundError(),
  onKeydown: () => throwProviderNotFoundError(),
  onKeyup: () => throwProviderNotFoundError(),
  attachElement: () => throwProviderNotFoundError(),
  setOptions: () => throwProviderNotFoundError(),
  getOptions: () => throwProviderNotFoundError(),
  getShortcutRegisters: () => throwProviderNotFoundError(),
});

function throwProviderNotFoundError(): never {
  throw new Error('ShortcutProvider is not found!');
}
