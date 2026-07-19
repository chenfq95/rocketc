import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Content shown on hover / focus of the trigger.
 *
 * @element rc-hover-card
 * @slot - Card content
 * @slot trigger - Hover / focus target
 */
export class RcHoverCard extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: inline-block;
        position: relative;
      }
      
      .panel {
        position: absolute;
        z-index: 40;
        top: calc(100% + var(--rc-space-2));
        left: 0;
        display: none;
        min-width: 12rem;
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-lg);
        background: var(--rc-color-surface-elevated, var(--rc-color-surface-panel));
        padding: var(--rc-space-3);
        box-shadow: var(--rc-shadow-raised, var(--rc-shadow-surface));
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
      <span
        part="container trigger"
        @mouseenter=${this.#show}
        @mouseleave=${this.#hide}
        @focusin=${this.#show}
        @focusout=${this.#hide}
      >
        <slot name="trigger"></slot>
        <div class="panel" part="panel" role="tooltip" @mouseenter=${this.#show} @mouseleave=${this.#hide}>
          <slot></slot>
        </div>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-hover-card': RcHoverCard;
  }
}
