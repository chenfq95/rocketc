import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Breadcrumb trail. Place crumb nodes as light-DOM children.
 *
 * @element rds-breadcrumb
 * @slot - Crumb items (typically `rds-link` or spans)
 */
export class RdsBreadcrumb extends LitElement {
  static override styles = [
    hostStyles,
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
        gap: var(--rds-space-2);
        margin: 0;
        padding: 0;
        list-style: none;
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-caption-font-size);
      }
      
      li.crumb:last-of-type {
        color: var(--rds-color-text-primary);
        font-weight: var(--rds-typography-weight-medium);
      }
      
      li.sep {
        color: var(--rds-color-text-muted);
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
      crumb.append(item.cloneNode(true));
      this.#list!.append(crumb);
      if (index < items.length - 1) {
        const sep = document.createElement('li');
        sep.className = 'sep';
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = this.separator;
        this.#list!.append(sep);
      }
    });
  }

  override render() {
    return html`
      <nav aria-label="Breadcrumb">
        <div class="source">
          <slot @slotchange=${() => this.#sync()}></slot>
        </div>
        <ol></ol>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-breadcrumb': RdsBreadcrumb;
  }
}
