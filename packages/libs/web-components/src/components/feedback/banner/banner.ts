import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

export type RcBannerVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

/**
 * Persistent full-width status banner.
 *
 * @element rc-banner
 * @fires close - When dismissed (if `dismissible`)
 * @slot - Banner body
 * @slot title - Optional title
 * @slot action - Optional action control
 */
export class RcBanner extends RcStyledElement {
  static override styles = [
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
        gap: var(--rc-space-3);
        border-block: var(--rc-border-sm) solid var(--rc-color-border-default);
        background: var(--rc-color-surface-panel);
        padding: var(--rc-space-3) var(--rc-space-4);
        color: var(--rc-color-text-primary);
      }
      
      .copy {
        display: grid;
        gap: var(--rc-space-1);
        flex: 1;
      }
      
      .title {
        margin: 0;
        font-size: var(--rc-typography-label-font-size);
        font-weight: var(--rc-typography-weight-semibold);
      }
      
      .body {
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-body-small-font-size);
      }
      
      .aside {
        display: flex;
        align-items: center;
        gap: var(--rc-space-2);
      }
      
      .close {
        display: inline-grid;
        place-items: center;
        width: var(--rc-space-7);
        height: var(--rc-space-7);
        margin: 0;
        border: 0;
        border-radius: var(--rc-radius-md);
        background: transparent;
        color: inherit;
        cursor: pointer;
      }
      
      .close:hover {
        background: var(--rc-color-action-bg-hover);
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
  accessor variant: RcBannerVariant = 'default';

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
      <div class="root" part="container root" role="status">
        <div class="copy" part="copy">
          <p class="title" part="title"><slot name="title"></slot></p>
          <div class="body" part="body"><slot></slot></div>
        </div>
        <div class="aside" part="aside">
          <slot name="action"></slot>
          ${
            this.dismissible
              ? html`
                  <button class="close" part="control close" type="button" aria-label="Dismiss" @click=${() => this.hide()}>
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
    'rc-banner': RcBanner;
  }
}
