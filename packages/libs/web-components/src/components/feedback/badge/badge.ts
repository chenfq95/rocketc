import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

export type RdsBadgeVariant =
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
 * @element rds-badge
 * @slot - Badge label
 */
export class RdsBadge extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      
      span {
        display: inline-flex;
        align-items: center;
        border: var(--rds-border-sm) solid transparent;
        border-radius: var(--rds-radius-md);
        padding: 2px var(--rds-space-2);
        font-size: var(--rds-typography-caption-font-size);
        font-weight: var(--rds-typography-weight-semibold);
        line-height: var(--rds-typography-caption-line-height);
        white-space: nowrap;
      }
      
      :host([variant='default']) span,
      :host(:not([variant])) span {
        background: var(--rds-color-control-primary-bg);
        color: var(--rds-color-control-primary-fg-contrast);
      }
      
      :host([variant='secondary']) span {
        background: var(--rds-color-control-secondary-bg-hover);
        color: var(--rds-color-control-secondary-fg);
      }
      
      :host([variant='outline']) span {
        background: transparent;
        border-color: var(--rds-color-border-default);
        color: var(--rds-color-text-primary);
      }
      
      :host([variant='destructive']) span {
        background: var(--rds-color-danger-solid);
        color: var(--rds-color-danger-contrast);
      }
      
      :host([variant='success']) span {
        background: var(--rds-color-success-solid);
        color: var(--rds-color-success-contrast);
      }
      
      :host([variant='warning']) span {
        background: var(--rds-color-warning-solid);
        color: var(--rds-color-warning-contrast);
      }
      
      :host([variant='info']) span {
        background: var(--rds-color-info-solid);
        color: var(--rds-color-info-contrast);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor variant: RdsBadgeVariant = 'default';

  override render() {
    return html`
      <span><slot></slot></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-badge': RdsBadge;
  }
}
