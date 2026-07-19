import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/mixin-delegates-aria';
import { mixinElementInternals } from '../../../internal/mixin-element-internals';
import {
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
  type FormValue,
} from '../../../internal/mixin-form-associated';

const inputBase = mixinDelegatesAria(mixinFormAssociated(mixinElementInternals(RcStyledElement)));

/**
 * Single-line field bound to design-system form chrome tokens.
 *
 * Supports native input types (`text`, `email`, `password`, `search`, `tel`,
 * `url`, `number`, `date`, `time`, `datetime-local`, `month`, `week`, `color`,
 * `file`, …). Prefer `rc-slider` for `range` and `rc-textarea` for multi-line.
 *
 * Pair with `rc-label` via matching light-DOM `id` / `for`.
 *
 * @element rc-input
 * @fires input - From the inner control (native `input` does not compose out of shadow)
 */
export class RcInput extends inputBase {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = [
    css`
      :host {
        display: block;
      }
      
      input {
        display: block;
        width: 100%;
        min-height: var(--rc-space-9);
        margin: 0;
        border: var(--rc-border-sm) solid var(--rc-color-border-default);
        border-radius: var(--rc-radius-md);
        background: var(--rc-color-surface-panel);
        padding: 0 var(--rc-space-3);
        color: var(--rc-color-text-primary);
        font: inherit;
        font-size: var(--rc-typography-body-font-size);
      }
      
      input[type='color'] {
        padding: var(--rc-space-1);
        cursor: pointer;
      }
      
      input[type='file'] {
        padding: var(--rc-space-2) var(--rc-space-3);
        font-size: var(--rc-typography-caption-font-size, var(--rc-typography-body-font-size));
      }
      
      input::placeholder {
        color: var(--rc-color-text-muted);
      }
      
      input:focus-visible {
        outline: none;
        border-color: var(--rc-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rc-color-border-focus) 30%, transparent);
      }
      
      input:disabled {
        cursor: not-allowed;
        background: var(--rc-color-action-bg-disabled);
        color: var(--rc-color-action-fg-disabled);
        opacity: var(--rc-opacity-disabled);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor type: string = 'text';

  @property({ type: String })
  accessor value: string = '';

  @property({ type: String, reflect: true })
  accessor placeholder: string = '';

  @property({ type: Boolean, reflect: true })
  accessor readonly: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor required: boolean = false;

  @property({ type: String, reflect: true })
  accessor min: string = '';

  @property({ type: String, reflect: true })
  accessor max: string = '';

  @property({ type: String, reflect: true })
  accessor step: string = '';

  @property({ type: Number, reflect: true })
  accessor minlength: number = -1;

  @property({ type: Number, reflect: true })
  accessor maxlength: number = -1;

  @property({ type: String, reflect: true })
  accessor pattern: string = '';

  @property({ type: String, reflect: true })
  accessor autocomplete: string = '';

  @property({ type: String, reflect: true })
  accessor accept: string = '';

  @property({ type: Boolean, reflect: true })
  accessor multiple: boolean = false;

  @property({ type: String, reflect: true })
  accessor list: string = '';

  #input: HTMLInputElement | null = null;

  override firstUpdated(): void {
    this.#input = this.renderRoot.querySelector('input');
  }

  override [getFormValue](): FormValue | null {
    if (this.type === 'file') {
      const files = this.#input?.files;
      if (!files?.length) return null;
      if (this.multiple) {
        const data = new FormData();
        for (const file of files) data.append(this.name || 'file', file);
        return data;
      }
      return files[0] ?? null;
    }
    return this.value;
  }

  override formResetCallback(): void {
    this.value = this.getAttribute('value') ?? '';
    if (this.type === 'file' && this.#input) this.#input.value = '';
  }

  override formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    if (this.type === 'file') return;
    this.value = typeof state === 'string' ? state : '';
  }

  #onInput(event: Event) {
    if (this.type === 'file') return;
    this.value = (event.target as HTMLInputElement).value;
  }

  override render() {
    const { ariaLabel, ariaInvalid, ariaRequired, ariaPlaceholder, role } = this as ARIAMixinStrict;
    // File inputs cannot be value-controlled; preserve the live DOM value across renders.
    const value = this.type === 'file' ? (this.#input?.value ?? '') : this.value;

    return html`
      <input part="control"
        .value=${value}
        accept=${this.accept || nothing}
        aria-invalid=${ariaInvalid || nothing}
        aria-label=${ariaLabel || nothing}
        aria-placeholder=${ariaPlaceholder || nothing}
        aria-required=${ariaRequired || nothing}
        autocomplete=${this.autocomplete || nothing}
        ?disabled=${this.disabled}
        list=${this.list || nothing}
        max=${this.max || nothing}
        maxlength=${this.maxlength >= 0 ? this.maxlength : nothing}
        min=${this.min || nothing}
        minlength=${this.minlength >= 0 ? this.minlength : nothing}
        ?multiple=${this.multiple}
        name=${this.name}
        pattern=${this.pattern || nothing}
        placeholder=${this.placeholder}
        ?readonly=${this.readonly}
        ?required=${this.required}
        role=${role || nothing}
        step=${this.step || nothing}
        type=${this.type}
        @input=${this.#onInput}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-input': RcInput;
  }
}
