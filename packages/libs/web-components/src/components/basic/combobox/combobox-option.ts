import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Option used inside `rds-combobox`.
 *
 * @element rds-combobox-option
 * @slot - Option label
 */
export class RdsComboboxOption extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      .item {
        display: block;
        padding: var(--rds-space-2) var(--rds-space-3);
        cursor: pointer;
        color: var(--rds-color-text-primary);
        font-size: var(--rds-typography-body-font-size);
      }
      
      :host(:hover) .item,
      :host([data-active]) .item {
        background: var(--rds-color-action-bg-hover);
      }
      
      :host([selected]) .item {
        background: var(--rds-color-action-bg-selected, var(--rds-color-control-secondary-bg-hover));
        font-weight: var(--rds-typography-weight-medium);
      }
      
      :host([disabled]) .item {
        cursor: not-allowed;
        opacity: var(--rds-opacity-disabled);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor value: string = '';

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor selected: boolean = false;

  #onClick() {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('rds-combobox-select', {
        detail: { value: this.value, label: this.textContent?.trim() ?? this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <div
        class="item"
        role="option"
        aria-selected=${this.selected ? 'true' : 'false'}
        @click=${this.#onClick}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-combobox-option': RdsComboboxOption;
  }
}
