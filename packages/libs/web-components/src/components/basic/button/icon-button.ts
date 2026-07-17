import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/delegate-aria';
import { hostStyles } from '../../../internal/shared-styles';
import type { RdsButtonSize, RdsButtonVariant } from './button';

const base = mixinDelegatesAria(LitElement);

/**
 * Icon-only action button. Prefer an explicit `aria-label`.
 *
 * @element rds-icon-button
 * @slot - Icon content
 */
export class RdsIconButton extends base {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        border: var(--rds-border-sm) solid transparent;
        border-radius: var(--rds-radius-md);
        font: inherit;
        cursor: pointer;
        transition:
          background-color var(--rds-duration-fast) var(--rds-easing-standard),
          border-color var(--rds-duration-fast) var(--rds-easing-standard),
          color var(--rds-duration-fast) var(--rds-easing-standard);
      }
      
      :host([size='sm']) button {
        width: var(--rds-space-7);
        height: var(--rds-space-7);
        font-size: var(--rds-typography-caption-font-size);
      }
      
      :host([size='md']) button,
      :host(:not([size])) button {
        width: var(--rds-space-8);
        height: var(--rds-space-8);
        font-size: var(--rds-typography-label-font-size);
      }
      
      :host([size='lg']) button {
        width: var(--rds-space-9);
        height: var(--rds-space-9);
        font-size: var(--rds-typography-body-font-size);
      }
      
      :host([variant='solid']) button,
      :host(:not([variant])) button {
        background: var(--rds-color-control-primary-bg);
        border-color: var(--rds-color-control-primary-border);
        color: var(--rds-color-control-primary-fg-contrast);
      }
      
      :host([variant='subtle']) button {
        background: var(--rds-color-control-secondary-bg-hover);
        color: var(--rds-color-control-secondary-fg);
      }
      
      :host([variant='outline']) button {
        background: transparent;
        border-color: var(--rds-color-control-secondary-border);
        color: var(--rds-color-control-secondary-fg);
      }
      
      :host([variant='ghost']) button {
        background: transparent;
        color: var(--rds-color-text-primary);
      }
      
      :host([variant='ghost']) button:hover:not(:disabled) {
        background: var(--rds-color-action-bg-hover);
      }
      
      :host([variant='destructive']) button {
        background: var(--rds-color-danger-solid);
        border-color: var(--rds-color-danger-solid);
        color: var(--rds-color-danger-contrast);
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rds-color-surface-panel),
          0 0 0 4px var(--rds-color-border-focus);
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rds-opacity-disabled);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor variant: RdsButtonVariant = 'ghost';

  @property({ type: String, reflect: true })
  accessor size: RdsButtonSize = 'md';

  @property({ type: String, reflect: true })
  accessor type: 'button' | 'submit' | 'reset' = 'button';

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor loading: boolean = false;

  override render() {
    const { ariaLabel } = this as ARIAMixinStrict;
    return html`
      <button
        type=${this.type}
        aria-label=${ariaLabel || nothing}
        aria-busy=${this.loading ? 'true' : nothing}
        ?disabled=${this.disabled || this.loading}
      >
        ${
          this.loading
            ? html`
                <span aria-hidden="true">…</span>
              `
            : html`
                <slot></slot>
              `
        }
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-icon-button': RdsIconButton;
  }
}
