import { createContext } from '@lit/context';

export type RcMenuContextValue = {
  select: (value: string) => void;
};

export const rcMenuContext = createContext<RcMenuContextValue>(Symbol('rc-menu-context'));
