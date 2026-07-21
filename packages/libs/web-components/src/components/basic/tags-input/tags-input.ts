import { css, html, nothing } from 'lit';
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
 * Multi-value tag entry. `value` is a comma-separated string.
 *
 * @element rc-tags-input
 * @fires change - When tags change (`detail.value` / `detail.tags`)
 */
export class RcTagsInput extends base {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      .root {
        display: flex;
        flex-wrap: wrap;
        gap: var(--rc-space-2);
        align-items: center;
        min-height: var(--rc-space-9);
        border: var(--rc-border-sm) solid var(--rc-color-border-default);
        border-radius: var(--rc-radius-md);
        background: var(--rc-color-surface-panel);
        padding: var(--rc-space-1) var(--rc-space-2);
      }
      
      :host(:focus-within) .root {
        border-color: var(--rc-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rc-color-border-focus) 30%, transparent);
      }
      
      .tag {
        display: inline-flex;
        align-items: center;
        gap: var(--rc-space-1);
        border-radius: var(--rc-radius-full);
        background: var(--rc-color-control-secondary-bg-hover);
        color: var(--rc-color-control-secondary-fg);
        padding: 2px var(--rc-space-2);
        font-size: var(--rc-typography-caption-font-size);
      }
      
      .tag button {
        margin: 0;
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font: inherit;
        line-height: 1;
        padding: 0;
      }
      
      input {
        flex: 1 1 6rem;
        min-width: 6rem;
        margin: 0;
        border: 0;
        background: transparent;
        min-height: var(--rc-space-7);
        color: inherit;
        font: inherit;
        font-size: var(--rc-typography-body-font-size);
      }
      
      input:focus {
        outline: none;
      }
    `,
  ];

  @property({ type: String })
  accessor value: string = '';

  @property({ type: String, reflect: true })
  accessor placeholder: string = 'Add tag';

  @property({ type: Boolean, reflect: true })
  accessor required: boolean = false;
  #draft = '';

  get tags(): string[] {
    return this.value
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }

  override [getFormValue]() {
    return this.value;
  }

  override formResetCallback() {
    this.value = this.getAttribute('value') ?? '';
  }

  override formStateRestoreCallback(state: FormRestoreState | null, _reason: FormRestoreReason) {
    if (typeof state === 'string') this.value = state;
  }

  #emit() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value, tags: this.tags },
        bubbles: true,
      }),
    );
  }

  #setTags(tags: string[]) {
    this.value = tags.join(',');
    this.#emit();
  }

  #add(raw: string) {
    const tag = raw.trim();
    if (!tag) return;
    const next = [...this.tags];
    if (!next.includes(tag)) next.push(tag);
    this.#draft = '';
    this.#setTags(next);
  }

  #remove(tag: string) {
    this.#setTags(this.tags.filter((t) => t !== tag));
  }

  #onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.#add(this.#draft);
      return;
    }
    if (event.key === 'Backspace' && !this.#draft && this.tags.length) {
      this.#remove(this.tags[this.tags.length - 1]!);
    }
  }

  override render() {
    return html`
      <div class="root" part="container root" @click=${() => this.renderRoot.querySelector('input')?.focus()}>
        ${this.tags.map(
          (tag) => html`
            <span class="tag" part="tag">
              ${tag}
              <button part="control remove"
                type="button"
                aria-label=${`Remove ${tag}`}
                ?disabled=${this[formDisabled]}
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this.#remove(tag);
                }}
              >
                ×
              </button>
            </span>
          `,
        )}
        <input part="control input"
          .value=${this.#draft}
          placeholder=${this.tags.length ? nothing : this.placeholder}
          ?disabled=${this[formDisabled]}
          ?required=${this.required && !this.tags.length}
          @input=${(e: Event) => {
            this.#draft = (e.target as HTMLInputElement).value;
            this.requestUpdate();
          }}
          @keydown=${this.#onKeyDown}
          @blur=${() => this.#add(this.#draft)}
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-tags-input': RcTagsInput;
  }
}
