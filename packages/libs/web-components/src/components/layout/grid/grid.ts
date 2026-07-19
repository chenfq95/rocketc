import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Responsive CSS grid layout primitive.
 *
 * @element rc-grid
 * @slot - Grid children
 */
export type RcGridAlign = 'start' | 'center' | 'end' | 'stretch';

export class RcGrid extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: grid;
        gap: var(--rc-space-3);
        grid-template-columns: repeat(var(--_columns, 1), minmax(0, 1fr));
        align-items: stretch;
        justify-content: start;
        min-width: 0;
      }
      
      :host([min-child-width]) {
        grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--_min-child-width, 12rem)), 1fr));
      }
      
      :host([align='start']) {
        align-items: start;
      }
      
      :host([align='center']) {
        align-items: center;
      }
      
      :host([align='end']) {
        align-items: end;
      }
      
      :host([align='stretch']) {
        align-items: stretch;
      }
    `,
  ];

  @property({ type: Number, reflect: true })
  accessor columns: number = 1;

  @property({ type: String, attribute: 'min-child-width', reflect: true })
  accessor minChildWidth: string = '';

  @property({ type: String, reflect: true })
  accessor align: RcGridAlign = 'stretch';

  override updated(): void {
    this.style.setProperty('--_columns', String(Math.max(1, this.columns)));
    if (this.minChildWidth) {
      this.style.setProperty('--_min-child-width', this.minChildWidth);
    } else {
      this.style.removeProperty('--_min-child-width');
    }
  }

  override render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-grid': RcGrid;
  }
}
