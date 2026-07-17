import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { mixinElementInternals } from '../../../internal/element-internals';
import {
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
} from '../../../internal/form-associated';
import { hostStyles } from '../../../internal/shared-styles';

const base = mixinFormAssociated(mixinElementInternals(LitElement));

/**
 * Color picker with swatch + hex field.
 *
 * @element rds-color-picker
 * @fires change - When color commits (`detail.value`)
 * @fires input - While adjusting (`detail.value`)
 */
export class RdsColorPicker extends base {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      .root {
        display: grid;
        grid-template-columns: var(--rds-space-9) 1fr;
        gap: var(--rds-space-2);
        align-items: center;
      }
      
      input[type='color'] {
        width: var(--rds-space-9);
        height: var(--rds-space-9);
        margin: 0;
        border: var(--rds-border-sm) solid var(--rds-color-border-default);
        border-radius: var(--rds-radius-md);
        background: var(--rds-color-surface-panel);
        padding: var(--rds-space-1);
        cursor: pointer;
      }
      
      input[type='text'] {
        min-height: var(--rds-space-9);
        margin: 0;
        border: var(--rds-border-sm) solid var(--rds-color-border-default);
        border-radius: var(--rds-radius-md);
        background: var(--rds-color-surface-panel);
        padding: 0 var(--rds-space-3);
        color: inherit;
        font: inherit;
        font-family: var(--rds-typography-code-font-family);
        font-size: var(--rds-typography-body-small-font-size);
      }
      
      input:focus-visible {
        outline: none;
        border-color: var(--rds-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rds-color-border-focus) 30%, transparent);
      }
    `,
  ];

  @property({ type: String })
  accessor value: string = '#000000';

  override [getFormValue]() {
    return this.value;
  }

  override formResetCallback() {
    this.value = this.getAttribute('value') ?? '#000000';
  }

  override formStateRestoreCallback(state: FormRestoreState | null, _reason: FormRestoreReason) {
    if (typeof state === 'string') this.value = state;
  }

  #normalize(raw: string) {
    const v = raw.trim();
    if (/^#[0-9a-fA-F]{6}$/.test(v)) return v.toLowerCase();
    if (/^[0-9a-fA-F]{6}$/.test(v)) return `#${v.toLowerCase()}`;
    return this.value;
  }

  #emit(type: 'input' | 'change', value: string) {
    this.value = value;
    this.dispatchEvent(new CustomEvent(type, { detail: { value }, bubbles: true }));
  }

  override render() {
    return html`
      <div class="root">
        <input
          type="color"
          .value=${this.value}
          ?disabled=${this.disabled}
          aria-label="Color"
          @input=${(e: Event) => this.#emit('input', (e.target as HTMLInputElement).value)}
          @change=${(e: Event) => this.#emit('change', (e.target as HTMLInputElement).value)}
        />
        <input
          type="text"
          .value=${this.value}
          ?disabled=${this.disabled}
          aria-label="Hex color"
          spellcheck="false"
          @change=${(e: Event) =>
            this.#emit('change', this.#normalize((e.target as HTMLInputElement).value))}
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-color-picker': RdsColorPicker;
  }
}
