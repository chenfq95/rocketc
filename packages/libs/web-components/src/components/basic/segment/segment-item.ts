import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Option inside `rc-segment`.
 *
 * @element rc-segment-item
 * @slot - Item label
 * @fires rc-segment-select - When activated (`detail.value`)
 */
export class RcSegmentItem extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
        flex: 1 1 auto;
        min-width: 0;
      }
      
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: var(--rc-space-8);
        margin: 0;
        border: 0;
        border-radius: calc(var(--rc-radius-md) - 2px);
        background: transparent;
        padding: 0 var(--rc-space-3);
        color: var(--rc-color-text-secondary);
        font: inherit;
        font-size: var(--rc-typography-label-font-size);
        font-weight: var(--rc-typography-weight-medium);
        letter-spacing: var(--rc-typography-label-letter-spacing);
        cursor: pointer;
        white-space: nowrap;
        transition:
          background-color var(--rc-duration-fast, 150ms) var(--rc-easing-standard, ease),
          color var(--rc-duration-fast, 150ms) var(--rc-easing-standard, ease),
          box-shadow var(--rc-duration-fast, 150ms) var(--rc-easing-standard, ease);
      }
      
      :host([size='sm']) button {
        min-height: var(--rc-space-7);
        padding: 0 var(--rc-space-2);
        font-size: var(--rc-typography-caption-font-size);
      }
      
      :host([size='lg']) button {
        min-height: var(--rc-space-9);
        font-size: var(--rc-typography-body-font-size);
      }
      
      button:hover:not(:disabled) {
        color: var(--rc-color-text-primary);
      }
      
      :host([selected]) button {
        background: var(--rc-color-surface-panel);
        color: var(--rc-color-text-primary);
        box-shadow: var(--rc-shadow-xs, 0 1px 2px rgb(0 0 0 / 8%));
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rc-color-surface-panel),
          0 0 0 4px var(--rc-color-border-focus);
      }
      
      button:disabled {
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

  @property({ type: String, reflect: true })
  accessor size: 'sm' | 'md' | 'lg' = 'md';

  #activate() {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('rc-segment-select', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <button part="control"
        role="radio"
        type="button"
        ?disabled=${this.disabled}
        aria-checked=${this.selected ? 'true' : 'false'}
        tabindex=${this.selected ? 0 : -1}
        @click=${this.#activate}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-segment-item': RcSegmentItem;
  }
}
