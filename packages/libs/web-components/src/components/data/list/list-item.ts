import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Row inside `rds-list`.
 *
 * @element rds-list-item
 * @slot - Primary content
 * @slot prefix - Leading media / icon
 * @slot suffix - Trailing meta / action
 * @slot description - Secondary text
 */
export class RdsListItem extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      .root {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: var(--rds-space-3);
        align-items: center;
        padding: var(--rds-space-3) var(--rds-space-4);
        border-bottom: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        color: var(--rds-color-text-primary);
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
        gap: var(--rds-space-1);
      }
      
      .description {
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-body-small-font-size);
      }
      
      :host([interactive]) .root {
        cursor: pointer;
      }
      
      :host([interactive]) .root:hover {
        background: var(--rds-color-action-bg-hover);
      }
      
      :host([disabled]) .root {
        cursor: not-allowed;
        opacity: var(--rds-opacity-disabled);
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
        <button
          class="root"
          role="listitem"
          type="button"
          ?disabled=${this.disabled}
          @click=${this.#onClick}
        >
          <slot name="prefix"></slot>
          <div class="copy">
            <slot></slot>
            <div class="description"><slot name="description"></slot></div>
          </div>
          <slot name="suffix"></slot>
        </button>
      `;
    }

    return html`
      <div class="root" role="listitem">
        <slot name="prefix"></slot>
        <div class="copy">
          <slot></slot>
          <div class="description"><slot name="description"></slot></div>
        </div>
        <slot name="suffix"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-list-item': RdsListItem;
  }
}
