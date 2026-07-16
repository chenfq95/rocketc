import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type RdsProps<T = HTMLElement> = DetailedHTMLProps<HTMLAttributes<T>, T> & {
  class?: string;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'rds-alert': RdsProps & { variant?: string };
      'rds-badge': RdsProps & { variant?: string };
      'rds-button': RdsProps & {
        variant?: string;
        size?: string;
        type?: string;
        disabled?: boolean;
        loading?: boolean;
        onClick?: (event: Event) => void;
      };
      'rds-card': RdsProps;
      'rds-input': RdsProps & {
        type?: string;
        name?: string;
        value?: string;
        placeholder?: string;
        disabled?: boolean;
        readonly?: boolean;
        required?: boolean;
      };
      'rds-label': RdsProps & {
        /** Native `for` attribute (reserved word in JSX). */
        for?: string;
      };
      'rds-switch': RdsProps & {
        checked?: boolean;
        disabled?: boolean;
        name?: string;
        onChange?: (event: Event) => void;
      };
    }
  }
}

export {};
