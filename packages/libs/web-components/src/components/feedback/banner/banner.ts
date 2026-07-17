import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

export type RdsBannerVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

/**
 * Persistent full-width status banner.
 *
 * @element rds-banner
 * @fires close - When dismissed (if `dismissible`)
 * @slot - Banner body
 * @slot title - Optional title
 * @slot action - Optional action control
 */
export class RdsBanner extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: none;
      }
      
      :host([open]) {
        display: block;
      }
      
      .root {
        display: flex;
        align-items: flex-start;
        gap: var(--rds-space-3);
        border-block: var(--rds-border-sm) solid var(--rds-color-border-default);
        background: var(--rds-color-surface-panel);
        padding: var(--rds-space-3) var(--rds-space-4);
        color: var(--rds-color-text-primary);
      }
      
      .copy {
        display: grid;
        gap: var(--rds-space-1);
        flex: 1;
      }
      
      .title {
        margin: 0;
        font-size: var(--rds-typography-label-font-size);
        font-weight: var(--rds-typography-weight-semibold);
      }
      
      .body {
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-body-small-font-size);
      }
      
      .aside {
        display: flex;
        align-items: center;
        gap: var(--rds-space-2);
      }
      
      .close {
        display: inline-grid;
        place-items: center;
        width: var(--rds-space-7);
        height: var(--rds-space-7);
        margin: 0;
        border: 0;
        border-radius: var(--rds-radius-md);
        background: transparent;
        color: inherit;
        cursor: pointer;
      }
      
      .close:hover {
        background: var(--rds-color-action-bg-hover);
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
  accessor variant: RdsBannerVariant = 'default';

  @property({ type: Boolean, reflect: true })
  accessor dismissible: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = true;

  hide(): void {
    if (!this.open) return;
    this.open = false;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="root" role="status">
        <div class="copy">
          <p class="title"><slot name="title"></slot></p>
          <div class="body"><slot></slot></div>
        </div>
        <div class="aside">
          <slot name="action"></slot>
          ${
            this.dismissible
              ? html`
                  <button class="close" type="button" aria-label="Dismiss" @click=${() => this.hide()}>
                    ×
                  </button>
                `
              : ''
          }
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-banner': RdsBanner;
  }
}
