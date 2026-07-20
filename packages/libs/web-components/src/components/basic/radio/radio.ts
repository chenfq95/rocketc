import { ContextConsumer } from '@lit/context';
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
import { rcRadioGroupContext } from './radio-group-context';

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

  #radioGroupContext = new ContextConsumer(this, {
    context: rcRadioGroupContext,
    subscribe: true,
  });

  protected override updated(changed: PropertyValues<this>): void {
    const checked = this.#effectiveChecked();
    this.classList.toggle('is-checked', checked);
    if (changed.has('checked') && checked && !this.#radioGroupContext.value) {
      this.#uncheckSiblings();
    }
  }

  override [getFormValue]() {
    if (!this.#effectiveChecked()) return null;
    const groupName = this.#radioGroupContext.value?.name;
    if (!groupName) return this.value;
    const value = new FormData();
    value.append(groupName, this.value);
    return value;
  }

  override [getFormState]() {
    return String(this.#effectiveChecked());
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

  #effectiveChecked(): boolean {
    const context = this.#radioGroupContext.value;
    return context?.value ? context.value === this.value : this.checked;
  }

  #select() {
    const context = this.#radioGroupContext.value;
    if (this.disabled || context?.disabled || this.#effectiveChecked()) return;
    if (context) context.select(this.value);
    else this.checked = true;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value, checked: true },
        bubbles: true,
      }),
    );
  }

  override render() {
    const { ariaLabel, role } = this as ARIAMixinStrict;
    const context = this.#radioGroupContext.value;
    const checked = this.#effectiveChecked();
    const disabled = this.disabled || Boolean(context?.disabled);

    return html`
      <button part="control"
        aria-checked=${checked ? 'true' : 'false'}
        aria-label=${ariaLabel || nothing}
        aria-required=${this.required ? 'true' : nothing}
        ?disabled=${disabled}
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
