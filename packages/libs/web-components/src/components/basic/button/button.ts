import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/delegate-aria';
import { hostStyles } from '../../../internal/shared-styles';

export type RdsButtonVariant = 'solid' | 'subtle' | 'outline' | 'ghost' | 'destructive';
export type RdsButtonSize = 'sm' | 'md' | 'lg';

const buttonBase = mixinDelegatesAria(LitElement);

/**
 * Primary action control. Visuals resolve through `color.control.*` /
 * `color.danger.*` semantic tokens.
 *
 * Host API props (`variant` / `size` / `loading`) stay on the host.
 * ARIA on the host is delegated to the inner `<button>` via
 * `mixinDelegatesAria` (host stores `data-aria-*`, template binds inward).
 * Interactive events are composed and surface on the host (retargeted).
 *
 * @element rds-button
 * @slot - Button label / content
 */
export class RdsButton extends buttonBase {
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
        gap: var(--rds-space-2);
        width: 100%;
        margin: 0;
        border: var(--rds-border-sm) solid transparent;
        border-radius: var(--rds-radius-md);
        font: inherit;
        font-weight: var(--rds-typography-weight-medium);
        letter-spacing: var(--rds-typography-label-letter-spacing);
        cursor: pointer;
        transition:
          background-color var(--rds-duration-fast) var(--rds-easing-standard),
          border-color var(--rds-duration-fast) var(--rds-easing-standard),
          color var(--rds-duration-fast) var(--rds-easing-standard),
          opacity var(--rds-duration-fast) var(--rds-easing-standard);
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rds-color-surface-panel),
          0 0 0 4px var(--rds-color-border-focus);
      }
      
      :host([size='sm']) button {
        min-height: var(--rds-space-7);
        padding: 0 var(--rds-space-2);
        font-size: var(--rds-typography-caption-font-size);
      }
      
      :host([size='md']) button,
      :host(:not([size])) button {
        min-height: var(--rds-space-8);
        padding: 0 var(--rds-space-3);
        font-size: var(--rds-typography-label-font-size);
      }
      
      :host([size='lg']) button {
        min-height: var(--rds-space-9);
        padding: 0 var(--rds-space-4);
        font-size: var(--rds-typography-body-font-size);
      }
      
      :host([variant='solid']) button,
      :host(:not([variant])) button {
        background: var(--rds-color-control-primary-bg);
        border-color: var(--rds-color-control-primary-border);
        color: var(--rds-color-control-primary-fg-contrast);
      }
      
      :host([variant='solid']) button:hover:not(:disabled),
      :host(:not([variant])) button:hover:not(:disabled) {
        background: var(--rds-color-control-primary-bg-hover);
        border-color: var(--rds-color-control-primary-border-hover);
      }
      
      :host([variant='solid']) button:active:not(:disabled),
      :host(:not([variant])) button:active:not(:disabled) {
        background: var(--rds-color-control-primary-bg-active);
      }
      
      :host([variant='subtle']) button {
        background: var(--rds-color-control-secondary-bg-hover);
        border-color: transparent;
        color: var(--rds-color-control-secondary-fg);
      }
      
      :host([variant='subtle']) button:hover:not(:disabled) {
        background: var(--rds-color-control-secondary-bg-active);
      }
      
      :host([variant='outline']) button {
        background: transparent;
        border-color: var(--rds-color-control-secondary-border);
        color: var(--rds-color-control-secondary-fg);
      }
      
      :host([variant='outline']) button:hover:not(:disabled) {
        background: var(--rds-color-action-bg-hover);
        border-color: var(--rds-color-control-secondary-border-hover);
      }
      
      :host([variant='ghost']) button {
        background: transparent;
        border-color: transparent;
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
      
      :host([variant='destructive']) button:hover:not(:disabled) {
        background: var(--rds-color-danger-solid-hover);
        border-color: var(--rds-color-danger-solid-hover);
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rds-opacity-disabled);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor variant: RdsButtonVariant = 'solid';

  @property({ type: String, reflect: true })
  accessor size: RdsButtonSize = 'md';

  @property({ type: String, reflect: true })
  accessor type: 'button' | 'submit' | 'reset' = 'button';

  @property({ type: String, reflect: true })
  accessor name: string = '';

  @property({ type: String, reflect: true })
  accessor value: string = '';

  @property({ type: String, reflect: true })
  accessor form: string = '';

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor loading: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor autofocus: boolean = false;

  override render() {
    const { ariaLabel, ariaHasPopup, ariaExpanded, ariaBusy, role } = this as ARIAMixinStrict;

    return html`
      <button
        aria-busy=${this.loading ? 'true' : ariaBusy || nothing}
        aria-expanded=${ariaExpanded || nothing}
        aria-haspopup=${ariaHasPopup || nothing}
        aria-label=${ariaLabel || nothing}
        ?autofocus=${this.autofocus}
        ?disabled=${this.disabled || this.loading}
        form=${this.form || nothing}
        name=${this.name || nothing}
        role=${role || nothing}
        type=${this.type}
        value=${this.value || nothing}
      >
        ${
          this.loading
            ? html`
                <span aria-hidden="true">…</span>
              `
            : nothing
        }
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-button': RdsButton;
  }
}
