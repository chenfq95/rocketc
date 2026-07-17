import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { mixinElementInternals } from '../../../internal/element-internals';
import {
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
} from '../../../internal/form-associated';
import { hostStyles } from '../../../internal/shared-styles';

const base = mixinFormAssociated(mixinElementInternals(LitElement));

/**
 * File dropzone + picker.
 *
 * @element rds-file-upload
 * @fires change - When files change (`detail.files`)
 * @slot - Optional helper / label content
 */
export class RdsFileUpload extends base {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      .drop {
        display: grid;
        gap: var(--rds-space-2);
        justify-items: start;
        border: var(--rds-border-sm) dashed var(--rds-color-border-default);
        border-radius: var(--rds-radius-lg);
        background: var(--rds-color-surface-panel);
        padding: var(--rds-space-4);
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-body-small-font-size);
        cursor: pointer;
      }
      
      :host([data-drag]) .drop {
        border-color: var(--rds-color-border-focus);
        background: var(--rds-color-action-bg-hover);
      }
      
      .drop:focus-within {
        outline: none;
        border-color: var(--rds-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rds-color-border-focus) 30%, transparent);
      }
      
      .title {
        color: var(--rds-color-text-primary);
        font-size: var(--rds-typography-label-font-size);
        font-weight: var(--rds-typography-weight-medium);
      }
      
      .files {
        margin: 0;
        padding-left: var(--rds-space-4);
      }
      
      input {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        overflow: hidden;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor accept: string = '';

  @property({ type: Boolean, reflect: true })
  accessor multiple: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor required: boolean = false;

  @property({ type: String, reflect: true })
  accessor label: string = 'Choose files or drop here';
  #files: File[] = [];

  get files(): File[] {
    return this.#files;
  }

  override [getFormValue]() {
    if (!this.#files.length) return null;
    if (!this.multiple) return this.#files[0] ?? null;
    const data = new FormData();
    for (const file of this.#files) data.append(this.name || 'file', file);
    return data;
  }

  override formResetCallback() {
    this.#files = [];
    this.requestUpdate();
  }

  override formStateRestoreCallback(_state: FormRestoreState | null, _reason: FormRestoreReason) {
    // File restore is not supported in a portable way.
  }

  #setFiles(list: FileList | File[] | null) {
    this.#files = list ? [...list] : [];
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { files: this.#files },
        bubbles: true,
      }),
    );
    this.requestUpdate();
  }

  #onDrop(event: DragEvent) {
    event.preventDefault();
    this.removeAttribute('data-drag');
    if (this.disabled) return;
    this.#setFiles(event.dataTransfer?.files ?? null);
  }

  override render() {
    return html`
      <label
        class="drop"
        @dragenter=${(e: Event) => {
          e.preventDefault();
          this.setAttribute('data-drag', '');
        }}
        @dragover=${(e: Event) => e.preventDefault()}
        @dragleave=${() => this.removeAttribute('data-drag')}
        @drop=${this.#onDrop}
      >
        <span class="title">${this.label}</span>
        <slot></slot>
        ${
          this.#files.length
            ? html`<ul class="files">
                ${this.#files.map((f) => html`<li>${f.name}</li>`)}
              </ul>`
            : nothing
        }
        <input
          type="file"
          accept=${this.accept || nothing}
          ?multiple=${this.multiple}
          ?required=${this.required}
          ?disabled=${this.disabled}
          @change=${(e: Event) => this.#setFiles((e.target as HTMLInputElement).files)}
        />
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-file-upload': RdsFileUpload;
  }
}
