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

const base = mixinDelegatesAria(mixinFormAssociated(mixinElementInternals(LitElement)));

/**
 * Numeric stepper field.
 *
 * @element rds-number-input
 * @fires change - When value commits (`detail.value`)
 * @fires input - While typing / stepping (`detail.value`)
 */
export class RdsNumberInput extends base {
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
      
      .root {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: stretch;
        border: var(--rds-border-sm) solid var(--rds-color-border-default);
        border-radius: var(--rds-radius-md);
        background: var(--rds-color-surface-panel);
        overflow: hidden;
      }
      
      :host(:focus-within) .root {
        border-color: var(--rds-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rds-color-border-focus) 30%, transparent);
      }
      
      input {
        min-width: 0;
        margin: 0;
        border: 0;
        background: transparent;
        padding: 0 var(--rds-space-2);
        min-height: var(--rds-space-9);
        color: inherit;
        font: inherit;
        font-size: var(--rds-typography-body-font-size);
        text-align: center;
      }
      
      input:focus {
        outline: none;
      }
      
      button {
        margin: 0;
        border: 0;
        background: var(--rds-color-action-bg-hover);
        color: var(--rds-color-text-secondary);
        min-width: var(--rds-space-8);
        cursor: pointer;
        font: inherit;
      }
      
      button:hover:not(:disabled) {
        color: var(--rds-color-text-primary);
        background: var(--rds-color-action-bg-active, var(--rds-color-control-secondary-bg-hover));
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rds-opacity-disabled);
      }
      
      :host([disabled]) .root {
        opacity: var(--rds-opacity-disabled);
      }
    `,
  ];

  @property({ type: String })
  accessor value: string = '';

  @property({ type: Number, reflect: true })
  accessor min: number = Number.NaN;

  @property({ type: Number, reflect: true })
  accessor max: number = Number.NaN;

  @property({ type: Number, reflect: true })
  accessor step: number = 1;

  @property({ type: String, reflect: true })
  accessor placeholder: string = '';

  @property({ type: Boolean, reflect: true })
  accessor readonly: boolean = false;

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

  #num() {
    const n = Number(this.value);
    return Number.isFinite(n) ? n : 0;
  }

  #clamp(n: number) {
    let next = n;
    if (Number.isFinite(this.min)) next = Math.max(this.min, next);
    if (Number.isFinite(this.max)) next = Math.min(this.max, next);
    return next;
  }

  #emit(type: 'input' | 'change') {
    this.dispatchEvent(
      new CustomEvent(type, {
        detail: { value: this.value },
        bubbles: true,
      }),
    );
  }

  #stepBy(dir: 1 | -1) {
    if (this.disabled || this.readonly) return;
    const step = Number.isFinite(this.step) && this.step !== 0 ? this.step : 1;
    this.value = String(this.#clamp(this.#num() + dir * step));
    this.#emit('input');
    this.#emit('change');
  }

  #onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.#emit('input');
  }

  #onChange(event: Event) {
    const raw = (event.target as HTMLInputElement).value;
    if (raw === '') {
      this.value = '';
    } else {
      this.value = String(this.#clamp(Number(raw)));
    }
    this.#emit('change');
  }

  override render() {
    const { ariaLabel } = this as ARIAMixinStrict;
    const atMin = Number.isFinite(this.min) && this.#num() <= this.min;
    const atMax = Number.isFinite(this.max) && this.#num() >= this.max;

    return html`
      <div class="root">
        <button
          type="button"
          tabindex="-1"
          aria-label="Decrement"
          ?disabled=${this.disabled || this.readonly || atMin}
          @click=${() => this.#stepBy(-1)}
        >
          −
        </button>
        <input
          type="number"
          .value=${this.value}
          min=${Number.isFinite(this.min) ? this.min : nothing}
          max=${Number.isFinite(this.max) ? this.max : nothing}
          step=${this.step}
          placeholder=${this.placeholder || nothing}
          aria-label=${ariaLabel || nothing}
          ?readonly=${this.readonly}
          ?required=${this.required}
          ?disabled=${this.disabled}
          @input=${this.#onInput}
          @change=${this.#onChange}
        />
        <button
          type="button"
          tabindex="-1"
          aria-label="Increment"
          ?disabled=${this.disabled || this.readonly || atMax}
          @click=${() => this.#stepBy(1)}
        >
          +
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-number-input': RdsNumberInput;
  }
}
