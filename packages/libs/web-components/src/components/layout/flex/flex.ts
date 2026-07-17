import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

export type RdsFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type RdsFlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RdsFlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type RdsFlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

/**
 * Flex layout primitive (Chakra-style `Flex`). Defaults to row.
 *
 * Prefer `rds-stack` for vertical stacks with the same gap scale.
 *
 * @element rds-flex
 * @slot - Flex children
 */
export class RdsFlex extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: flex;
        flex-direction: row;
        gap: var(--rds-space-3);
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
      
      :host([align='baseline']) {
        align-items: baseline;
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
      
      :host([justify='evenly']) {
        justify-content: space-evenly;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor direction: RdsFlexDirection = 'row';

  @property({ type: String, reflect: true })
  accessor gap: RdsFlexGap = 'md';

  @property({ type: String, reflect: true })
  accessor align: RdsFlexAlign = 'stretch';

  @property({ type: String, reflect: true })
  accessor justify: RdsFlexJustify = 'start';

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
    'rds-flex': RdsFlex;
  }
}
