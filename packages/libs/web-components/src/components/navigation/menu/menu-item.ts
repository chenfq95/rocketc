import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Menu row used inside `rds-menu`.
 *
 * @element rds-menu-item
 * @slot - Item label
 * @fires rds-menu-select - When activated (`detail.value`)
 */
export class RdsMenuItem extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      button {
        display: flex;
        align-items: center;
        width: 100%;
        margin: 0;
        border: 0;
        border-radius: var(--rds-radius-sm);
        background: transparent;
        padding: var(--rds-space-2) var(--rds-space-3);
        color: var(--rds-color-text-primary);
        font: inherit;
        font-size: var(--rds-typography-body-small-font-size);
        text-align: start;
        cursor: pointer;
      }
      
      button:hover:not(:disabled) {
        background: var(--rds-color-action-bg-hover);
      }
      
      button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--rds-color-border-focus);
      }
      
      :host([destructive]) button {
        color: var(--rds-color-danger-fg);
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
  accessor destructive: boolean = false;

  #activate() {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('rds-menu-select', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <button
        role="menuitem"
        type="button"
        ?disabled=${this.disabled}
        @click=${this.#activate}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-menu-item': RdsMenuItem;
  }
}
