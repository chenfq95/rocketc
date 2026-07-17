import { LitElement, css, html, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Modal / non-modal dialog backed by native `<dialog>`.
 *
 * Call `show()`, `showModal()`, or `close()`. Setting `open` toggles non-modal
 * open state; prefer `showModal()` for overlays.
 *
 * @element rds-dialog
 * @fires close - Native dialog close (composed)
 * @fires cancel - Native dialog cancel (composed)
 * @slot - Dialog body
 * @slot header - Optional header
 * @slot footer - Optional footer actions
 * @slot title - Title text (also used for accessible name when present)
 */
export class RdsDialog extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: contents;
      }
      
      dialog {
        margin: auto;
        border: var(--rds-border-sm) solid var(--rds-color-border-default);
        border-radius: var(--rds-radius-lg);
        background: var(--rds-color-surface-panel);
        padding: 0;
        color: var(--rds-color-text-primary);
        box-shadow: var(--rds-shadow-overlay, var(--rds-shadow-surface));
        max-width: min(32rem, calc(100vw - var(--rds-space-8)));
        width: 100%;
      }
      
      dialog::backdrop {
        background: color-mix(in oklab, var(--rds-color-common-black, #000) 50%, transparent);
      }
      
      .panel {
        display: grid;
        gap: var(--rds-space-4);
        padding: var(--rds-space-5);
      }
      
      .header {
        display: grid;
        gap: var(--rds-space-1);
        padding-right: var(--rds-space-8);
      }
      
      .title {
        margin: 0;
        font-size: var(--rds-typography-title-font-size, var(--rds-typography-body-font-size));
        font-weight: var(--rds-typography-weight-semibold);
        line-height: var(--rds-typography-label-line-height);
      }
      
      .body {
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-body-font-size);
      }
      
      .footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: var(--rds-space-2);
      }
      
      .close {
        position: absolute;
        top: var(--rds-space-3);
        right: var(--rds-space-3);
        display: inline-grid;
        place-items: center;
        width: var(--rds-space-7);
        height: var(--rds-space-7);
        margin: 0;
        border: 0;
        border-radius: var(--rds-radius-md);
        background: transparent;
        color: var(--rds-color-text-secondary);
        cursor: pointer;
      }
      
      .close:hover {
        background: var(--rds-color-action-bg-hover);
        color: var(--rds-color-text-primary);
      }
      
      .close:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rds-color-surface-panel),
          0 0 0 4px var(--rds-color-border-focus);
      }
      
      .panel {
        position: relative;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false;

  @property({ type: String, attribute: 'return-value' })
  accessor returnValue: string = '';

  #dialog: HTMLDialogElement | null = null;
  #ignoreOpenSync = false;

  override firstUpdated(): void {
    this.#dialog = this.renderRoot.querySelector('dialog');
    if (this.open) this.show();
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (!changed.has('open') || this.#ignoreOpenSync || !this.#dialog) return;
    if (this.open && !this.#dialog.open) this.#dialog.show();
    if (!this.open && this.#dialog.open) this.#dialog.close();
  }

  /** Open as a non-modal dialog. */
  show(): void {
    this.#dialog ??= this.renderRoot.querySelector('dialog');
    this.#dialog?.show();
    this.#setOpen(true);
  }

  /** Open as a modal dialog with backdrop. */
  showModal(): void {
    this.#dialog ??= this.renderRoot.querySelector('dialog');
    this.#dialog?.showModal();
    this.#setOpen(true);
  }

  /** Close the dialog, optionally setting `returnValue`. */
  close(returnValue?: string): void {
    this.#dialog ??= this.renderRoot.querySelector('dialog');
    if (returnValue !== undefined) this.returnValue = returnValue;
    this.#dialog?.close(this.returnValue);
    this.#setOpen(false);
  }

  #setOpen(open: boolean) {
    this.#ignoreOpenSync = true;
    this.open = open;
    void this.updateComplete.then(() => {
      this.#ignoreOpenSync = false;
    });
  }

  #onClose(event: Event) {
    const dialog = event.target as HTMLDialogElement;
    this.returnValue = dialog.returnValue;
    this.#setOpen(false);
  }

  override render() {
    return html`
      <dialog
        returnValue=${this.returnValue || nothing}
        @cancel=${() => this.#setOpen(false)}
        @close=${this.#onClose}
      >
        <div class="panel">
          <button class="close" type="button" aria-label="Close" @click=${() => this.close()}>
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path
                d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <div class="header">
            <h2 class="title"><slot name="title"></slot></h2>
            <slot name="header"></slot>
          </div>
          <div class="body"><slot></slot></div>
          <div class="footer"><slot name="footer"></slot></div>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-dialog': RdsDialog;
  }
}
