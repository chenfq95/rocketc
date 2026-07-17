import { LitElement, css, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

export type RdsSheetSide = 'bottom' | 'top' | 'left' | 'right';

/**
 * Edge-anchored sheet surface (non-modal by default; pair with overlay as needed).
 *
 * @element rds-sheet
 * @fires close - When closed
 * @slot - Sheet body
 * @slot header - Optional header
 * @slot footer - Optional footer
 */
export class RdsSheet extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: contents;
      }
      
      dialog {
        margin: 0;
        border: 0;
        padding: 0;
        background: transparent;
        max-width: none;
        max-height: none;
        color: var(--rds-color-text-primary);
      }
      
      dialog::backdrop {
        background: color-mix(in oklab, var(--rds-color-common-black, #000) 45%, transparent);
      }
      
      .panel {
        display: grid;
        gap: var(--rds-space-3);
        background: var(--rds-color-surface-panel);
        box-shadow: var(--rds-shadow-overlay, var(--rds-shadow-surface));
        padding: var(--rds-space-4);
      }
      
      :host([side='bottom']) .panel,
      :host(:not([side])) .panel {
        position: fixed;
        inset-inline: 0;
        bottom: 0;
        border-radius: var(--rds-radius-xl) var(--rds-radius-xl) 0 0;
        max-height: min(85vh, 40rem);
      }
      
      :host([side='top']) .panel {
        position: fixed;
        inset-inline: 0;
        top: 0;
        border-radius: 0 0 var(--rds-radius-xl) var(--rds-radius-xl);
        max-height: min(85vh, 40rem);
      }
      
      :host([side='left']) .panel {
        position: fixed;
        inset-block: 0;
        left: 0;
        width: min(22rem, 100vw);
        border-radius: 0 var(--rds-radius-xl) var(--rds-radius-xl) 0;
      }
      
      :host([side='right']) .panel {
        position: fixed;
        inset-block: 0;
        right: 0;
        width: min(22rem, 100vw);
        border-radius: var(--rds-radius-xl) 0 0 var(--rds-radius-xl);
      }
      
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--rds-space-2);
        font-weight: var(--rds-typography-weight-semibold);
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
        cursor: pointer;
        color: var(--rds-color-text-secondary);
      }
      
      .close:hover {
        background: var(--rds-color-action-bg-hover);
      }
      
      .body {
        overflow: auto;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false;

  @property({ type: String, reflect: true })
  accessor side: RdsSheetSide = 'bottom';

  @property({ type: Boolean, reflect: true })
  accessor modal: boolean = true;

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
    if (!this.#dialog) return;
    if (this.modal) this.#dialog.showModal();
    else this.#dialog.show();
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
      <dialog @cancel=${() => this.close()} @close=${() => this.#setOpen(false)}>
        <div class="panel">
          <div class="header">
            <slot name="header"></slot>
            <button class="close" type="button" aria-label="Close" @click=${() => this.close()}>
              ×
            </button>
          </div>
          <div class="body"><slot></slot></div>
          <slot name="footer"></slot>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-sheet': RdsSheet;
  }
}
