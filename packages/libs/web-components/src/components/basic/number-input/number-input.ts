import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/mixin-delegates-aria';
import { mixinElementInternals } from '../../../internal/mixin-element-internals';
import {
  formDisabled,
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
} from '../../../internal/mixin-form-associated';

const base = mixinDelegatesAria(mixinFormAssociated(mixinElementInternals(RcStyledElement)));

/**
 * Numeric stepper field.
 *
 * @element rc-number-input
 * @fires change - When value commits (`detail.value`)
 * @fires input - While typing / stepping (`detail.value`)
 */
export class RcNumberInput extends base {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = [
    css`
      :host {
        display: block;
      }
      
      .root {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: stretch;
        border: var(--rc-border-sm) solid var(--rc-color-border-default);
        border-radius: var(--rc-radius-md);
        background: var(--rc-color-surface-panel);
        overflow: hidden;
      }
      
      :host(:focus-within) .root {
        border-color: var(--rc-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rc-color-border-focus) 30%, transparent);
      }
      
      input {
        min-width: 0;
        margin: 0;
        border: 0;
        background: transparent;
        padding: 0 var(--rc-space-2);
        min-height: var(--rc-space-9);
        color: inherit;
        font: inherit;
        font-size: var(--rc-typography-body-font-size);
        text-align: center;
      }
      
      input:focus {
        outline: none;
      }
      
      button {
        margin: 0;
        border: 0;
        background: var(--rc-color-action-bg-hover);
        color: var(--rc-color-text-secondary);
        min-width: var(--rc-space-8);
        cursor: pointer;
        font: inherit;
      }
      
      button:hover:not(:disabled) {
        color: var(--rc-color-text-primary);
        background: var(--rc-color-action-bg-active, var(--rc-color-control-secondary-bg-hover));
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rc-opacity-disabled);
      }
      
      :host(:disabled) .root {
        opacity: var(--rc-opacity-disabled);
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
    if (this[formDisabled] || this.readonly) return;
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
      <div class="root" part="container root">
        <button part="control"
          type="button"
          tabindex="-1"
          aria-label="Decrement"
          ?disabled=${this[formDisabled] || this.readonly || atMin}
          @click=${() => this.#stepBy(-1)}
        >
          −
        </button>
        <input part="control"
          type="number"
          .value=${this.value}
          min=${Number.isFinite(this.min) ? this.min : nothing}
          max=${Number.isFinite(this.max) ? this.max : nothing}
          step=${this.step}
          placeholder=${this.placeholder || nothing}
          aria-label=${ariaLabel || nothing}
          ?readonly=${this.readonly}
          ?required=${this.required}
          ?disabled=${this[formDisabled]}
          @input=${this.#onInput}
          @change=${this.#onChange}
        />
        <button part="control"
          type="button"
          tabindex="-1"
          aria-label="Increment"
          ?disabled=${this[formDisabled] || this.readonly || atMax}
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
    'rc-number-input': RcNumberInput;
  }
}
