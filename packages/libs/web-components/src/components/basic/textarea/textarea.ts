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
} from '../../../internal/mixin-form-associated';

const textareaBase = mixinDelegatesAria(
  mixinFormAssociated(mixinElementInternals(RcStyledElement)),
);

/**
 * Multi-line text field.
 *
 * @element rc-textarea
 * @fires input - From the inner control (native `input` does not compose out of shadow)
 */
export class RcTextarea extends textareaBase {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = [
    css`
      :host {
        display: block;
      }
      
      textarea {
        display: block;
        width: 100%;
        min-height: calc(var(--rc-space-9) * 2);
        margin: 0;
        border: var(--rc-border-sm) solid var(--rc-color-border-default);
        border-radius: var(--rc-radius-md);
        background: var(--rc-color-surface-panel);
        padding: var(--rc-space-2) var(--rc-space-3);
        color: var(--rc-color-text-primary);
        font: inherit;
        font-size: var(--rc-typography-body-font-size);
        line-height: var(--rc-typography-body-line-height);
        resize: vertical;
      }
      
      :host([resize='none']) textarea {
        resize: none;
      }
      
      :host([resize='both']) textarea {
        resize: both;
      }
      
      :host([resize='horizontal']) textarea {
        resize: horizontal;
      }
      
      textarea::placeholder {
        color: var(--rc-color-text-muted);
      }
      
      textarea:focus-visible {
        outline: none;
        border-color: var(--rc-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rc-color-border-focus) 30%, transparent);
      }
      
      textarea:disabled {
        cursor: not-allowed;
        background: var(--rc-color-action-bg-disabled);
        color: var(--rc-color-action-fg-disabled);
        opacity: var(--rc-opacity-disabled);
      }
    `,
  ];

  @property({ type: String })
  accessor value: string = '';

  @property({ type: String, reflect: true })
  accessor placeholder: string = '';

  @property({ type: Number, reflect: true })
  accessor rows: number = 3;

  @property({ type: Number, reflect: true })
  accessor cols: number = 0;

  @property({ type: Number, reflect: true })
  accessor maxlength: number = -1;

  @property({ type: Number, reflect: true })
  accessor minlength: number = -1;

  @property({ type: Boolean, reflect: true })
  accessor readonly: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor required: boolean = false;

  @property({ type: String, reflect: true })
  accessor wrap: '' | 'soft' | 'hard' | 'off' = '';

  @property({ type: String, reflect: true })
  accessor resize: '' | 'none' | 'both' | 'horizontal' | 'vertical' = '';

  override [getFormValue]() {
    return this.value;
  }

  override formResetCallback(): void {
    this.value = this.getAttribute('value') ?? '';
  }

  override formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    this.value = typeof state === 'string' ? state : '';
  }

  #onInput(event: Event) {
    this.value = (event.target as HTMLTextAreaElement).value;
  }

  override render() {
    const { ariaLabel, ariaInvalid, ariaRequired, ariaPlaceholder, role } = this as ARIAMixinStrict;

    return html`
      <textarea part="control"
        .value=${this.value}
        aria-invalid=${ariaInvalid || nothing}
        aria-label=${ariaLabel || nothing}
        aria-placeholder=${ariaPlaceholder || nothing}
        aria-required=${ariaRequired || nothing}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        cols=${this.cols > 0 ? this.cols : nothing}
        maxlength=${this.maxlength >= 0 ? this.maxlength : nothing}
        minlength=${this.minlength >= 0 ? this.minlength : nothing}
        name=${this.name}
        placeholder=${this.placeholder}
        role=${role || nothing}
        rows=${this.rows}
        wrap=${this.wrap || nothing}
        @input=${this.#onInput}
      ></textarea>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-textarea': RcTextarea;
  }
}
