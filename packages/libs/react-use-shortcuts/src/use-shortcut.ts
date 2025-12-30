import { useContext } from 'react';
import {
  ReactShortcutContext,
  type ReactShortcutContextValue,
} from './shortcut-context';

export const useShortcut = () => {
  return useContext<ReactShortcutContextValue>(ReactShortcutContext);
};
