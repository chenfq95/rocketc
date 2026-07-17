import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

export type RdsToastVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

/**
 * Transient notification. Set `open` or call `show()` / `hide()`.
 * Auto-dismisses when `duration` &gt; 0 (ms).
 *
 * @element rds-toast
 * @fires close - When dismissed
 * @slot - Toast body
 * @slot title - Optional title
 * @slot action - Optional action control
 */
export class RdsToast extends LitElement {
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
        display: grid;
        grid-template-columns: 1fr auto;
        gap: var(--rds-space-2) var(--rds-space-3);
        align-items: start;
        min-width: min(20rem, 100%);
        border: var(--rds-border-sm) solid var(--rds-color-border-default);
        border-radius: var(--rds-radius-lg);
        background: var(--rds-color-surface-elevated, var(--rds-color-surface-panel));
        padding: var(--rds-space-3) var(--rds-space-4);
        box-shadow: var(--rds-shadow-raised, var(--rds-shadow-surface));
        color: var(--rds-color-text-primary);
      }
      
      .copy {
        display: grid;
        gap: var(--rds-space-1);
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
      
      .actions {
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
        color: var(--rds-color-text-secondary);
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

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false;

  @property({ type: String, reflect: true })
  accessor variant: RdsToastVariant = 'default';

  @property({ type: Number, reflect: true })
  accessor duration: number = 4000;

  #timer = 0;

  override disconnectedCallback(): void {
    window.clearTimeout(this.#timer);
    super.disconnectedCallback();
  }

  show(): void {
    this.open = true;
    this.#armTimer();
  }

  hide(): void {
    window.clearTimeout(this.#timer);
    if (!this.open) return;
    this.open = false;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  protected override updated(changed: Map<string, unknown>): void {
    if (changed.has('open') && this.open) this.#armTimer();
  }

  #armTimer() {
    window.clearTimeout(this.#timer);
    if (!this.open || this.duration <= 0) return;
    this.#timer = window.setTimeout(() => this.hide(), this.duration);
  }

  override render() {
    return html`
      <div class="root" role="status" aria-live="polite">
        <div class="copy">
          <p class="title"><slot name="title"></slot></p>
          <div class="body"><slot></slot></div>
        </div>
        <div class="actions">
          <slot name="action"></slot>
          <button class="close" type="button" aria-label="Close" @click=${() => this.hide()}>
            ×
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-toast': RdsToast;
  }
}
