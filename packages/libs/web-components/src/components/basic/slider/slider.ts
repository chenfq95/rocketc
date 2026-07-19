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

const sliderBase = mixinDelegatesAria(mixinFormAssociated(mixinElementInternals(RcStyledElement)));

/**
 * Range slider (`<input type="range">`).
 *
 * @element rc-slider
 * @fires input - Native input event (composed; retargeted to the host)
 * @fires change - Composed CustomEvent when the value settles (`detail.value`)
 */
export class RcSlider extends sliderBase {
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
        margin: 0;
        accent-color: var(--rc-color-control-primary-bg);
        cursor: pointer;
      }
      
      input:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rc-color-surface-panel),
          0 0 0 4px var(--rc-color-border-focus);
        border-radius: var(--rc-radius-full);
      }
      
      input:disabled {
        cursor: not-allowed;
        opacity: var(--rc-opacity-disabled);
      }
    `,
  ];

  @property({ type: String })
  accessor value: string = '50';

  @property({ type: Number, reflect: true })
  accessor min: number = 0;

  @property({ type: Number, reflect: true })
  accessor max: number = 100;

  @property({ type: Number, reflect: true })
  accessor step: number = 1;

  override [getFormValue]() {
    return this.value;
  }

  override formResetCallback(): void {
    this.value = this.getAttribute('value') ?? '50';
  }

  override formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    this.value = typeof state === 'string' ? state : '50';
  }

  #onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }

  #onChange(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
      }),
    );
    event.stopPropagation();
  }

  override render() {
    const { ariaLabel, ariaValueMin, ariaValueMax, ariaValueNow, ariaValueText, role } =
      this as ARIAMixinStrict;

    return html`
      <input part="control"
        .value=${this.value}
        aria-label=${ariaLabel || nothing}
        aria-valuemax=${ariaValueMax || String(this.max)}
        aria-valuemin=${ariaValueMin || String(this.min)}
        aria-valuenow=${ariaValueNow || this.value}
        aria-valuetext=${ariaValueText || nothing}
        ?disabled=${this.disabled}
        max=${this.max}
        min=${this.min}
        name=${this.name}
        role=${role || nothing}
        step=${this.step}
        type="range"
        @change=${this.#onChange}
        @input=${this.#onInput}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-slider': RcSlider;
  }
}
