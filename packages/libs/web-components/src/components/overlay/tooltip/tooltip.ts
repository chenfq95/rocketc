import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { nextId } from '../../../internal/a11y';
import { hostStyles } from '../../../internal/shared-styles';

export type RdsTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Hover / focus tooltip for a slotted trigger.
 *
 * @element rds-tooltip
 * @slot - Trigger content
 * @slot content - Tooltip text / content
 */
export class RdsTooltip extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        position: relative;
      }
      
      .tip {
        position: absolute;
        z-index: 60;
        display: none;
        max-width: 16rem;
        border-radius: var(--rds-radius-md);
        background: var(--rds-color-surface-inverse, var(--rds-color-text-primary));
        padding: var(--rds-space-1) var(--rds-space-2);
        color: var(--rds-color-common-white, #fff);
        font-size: var(--rds-typography-caption-font-size);
        line-height: var(--rds-typography-caption-line-height);
        pointer-events: none;
        white-space: nowrap;
      }
      
      :host([open]) .tip {
        display: block;
      }
      
      :host([placement='top']) .tip,
      :host(:not([placement])) .tip {
        bottom: calc(100% + var(--rds-space-2));
        left: 50%;
        translate: -50% 0;
      }
      
      :host([placement='bottom']) .tip {
        top: calc(100% + var(--rds-space-2));
        left: 50%;
        translate: -50% 0;
      }
      
      :host([placement='left']) .tip {
        right: calc(100% + var(--rds-space-2));
        top: 50%;
        translate: 0 -50%;
      }
      
      :host([placement='right']) .tip {
        left: calc(100% + var(--rds-space-2));
        top: 50%;
        translate: 0 -50%;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor content: string = '';

  @property({ type: String, reflect: true })
  accessor placement: RdsTooltipPlacement = 'top';

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false;

  #tipId = '';

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.#tipId) this.#tipId = nextId('rds-tooltip');
  }

  #show = () => {
    this.open = true;
  };

  #hide = () => {
    this.open = false;
  };

  override render() {
    return html`
      <span
        class="trigger"
        aria-describedby=${this.#tipId}
        @blur=${this.#hide}
        @focus=${this.#show}
        @mouseenter=${this.#show}
        @mouseleave=${this.#hide}
      >
        <slot></slot>
      </span>
      <span class="tip" id=${this.#tipId} role="tooltip">
        <slot name="content">${this.content}</slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-tooltip': RdsTooltip;
  }
}
