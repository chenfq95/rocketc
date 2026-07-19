import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Styled table shell. Place a native `<table>` (or rows) in the default slot.
 *
 * @element rc-table
 * @slot - Table markup
 * @slot caption - Optional caption above the table
 */
export class RcTable extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        height: 100%;
        min-height: 0;
        overflow: auto;
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-lg);
        background: var(--rc-color-surface-panel);
      }
      
      .caption {
        display: none;
        flex: none;
        padding: var(--rc-space-3) var(--rc-space-4);
        border-bottom: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-caption-font-size);
        font-weight: var(--rc-typography-weight-medium);
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
        font-size: var(--rc-typography-body-small-font-size);
      }
      
      :host ::slotted(table) th,
      :host ::slotted(table) td {
        padding: var(--rc-space-3) var(--rc-space-4);
        border-bottom: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        text-align: start;
      }
      
      /* Slotted table cells cannot be deeply styled in all browsers via ::slotted(th).
                                                                                             Prefer consumers adding a class, or style via part later. */
      :host([compact]) {
        --rc-table-cell-padding: var(--rc-space-2) var(--rc-space-3);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor striped: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor compact: boolean = false;

  override render() {
    return html`
      <div class="caption" part="caption"><slot name="caption"></slot></div>
      <div class="frame" part="frame"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-table': RcTable;
  }
}
