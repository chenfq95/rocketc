import { ContextConsumer } from '@lit/context';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';
import { rcComboboxContext } from './combobox-context';

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
      
      :host([hidden]) {
        display: none;
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
      
      .item[aria-selected='true'] {
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

  #comboboxContext = new ContextConsumer(this, {
    context: rcComboboxContext,
    subscribe: true,
  });

  override willUpdate(): void {
    const context = this.#comboboxContext.value;
    if (!context) return;
    const query = context.query.trim().toLowerCase();
    const label = (this.textContent ?? '').toLowerCase();
    this.hidden = Boolean(
      query && !label.includes(query) && !this.value.toLowerCase().includes(query),
    );
  }

  #onClick() {
    if (this.disabled) return;
    this.#comboboxContext.value?.select(this.value, this.textContent?.trim() ?? this.value);
  }

  override render() {
    const context = this.#comboboxContext.value;
    const selected = context ? context.value === this.value : this.selected;

    return html`
      <div class="item" part="item"
        role="option"
        aria-selected=${selected ? 'true' : 'false'}
        @click=${this.#onClick}
      >
        <slot @slotchange=${() => this.requestUpdate()}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-combobox-option': RcComboboxOption;
  }
}
