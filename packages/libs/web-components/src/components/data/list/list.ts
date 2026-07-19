import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Styled list container. Compose with `rc-list-item`.
 *
 * @element rc-list
 * @slot - List items
 */
export class RcList extends RcStyledElement {
  static override styles = [
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
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-lg);
        overflow: hidden;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor bordered: boolean = true;

  override render() {
    return html`
      <div class="root" part="container root" role="list">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-list': RcList;
  }
}
