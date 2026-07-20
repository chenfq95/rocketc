import { createContext } from '@lit/context';

export type RcAccordionContextValue = {
  openValues: readonly string[];
  toggle: (value: string, open: boolean) => void;
};

export const rcAccordionContext = createContext<RcAccordionContextValue>(
  Symbol('rc-accordion-context'),
);
