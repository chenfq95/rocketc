import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Tip that toggles on click (tooltip look, popover behavior).
 *
 * @element rc-toggle-tip
 * @slot - Tip content
 * @slot trigger - Toggle control
 */
export class RcToggleTip extends RcStyledElement {
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
        min-width: 10rem;
        max-width: 16rem;
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-md);
        background: var(--rc-color-surface-elevated, var(--rc-color-surface-panel));
        padding: var(--rc-space-2) var(--rc-space-3);
        box-shadow: var(--rc-shadow-raised, var(--rc-shadow-surface));
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-caption-font-size);
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
      <span part="container trigger" @click=${() => {
        this.open = !this.open;
      }}>
        <slot name="trigger"></slot>
      </span>
      <div class="panel" part="panel" role="note"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-toggle-tip': RcToggleTip;
  }
}
