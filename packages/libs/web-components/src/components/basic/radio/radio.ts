import { LitElement, css, html, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/delegate-aria';
import { mixinElementInternals } from '../../../internal/element-internals';
import {
  getFormState,
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
} from '../../../internal/form-associated';
import { hostStyles } from '../../../internal/shared-styles';

const radioBase = mixinDelegatesAria(mixinFormAssociated(mixinElementInternals(LitElement)));

/**
 * Single radio option. Group by shared `name`, or wrap in `rds-radio-group`.
 *
 * `checked` does not reflect so the `checked` attribute remains the default
 * for form reset.
 *
 * @element rds-radio
 * @fires change - Composed CustomEvent when selected (`detail.value`)
 * @slot - Optional label content beside the control
 */
export class RdsRadio extends radioBase {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--rds-space-2);
        vertical-align: middle;
      }
      
      button {
        position: relative;
        width: var(--rds-space-4);
        height: var(--rds-space-4);
        margin: 0;
        border: var(--rds-border-sm) solid var(--rds-color-control-primary-border);
        border-radius: var(--rds-radius-full);
        background: var(--rds-color-surface-panel);
        padding: 0;
        cursor: pointer;
        transition:
          background-color var(--rds-duration-fast) var(--rds-easing-standard),
          border-color var(--rds-duration-fast) var(--rds-easing-standard);
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rds-color-surface-panel),
          0 0 0 4px var(--rds-color-border-focus);
      }
      
      :host(.is-checked) button {
        border-color: var(--rds-color-control-primary-border);
      }
      
      :host(.is-checked) button::after {
        content: '';
        position: absolute;
        inset: 3px;
        border-radius: var(--rds-radius-full);
        background: var(--rds-color-control-primary-bg);
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rds-opacity-disabled);
      }
      
      .label {
        color: var(--rds-color-text-primary);
        font-size: var(--rds-typography-label-font-size);
        line-height: var(--rds-typography-label-line-height);
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
    for (const el of scope.querySelectorAll<RdsRadio>('rds-radio')) {
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
      <button
        aria-checked=${this.checked ? 'true' : 'false'}
        aria-label=${ariaLabel || nothing}
        aria-required=${this.required ? 'true' : nothing}
        ?disabled=${this.disabled}
        role=${role || 'radio'}
        type="button"
        @click=${this.#select}
      ></button>
      <span class="label"><slot></slot></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-radio': RdsRadio;
  }
}
