import { css, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

export type RcDrawerSide = 'left' | 'right';

/**
 * Modal side drawer backed by `<dialog>`.
 *
 * @element rc-drawer
 * @fires close - When closed
 * @slot - Drawer body
 * @slot header - Optional header
 * @slot footer - Optional footer
 */
export class RcDrawer extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: contents;
      }
      
      dialog {
        margin: 0;
        border: 0;
        padding: 0;
        max-width: none;
        max-height: none;
        background: transparent;
        color: var(--rc-color-text-primary);
      }
      
      dialog::backdrop {
        background: color-mix(in oklab, var(--rc-color-common-black, #000) 45%, transparent);
      }
      
      .panel {
        position: fixed;
        inset-block: 0;
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: var(--rc-space-3);
        width: min(22rem, 100vw);
        background: var(--rc-color-surface-panel);
        padding: var(--rc-space-4);
        box-shadow: var(--rc-shadow-overlay, var(--rc-shadow-surface));
      }
      
      :host([side='left']) .panel,
      :host(:not([side])) .panel {
        left: 0;
        border-radius: 0 var(--rc-radius-xl) var(--rc-radius-xl) 0;
      }
      
      :host([side='right']) .panel {
        right: 0;
        border-radius: var(--rc-radius-xl) 0 0 var(--rc-radius-xl);
      }
      
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--rc-space-2);
        font-weight: var(--rc-typography-weight-semibold);
      }
      
      .body {
        overflow: auto;
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
        color: var(--rc-color-text-secondary);
        cursor: pointer;
      }
      
      .close:hover {
        background: var(--rc-color-action-bg-hover);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false;

  @property({ type: String, reflect: true })
  accessor side: RcDrawerSide = 'left';

  #dialog: HTMLDialogElement | null = null;
  #ignoreOpenSync = false;

  override firstUpdated(): void {
    this.#dialog = this.renderRoot.querySelector('dialog');
    if (this.open) this.show();
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (!changed.has('open') || this.#ignoreOpenSync || !this.#dialog) return;
    if (this.open) this.show();
    else if (this.#dialog.open) this.#dialog.close();
  }

  show(): void {
    this.#dialog ??= this.renderRoot.querySelector('dialog');
    this.#dialog?.showModal();
    this.#setOpen(true);
  }

  close(): void {
    this.#dialog ??= this.renderRoot.querySelector('dialog');
    this.#dialog?.close();
    this.#setOpen(false);
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  #setOpen(open: boolean) {
    this.#ignoreOpenSync = true;
    this.open = open;
    void this.updateComplete.then(() => {
      this.#ignoreOpenSync = false;
    });
  }

  override render() {
    return html`
      <dialog part="container dialog" @cancel=${() => this.close()} @close=${() => this.#setOpen(false)}>
        <div class="panel" part="panel">
          <div class="header" part="header">
            <slot name="header"></slot>
            <button class="close" part="control close" type="button" aria-label="Close" @click=${() => this.close()}>
              ×
            </button>
          </div>
          <div class="body" part="body"><slot></slot></div>
          <slot name="footer"></slot>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-drawer': RcDrawer;
  }
}
