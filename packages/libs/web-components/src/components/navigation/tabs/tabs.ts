import { ContextProvider } from '@lit/context';
import { css, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import type { RcTab } from './tab';
import { rcTabsContext, type RcTabsContextValue } from './tabs-context';

/**
 * Tablist + panels. Place `rc-tab` children and panel elements with matching
 * `data-value` / `slot="panel"` + `data-value`.
 *
 * @element rc-tabs
 * @fires change - When the active tab changes (`detail.value`)
 * @slot - Tab triggers (`rc-tab`) and panels (`slot="panel"`)
 */
export class RcTabs extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: grid;
        gap: var(--rc-space-3);
      }
      
      .list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--rc-space-1);
        border-bottom: var(--rc-border-sm) solid var(--rc-color-border-subtle);
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

  #select = (value: string) => {
    if (!value || value === this.value) return;
    this.value = value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
      }),
    );
  };

  #contextProvider = new ContextProvider(this, {
    context: rcTabsContext,
    initialValue: this.#contextValue(),
  });

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.#onKeyDown);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('keydown', this.#onKeyDown);
    super.disconnectedCallback();
  }

  override firstUpdated(): void {
    if (!this.value) {
      const first = this.#tabs().find((t) => !t.disabled);
      if (first) this.value = first.value;
    }
    this.#syncPanels();
  }

  override updated(changed: PropertyValues<this>): void {
    if (!changed.has('value')) return;
    this.#contextProvider.setValue(this.#contextValue());
    this.#syncPanels();
  }

  #tabs(): RcTab[] {
    // Only direct children — nested `rc-tabs` demos must not be synced.
    return [...this.querySelectorAll<RcTab>(':scope > rc-tab')];
  }

  #panels(): HTMLElement[] {
    return [...this.querySelectorAll<HTMLElement>(':scope > [slot="panel"]')];
  }

  #syncPanels() {
    for (const panel of this.#panels()) {
      const active = panel.dataset.value === this.value;
      panel.toggleAttribute('data-active', active);
      panel.hidden = !active;
    }
    this.dataset.active = this.value;
  }

  #contextValue(): RcTabsContextValue {
    return { value: this.value, select: this.#select };
  }

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
    this.#select(tab.value);
    tab.focus();
  };

  override render() {
    return html`
      <div class="list" part="list" role="tablist">
        <slot></slot>
      </div>
      <div class="panels" part="panels">
        <slot name="panel"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-tabs': RcTabs;
  }
}
