import { createContext } from 'react';
import { type Accelerator } from './accelerator-parser';
import type { ReactShortcutOptions } from './shortcut-provider';
import type { ShortcutRegister } from './shortcut-registry';

export type Dispose = () => void;
export type Filter = (event: KeyboardEvent) => boolean;
export type KeyboardEventListener = (event: KeyboardEvent) => void;

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
  onKeydown(listener: KeyboardEventListener): Dispose;
  onKeyup(listener: KeyboardEventListener): Dispose;
  attachElement(ele: Window | HTMLElement): Dispose;
  updateOptions(options: Partial<ReactShortcutOptions>): void;
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
  updateOptions: () => throwProviderNotFoundError(),
  getOptions: () => throwProviderNotFoundError(),
  getShortcutRegisters: () => throwProviderNotFoundError(),
});

function throwProviderNotFoundError(): never {
  throw new Error('ShortcutProvider is not found!');
}
