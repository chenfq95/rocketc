import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { mixinElementInternals } from '../../../internal/mixin-element-internals';
import {
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
} from '../../../internal/mixin-form-associated';

const base = mixinFormAssociated(mixinElementInternals(RcStyledElement));

/**
 * Star rating control.
 *
 * @element rc-rating
 * @fires change - When value changes (`detail.value`)
 */
export class RcRating extends base {
  static override styles = [
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      
      .root {
        display: inline-flex;
        gap: var(--rc-space-1);
      }
      
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        border: 0;
        background: transparent;
        padding: 0.1rem;
        color: var(--rc-color-border-default);
        line-height: 0;
        cursor: pointer;
        border-radius: 999px;
        transition:
          color var(--rc-duration-fast) var(--rc-easing-standard),
          transform var(--rc-duration-fast) var(--rc-easing-standard);
      }
      
      button svg {
        width: 1.35rem;
        height: 1.35rem;
        display: block;
      }
      
      button.on {
        color: var(--rc-color-warning-solid, #f5a524);
      }
      
      button:hover:not(:disabled) {
        transform: scale(1.08);
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rc-color-surface-panel),
          0 0 0 4px var(--rc-color-border-focus);
      }
      
      :host([readonly]) button,
      :host([disabled]) button {
        cursor: default;
      }
      
      :host([readonly]) button:hover,
      :host([disabled]) button:hover {
        transform: none;
      }
      
      :host([disabled]) {
        opacity: var(--rc-opacity-disabled);
      }
    `,
  ];

  @property({ type: Number })
  accessor value: number = 0;

  @property({ type: Number, reflect: true })
  accessor max: number = 5;

  @property({ type: Boolean, reflect: true })
  accessor readonly: boolean = false;

  @property({ type: String, reflect: true })
  accessor label: string = 'Rating';

  override [getFormValue]() {
    return String(this.value);
  }

  override formResetCallback() {
    this.value = Number(this.getAttribute('value') ?? 0);
  }

  override formStateRestoreCallback(state: FormRestoreState | null, _reason: FormRestoreReason) {
    if (typeof state === 'string') this.value = Number(state) || 0;
  }

  #set(value: number) {
    if (this.disabled || this.readonly) return;
    this.value = value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
      }),
    );
  }

  /** Soft, rounded 5-point star — stroke-linejoin rounds the tips. */
  #starIcon() {
    return html`
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1.9"
          stroke-linejoin="round"
          stroke-linecap="round"
          d="M12 4.2 14.3 9.1l5.3.6-4 3.6 1.1 5.2L12 15.8 7.3 18.5l1.1-5.2-4-3.6 5.3-.6L12 4.2Z"
        />
      </svg>
    `;
  }

  override render() {
    return html`
      <div class="root" part="container root" role="radiogroup" aria-label=${this.label}>
        ${Array.from({ length: this.max }, (_, i) => {
          const n = i + 1;
          return html`
            <button part="control item"
              type="button"
              class=${this.value >= n ? 'on' : ''}
              role="radio"
              aria-checked=${this.value >= n ? 'true' : 'false'}
              aria-label=${`${n}`}
              ?disabled=${this.disabled || this.readonly}
              @click=${() => this.#set(n)}
            >
              ${this.#starIcon()}
            </button>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-rating': RcRating;
  }
}
