import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Breadcrumb trail. Place crumb nodes as light-DOM children.
 *
 * @element rc-breadcrumb
 * @slot - Crumb items (typically `rc-link` or spans)
 */
export class RcBreadcrumb extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      .source {
        display: none;
      }
      
      ol {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--rc-space-2);
        margin: 0;
        padding: 0;
        list-style: none;
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-caption-font-size);
      }
      
      li.crumb:last-of-type {
        color: var(--rc-color-text-primary);
        font-weight: var(--rc-typography-weight-medium);
      }
      
      li.sep {
        color: var(--rc-color-text-muted);
        user-select: none;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor separator: string = '/';

  #list: HTMLOListElement | null = null;

  override firstUpdated(): void {
    this.#list = this.renderRoot.querySelector('ol');
    this.#sync();
  }

  protected override updated(): void {
    this.#sync();
  }

  #sync() {
    if (!this.#list) return;
    const slot = this.renderRoot.querySelector('slot');
    const items = slot?.assignedElements({ flatten: true }) ?? [];
    this.#list.replaceChildren();
    items.forEach((item, index) => {
      const crumb = document.createElement('li');
      crumb.className = 'crumb';
      crumb.setAttribute('part', 'item crumb');
      crumb.append(item.cloneNode(true));
      this.#list!.append(crumb);
      if (index < items.length - 1) {
        const sep = document.createElement('li');
        sep.className = 'sep';
        sep.setAttribute('part', 'separator');
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = this.separator;
        this.#list!.append(sep);
      }
    });
  }

  override render() {
    return html`
      <nav part="container nav" aria-label="Breadcrumb">
        <div class="source" part="source">
          <slot @slotchange=${() => this.#sync()}></slot>
        </div>
        <ol part="list"></ol>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-breadcrumb': RcBreadcrumb;
  }
}
