import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Field shell: label + control + helper / error text.
 *
 * @element rds-field
 * @slot label - Field label
 * @slot - Control (input, select, …)
 * @slot helper - Helper text (hidden when invalid)
 * @slot error - Error text (shown when `invalid`)
 */
export class RdsField extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: grid;
        gap: var(--rds-space-1);
      }
      
      .label {
        display: flex;
        align-items: baseline;
        gap: var(--rds-space-1);
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-label-font-size);
        font-weight: var(--rds-typography-label-font-weight);
      }
      
      :host([required]) .label::after {
        content: '*';
        color: var(--rds-color-danger-solid);
      }
      
      .hint {
        color: var(--rds-color-text-muted);
        font-size: var(--rds-typography-caption-font-size);
      }
      
      :host([invalid]) .hint {
        color: var(--rds-color-danger-fg, var(--rds-color-danger-solid));
      }
      
      .error {
        display: none;
      }
      
      :host([invalid]) .helper {
        display: none;
      }
      
      :host([invalid]) .error {
        display: block;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor invalid: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor required: boolean = false;

  override render() {
    return html`
      <div class="label"><slot name="label"></slot></div>
      <slot></slot>
      <div class="hint helper"><slot name="helper"></slot></div>
      <div class="hint error" role="alert"><slot name="error"></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-field': RdsField;
  }
}
