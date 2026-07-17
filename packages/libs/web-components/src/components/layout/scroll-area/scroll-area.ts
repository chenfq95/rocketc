import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Scrollable region with token-styled scrollbars where supported.
 *
 * @element rds-scroll-area
 * @slot - Scrollable content
 */
export class RdsScrollArea extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
      
      .viewport {
        max-height: var(--rds-scroll-max-height, 12rem);
        overflow: auto;
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        border-radius: var(--rds-radius-md);
        background: var(--rds-color-surface-panel);
        padding: var(--rds-space-3);
        scrollbar-width: thin;
        scrollbar-color: var(--rds-color-border-default) transparent;
      }
      
      .viewport::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      .viewport::-webkit-scrollbar-thumb {
        background: var(--rds-color-border-default);
        border-radius: var(--rds-radius-full);
      }
    `,
  ];

  @property({ type: String, reflect: true, attribute: 'max-height' })
  accessor maxHeight: string = '';

  override updated() {
    if (this.maxHeight) {
      this.style.setProperty('--rds-scroll-max-height', this.maxHeight);
    } else {
      this.style.removeProperty('--rds-scroll-max-height');
    }
  }

  override render() {
    return html`
      <div class="viewport" part="viewport"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-scroll-area': RdsScrollArea;
  }
}
