import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

export type RcStackDirection = 'vertical' | 'horizontal';
export type RcStackAlign = 'start' | 'center' | 'end' | 'stretch';

/**
 * Flex stack layout primitive.
 *
 * @element rc-stack
 * @slot - Stacked children
 */
export class RcStack extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        min-width: 0;
        color: inherit;
      }
      
      :host([direction='horizontal']) {
        flex-direction: row;
      }
      
      :host([wrap]) {
        flex-wrap: wrap;
      }
      
      :host([align='start']) {
        align-items: flex-start;
      }
      
      :host([align='center']) {
        align-items: center;
      }
      
      :host([align='end']) {
        align-items: flex-end;
      }
      
      :host([align='stretch']) {
        align-items: stretch;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor direction: RcStackDirection = 'vertical';

  @property({ type: String, reflect: true })
  accessor align: RcStackAlign = 'stretch';

  @property({ type: Boolean, reflect: true })
  accessor wrap: boolean = false;

  override render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-stack': RcStack;
  }
}
