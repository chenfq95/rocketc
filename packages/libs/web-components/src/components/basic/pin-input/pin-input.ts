import { LitElement, css, html } from 'lit';
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
 * OTP / PIN digit group. `value` is the concatenated string.
 *
 * @element rds-pin-input
 * @fires change - When all digits filled or value changes (`detail.value`)
 * @fires input - On each digit change (`detail.value`)
 */
export class RdsPinInput extends base {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      .root {
        display: flex;
        flex-wrap: wrap;
        gap: var(--rds-space-2);
      }
      
      input {
        width: var(--rds-space-9);
        height: var(--rds-space-9);
        margin: 0;
        border: var(--rds-border-sm) solid var(--rds-color-border-default);
        border-radius: var(--rds-radius-md);
        background: var(--rds-color-surface-panel);
        color: inherit;
        font: inherit;
        font-size: var(--rds-typography-body-font-size);
        font-weight: var(--rds-typography-weight-semibold);
        text-align: center;
      }
      
      input:focus-visible {
        outline: none;
        border-color: var(--rds-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rds-color-border-focus) 30%, transparent);
      }
      
      :host([disabled]) input {
        opacity: var(--rds-opacity-disabled);
      }
    `,
  ];

  @property({ type: String })
  accessor value: string = '';

  @property({ type: Number, reflect: true })
  accessor length: number = 4;

  @property({ type: Boolean, reflect: true })
  accessor mask: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor required: boolean = false;

  override [getFormValue]() {
    return this.value;
  }

  override formResetCallback() {
    this.value = this.getAttribute('value') ?? '';
  }

  override formStateRestoreCallback(state: FormRestoreState | null, _reason: FormRestoreReason) {
    if (typeof state === 'string') this.value = state;
  }

  #digits() {
    const chars = this.value.split('');
    return Array.from({ length: this.length }, (_, i) => chars[i] ?? '');
  }

  #setDigit(index: number, char: string) {
    const digits = this.#digits();
    digits[index] = char.slice(-1);
    this.value = digits.join('').slice(0, this.length);
    this.dispatchEvent(new CustomEvent('input', { detail: { value: this.value }, bubbles: true }));
    if (this.value.length === this.length) {
      this.dispatchEvent(
        new CustomEvent('change', { detail: { value: this.value }, bubbles: true }),
      );
    }
  }

  #onInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const char = input.value.replace(/\s/g, '');
    this.#setDigit(index, char);
    if (char && index < this.length - 1) {
      const next = this.renderRoot.querySelectorAll('input')[index + 1];
      next?.focus();
    }
  }

  #onKeyDown(index: number, event: KeyboardEvent) {
    if (event.key !== 'Backspace') return;
    const digits = this.#digits();
    if (!digits[index] && index > 0) {
      event.preventDefault();
      this.#setDigit(index - 1, '');
      this.renderRoot.querySelectorAll('input')[index - 1]?.focus();
    }
  }

  #onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const text = event.clipboardData?.getData('text')?.replace(/\s/g, '') ?? '';
    if (!text) return;
    this.value = text.slice(0, this.length);
    this.dispatchEvent(new CustomEvent('input', { detail: { value: this.value }, bubbles: true }));
    this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value }, bubbles: true }));
  }

  override render() {
    return html`
      <div class="root" role="group" aria-label="PIN">
        ${this.#digits().map(
          (digit, index) => html`
            <input
              type=${this.mask ? 'password' : 'text'}
              inputmode="numeric"
              maxlength="1"
              .value=${digit}
              ?disabled=${this.disabled}
              ?required=${this.required && index === 0}
              aria-label=${`Digit ${index + 1}`}
              @input=${(e: Event) => this.#onInput(index, e)}
              @keydown=${(e: KeyboardEvent) => this.#onKeyDown(index, e)}
              @paste=${this.#onPaste}
            />
          `,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-pin-input': RdsPinInput;
  }
}
