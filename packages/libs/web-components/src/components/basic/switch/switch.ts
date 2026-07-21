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

const switchBase = mixinDelegatesAria(mixinFormAssociated(mixinElementInternals(RcStyledElement)));

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
 * @element rc-switch
 * @fires change - Composed CustomEvent when checked changes (`detail.checked`)
 */
export class RcSwitch extends switchBase {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
      }
      
      button {
        position: relative;
        width: var(--rc-space-9);
        height: var(--rc-space-5);
        margin: 0;
        border: 0;
        border-radius: var(--rc-radius-full);
        background: var(--rc-color-border-default);
        padding: 0;
        cursor: pointer;
        transition: background-color var(--rc-duration-fast) var(--rc-easing-standard);
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rc-color-surface-panel),
          0 0 0 4px var(--rc-color-border-focus);
      }
      
      :host(.is-checked) button {
        background: var(--rc-color-control-primary-bg);
      }
      
      .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: calc(var(--rc-space-5) - 4px);
        height: calc(var(--rc-space-5) - 4px);
        border-radius: var(--rc-radius-full);
        background: var(--rc-color-common-white, #fff);
        box-shadow: var(--rc-shadow-xs);
        transition: translate var(--rc-duration-fast) var(--rc-easing-standard);
      }
      
      :host(.is-checked) .thumb {
        translate: var(--rc-space-4) 0;
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rc-opacity-disabled);
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
    if (this[formDisabled]) return;
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
      <button part="control"
        aria-checked=${this.checked ? 'true' : 'false'}
        aria-label=${ariaLabel || nothing}
        ?disabled=${this[formDisabled]}
        role=${role || 'switch'}
        type="button"
        @click=${this.#toggle}
      >
        <span class="thumb" part="thumb"></span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-switch': RcSwitch;
  }
}
