import { LitElement, css, html, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/mixin-delegates-aria';
import { mixinElementInternals } from '../../../internal/mixin-element-internals';
import {
  formDisabled,
  getFormState,
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
} from '../../../internal/mixin-form-associated';

const checkboxBase = mixinDelegatesAria(
  mixinFormAssociated(mixinElementInternals(RcStyledElement)),
);

/**
 * Binary checkbox control.
 *
 * `checked` does not reflect so the `checked` attribute remains the default
 * for form reset.
 *
 * @element rc-checkbox
 * @fires change - Composed CustomEvent when checked changes (`detail.checked`)
 * @slot - Optional label content beside the control
 */
export class RcCheckbox extends checkboxBase {
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
        display: inline-grid;
        place-items: center;
        width: var(--rc-space-4);
        height: var(--rc-space-4);
        margin: 0;
        border: var(--rc-border-sm) solid var(--rc-color-control-primary-border);
        border-radius: var(--rc-radius-sm);
        background: var(--rc-color-surface-panel);
        padding: 0;
        color: var(--rc-color-control-primary-fg-contrast);
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
      
      :host(.is-checked) button,
      :host(.is-indeterminate) button {
        background: var(--rc-color-control-primary-bg);
        border-color: var(--rc-color-control-primary-border);
      }
      
      .mark {
        display: none;
        width: 0.65rem;
        height: 0.65rem;
      }
      
      :host(.is-checked) .mark-check,
      :host(.is-indeterminate) .mark-indeterminate {
        display: block;
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

  @property({ type: Boolean })
  accessor indeterminate: boolean = false;

  @property({ type: String, reflect: true })
  accessor value: string = 'on';

  @property({ type: Boolean, reflect: true })
  accessor required: boolean = false;

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has('checked') || changed.has('indeterminate')) {
      this.classList.toggle('is-checked', this.checked && !this.indeterminate);
      this.classList.toggle('is-indeterminate', this.indeterminate);
    }
  }

  override [getFormValue]() {
    return this.checked && !this.indeterminate ? this.value : null;
  }

  override [getFormState]() {
    if (this.indeterminate) return 'indeterminate';
    return String(this.checked);
  }

  override formResetCallback(): void {
    this.checked = this.hasAttribute('checked');
    this.indeterminate = this.hasAttribute('indeterminate');
  }

  override formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    if (state === 'indeterminate') {
      this.indeterminate = true;
      this.checked = false;
      return;
    }
    this.indeterminate = false;
    this.checked = state === 'true';
  }

  #toggle() {
    if (this[formDisabled]) return;
    this.indeterminate = false;
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked, indeterminate: this.indeterminate },
        bubbles: true,
      }),
    );
  }

  override render() {
    const { ariaLabel, role } = this as ARIAMixinStrict;
    const ariaChecked = this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false';

    return html`
      <button part="control"
        aria-checked=${ariaChecked}
        aria-label=${ariaLabel || nothing}
        aria-required=${this.required ? 'true' : nothing}
        ?disabled=${this[formDisabled]}
        role=${role || 'checkbox'}
        type="button"
        @click=${this.#toggle}
      >
        <svg class="mark mark-check" part="mark mark-check" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M3.5 8.5 6.5 11.5 12.5 4.5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg class="mark mark-indeterminate" part="mark mark-indeterminate" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M3.5 8h9"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
      <span class="label" part="label"><slot></slot></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-checkbox': RcCheckbox;
  }
}
