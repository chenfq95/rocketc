import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Trigger + menu dropdown. Compose with `rc-menu` in the default slot.
 *
 * @element rc-dropdown
 * @fires change - Bubbles from selected menu item (`detail.value`)
 * @slot - Dropdown panel (e.g. `rc-menu`)
 * @slot trigger - Trigger control
 */
export class RcDropdown extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: inline-block;
        position: relative;
      }
      
      .panel {
        position: absolute;
        top: calc(100% + var(--rc-space-2));
        left: 0;
        z-index: 45;
        display: none;
        min-width: 100%;
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
    this.addEventListener('keydown', this.#onKeyDown);
    this.addEventListener('change', this.#onMenuChange);
    document.addEventListener('click', this.#onDocumentClick, true);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('keydown', this.#onKeyDown);
    this.removeEventListener('change', this.#onMenuChange);
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

  #onMenuChange = () => {
    this.hide();
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
      <div class="panel" part="panel" ?hidden=${!this.open}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-dropdown': RcDropdown;
  }
}
