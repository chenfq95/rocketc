import { createContext } from '@lit/context';

export type RcTabsContextValue = {
  value: string;
  select: (value: string) => void;
};

export const rcTabsContext = createContext<RcTabsContextValue>(Symbol('rc-tabs-context'));
