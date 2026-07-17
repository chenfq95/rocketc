import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Option inside `rds-segment`.
 *
 * @element rds-segment-item
 * @slot - Item label
 * @fires rds-segment-select - When activated (`detail.value`)
 */
export class RdsSegmentItem extends LitElement {
  static override styles = [
    hostStyles,
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
        min-height: var(--rds-space-8);
        margin: 0;
        border: 0;
        border-radius: calc(var(--rds-radius-md) - 2px);
        background: transparent;
        padding: 0 var(--rds-space-3);
        color: var(--rds-color-text-secondary);
        font: inherit;
        font-size: var(--rds-typography-label-font-size);
        font-weight: var(--rds-typography-weight-medium);
        letter-spacing: var(--rds-typography-label-letter-spacing);
        cursor: pointer;
        white-space: nowrap;
        transition:
          background-color var(--rds-duration-fast, 150ms) var(--rds-easing-standard, ease),
          color var(--rds-duration-fast, 150ms) var(--rds-easing-standard, ease),
          box-shadow var(--rds-duration-fast, 150ms) var(--rds-easing-standard, ease);
      }
      
      :host([size='sm']) button {
        min-height: var(--rds-space-7);
        padding: 0 var(--rds-space-2);
        font-size: var(--rds-typography-caption-font-size);
      }
      
      :host([size='lg']) button {
        min-height: var(--rds-space-9);
        font-size: var(--rds-typography-body-font-size);
      }
      
      button:hover:not(:disabled) {
        color: var(--rds-color-text-primary);
      }
      
      :host([selected]) button {
        background: var(--rds-color-surface-panel);
        color: var(--rds-color-text-primary);
        box-shadow: var(--rds-shadow-xs, 0 1px 2px rgb(0 0 0 / 8%));
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
      new CustomEvent('rds-segment-select', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <button
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
    'rds-segment-item': RdsSegmentItem;
  }
}
