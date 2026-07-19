import { css, html } from 'lit';
import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Scrollable region with token-styled scrollbars where supported.
 *
 * @element rc-scroll-area
 * @slot - Scrollable content
 */
export class RcScrollArea extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
        min-width: 0;
        max-height: 12rem;
      }
      
      .viewport {
        max-height: inherit;
        overflow: auto;
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-md);
        background: var(--rc-color-surface-panel);
        padding: var(--rc-space-3);
        scrollbar-width: thin;
        scrollbar-color: var(--rc-color-border-default) transparent;
      }
      
      .viewport::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      .viewport::-webkit-scrollbar-thumb {
        background: var(--rc-color-border-default);
        border-radius: var(--rc-radius-full);
      }
    `,
  ];

  override render() {
    return html`
      <div class="viewport" part="viewport"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-scroll-area': RcScrollArea;
  }
}
