import { LitElement, css, html } from 'lit';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Surface container for grouped content.
 *
 * @element rds-card
 * @slot - Card body
 * @slot header - Optional header region
 * @slot footer - Optional footer region
 */
export class RdsCard extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        height: 100%;
        box-sizing: border-box;
      }
      
      .root {
        display: grid;
        align-content: start;
        gap: var(--rds-space-3);
        box-sizing: border-box;
        height: 100%;
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        border-radius: var(--rds-radius-xl);
        background: var(--rds-color-surface-panel);
        padding: var(--rds-space-4, 1rem);
        box-shadow: var(--rds-shadow-surface);
        color: var(--rds-color-text-primary);
      }
      
      ::slotted([slot='header']) {
        display: grid;
        gap: var(--rds-space-1);
      }
      
      ::slotted([slot='footer']) {
        display: grid;
        gap: var(--rds-space-1);
        padding-top: var(--rds-space-1);
        border-top: var(--rds-border-sm) solid var(--rds-color-border-subtle);
      }
    `,
  ];

  override render() {
    return html`
      <div class="root">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-card': RdsCard;
  }
}
