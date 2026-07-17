import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Page controls. Fires `change` with `detail.page` (1-based).
 *
 * @element rds-pagination
 * @fires change - When the page changes (`detail.page`)
 */
export class RdsPagination extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
      }
      
      .root {
        display: inline-flex;
        align-items: center;
        gap: var(--rds-space-1);
      }
      
      button {
        min-width: var(--rds-space-8);
        height: var(--rds-space-8);
        margin: 0;
        border: var(--rds-border-sm) solid transparent;
        border-radius: var(--rds-radius-md);
        background: transparent;
        padding: 0 var(--rds-space-2);
        color: var(--rds-color-text-primary);
        font: inherit;
        font-size: var(--rds-typography-label-font-size);
        cursor: pointer;
      }
      
      button:hover:not(:disabled) {
        background: var(--rds-color-action-bg-hover);
      }
      
      button[aria-current='page'] {
        border-color: var(--rds-color-border-default);
        background: var(--rds-color-action-bg-selected);
        font-weight: var(--rds-typography-weight-semibold);
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rds-opacity-disabled);
      }
      
      .ellipsis {
        padding: 0 var(--rds-space-1);
        color: var(--rds-color-text-muted);
      }
    `,
  ];

  @property({ type: Number, reflect: true })
  accessor page: number = 1;

  @property({ type: Number, reflect: true })
  accessor count: number = 1;

  @property({ type: Number, attribute: 'sibling-count', reflect: true })
  accessor siblingCount: number = 1;

  #go(page: number) {
    const next = Math.min(this.count, Math.max(1, page));
    if (next === this.page) return;
    this.page = next;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { page: this.page },
        bubbles: true,
      }),
    );
  }

  #pages(): Array<number | 'ellipsis'> {
    const total = Math.max(1, this.count);
    const current = Math.min(total, Math.max(1, this.page));
    const siblings = Math.max(0, this.siblingCount);
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const set = new Set<number>([1, total, current]);
    for (let i = current - siblings; i <= current + siblings; i++) {
      if (i >= 1 && i <= total) set.add(i);
    }
    const sorted = [...set].sort((a, b) => a - b);
    const out: Array<number | 'ellipsis'> = [];
    for (let i = 0; i < sorted.length; i++) {
      const value = sorted[i]!;
      const prev = sorted[i - 1];
      if (prev !== undefined && value - prev > 1) out.push('ellipsis');
      out.push(value);
    }
    return out;
  }

  override render() {
    const pages = this.#pages();
    return html`
      <div class="root" role="navigation" aria-label="Pagination">
        <button
          type="button"
          ?disabled=${this.page <= 1}
          aria-label="Previous page"
          @click=${() => this.#go(this.page - 1)}
        >
          ‹
        </button>
        ${pages.map((item) =>
          item === 'ellipsis'
            ? html`
                <span class="ellipsis">…</span>
              `
            : html`
                <button
                  type="button"
                  aria-label=${`Page ${item}`}
                  aria-current=${item === this.page ? 'page' : nothing}
                  @click=${() => this.#go(item)}
                >
                  ${item}
                </button>
              `,
        )}
        <button
          type="button"
          ?disabled=${this.page >= this.count}
          aria-label="Next page"
          @click=${() => this.#go(this.page + 1)}
        >
          ›
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-pagination': RdsPagination;
  }
}
