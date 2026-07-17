import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/delegate-aria';
import { hostStyles } from '../../../internal/shared-styles';
import type { RdsButtonSize } from './button';

const base = mixinDelegatesAria(LitElement);

/**
 * Dismiss / close control (×). Defaults `aria-label` to "Close".
 *
 * @element rds-close-button
 */
export class RdsCloseButton extends base {
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
        border: 0;
        border-radius: var(--rds-radius-md);
        background: transparent;
        color: var(--rds-color-text-secondary);
        font: inherit;
        line-height: 1;
        cursor: pointer;
      }
      
      :host([size='sm']) button {
        width: var(--rds-space-7);
        height: var(--rds-space-7);
        font-size: 1rem;
      }
      
      :host([size='md']) button,
      :host(:not([size])) button {
        width: var(--rds-space-8);
        height: var(--rds-space-8);
        font-size: 1.125rem;
      }
      
      :host([size='lg']) button {
        width: var(--rds-space-9);
        height: var(--rds-space-9);
        font-size: 1.25rem;
      }
      
      button:hover:not(:disabled) {
        background: var(--rds-color-action-bg-hover);
        color: var(--rds-color-text-primary);
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
  accessor size: RdsButtonSize = 'md';

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  override render() {
    const { ariaLabel } = this as ARIAMixinStrict;
    return html`
      <button type="button" aria-label=${ariaLabel || 'Close'} ?disabled=${this.disabled}>
        <span aria-hidden="true">×</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-close-button': RdsCloseButton;
  }
}
