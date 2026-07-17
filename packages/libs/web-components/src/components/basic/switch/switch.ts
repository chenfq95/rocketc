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

const switchBase = mixinDelegatesAria(mixinFormAssociated(mixinElementInternals(LitElement)));

/**
 * Binary toggle control.
 *
 * Form participation comes from `mixinFormAssociated` /
 * `mixinElementInternals`. ARIA on the host is delegated via
 * `mixinDelegatesAria`. Component-owned `role="switch"` / `aria-checked`
 * are bound in the template from state.
 *
 * `checked` does not reflect so the `checked` attribute remains the default
 * for form reset (same pattern as Material Web's `selected`).
 *
 * @element rds-switch
 * @fires change - Composed CustomEvent when checked changes (`detail.checked`)
 */
export class RdsSwitch extends switchBase {
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
        vertical-align: middle;
      }
      
      button {
        position: relative;
        width: var(--rds-space-9);
        height: var(--rds-space-5);
        margin: 0;
        border: 0;
        border-radius: var(--rds-radius-full);
        background: var(--rds-color-border-default);
        padding: 0;
        cursor: pointer;
        transition: background-color var(--rds-duration-fast) var(--rds-easing-standard);
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rds-color-surface-panel),
          0 0 0 4px var(--rds-color-border-focus);
      }
      
      :host(.is-checked) button {
        background: var(--rds-color-control-primary-bg);
      }
      
      .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: calc(var(--rds-space-5) - 4px);
        height: calc(var(--rds-space-5) - 4px);
        border-radius: var(--rds-radius-full);
        background: var(--rds-color-common-white, #fff);
        box-shadow: var(--rds-shadow-xs);
        transition: translate var(--rds-duration-fast) var(--rds-easing-standard);
      }
      
      :host(.is-checked) .thumb {
        translate: var(--rds-space-4) 0;
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rds-opacity-disabled);
      }
    `,
  ];

  @property({ type: Boolean })
  accessor checked: boolean = false;

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has('checked')) {
      this.classList.toggle('is-checked', this.checked);
    }
  }

  override [getFormValue]() {
    return this.checked ? 'on' : null;
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

  #toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked },
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
        ?disabled=${this.disabled}
        role=${role || 'switch'}
        type="button"
        @click=${this.#toggle}
      >
        <span class="thumb"></span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-switch': RdsSwitch;
  }
}
