import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { mixinElementInternals } from '../../../internal/mixin-element-internals';
import {
  formDisabled,
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
} from '../../../internal/mixin-form-associated';

const base = mixinFormAssociated(mixinElementInternals(RcStyledElement));

/**
 * File dropzone + picker.
 *
 * @element rc-file-upload
 * @fires change - When files change (`detail.files`)
 * @slot - Optional helper / label content
 */
export class RcFileUpload extends base {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      .drop {
        display: grid;
        gap: var(--rc-space-2);
        justify-items: start;
        border: var(--rc-border-sm) dashed var(--rc-color-border-default);
        border-radius: var(--rc-radius-lg);
        background: var(--rc-color-surface-panel);
        padding: var(--rc-space-4);
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-body-small-font-size);
        cursor: pointer;
      }
      
      :host([data-drag]) .drop {
        border-color: var(--rc-color-border-focus);
        background: var(--rc-color-action-bg-hover);
      }
      
      .drop:focus-within {
        outline: none;
        border-color: var(--rc-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rc-color-border-focus) 30%, transparent);
      }
      
      .title {
        color: var(--rc-color-text-primary);
        font-size: var(--rc-typography-label-font-size);
        font-weight: var(--rc-typography-weight-medium);
      }
      
      .files {
        margin: 0;
        padding-left: var(--rc-space-4);
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
    if (this[formDisabled]) return;
    this.#setFiles(event.dataTransfer?.files ?? null);
  }

  override render() {
    return html`
      <label class="drop" part="container drop"
        @dragenter=${(e: Event) => {
          e.preventDefault();
          this.setAttribute('data-drag', '');
        }}
        @dragover=${(e: Event) => e.preventDefault()}
        @dragleave=${() => this.removeAttribute('data-drag')}
        @drop=${this.#onDrop}
      >
        <span class="title" part="title">${this.label}</span>
        <slot></slot>
        ${
          this.#files.length
            ? html`<ul class="files" part="files">
                ${this.#files.map((f) => html`<li part="item">${f.name}</li>`)}
              </ul>`
            : nothing
        }
        <input part="control input"
          type="file"
          accept=${this.accept || nothing}
          ?multiple=${this.multiple}
          ?required=${this.required}
          ?disabled=${this[formDisabled]}
          @change=${(e: Event) => this.#setFiles((e.target as HTMLInputElement).files)}
        />
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-file-upload': RcFileUpload;
  }
}
