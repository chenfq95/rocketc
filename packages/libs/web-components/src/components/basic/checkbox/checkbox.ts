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

const checkboxBase = mixinDelegatesAria(mixinFormAssociated(mixinElementInternals(LitElement)));

/**
 * Binary checkbox control.
 *
 * `checked` does not reflect so the `checked` attribute remains the default
 * for form reset.
 *
 * @element rds-checkbox
 * @fires change - Composed CustomEvent when checked changes (`detail.checked`)
 * @slot - Optional label content beside the control
 */
export class RdsCheckbox extends checkboxBase {
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
        display: inline-grid;
        place-items: center;
        width: var(--rds-space-4);
        height: var(--rds-space-4);
        margin: 0;
        border: var(--rds-border-sm) solid var(--rds-color-control-primary-border);
        border-radius: var(--rds-radius-sm);
        background: var(--rds-color-surface-panel);
        padding: 0;
        color: var(--rds-color-control-primary-fg-contrast);
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
      
      :host(.is-checked) button,
      :host(.is-indeterminate) button {
        background: var(--rds-color-control-primary-bg);
        border-color: var(--rds-color-control-primary-border);
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
    if (this.disabled) return;
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
      <button
        aria-checked=${ariaChecked}
        aria-label=${ariaLabel || nothing}
        aria-required=${this.required ? 'true' : nothing}
        ?disabled=${this.disabled}
        role=${role || 'checkbox'}
        type="button"
        @click=${this.#toggle}
      >
        <svg class="mark mark-check" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M3.5 8.5 6.5 11.5 12.5 4.5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg class="mark mark-indeterminate" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M3.5 8h9"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
      <span class="label"><slot></slot></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-checkbox': RdsCheckbox;
  }
}
