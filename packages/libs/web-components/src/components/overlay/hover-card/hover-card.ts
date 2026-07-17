import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Content shown on hover / focus of the trigger.
 *
 * @element rds-hover-card
 * @slot - Card content
 * @slot trigger - Hover / focus target
 */
export class RdsHoverCard extends LitElement {
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
        min-width: 12rem;
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        border-radius: var(--rds-radius-lg);
        background: var(--rds-color-surface-elevated, var(--rds-color-surface-panel));
        padding: var(--rds-space-3);
        box-shadow: var(--rds-shadow-raised, var(--rds-shadow-surface));
      }
      
      :host([open]) .panel {
        display: block;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false;
  #timer: number | undefined;

  #show() {
    window.clearTimeout(this.#timer);
    this.open = true;
  }

  #hide() {
    window.clearTimeout(this.#timer);
    this.#timer = window.setTimeout(() => {
      this.open = false;
    }, 120);
  }

  override render() {
    return html`
      <span @mouseenter=${this.#show} @mouseleave=${this.#hide} @focusin=${this.#show} @focusout=${this.#hide}>
        <slot name="trigger"></slot>
        <div class="panel" role="tooltip" @mouseenter=${this.#show} @mouseleave=${this.#hide}>
          <slot></slot>
        </div>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-hover-card': RdsHoverCard;
  }
}
