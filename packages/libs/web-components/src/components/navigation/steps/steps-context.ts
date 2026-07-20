import { createContext } from '@lit/context';

export type RcStepsContextValue = {
  activeIndex: number;
  indexOf: (step: Element) => number;
};

export const rcStepsContext = createContext<RcStepsContextValue>(Symbol('rc-steps-context'));
