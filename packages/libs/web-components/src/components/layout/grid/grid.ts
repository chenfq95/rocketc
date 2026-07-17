import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

export type RdsGridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Responsive CSS grid layout primitive.
 *
 * @element rds-grid
 * @slot - Grid children
 */
export type RdsGridAlign = 'start' | 'center' | 'end' | 'stretch';
export type RdsGridJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export class RdsGrid extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: grid;
        gap: var(--rds-space-3);
        grid-template-columns: repeat(var(--_columns, 1), minmax(0, 1fr));
        align-items: stretch;
        justify-content: start;
        min-width: 0;
      }
      
      :host([min-child-width]) {
        grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--_min-child-width, 12rem)), 1fr));
      }
      
      :host([gap='none']) {
        gap: 0;
      }
      
      :host([gap='xs']) {
        gap: var(--rds-space-1);
      }
      
      :host([gap='sm']) {
        gap: var(--rds-space-2);
      }
      
      :host([gap='md']),
      :host(:not([gap])) {
        gap: var(--rds-space-3);
      }
      
      :host([gap='lg']) {
        gap: var(--rds-space-4);
      }
      
      :host([gap='xl']) {
        gap: var(--rds-space-6);
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
      
      :host([justify='start']) {
        justify-content: start;
      }
      
      :host([justify='center']) {
        justify-content: center;
      }
      
      :host([justify='end']) {
        justify-content: end;
      }
      
      :host([justify='between']) {
        justify-content: space-between;
      }
      
      :host([justify='around']) {
        justify-content: space-around;
      }
    `,
  ];

  @property({ type: Number, reflect: true })
  accessor columns: number = 1;

  @property({ type: String, reflect: true })
  accessor gap: RdsGridGap = 'md';

  @property({ type: String, attribute: 'min-child-width', reflect: true })
  accessor minChildWidth: string = '';

  @property({ type: String, reflect: true })
  accessor align: RdsGridAlign = 'stretch';

  @property({ type: String, reflect: true })
  accessor justify: RdsGridJustify = 'start';

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
    'rds-grid': RdsGrid;
  }
}
