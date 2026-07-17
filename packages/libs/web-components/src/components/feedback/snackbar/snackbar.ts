import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Bottom-anchored snackbar with optional action. Call `show()` / `hide()` or set `open`.
 *
 * @element rds-snackbar
 * @fires close - When dismissed
 * @slot - Message text
 * @slot action - Action control (e.g. undo button)
 */
export class RdsSnackbar extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: none;
        position: fixed;
        z-index: 50;
        inset-inline: 0;
        bottom: var(--rds-space-4);
        justify-content: center;
        pointer-events: none;
        padding-inline: var(--rds-space-4);
      }
      
      :host([open]) {
        display: flex;
      }
      
      .root {
        display: flex;
        align-items: center;
        gap: var(--rds-space-3);
        pointer-events: auto;
        max-width: 32rem;
        border-radius: var(--rds-radius-lg);
        background: var(--rds-color-surface-inverse, var(--rds-color-text-primary));
        padding: var(--rds-space-3) var(--rds-space-4);
        color: var(--rds-color-common-white, #fff);
        box-shadow: var(--rds-shadow-overlay, var(--rds-shadow-surface));
        font-size: var(--rds-typography-body-small-font-size);
      }
      
      .message {
        flex: 1;
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
        opacity: 0.8;
      }
      
      .close:hover {
        opacity: 1;
        background: color-mix(in oklab, currentColor 12%, transparent);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false;

  @property({ type: Number, reflect: true })
  accessor duration: number = 5000;

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
        <div class="message"><slot></slot></div>
        <slot name="action"></slot>
        <button class="close" type="button" aria-label="Close" @click=${() => this.hide()}>
          ×
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-snackbar': RdsSnackbar;
  }
}
