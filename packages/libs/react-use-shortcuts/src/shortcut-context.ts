import React from 'react';
import { type Accelerator } from './accelerator-parser';

export type Dispose = () => void;
export type Filter = (event: KeyboardEvent) => boolean;
export type KeyboardEventListener = (event: KeyboardEvent) => void;

export interface ReactShortcutContextValue {
  registerShortcut(
    accelerator: Accelerator,
    callback: KeyboardEventListener,
  ): boolean;
  unregisterShortcut(accelerator: Accelerator): boolean;
  enableShortcut(accelerator: Accelerator): boolean;
  disableShortcut(accelerator: Accelerator): boolean;
  isShortcutRegistered(accelerator: Accelerator): boolean;
  getCurrentKeyPressed(): Accelerator;
  onKeydown(listener: KeyboardEventListener): Dispose;
  onKeyup(listener: KeyboardEventListener): Dispose;
}

export const ReactShortcutContext =
  React.createContext<ReactShortcutContextValue>({
    registerShortcut: () => throwProviderNotFoundError(),
    unregisterShortcut: () => throwProviderNotFoundError(),
    enableShortcut: () => throwProviderNotFoundError(),
    disableShortcut: () => throwProviderNotFoundError(),
    isShortcutRegistered: () => throwProviderNotFoundError(),
    getCurrentKeyPressed: () => throwProviderNotFoundError(),
    onKeydown: () => throwProviderNotFoundError(),
    onKeyup: () => throwProviderNotFoundError(),
  });

function throwProviderNotFoundError(): never {
  throw new Error('ShortcutProvider is not found!');
}
