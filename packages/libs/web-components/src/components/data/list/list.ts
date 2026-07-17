import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Styled list container. Compose with `rds-list-item`.
 *
 * @element rds-list
 * @slot - List items
 */
export class RdsList extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      .root {
        display: grid;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      
      :host([bordered]) .root {
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        border-radius: var(--rds-radius-lg);
        overflow: hidden;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor bordered: boolean = true;

  override render() {
    return html`
      <div class="root" role="list">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-list': RdsList;
  }
}
