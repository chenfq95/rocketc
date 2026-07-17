import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { mixinElementInternals } from '../../../internal/element-internals';
import {
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
} from '../../../internal/form-associated';
import { hostStyles } from '../../../internal/shared-styles';
import type { RdsComboboxOption } from './combobox-option';

const base = mixinFormAssociated(mixinElementInternals(LitElement));

/**
 * Filterable select. Options are `rds-combobox-option` children.
 *
 * @element rds-combobox
 * @fires change - When selection changes (`detail.value` / `detail.label`)
 * @slot - `rds-combobox-option` children
 */
export class RdsCombobox extends base {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        position: relative;
      }
      
      input {
        display: block;
        width: 100%;
        min-height: var(--rds-space-9);
        margin: 0;
        border: var(--rds-border-sm) solid var(--rds-color-border-default);
        border-radius: var(--rds-radius-md);
        background: var(--rds-color-surface-panel);
        padding: 0 var(--rds-space-3);
        color: inherit;
        font: inherit;
        font-size: var(--rds-typography-body-font-size);
      }
      
      input:focus-visible {
        outline: none;
        border-color: var(--rds-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rds-color-border-focus) 30%, transparent);
      }
      
      .list {
        position: absolute;
        z-index: 40;
        top: calc(100% + var(--rds-space-1));
        left: 0;
        right: 0;
        display: none;
        max-height: 14rem;
        overflow: auto;
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        border-radius: var(--rds-radius-md);
        background: var(--rds-color-surface-elevated, var(--rds-color-surface-panel));
        box-shadow: var(--rds-shadow-raised, var(--rds-shadow-surface));
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
    this.addEventListener('rds-combobox-select', this.#onSelect as EventListener);
    document.addEventListener('click', this.#onDocClick, true);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('rds-combobox-select', this.#onSelect as EventListener);
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

  #options(): RdsComboboxOption[] {
    return [...this.querySelectorAll<RdsComboboxOption>(':scope > rds-combobox-option')];
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
      <input
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
      <div class="list" role="listbox">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-combobox': RdsCombobox;
  }
}
