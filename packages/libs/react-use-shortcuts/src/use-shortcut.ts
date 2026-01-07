import { useContext } from 'react';
import { ReactShortcutContext, type ReactShortcutContextValue } from './shortcut-context';

const useShortcut = () => {
  return useContext<ReactShortcutContextValue>(ReactShortcutContext);
};

export default useShortcut;
