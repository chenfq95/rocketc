import type { DetailedHTMLProps, HTMLAttributes, Ref } from 'react';

type RcStyleAttributes = {
  pd?: string;
  px?: string;
  py?: string;
  mg?: string;
  mx?: string;
  my?: string;
  display?: string;
  gap?: string;
  'align-items'?: string;
  justify?: string;
  position?: string;
  overflow?: string;
  width?: string;
  height?: string;
  'min-width'?: string;
  'max-width'?: string;
  'min-height'?: string;
  'max-height'?: string;
  border?: string;
  'border-width'?: string;
  'border-style'?: string;
  'border-color'?: string;
  'border-radius'?: string;
  bg?: string;
  color?: string;
  'font-size'?: string;
  'font-weight'?: string;
  'line-height'?: string;
  'text-align'?: string;
};

type RcProps<T = HTMLElement> = DetailedHTMLProps<HTMLAttributes<T>, T> &
  RcStyleAttributes & {
    class?: string;
  };

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'rc-accordion': RcProps & {
        multiple?: boolean;
        value?: string;
        onChange?: (event: Event) => void;
      };
      'rc-accordion-item': RcProps & {
        value?: string;
        open?: boolean;
        disabled?: boolean;
      };
      'rc-alert': RcProps & { variant?: string };
      'rc-avatar': RcProps & { src?: string; alt?: string; size?: string };
      'rc-badge': RcProps & { variant?: string };
      'rc-banner': RcProps & {
        variant?: string;
        open?: boolean;
        dismissible?: boolean;
      };
      'rc-box': RcProps;
      'rc-breadcrumb': RcProps & { separator?: string };
      'rc-center': RcProps & { inline?: boolean };
      'rc-button': RcProps & {
        variant?: string;
        size?: string;
        type?: string;
        disabled?: boolean;
        loading?: boolean;
        onClick?: (event: Event) => void;
      };
      'rc-card': RcProps;
      'rc-close-button': RcProps & {
        size?: string;
        disabled?: boolean;
        onClick?: (event: Event) => void;
      };
      'rc-color-picker': RcProps & {
        value?: string;
        name?: string;
        disabled?: boolean;
        onChange?: (event: Event) => void;
      };
      'rc-combobox': RcProps & {
        value?: string;
        label?: string;
        placeholder?: string;
        open?: boolean;
        name?: string;
        disabled?: boolean;
        required?: boolean;
        onChange?: (event: Event) => void;
      };
      'rc-combobox-option': RcProps & {
        value?: string;
        disabled?: boolean;
        selected?: boolean;
      };
      'rc-checkbox': RcProps & {
        checked?: boolean;
        indeterminate?: boolean;
        disabled?: boolean;
        name?: string;
        value?: string;
        required?: boolean;
        onChange?: (event: Event) => void;
      };
      'rc-details': RcProps & { open?: boolean };
      'rc-dialog': RcProps & { open?: boolean; 'return-value'?: string };
      'rc-divider': RcProps & {
        orientation?: 'horizontal' | 'vertical';
        inset?: boolean;
        label?: string;
      };
      'rc-drawer': RcProps & { open?: boolean; side?: string };
      'rc-dropdown': RcProps & { open?: boolean };
      'rc-empty': RcProps;
      'rc-field': RcProps & { invalid?: boolean; required?: boolean };
      'rc-file-upload': RcProps & {
        accept?: string;
        multiple?: boolean;
        required?: boolean;
        label?: string;
        name?: string;
        disabled?: boolean;
        onChange?: (event: Event) => void;
      };
      'rc-fieldset': RcProps & {
        disabled?: boolean;
        name?: string;
        form?: string;
      };
      'rc-flex': RcProps & {
        direction?: string;
        align?: string;
        wrap?: boolean;
        inline?: boolean;
      };
      'rc-hover-card': RcProps & { open?: boolean };
      'rc-icon-button': RcProps & {
        variant?: string;
        size?: string;
        type?: string;
        disabled?: boolean;
        loading?: boolean;
        onClick?: (event: Event) => void;
      };
      'rc-grid': RcProps & {
        columns?: number;
        'min-child-width'?: string;
        align?: string;
      };
      'rc-input': RcProps & {
        type?: string;
        name?: string;
        value?: string;
        placeholder?: string;
        disabled?: boolean;
        readonly?: boolean;
        required?: boolean;
        min?: string;
        max?: string;
        step?: string;
        accept?: string;
        multiple?: boolean;
      };
      'rc-label': RcProps & { for?: string };
      'rc-link': RcProps & {
        href?: string;
        target?: string;
        rel?: string;
        download?: string;
        variant?: string;
        disabled?: boolean;
      };
      'rc-list': RcProps & { bordered?: boolean };
      'rc-list-item': RcProps & {
        interactive?: boolean;
        disabled?: boolean;
      };
      'rc-menu': RcProps;
      'rc-menu-item': RcProps & {
        value?: string;
        disabled?: boolean;
        destructive?: boolean;
      };
      'rc-number-input': RcProps & {
        value?: string;
        min?: number;
        max?: number;
        step?: number;
        placeholder?: string;
        name?: string;
        disabled?: boolean;
        readonly?: boolean;
        required?: boolean;
        onChange?: (event: Event) => void;
      };
      'rc-password-input': RcProps & {
        value?: string;
        placeholder?: string;
        name?: string;
        disabled?: boolean;
        readonly?: boolean;
        required?: boolean;
        revealed?: boolean;
        autocomplete?: string;
      };
      'rc-pin-input': RcProps & {
        value?: string;
        length?: number;
        mask?: boolean;
        name?: string;
        disabled?: boolean;
        required?: boolean;
        onChange?: (event: Event) => void;
      };
      'rc-meter': RcProps & {
        value?: number;
        min?: number;
        max?: number;
        low?: number;
        high?: number;
        optimum?: number;
      };
      'rc-pagination': RcProps & {
        page?: number;
        count?: number;
        'sibling-count'?: number;
        onChange?: (event: Event) => void;
      };
      'rc-panel': RcProps & { bordered?: boolean; padded?: boolean; className?: string };
      'rc-popover': RcProps & { open?: boolean; placement?: string };
      'rc-progress-circle': RcProps & {
        value?: number;
        max?: number;
        size?: string;
        indeterminate?: boolean;
      };
      'rc-progress': RcProps & {
        value?: number;
        max?: number;
        indeterminate?: boolean;
      };
      'rc-radio': RcProps & {
        checked?: boolean;
        disabled?: boolean;
        name?: string;
        value?: string;
        required?: boolean;
        onChange?: (event: Event) => void;
      };
      'rc-rating': RcProps & {
        value?: number;
        max?: number;
        readonly?: boolean;
        label?: string;
        name?: string;
        disabled?: boolean;
        onChange?: (event: Event) => void;
      };
      'rc-radio-group': RcProps & {
        name?: string;
        value?: string;
        disabled?: boolean;
        required?: boolean;
        orientation?: 'horizontal' | 'vertical';
        onChange?: (event: Event) => void;
      };
      'rc-segment': RcProps & {
        value?: string;
        name?: string;
        disabled?: boolean;
        size?: string;
        'full-width'?: boolean;
        ref?: Ref<HTMLElementTagNameMap['rc-segment']>;
        onChange?: (event: Event) => void;
      };
      'rc-segment-item': RcProps & {
        value?: string;
        disabled?: boolean;
        selected?: boolean;
        size?: string;
      };
      'rc-scroll-area': RcProps & { 'max-height'?: string };
      'rc-select': RcProps & {
        name?: string;
        value?: string;
        disabled?: boolean;
        required?: boolean;
        multiple?: boolean;
        onChange?: (event: Event) => void;
      };
      'rc-separator': RcProps & {
        orientation?: 'horizontal' | 'vertical';
        decorative?: boolean;
      };
      'rc-sheet': RcProps & {
        open?: boolean;
        side?: string;
        modal?: boolean;
      };
      'rc-sidebar': RcProps & { collapsed?: boolean };
      'rc-skeleton': RcProps & {
        variant?: string;
        width?: string;
        height?: string;
        lines?: number;
      };
      'rc-spinner': RcProps & { size?: string; label?: string };
      'rc-step': RcProps & {
        value?: string;
        index?: number;
        state?: string;
      };
      'rc-steps': RcProps & {
        index?: number;
        onChange?: (event: Event) => void;
      };
      'rc-slider': RcProps & {
        name?: string;
        value?: string;
        min?: number;
        max?: number;
        step?: number;
        disabled?: boolean;
        onChange?: (event: Event) => void;
      };
      'rc-snackbar': RcProps & { open?: boolean; duration?: number };
      'rc-stack': RcProps & {
        direction?: string;
        align?: string;
        wrap?: boolean;
      };
      'rc-stat': RcProps & { trend?: string };
      'rc-switch': RcProps & {
        checked?: boolean;
        disabled?: boolean;
        name?: string;
        onChange?: (event: Event) => void;
      };
      'rc-tag': RcProps & {
        variant?: string;
        dismissible?: boolean;
        onDismiss?: (event: Event) => void;
      };
      'rc-tags-input': RcProps & {
        value?: string;
        placeholder?: string;
        name?: string;
        disabled?: boolean;
        required?: boolean;
        onChange?: (event: Event) => void;
      };
      'rc-tab': RcProps & {
        value?: string;
        disabled?: boolean;
        selected?: boolean;
      };
      'rc-table': RcProps & { striped?: boolean; compact?: boolean };
      'rc-tabs': RcProps & {
        value?: string;
        onChange?: (event: Event) => void;
      };
      'rc-timeline': RcProps;
      'rc-timeline-item': RcProps;
      'rc-toggle-tip': RcProps & { open?: boolean };
      'rc-textarea': RcProps & {
        name?: string;
        value?: string;
        placeholder?: string;
        disabled?: boolean;
        readonly?: boolean;
        required?: boolean;
        rows?: number;
        resize?: string;
      };
      'rc-toast': RcProps & {
        open?: boolean;
        variant?: string;
        duration?: number;
      };
      'rc-tooltip': RcProps & {
        content?: string;
        placement?: string;
        open?: boolean;
      };
      'rc-typography': RcProps & {
        variant?: string;
        as?: string;
        color?: string;
        align?: string;
        truncate?: boolean;
      };
    }
  }
}

export {};
