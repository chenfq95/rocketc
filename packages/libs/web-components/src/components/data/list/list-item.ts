import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Row inside `rc-list`.
 *
 * @element rc-list-item
 * @slot - Primary content
 * @slot prefix - Leading media / icon
 * @slot suffix - Trailing meta / action
 * @slot description - Secondary text
 */
export class RcListItem extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      .root {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: var(--rc-space-3);
        align-items: center;
        padding: var(--rc-space-3) var(--rc-space-4);
        border-bottom: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        color: var(--rc-color-text-primary);
        background: transparent;
        width: 100%;
        margin: 0;
        border-left: 0;
        border-right: 0;
        border-top: 0;
        font: inherit;
        text-align: start;
      }
      
      :host(:last-child) .root {
        border-bottom: 0;
      }
      
      .copy {
        display: grid;
        gap: var(--rc-space-1);
      }
      
      .description {
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-body-small-font-size);
      }
      
      :host([interactive]) .root {
        cursor: pointer;
      }
      
      :host([interactive]) .root:hover {
        background: var(--rc-color-action-bg-hover);
      }
      
      :host([disabled]) .root {
        cursor: not-allowed;
        opacity: var(--rc-opacity-disabled);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor interactive: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  #onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  override render() {
    if (this.interactive) {
      return html`
        <button class="root" part="control root"
          role="listitem"
          type="button"
          ?disabled=${this.disabled}
          @click=${this.#onClick}
        >
          <slot name="prefix"></slot>
          <div class="copy" part="copy">
            <slot></slot>
            <div class="description" part="description"><slot name="description"></slot></div>
          </div>
          <slot name="suffix"></slot>
        </button>
      `;
    }

    return html`
      <div class="root" part="container root" role="listitem">
        <slot name="prefix"></slot>
        <div class="copy" part="copy">
          <slot></slot>
          <div class="description" part="description"><slot name="description"></slot></div>
        </div>
        <slot name="suffix"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-list-item': RcListItem;
  }
}
