import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Field shell: label + control + helper / error text.
 *
 * @element rc-field
 * @slot label - Field label
 * @slot - Control (input, select, …)
 * @slot helper - Helper text (hidden when invalid)
 * @slot error - Error text (shown when `invalid`)
 */
export class RcField extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: grid;
        gap: var(--rc-space-1);
      }
      
      .label {
        display: flex;
        align-items: baseline;
        gap: var(--rc-space-1);
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-label-font-size);
        font-weight: var(--rc-typography-label-font-weight);
      }
      
      :host([required]) .label::after {
        content: '*';
        color: var(--rc-color-danger-solid);
      }
      
      .hint {
        color: var(--rc-color-text-muted);
        font-size: var(--rc-typography-caption-font-size);
      }
      
      :host([invalid]) .hint {
        color: var(--rc-color-danger-fg, var(--rc-color-danger-solid));
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
      <div class="label" part="label"><slot name="label"></slot></div>
      <slot></slot>
      <div class="hint helper" part="hint helper"><slot name="helper"></slot></div>
      <div class="hint error" part="hint error" role="alert"><slot name="error"></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-field': RcField;
  }
}
