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
 * Password field with reveal toggle.
 *
 * @element rc-password-input
 * @fires input - While typing
 * @fires change - On commit
 */
export class RcPasswordInput extends base {
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
        grid-template-columns: 1fr auto;
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
        padding: 0 var(--rc-space-3);
        min-height: var(--rc-space-9);
        color: inherit;
        font: inherit;
        font-size: var(--rc-typography-body-font-size);
      }
      
      input:focus {
        outline: none;
      }
      
      button {
        margin: 0;
        border: 0;
        border-left: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        background: transparent;
        padding: 0 var(--rc-space-3);
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-caption-font-size);
        cursor: pointer;
      }
      
      button:hover {
        color: var(--rc-color-text-primary);
        background: var(--rc-color-action-bg-hover);
      }
      
      :host(:disabled) {
        opacity: var(--rc-opacity-disabled);
      }
    `,
  ];

  @property({ type: String })
  accessor value: string = '';

  @property({ type: String, reflect: true })
  accessor placeholder: string = '';

  @property({ type: Boolean, reflect: true })
  accessor readonly: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor required: boolean = false;

  @property({ type: String, reflect: true })
  accessor autocomplete: string = 'current-password';

  @property({ type: Boolean, reflect: true })
  accessor revealed: boolean = false;

  override [getFormValue]() {
    return this.value;
  }

  override formResetCallback() {
    this.value = this.getAttribute('value') ?? '';
  }

  override formStateRestoreCallback(state: FormRestoreState | null, _reason: FormRestoreReason) {
    if (typeof state === 'string') this.value = state;
  }

  #onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.dispatchEvent(new Event('input', { bubbles: true }));
  }

  #onChange() {
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  override render() {
    const { ariaLabel } = this as ARIAMixinStrict;
    return html`
      <div class="root" part="container root">
        <input part="control"
          type=${this.revealed ? 'text' : 'password'}
          .value=${this.value}
          placeholder=${this.placeholder || nothing}
          autocomplete=${this.autocomplete || nothing}
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
          aria-label=${this.revealed ? 'Hide password' : 'Show password'}
          aria-pressed=${this.revealed ? 'true' : 'false'}
          ?disabled=${this[formDisabled]}
          @click=${() => {
            this.revealed = !this.revealed;
          }}
        >
          ${this.revealed ? 'Hide' : 'Show'}
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-password-input': RcPasswordInput;
  }
}
