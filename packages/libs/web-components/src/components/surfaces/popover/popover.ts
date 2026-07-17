import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

export type RdsPopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Anchored popover surface. Toggle with `open` or `show()` / `hide()`.
 *
 * @element rds-popover
 * @slot - Popover content
 * @slot trigger - Anchor / trigger control
 */
export class RdsPopover extends LitElement {
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
        display: none;
        min-width: 12rem;
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        border-radius: var(--rds-radius-lg);
        background: var(--rds-color-surface-elevated, var(--rds-color-surface-panel));
        padding: var(--rds-space-3);
        box-shadow: var(--rds-shadow-raised, var(--rds-shadow-surface));
        color: var(--rds-color-text-primary);
      }
      
      :host([open]) .panel {
        display: block;
      }
      
      :host([placement='bottom']) .panel,
      :host(:not([placement])) .panel {
        top: calc(100% + var(--rds-space-2));
        left: 0;
      }
      
      :host([placement='top']) .panel {
        bottom: calc(100% + var(--rds-space-2));
        left: 0;
      }
      
      :host([placement='left']) .panel {
        right: calc(100% + var(--rds-space-2));
        top: 0;
      }
      
      :host([placement='right']) .panel {
        left: calc(100% + var(--rds-space-2));
        top: 0;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false;

  @property({ type: String, reflect: true })
  accessor placement: RdsPopoverPlacement = 'bottom';

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
      <span class="trigger" @click=${this.#onTriggerClick}>
        <slot name="trigger"></slot>
      </span>
      <div class="panel" role="dialog" ?hidden=${!this.open}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-popover': RdsPopover;
  }
}
