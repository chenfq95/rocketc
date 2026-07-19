import { css, html } from 'lit';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Generic layout/surface box (Chakra-style `Box`).
 *
 * @element rc-box
 * @slot - Box content
 */
export class RcBox extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
        min-width: 0;
      }
    `,
  ];

  override render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-box': RcBox;
  }
}
