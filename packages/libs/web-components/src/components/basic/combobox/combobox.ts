import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { mixinElementInternals } from '../../../internal/mixin-element-internals';
import {
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
} from '../../../internal/mixin-form-associated';
import type { RcComboboxOption } from './combobox-option';

const base = mixinFormAssociated(mixinElementInternals(RcStyledElement));

/**
 * Filterable select. Options are `rc-combobox-option` children.
 *
 * @element rc-combobox
 * @fires change - When selection changes (`detail.value` / `detail.label`)
 * @slot - `rc-combobox-option` children
 */
export class RcCombobox extends base {
  static override styles = [
    css`
      :host {
        display: block;
        position: relative;
      }
      
      input {
        display: block;
        width: 100%;
        min-height: var(--rc-space-9);
        margin: 0;
        border: var(--rc-border-sm) solid var(--rc-color-border-default);
        border-radius: var(--rc-radius-md);
        background: var(--rc-color-surface-panel);
        padding: 0 var(--rc-space-3);
        color: inherit;
        font: inherit;
        font-size: var(--rc-typography-body-font-size);
      }
      
      input:focus-visible {
        outline: none;
        border-color: var(--rc-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rc-color-border-focus) 30%, transparent);
      }
      
      .list {
        position: absolute;
        z-index: 40;
        top: calc(100% + var(--rc-space-1));
        left: 0;
        right: 0;
        display: none;
        max-height: 14rem;
        overflow: auto;
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-md);
        background: var(--rc-color-surface-elevated, var(--rc-color-surface-panel));
        box-shadow: var(--rc-shadow-raised, var(--rc-shadow-surface));
      }
      
      :host([open]) .list {
        display: block;
      }
    `,
  ];

  @property({ type: String })
  accessor value: string = '';

  @property({ type: String })
  accessor label: string = '';

  @property({ type: String, reflect: true })
  accessor placeholder: string = 'Select…';

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor required: boolean = false;
  #query = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('rc-combobox-select', this.#onSelect as EventListener);
    document.addEventListener('click', this.#onDocClick, true);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('rc-combobox-select', this.#onSelect as EventListener);
    document.removeEventListener('click', this.#onDocClick, true);
    super.disconnectedCallback();
  }

  override [getFormValue]() {
    return this.value;
  }

  override formResetCallback() {
    this.value = this.getAttribute('value') ?? '';
    this.label = '';
  }

  override formStateRestoreCallback(state: FormRestoreState | null, _reason: FormRestoreReason) {
    if (typeof state === 'string') this.value = state;
  }

  #options(): RcComboboxOption[] {
    return [...this.querySelectorAll<RcComboboxOption>(':scope > rc-combobox-option')];
  }

  #filter() {
    const q = this.#query.trim().toLowerCase();
    for (const opt of this.#options()) {
      const text = (opt.textContent ?? '').toLowerCase();
      const match = !q || text.includes(q) || opt.value.toLowerCase().includes(q);
      opt.hidden = !match;
      opt.selected = opt.value === this.value;
    }
  }

  #onSelect = (event: Event) => {
    if (!(event.target instanceof HTMLElement) || event.target.parentElement !== this) return;
    event.stopPropagation();
    const { value, label } = (event as CustomEvent<{ value: string; label: string }>).detail;
    this.value = value;
    this.label = label;
    this.#query = label;
    this.open = false;
    this.#filter();
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value, label },
        bubbles: true,
      }),
    );
    this.requestUpdate();
  };

  #onDocClick = (event: Event) => {
    if (!this.contains(event.target as Node)) this.open = false;
  };

  override updated() {
    this.#filter();
  }

  override render() {
    const display = this.open ? this.#query : this.label || this.#query || '';
    return html`
      <input part="control"
        role="combobox"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-autocomplete="list"
        .value=${display}
        placeholder=${this.placeholder || nothing}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @focus=${() => {
          this.open = true;
          this.#query = this.label;
          this.requestUpdate();
        }}
        @input=${(e: Event) => {
          this.#query = (e.target as HTMLInputElement).value;
          this.open = true;
          this.#filter();
          this.requestUpdate();
        }}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Escape') this.open = false;
          if (e.key === 'ArrowDown') this.open = true;
        }}
      />
      <div class="list" part="list" role="listbox">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-combobox': RcCombobox;
  }
}
