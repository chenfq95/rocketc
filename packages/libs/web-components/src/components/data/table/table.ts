import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Styled table shell. Place a native `<table>` (or rows) in the default slot.
 *
 * @element rds-table
 * @slot - Table markup
 * @slot caption - Optional caption above the table
 */
export class RdsTable extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        height: 100%;
        min-height: 0;
        overflow: auto;
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        border-radius: var(--rds-radius-lg);
        background: var(--rds-color-surface-panel);
      }
      
      .caption {
        display: none;
        flex: none;
        padding: var(--rds-space-3) var(--rds-space-4);
        border-bottom: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-caption-font-size);
        font-weight: var(--rds-typography-weight-medium);
      }
      
      :host(:has([slot='caption'])) .caption {
        display: block;
      }
      
      .frame {
        flex: 1 1 auto;
        width: 100%;
        min-height: 0;
      }
      
      ::slotted(table) {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--rds-typography-body-small-font-size);
      }
      
      :host ::slotted(table) th,
      :host ::slotted(table) td {
        padding: var(--rds-space-3) var(--rds-space-4);
        border-bottom: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        text-align: start;
      }
      
      /* Slotted table cells cannot be deeply styled in all browsers via ::slotted(th).
                                                   Prefer consumers adding a class, or style via part later. */
      :host([compact]) {
        --rds-table-cell-padding: var(--rds-space-2) var(--rds-space-3);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor striped: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor compact: boolean = false;

  override render() {
    return html`
      <div class="caption"><slot name="caption"></slot></div>
      <div class="frame"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-table': RdsTable;
  }
}
