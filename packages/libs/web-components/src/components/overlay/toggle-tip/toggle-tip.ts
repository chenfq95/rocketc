import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Tip that toggles on click (tooltip look, popover behavior).
 *
 * @element rds-toggle-tip
 * @slot - Tip content
 * @slot trigger - Toggle control
 */
export class RdsToggleTip extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-block;
        position: relative;
      }
      
      .panel {
        position: absolute;
        z-index: 40;
        top: calc(100% + var(--rds-space-2));
        left: 0;
        display: none;
        min-width: 10rem;
        max-width: 16rem;
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        border-radius: var(--rds-radius-md);
        background: var(--rds-color-surface-elevated, var(--rds-color-surface-panel));
        padding: var(--rds-space-2) var(--rds-space-3);
        box-shadow: var(--rds-shadow-raised, var(--rds-shadow-surface));
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-caption-font-size);
      }
      
      :host([open]) .panel {
        display: block;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false;

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this.#onDocClick, true);
    this.addEventListener('keydown', this.#onKeyDown);
  }

  override disconnectedCallback(): void {
    document.removeEventListener('click', this.#onDocClick, true);
    this.removeEventListener('keydown', this.#onKeyDown);
    super.disconnectedCallback();
  }

  #onDocClick = (event: Event) => {
    if (!this.contains(event.target as Node)) this.open = false;
  };

  #onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') this.open = false;
  };

  override render() {
    return html`
      <span @click=${() => {
        this.open = !this.open;
      }}>
        <slot name="trigger"></slot>
      </span>
      <div class="panel" role="note"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-toggle-tip': RdsToggleTip;
  }
}
