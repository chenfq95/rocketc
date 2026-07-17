import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Item used inside `rds-accordion`.
 *
 * @element rds-accordion-item
 * @slot - Panel content
 * @slot trigger - Trigger label
 */
export class RdsAccordionItem extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        border-bottom: var(--rds-border-sm) solid var(--rds-color-border-subtle);
      }
      
      :host(:last-child) {
        border-bottom: 0;
      }
      
      button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--rds-space-3);
        width: 100%;
        margin: 0;
        border: 0;
        background: transparent;
        padding: var(--rds-space-3) 0;
        color: var(--rds-color-text-primary);
        font: inherit;
        font-size: var(--rds-typography-label-font-size);
        font-weight: var(--rds-typography-weight-medium);
        text-align: left;
        cursor: pointer;
      }
      
      button::after {
        content: '';
        width: 0.4rem;
        height: 0.4rem;
        border-right: var(--rds-border-sm) solid currentColor;
        border-bottom: var(--rds-border-sm) solid currentColor;
        rotate: -45deg;
        transition: rotate var(--rds-duration-fast) var(--rds-easing-standard);
      }
      
      :host([open]) button::after {
        rotate: 45deg;
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rds-color-surface-panel),
          0 0 0 4px var(--rds-color-border-focus);
        border-radius: var(--rds-radius-sm);
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rds-opacity-disabled);
      }
      
      .panel {
        display: none;
        padding: 0 0 var(--rds-space-3);
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-body-font-size);
      }
      
      :host([open]) .panel {
        display: block;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor value: string = '';

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  #toggle() {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('rds-accordion-toggle', {
        detail: { value: this.value, open: !this.open },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <button
        type="button"
        aria-expanded=${this.open ? 'true' : 'false'}
        ?disabled=${this.disabled}
        @click=${this.#toggle}
      >
        <slot name="trigger">Item</slot>
      </button>
      <div class="panel" role="region" ?hidden=${!this.open}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-accordion-item': RdsAccordionItem;
  }
}
