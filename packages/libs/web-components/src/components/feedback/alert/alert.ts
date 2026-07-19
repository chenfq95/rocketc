import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

export type RcAlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

/**
 * Inline feedback surface. Status variants use `*.soft` / `*.fg` / `*.border`.
 *
 * @element rc-alert
 * @slot - Alert body
 * @slot title - Alert title
 */
export class RcAlert extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      .root {
        display: grid;
        gap: var(--rc-space-1);
        border: var(--rc-border-sm) solid var(--rc-color-border-default);
        border-radius: var(--rc-radius-lg);
        background: var(--rc-color-surface-panel);
        padding: var(--rc-space-3) var(--rc-space-4);
        color: var(--rc-color-text-primary);
      }
      
      .title {
        margin: 0;
        font-size: var(--rc-typography-label-font-size);
        font-weight: var(--rc-typography-weight-semibold);
        line-height: var(--rc-typography-label-line-height);
      }
      
      .body {
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-body-small-font-size);
      }
      
      :host([variant='destructive']) .root {
        border-color: var(--rc-color-danger-border);
        background: var(--rc-color-danger-soft);
        color: var(--rc-color-danger-fg);
      }
      
      :host([variant='success']) .root {
        border-color: var(--rc-color-success-border);
        background: var(--rc-color-success-soft);
        color: var(--rc-color-success-fg);
      }
      
      :host([variant='warning']) .root {
        border-color: var(--rc-color-warning-border);
        background: var(--rc-color-warning-soft);
        color: var(--rc-color-warning-fg);
      }
      
      :host([variant='info']) .root {
        border-color: var(--rc-color-info-border);
        background: var(--rc-color-info-soft);
        color: var(--rc-color-info-fg);
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
  accessor variant: RcAlertVariant = 'default';

  override render() {
    return html`
      <div class="root" part="container root" role="alert">
        <p class="title" part="title"><slot name="title"></slot></p>
        <div class="body" part="body"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-alert': RcAlert;
  }
}
