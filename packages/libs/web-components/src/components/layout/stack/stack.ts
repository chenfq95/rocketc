import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

export type RdsStackDirection = 'vertical' | 'horizontal';
export type RdsStackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RdsStackAlign = 'start' | 'center' | 'end' | 'stretch';
export type RdsStackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

/**
 * Flex stack layout primitive.
 *
 * @element rds-stack
 * @slot - Stacked children
 */
export class RdsStack extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--rds-space-3);
        align-items: stretch;
        justify-content: flex-start;
      }
      
      :host([direction='horizontal']) {
        flex-direction: row;
      }
      
      :host([wrap]) {
        flex-wrap: wrap;
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
      
      :host([justify='start']) {
        justify-content: flex-start;
      }
      
      :host([justify='center']) {
        justify-content: center;
      }
      
      :host([justify='end']) {
        justify-content: flex-end;
      }
      
      :host([justify='between']) {
        justify-content: space-between;
      }
      
      :host([justify='around']) {
        justify-content: space-around;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor direction: RdsStackDirection = 'vertical';

  @property({ type: String, reflect: true })
  accessor gap: RdsStackGap = 'md';

  @property({ type: String, reflect: true })
  accessor align: RdsStackAlign = 'stretch';

  @property({ type: String, reflect: true })
  accessor justify: RdsStackJustify = 'start';

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
    'rds-stack': RdsStack;
  }
}
