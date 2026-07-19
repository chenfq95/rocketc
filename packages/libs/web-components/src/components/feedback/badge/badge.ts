import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

export type RcBadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info';

/**
 * Compact status / meta chip.
 *
 * @element rc-badge
 * @slot - Badge label
 */
export class RcBadge extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      
      span {
        display: inline-flex;
        align-items: center;
        border: var(--rc-border-sm) solid transparent;
        border-radius: var(--rc-radius-md);
        padding: 2px var(--rc-space-2);
        font-size: var(--rc-typography-caption-font-size);
        font-weight: var(--rc-typography-weight-semibold);
        line-height: var(--rc-typography-caption-line-height);
        white-space: nowrap;
      }
      
      :host([variant='default']) span,
      :host(:not([variant])) span {
        background: var(--rc-color-control-primary-bg);
        color: var(--rc-color-control-primary-fg-contrast);
      }
      
      :host([variant='secondary']) span {
        background: var(--rc-color-control-secondary-bg-hover);
        color: var(--rc-color-control-secondary-fg);
      }
      
      :host([variant='outline']) span {
        background: transparent;
        border-color: var(--rc-color-border-default);
        color: var(--rc-color-text-primary);
      }
      
      :host([variant='destructive']) span {
        background: var(--rc-color-danger-solid);
        color: var(--rc-color-danger-contrast);
      }
      
      :host([variant='success']) span {
        background: var(--rc-color-success-solid);
        color: var(--rc-color-success-contrast);
      }
      
      :host([variant='warning']) span {
        background: var(--rc-color-warning-solid);
        color: var(--rc-color-warning-contrast);
      }
      
      :host([variant='info']) span {
        background: var(--rc-color-info-solid);
        color: var(--rc-color-info-contrast);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor variant: RcBadgeVariant = 'default';

  override render() {
    return html`
      <span part="container label"><slot></slot></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-badge': RcBadge;
  }
}
