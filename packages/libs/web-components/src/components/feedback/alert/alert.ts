import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

export type RdsAlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

/**
 * Inline feedback surface. Status variants use `*.soft` / `*.fg` / `*.border`.
 *
 * @element rds-alert
 * @slot - Alert body
 * @slot title - Alert title
 */
export class RdsAlert extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      .root {
        display: grid;
        gap: var(--rds-space-1);
        border: var(--rds-border-sm) solid var(--rds-color-border-default);
        border-radius: var(--rds-radius-lg);
        background: var(--rds-color-surface-panel);
        padding: var(--rds-space-3) var(--rds-space-4);
        color: var(--rds-color-text-primary);
      }
      
      .title {
        margin: 0;
        font-size: var(--rds-typography-label-font-size);
        font-weight: var(--rds-typography-weight-semibold);
        line-height: var(--rds-typography-label-line-height);
      }
      
      .body {
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-body-small-font-size);
      }
      
      :host([variant='destructive']) .root {
        border-color: var(--rds-color-danger-border);
        background: var(--rds-color-danger-soft);
        color: var(--rds-color-danger-fg);
      }
      
      :host([variant='success']) .root {
        border-color: var(--rds-color-success-border);
        background: var(--rds-color-success-soft);
        color: var(--rds-color-success-fg);
      }
      
      :host([variant='warning']) .root {
        border-color: var(--rds-color-warning-border);
        background: var(--rds-color-warning-soft);
        color: var(--rds-color-warning-fg);
      }
      
      :host([variant='info']) .root {
        border-color: var(--rds-color-info-border);
        background: var(--rds-color-info-soft);
        color: var(--rds-color-info-fg);
      }
      
      :host([variant='destructive']) .body,
      :host([variant='success']) .body,
      :host([variant='warning']) .body,
      :host([variant='info']) .body {
        color: inherit;
        opacity: 0.9;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor variant: RdsAlertVariant = 'default';

  override render() {
    return html`
      <div class="root" role="alert">
        <p class="title"><slot name="title"></slot></p>
        <div class="body"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-alert': RdsAlert;
  }
}
