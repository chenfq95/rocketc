import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Option used inside `rc-combobox`.
 *
 * @element rc-combobox-option
 * @slot - Option label
 */
export class RcComboboxOption extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      .item {
        display: block;
        padding: var(--rc-space-2) var(--rc-space-3);
        cursor: pointer;
        color: var(--rc-color-text-primary);
        font-size: var(--rc-typography-body-font-size);
      }
      
      :host(:hover) .item,
      :host([data-active]) .item {
        background: var(--rc-color-action-bg-hover);
      }
      
      :host([selected]) .item {
        background: var(--rc-color-action-bg-selected, var(--rc-color-control-secondary-bg-hover));
        font-weight: var(--rc-typography-weight-medium);
      }
      
      :host([disabled]) .item {
        cursor: not-allowed;
        opacity: var(--rc-opacity-disabled);
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
      new CustomEvent('rc-combobox-select', {
        detail: { value: this.value, label: this.textContent?.trim() ?? this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <div class="item" part="item"
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
    'rc-combobox-option': RcComboboxOption;
  }
}
