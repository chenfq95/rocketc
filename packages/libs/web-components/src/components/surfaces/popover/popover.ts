import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

export type RcPopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Anchored popover surface. Toggle with `open` or `show()` / `hide()`.
 *
 * @element rc-popover
 * @slot - Popover content
 * @slot trigger - Anchor / trigger control
 */
export class RcPopover extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: inline-block;
        position: relative;
      }
      
      .panel {
        position: absolute;
        z-index: 40;
        display: none;
        min-width: 12rem;
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-lg);
        background: var(--rc-color-surface-elevated, var(--rc-color-surface-panel));
        padding: var(--rc-space-3);
        box-shadow: var(--rc-shadow-raised, var(--rc-shadow-surface));
        color: var(--rc-color-text-primary);
      }
      
      :host([open]) .panel {
        display: block;
      }
      
      :host([placement='bottom']) .panel,
      :host(:not([placement])) .panel {
        top: calc(100% + var(--rc-space-2));
        left: 0;
      }
      
      :host([placement='top']) .panel {
        bottom: calc(100% + var(--rc-space-2));
        left: 0;
      }
      
      :host([placement='left']) .panel {
        right: calc(100% + var(--rc-space-2));
        top: 0;
      }
      
      :host([placement='right']) .panel {
        left: calc(100% + var(--rc-space-2));
        top: 0;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false;

  @property({ type: String, reflect: true })
  accessor placement: RcPopoverPlacement = 'bottom';

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.#onKeyDown);
    document.addEventListener('click', this.#onDocumentClick, true);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('keydown', this.#onKeyDown);
    document.removeEventListener('click', this.#onDocumentClick, true);
    super.disconnectedCallback();
  }

  show(): void {
    this.open = true;
  }

  hide(): void {
    this.open = false;
  }

  toggle(): void {
    this.open = !this.open;
  }

  #onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') this.hide();
  };

  #onDocumentClick = (event: Event) => {
    if (!this.open) return;
    if (!event.composedPath().includes(this)) this.hide();
  };

  #onTriggerClick(event: Event) {
    event.stopPropagation();
    this.toggle();
  }

  override render() {
    return html`
      <span class="trigger" part="trigger" @click=${this.#onTriggerClick}>
        <slot name="trigger"></slot>
      </span>
      <div class="panel" part="panel" role="dialog" ?hidden=${!this.open}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-popover': RcPopover;
  }
}
