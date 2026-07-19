import { LitElement, css, html, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/mixin-delegates-aria';
import { mixinElementInternals } from '../../../internal/mixin-element-internals';
import {
  getFormState,
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
} from '../../../internal/mixin-form-associated';

const radioBase = mixinDelegatesAria(mixinFormAssociated(mixinElementInternals(RcStyledElement)));

/**
 * Single radio option. Group by shared `name`, or wrap in `rc-radio-group`.
 *
 * `checked` does not reflect so the `checked` attribute remains the default
 * for form reset.
 *
 * @element rc-radio
 * @fires change - Composed CustomEvent when selected (`detail.value`)
 * @slot - Optional label content beside the control
 */
export class RcRadio extends radioBase {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--rc-space-2);
        vertical-align: middle;
      }
      
      button {
        position: relative;
        width: var(--rc-space-4);
        height: var(--rc-space-4);
        margin: 0;
        border: var(--rc-border-sm) solid var(--rc-color-control-primary-border);
        border-radius: var(--rc-radius-full);
        background: var(--rc-color-surface-panel);
        padding: 0;
        cursor: pointer;
        transition:
          background-color var(--rc-duration-fast) var(--rc-easing-standard),
          border-color var(--rc-duration-fast) var(--rc-easing-standard);
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rc-color-surface-panel),
          0 0 0 4px var(--rc-color-border-focus);
      }
      
      :host(.is-checked) button {
        border-color: var(--rc-color-control-primary-border);
      }
      
      :host(.is-checked) button::after {
        content: '';
        position: absolute;
        inset: 3px;
        border-radius: var(--rc-radius-full);
        background: var(--rc-color-control-primary-bg);
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rc-opacity-disabled);
      }
      
      .label {
        color: var(--rc-color-text-primary);
        font-size: var(--rc-typography-label-font-size);
        line-height: var(--rc-typography-label-line-height);
      }
    `,
  ];

  @property({ type: Boolean })
  accessor checked: boolean = false;

  @property({ type: String, reflect: true })
  accessor value: string = 'on';

  @property({ type: Boolean, reflect: true })
  accessor required: boolean = false;

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has('checked')) {
      this.classList.toggle('is-checked', this.checked);
      if (this.checked) this.#uncheckSiblings();
    }
  }

  override [getFormValue]() {
    return this.checked ? this.value : null;
  }

  override [getFormState]() {
    return String(this.checked);
  }

  override formResetCallback(): void {
    this.checked = this.hasAttribute('checked');
  }

  override formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    this.checked = state === 'true';
  }

  #uncheckSiblings() {
    if (!this.name) return;
    const root = this.form ?? this.getRootNode();
    const scope =
      root instanceof HTMLFormElement || root instanceof Document || root instanceof ShadowRoot
        ? root
        : document;
    for (const el of scope.querySelectorAll<RcRadio>('rc-radio')) {
      if (el !== this && el.name === this.name) el.checked = false;
    }
  }

  #select() {
    if (this.disabled || this.checked) return;
    this.checked = true;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value, checked: true },
        bubbles: true,
      }),
    );
  }

  override render() {
    const { ariaLabel, role } = this as ARIAMixinStrict;

    return html`
      <button part="control"
        aria-checked=${this.checked ? 'true' : 'false'}
        aria-label=${ariaLabel || nothing}
        aria-required=${this.required ? 'true' : nothing}
        ?disabled=${this.disabled}
        role=${role || 'radio'}
        type="button"
        @click=${this.#select}
      ></button>
      <span class="label" part="label"><slot></slot></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-radio': RcRadio;
  }
}
