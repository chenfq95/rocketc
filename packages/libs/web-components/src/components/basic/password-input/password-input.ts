import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/delegate-aria';
import { mixinElementInternals } from '../../../internal/element-internals';
import {
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
} from '../../../internal/form-associated';
import { hostStyles } from '../../../internal/shared-styles';

const base = mixinDelegatesAria(mixinFormAssociated(mixinElementInternals(LitElement)));

/**
 * Password field with reveal toggle.
 *
 * @element rds-password-input
 * @fires input - While typing
 * @fires change - On commit
 */
export class RdsPasswordInput extends base {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      .root {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: stretch;
        border: var(--rds-border-sm) solid var(--rds-color-border-default);
        border-radius: var(--rds-radius-md);
        background: var(--rds-color-surface-panel);
        overflow: hidden;
      }
      
      :host(:focus-within) .root {
        border-color: var(--rds-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rds-color-border-focus) 30%, transparent);
      }
      
      input {
        min-width: 0;
        margin: 0;
        border: 0;
        background: transparent;
        padding: 0 var(--rds-space-3);
        min-height: var(--rds-space-9);
        color: inherit;
        font: inherit;
        font-size: var(--rds-typography-body-font-size);
      }
      
      input:focus {
        outline: none;
      }
      
      button {
        margin: 0;
        border: 0;
        border-left: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        background: transparent;
        padding: 0 var(--rds-space-3);
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-caption-font-size);
        cursor: pointer;
      }
      
      button:hover {
        color: var(--rds-color-text-primary);
        background: var(--rds-color-action-bg-hover);
      }
      
      :host([disabled]) {
        opacity: var(--rds-opacity-disabled);
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
      <div class="root">
        <input
          type=${this.revealed ? 'text' : 'password'}
          .value=${this.value}
          placeholder=${this.placeholder || nothing}
          autocomplete=${this.autocomplete || nothing}
          aria-label=${ariaLabel || nothing}
          ?readonly=${this.readonly}
          ?required=${this.required}
          ?disabled=${this.disabled}
          @input=${this.#onInput}
          @change=${this.#onChange}
        />
        <button
          type="button"
          tabindex="-1"
          aria-label=${this.revealed ? 'Hide password' : 'Show password'}
          aria-pressed=${this.revealed ? 'true' : 'false'}
          ?disabled=${this.disabled}
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
    'rds-password-input': RdsPasswordInput;
  }
}
