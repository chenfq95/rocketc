import { createContext } from '@lit/context';

export type RcSegmentSize = 'sm' | 'md' | 'lg';

export type RcSegmentContextValue = {
  value: string;
  size: RcSegmentSize;
  disabled: boolean;
  select: (value: string) => void;
};

export const rcSegmentContext = createContext<RcSegmentContextValue>(Symbol('rc-segment-context'));
