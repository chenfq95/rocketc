import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

export type RcFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type RcFlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/**
 * Flex layout primitive (Chakra-style `Flex`). Defaults to row.
 *
 * Prefer `rc-stack` for vertical stacks with the same gap scale.
 *
 * @element rc-flex
 * @slot - Flex children
 */
export class RcFlex extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: flex;
        flex-direction: row;
        gap: var(--rc-space-3);
        align-items: stretch;
        justify-content: flex-start;
        min-width: 0;
      }
      
      :host([inline]) {
        display: inline-flex;
      }
      
      :host([direction='column']) {
        flex-direction: column;
      }
      
      :host([direction='row-reverse']) {
        flex-direction: row-reverse;
      }
      
      :host([direction='column-reverse']) {
        flex-direction: column-reverse;
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
      
      :host([align='baseline']) {
        align-items: baseline;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor direction: RcFlexDirection = 'row';

  @property({ type: String, reflect: true })
  accessor align: RcFlexAlign = 'stretch';

  @property({ type: Boolean, reflect: true })
  accessor wrap: boolean = false;

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
    'rc-flex': RcFlex;
  }
}
