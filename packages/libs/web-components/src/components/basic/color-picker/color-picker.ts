import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { mixinElementInternals } from '../../../internal/mixin-element-internals';
import {
  formDisabled,
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
} from '../../../internal/mixin-form-associated';

const base = mixinFormAssociated(mixinElementInternals(RcStyledElement));

/**
 * Color picker with swatch + hex field.
 *
 * @element rc-color-picker
 * @fires change - When color commits (`detail.value`)
 * @fires input - While adjusting (`detail.value`)
 */
export class RcColorPicker extends base {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      .root {
        display: grid;
        grid-template-columns: var(--rc-space-9) 1fr;
        gap: var(--rc-space-2);
        align-items: center;
      }
      
      input[type='color'] {
        width: var(--rc-space-9);
        height: var(--rc-space-9);
        margin: 0;
        border: var(--rc-border-sm) solid var(--rc-color-border-default);
        border-radius: var(--rc-radius-md);
        background: var(--rc-color-surface-panel);
        padding: var(--rc-space-1);
        cursor: pointer;
      }
      
      input[type='text'] {
        min-height: var(--rc-space-9);
        margin: 0;
        border: var(--rc-border-sm) solid var(--rc-color-border-default);
        border-radius: var(--rc-radius-md);
        background: var(--rc-color-surface-panel);
        padding: 0 var(--rc-space-3);
        color: inherit;
        font: inherit;
        font-family: var(--rc-typography-code-font-family);
        font-size: var(--rc-typography-body-small-font-size);
      }
      
      input:focus-visible {
        outline: none;
        border-color: var(--rc-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rc-color-border-focus) 30%, transparent);
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
      <div class="root" part="container root">
        <input part="control"
          type="color"
          .value=${this.value}
          ?disabled=${this[formDisabled]}
          aria-label="Color"
          @input=${(e: Event) => this.#emit('input', (e.target as HTMLInputElement).value)}
          @change=${(e: Event) => this.#emit('change', (e.target as HTMLInputElement).value)}
        />
        <input part="control"
          type="text"
          .value=${this.value}
          ?disabled=${this[formDisabled]}
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
    'rc-color-picker': RcColorPicker;
  }
}
