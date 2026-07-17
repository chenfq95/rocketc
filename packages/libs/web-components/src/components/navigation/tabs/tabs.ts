import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';
import type { RdsTab } from './tab';

/**
 * Tablist + panels. Place `rds-tab` children and panel elements with matching
 * `data-value` / `slot="panel"` + `data-value`.
 *
 * @element rds-tabs
 * @fires change - When the active tab changes (`detail.value`)
 * @slot - Tab triggers (`rds-tab`) and panels (`slot="panel"`)
 */
export class RdsTabs extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: grid;
        gap: var(--rds-space-3);
      }
      
      .list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--rds-space-1);
        border-bottom: var(--rds-border-sm) solid var(--rds-color-border-subtle);
      }
      
      .panels ::slotted([slot='panel']) {
        display: none;
      }
      
      :host([data-active]) .panels ::slotted([slot='panel'][data-active]) {
        display: block;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor value: string = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('rds-tab-select', this.#onTabSelect as EventListener);
    this.addEventListener('keydown', this.#onKeyDown);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('rds-tab-select', this.#onTabSelect as EventListener);
    this.removeEventListener('keydown', this.#onKeyDown);
    super.disconnectedCallback();
  }

  override firstUpdated(): void {
    if (!this.value) {
      const first = this.#tabs().find((t) => !t.disabled);
      if (first) this.value = first.value;
    }
    this.#sync();
  }

  override updated(): void {
    this.#sync();
  }

  #tabs(): RdsTab[] {
    // Only direct children — nested `rds-tabs` demos must not be synced.
    return [...this.querySelectorAll<RdsTab>(':scope > rds-tab')];
  }

  #panels(): HTMLElement[] {
    return [...this.querySelectorAll<HTMLElement>(':scope > [slot="panel"]')];
  }

  #sync() {
    for (const tab of this.#tabs()) {
      tab.selected = tab.value === this.value;
    }
    for (const panel of this.#panels()) {
      const active = panel.dataset.value === this.value;
      panel.toggleAttribute('data-active', active);
      panel.hidden = !active;
    }
    this.dataset.active = this.value;
  }

  #onTabSelect = (event: Event) => {
    // Ignore nested `rds-tabs` — only direct child triggers.
    if (!(event.target instanceof HTMLElement) || event.target.parentElement !== this) return;
    event.stopPropagation();
    const custom = event as CustomEvent<{ value: string }>;
    if (!custom.detail?.value || custom.detail.value === this.value) return;
    this.value = custom.detail.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
      }),
    );
  };

  #onKeyDown = (event: KeyboardEvent) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tabs = this.#tabs().filter((t) => !t.disabled);
    if (!tabs.length) return;
    const path = event.composedPath();
    if (!tabs.some((tab) => path.includes(tab))) return;
    const current = tabs.findIndex((t) => t.value === this.value);
    let next = current;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else if (event.key === 'ArrowLeft') next = current <= 0 ? tabs.length - 1 : current - 1;
    else next = current >= tabs.length - 1 ? 0 : current + 1;
    event.preventDefault();
    event.stopPropagation();
    const tab = tabs[next];
    if (!tab) return;
    this.value = tab.value;
    tab.focus();
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
      }),
    );
  };

  override render() {
    return html`
      <div class="list" role="tablist">
        <slot></slot>
      </div>
      <div class="panels">
        <slot name="panel"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-tabs': RdsTabs;
  }
}
