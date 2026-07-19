import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Centers children on both axes (Chakra-style `Center`).
 *
 * @element rc-center
 * @slot - Centered content
 */
export class RcCenter extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 0;
        min-height: var(--rc-space-16);
      }
      
      :host([inline]) {
        display: inline-flex;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor inline: boolean = false;

  override render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-center': RcCenter;
  }
}
