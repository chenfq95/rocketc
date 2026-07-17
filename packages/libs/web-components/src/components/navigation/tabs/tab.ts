import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Tab trigger used inside `rds-tabs`.
 *
 * @element rds-tab
 * @slot - Tab label
 */
export class RdsTab extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
      }
      
      button {
        margin: 0;
        border: 0;
        border-bottom: 2px solid transparent;
        background: transparent;
        padding: var(--rds-space-2) var(--rds-space-3);
        color: var(--rds-color-text-secondary);
        font: inherit;
        font-size: var(--rds-typography-label-font-size);
        font-weight: var(--rds-typography-weight-medium);
        cursor: pointer;
      }
      
      button:hover:not(:disabled) {
        color: var(--rds-color-text-primary);
        background: var(--rds-color-action-bg-hover);
      }
      
      :host([selected]) button {
        color: var(--rds-color-control-primary-fg, var(--rds-color-brand-fg));
        border-bottom-color: var(--rds-color-control-primary-border);
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

  #onClick() {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('rds-tab-select', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <button
        role="tab"
        type="button"
        ?disabled=${this.disabled}
        aria-selected=${this.selected ? 'true' : 'false'}
        tabindex=${this.selected ? 0 : -1}
        @click=${this.#onClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-tab': RdsTab;
  }
}
