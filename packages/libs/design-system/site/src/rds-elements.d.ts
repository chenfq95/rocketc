import type { DetailedHTMLProps, HTMLAttributes, Ref } from 'react';

type RdsProps<T = HTMLElement> = DetailedHTMLProps<HTMLAttributes<T>, T> & {
  class?: string;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'rds-accordion': RdsProps & {
        multiple?: boolean;
        value?: string;
        onChange?: (event: Event) => void;
      };
      'rds-accordion-item': RdsProps & {
        value?: string;
        open?: boolean;
        disabled?: boolean;
      };
      'rds-alert': RdsProps & { variant?: string };
      'rds-avatar': RdsProps & { src?: string; alt?: string; size?: string };
      'rds-badge': RdsProps & { variant?: string };
      'rds-banner': RdsProps & {
        variant?: string;
        open?: boolean;
        dismissible?: boolean;
      };
      'rds-box': RdsProps & {
        display?: string;
        p?: string;
        px?: string;
        py?: string;
        m?: string;
        mx?: string;
        my?: string;
        bg?: string;
        rounded?: string;
        bordered?: boolean;
      };
      'rds-breadcrumb': RdsProps & { separator?: string };
      'rds-center': RdsProps & { inline?: boolean; 'min-height'?: string };
      'rds-button': RdsProps & {
        variant?: string;
        size?: string;
        type?: string;
        disabled?: boolean;
        loading?: boolean;
        onClick?: (event: Event) => void;
      };
      'rds-card': RdsProps;
      'rds-close-button': RdsProps & {
        size?: string;
        disabled?: boolean;
        onClick?: (event: Event) => void;
      };
      'rds-color-picker': RdsProps & {
        value?: string;
        name?: string;
        disabled?: boolean;
        onChange?: (event: Event) => void;
      };
      'rds-combobox': RdsProps & {
        value?: string;
        label?: string;
        placeholder?: string;
        open?: boolean;
        name?: string;
        disabled?: boolean;
        required?: boolean;
        onChange?: (event: Event) => void;
      };
      'rds-combobox-option': RdsProps & {
        value?: string;
        disabled?: boolean;
        selected?: boolean;
      };
      'rds-checkbox': RdsProps & {
        checked?: boolean;
        indeterminate?: boolean;
        disabled?: boolean;
        name?: string;
        value?: string;
        required?: boolean;
        onChange?: (event: Event) => void;
      };
      'rds-details': RdsProps & { open?: boolean };
      'rds-dialog': RdsProps & { open?: boolean; 'return-value'?: string };
      'rds-divider': RdsProps & {
        orientation?: 'horizontal' | 'vertical';
        inset?: boolean;
        label?: string;
      };
      'rds-drawer': RdsProps & { open?: boolean; side?: string };
      'rds-dropdown': RdsProps & { open?: boolean };
      'rds-empty': RdsProps;
      'rds-field': RdsProps & { invalid?: boolean; required?: boolean };
      'rds-file-upload': RdsProps & {
        accept?: string;
        multiple?: boolean;
        required?: boolean;
        label?: string;
        name?: string;
        disabled?: boolean;
        onChange?: (event: Event) => void;
      };
      'rds-fieldset': RdsProps & {
        disabled?: boolean;
        name?: string;
        form?: string;
      };
      'rds-flex': RdsProps & {
        direction?: string;
        gap?: string;
        align?: string;
        justify?: string;
        wrap?: boolean;
        inline?: boolean;
      };
      'rds-hover-card': RdsProps & { open?: boolean };
      'rds-icon-button': RdsProps & {
        variant?: string;
        size?: string;
        type?: string;
        disabled?: boolean;
        loading?: boolean;
        onClick?: (event: Event) => void;
      };
      'rds-grid': RdsProps & {
        columns?: number;
        gap?: string;
        'min-child-width'?: string;
        align?: string;
        justify?: string;
      };
      'rds-input': RdsProps & {
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
      'rds-label': RdsProps & { for?: string };
      'rds-link': RdsProps & {
        href?: string;
        target?: string;
        rel?: string;
        download?: string;
        variant?: string;
        disabled?: boolean;
      };
      'rds-list': RdsProps & { bordered?: boolean };
      'rds-list-item': RdsProps & {
        interactive?: boolean;
        disabled?: boolean;
      };
      'rds-menu': RdsProps;
      'rds-menu-item': RdsProps & {
        value?: string;
        disabled?: boolean;
        destructive?: boolean;
      };
      'rds-number-input': RdsProps & {
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
      'rds-password-input': RdsProps & {
        value?: string;
        placeholder?: string;
        name?: string;
        disabled?: boolean;
        readonly?: boolean;
        required?: boolean;
        revealed?: boolean;
        autocomplete?: string;
      };
      'rds-pin-input': RdsProps & {
        value?: string;
        length?: number;
        mask?: boolean;
        name?: string;
        disabled?: boolean;
        required?: boolean;
        onChange?: (event: Event) => void;
      };
      'rds-meter': RdsProps & {
        value?: number;
        min?: number;
        max?: number;
        low?: number;
        high?: number;
        optimum?: number;
      };
      'rds-pagination': RdsProps & {
        page?: number;
        count?: number;
        'sibling-count'?: number;
        onChange?: (event: Event) => void;
      };
      'rds-panel': RdsProps & { bordered?: boolean; padded?: boolean; className?: string };
      'rds-popover': RdsProps & { open?: boolean; placement?: string };
      'rds-progress-circle': RdsProps & {
        value?: number;
        max?: number;
        size?: string;
        indeterminate?: boolean;
      };
      'rds-progress': RdsProps & {
        value?: number;
        max?: number;
        indeterminate?: boolean;
      };
      'rds-radio': RdsProps & {
        checked?: boolean;
        disabled?: boolean;
        name?: string;
        value?: string;
        required?: boolean;
        onChange?: (event: Event) => void;
      };
      'rds-rating': RdsProps & {
        value?: number;
        max?: number;
        readonly?: boolean;
        label?: string;
        name?: string;
        disabled?: boolean;
        onChange?: (event: Event) => void;
      };
      'rds-radio-group': RdsProps & {
        name?: string;
        value?: string;
        disabled?: boolean;
        required?: boolean;
        orientation?: 'horizontal' | 'vertical';
        onChange?: (event: Event) => void;
      };
      'rds-segment': RdsProps & {
        value?: string;
        name?: string;
        disabled?: boolean;
        size?: string;
        'full-width'?: boolean;
        ref?: Ref<HTMLElementTagNameMap['rds-segment']>;
        onChange?: (event: Event) => void;
      };
      'rds-segment-item': RdsProps & {
        value?: string;
        disabled?: boolean;
        selected?: boolean;
        size?: string;
      };
      'rds-scroll-area': RdsProps & { 'max-height'?: string };
      'rds-select': RdsProps & {
        name?: string;
        value?: string;
        disabled?: boolean;
        required?: boolean;
        multiple?: boolean;
        onChange?: (event: Event) => void;
      };
      'rds-separator': RdsProps & {
        orientation?: 'horizontal' | 'vertical';
        decorative?: boolean;
      };
      'rds-sheet': RdsProps & {
        open?: boolean;
        side?: string;
        modal?: boolean;
      };
      'rds-sidebar': RdsProps & { collapsed?: boolean };
      'rds-skeleton': RdsProps & {
        variant?: string;
        width?: string;
        height?: string;
        lines?: number;
      };
      'rds-spinner': RdsProps & { size?: string; label?: string };
      'rds-step': RdsProps & {
        value?: string;
        index?: number;
        state?: string;
      };
      'rds-steps': RdsProps & {
        index?: number;
        onChange?: (event: Event) => void;
      };
      'rds-slider': RdsProps & {
        name?: string;
        value?: string;
        min?: number;
        max?: number;
        step?: number;
        disabled?: boolean;
        onChange?: (event: Event) => void;
      };
      'rds-snackbar': RdsProps & { open?: boolean; duration?: number };
      'rds-stack': RdsProps & {
        direction?: string;
        gap?: string;
        align?: string;
        justify?: string;
        wrap?: boolean;
      };
      'rds-stat': RdsProps & { trend?: string };
      'rds-switch': RdsProps & {
        checked?: boolean;
        disabled?: boolean;
        name?: string;
        onChange?: (event: Event) => void;
      };
      'rds-tag': RdsProps & {
        variant?: string;
        dismissible?: boolean;
        onDismiss?: (event: Event) => void;
      };
      'rds-tags-input': RdsProps & {
        value?: string;
        placeholder?: string;
        name?: string;
        disabled?: boolean;
        required?: boolean;
        onChange?: (event: Event) => void;
      };
      'rds-tab': RdsProps & {
        value?: string;
        disabled?: boolean;
        selected?: boolean;
      };
      'rds-table': RdsProps & { striped?: boolean; compact?: boolean };
      'rds-tabs': RdsProps & {
        value?: string;
        onChange?: (event: Event) => void;
      };
      'rds-timeline': RdsProps;
      'rds-timeline-item': RdsProps;
      'rds-toggle-tip': RdsProps & { open?: boolean };
      'rds-textarea': RdsProps & {
        name?: string;
        value?: string;
        placeholder?: string;
        disabled?: boolean;
        readonly?: boolean;
        required?: boolean;
        rows?: number;
        resize?: string;
      };
      'rds-toast': RdsProps & {
        open?: boolean;
        variant?: string;
        duration?: number;
      };
      'rds-tooltip': RdsProps & {
        content?: string;
        placement?: string;
        open?: boolean;
      };
      'rds-typography': RdsProps & {
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
