import { createContext } from '@lit/context';

export type RcRadioGroupContextValue = {
  name: string;
  value: string;
  disabled: boolean;
  select: (value: string) => void;
};

export const rcRadioGroupContext = createContext<RcRadioGroupContextValue>(
  Symbol('rc-radio-group-context'),
);
