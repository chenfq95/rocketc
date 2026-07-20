import { createContext } from '@lit/context';

export type RcComboboxContextValue = {
  value: string;
  query: string;
  select: (value: string, label: string) => void;
};

export const rcComboboxContext = createContext<RcComboboxContextValue>(
  Symbol('rc-combobox-context'),
);
