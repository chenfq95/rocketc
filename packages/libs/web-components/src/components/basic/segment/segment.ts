import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import type { RcSegmentItem } from './segment-item';

export type RcSegmentSize = 'sm' | 'md' | 'lg';

/**
 * Segmented control for mutually exclusive options.
 * Compose with `rc-segment-item`.
 *
 * @element rc-segment
 * @fires change - When the selection changes (`detail.value`)
 * @slot - Segment items (`rc-segment-item`)
 */
export class RcSegment extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: inline-flex;
        max-width: 100%;
        vertical-align: middle;
      }
      
      :host([full-width]) {
        display: flex;
        width: 100%;
      }
      
      .root {
        display: flex;
        align-items: stretch;
        gap: var(--rc-space-1);
        width: 100%;
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-md);
        background: var(--rc-color-action-bg-hover);
        padding: 2px;
      }
      
      :host([disabled]) {
        opacity: var(--rc-opacity-disabled);
        pointer-events: none;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor value: string = '';

  @property({ type: String, reflect: true })
  accessor name: string = '';

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  @property({ type: String, reflect: true })
  accessor size: RcSegmentSize = 'md';

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  accessor fullWidth: boolean = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('rc-segment-select', this.#onSelect as EventListener);
    this.addEventListener('keydown', this.#onKeyDown);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('rc-segment-select', this.#onSelect as EventListener);
    this.removeEventListener('keydown', this.#onKeyDown);
    super.disconnectedCallback();
  }

  override firstUpdated(): void {
    if (!this.value) {
      const first = this.#items().find((item) => !item.disabled);
      if (first) this.value = first.value;
    }
    this.#sync();
  }

  override updated(): void {
    this.#sync();
  }

  #items(): RcSegmentItem[] {
    return [...this.querySelectorAll<RcSegmentItem>(':scope > rc-segment-item')];
  }

  #sync() {
    for (const item of this.#items()) {
      item.selected = item.value === this.value;
      item.size = this.size;
      if (this.disabled) item.disabled = true;
    }
  }

  #select(value: string) {
    if (!value || value === this.value || this.disabled) return;
    this.value = value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
      }),
    );
  }

  #onSelect = (event: Event) => {
    if (!(event.target instanceof HTMLElement) || event.target.parentElement !== this) return;
    event.stopPropagation();
    const custom = event as CustomEvent<{ value: string }>;
    this.#select(custom.detail?.value ?? '');
  };

  #onKeyDown = (event: KeyboardEvent) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      return;
    }
    const items = this.#items().filter((item) => !item.disabled);
    if (!items.length) return;
    const path = event.composedPath();
    if (!items.some((item) => path.includes(item))) return;

    const current = items.findIndex((item) => item.value === this.value);
    let next = current;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = items.length - 1;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = current <= 0 ? items.length - 1 : current - 1;
    } else {
      next = current >= items.length - 1 ? 0 : current + 1;
    }

    event.preventDefault();
    event.stopPropagation();
    const item = items[next];
    if (!item) return;
    this.#select(item.value);
    item.focus();
  };

  override render() {
    return html`
      <div class="root" part="container root" role="radiogroup" aria-disabled=${this.disabled ? 'true' : 'false'}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-segment': RcSegment;
  }
}
