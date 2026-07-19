import { css, html, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Modal / non-modal dialog backed by native `<dialog>`.
 *
 * Call `show()`, `showModal()`, or `close()`. Setting `open` toggles non-modal
 * open state; prefer `showModal()` for overlays.
 *
 * @element rc-dialog
 * @fires close - Native dialog close (composed)
 * @fires cancel - Native dialog cancel (composed)
 * @slot - Dialog body
 * @slot header - Optional header
 * @slot footer - Optional footer actions
 * @slot title - Title text (also used for accessible name when present)
 */
export class RcDialog extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: contents;
      }
      
      dialog {
        margin: auto;
        border: var(--rc-border-sm) solid var(--rc-color-border-default);
        border-radius: var(--rc-radius-lg);
        background: var(--rc-color-surface-panel);
        padding: 0;
        color: var(--rc-color-text-primary);
        box-shadow: var(--rc-shadow-overlay, var(--rc-shadow-surface));
        max-width: min(32rem, calc(100vw - var(--rc-space-8)));
        width: 100%;
      }
      
      dialog::backdrop {
        background: color-mix(in oklab, var(--rc-color-common-black, #000) 50%, transparent);
      }
      
      .panel {
        display: grid;
        gap: var(--rc-space-4);
        padding: var(--rc-space-5);
      }
      
      .header {
        display: grid;
        gap: var(--rc-space-1);
        padding-right: var(--rc-space-8);
      }
      
      .title {
        margin: 0;
        font-size: var(--rc-typography-title-font-size, var(--rc-typography-body-font-size));
        font-weight: var(--rc-typography-weight-semibold);
        line-height: var(--rc-typography-label-line-height);
      }
      
      .body {
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-body-font-size);
      }
      
      .footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: var(--rc-space-2);
      }
      
      .close {
        position: absolute;
        top: var(--rc-space-3);
        right: var(--rc-space-3);
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
        color: var(--rc-color-text-primary);
      }
      
      .close:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rc-color-surface-panel),
          0 0 0 4px var(--rc-color-border-focus);
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
      <dialog part="container dialog"
        returnValue=${this.returnValue || nothing}
        @cancel=${() => this.#setOpen(false)}
        @close=${this.#onClose}
      >
        <div class="panel" part="panel">
          <button class="close" part="control close" type="button" aria-label="Close" @click=${() => this.close()}>
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
          <div class="header" part="header">
            <h2 class="title" part="title"><slot name="title"></slot></h2>
            <slot name="header"></slot>
          </div>
          <div class="body" part="body"><slot></slot></div>
          <div class="footer" part="footer"><slot name="footer"></slot></div>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-dialog': RcDialog;
  }
}
