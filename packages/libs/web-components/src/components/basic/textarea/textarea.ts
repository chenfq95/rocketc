import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/delegate-aria';
import { mixinElementInternals } from '../../../internal/element-internals';
import {
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
} from '../../../internal/form-associated';
import { hostStyles } from '../../../internal/shared-styles';

const textareaBase = mixinDelegatesAria(mixinFormAssociated(mixinElementInternals(LitElement)));

/**
 * Multi-line text field.
 *
 * @element rds-textarea
 * @fires input - From the inner control (native `input` does not compose out of shadow)
 */
export class RdsTextarea extends textareaBase {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      textarea {
        display: block;
        width: 100%;
        min-height: calc(var(--rds-space-9) * 2);
        margin: 0;
        border: var(--rds-border-sm) solid var(--rds-color-border-default);
        border-radius: var(--rds-radius-md);
        background: var(--rds-color-surface-panel);
        padding: var(--rds-space-2) var(--rds-space-3);
        color: var(--rds-color-text-primary);
        font: inherit;
        font-size: var(--rds-typography-body-font-size);
        line-height: var(--rds-typography-body-line-height);
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
        color: var(--rds-color-text-muted);
      }
      
      textarea:focus-visible {
        outline: none;
        border-color: var(--rds-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rds-color-border-focus) 30%, transparent);
      }
      
      textarea:disabled {
        cursor: not-allowed;
        background: var(--rds-color-action-bg-disabled);
        color: var(--rds-color-action-fg-disabled);
        opacity: var(--rds-opacity-disabled);
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
      <textarea
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
    'rds-textarea': RdsTextarea;
  }
}
