import { LitElement, css, html } from 'lit';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Empty-state placeholder for lists / pages with no data.
 *
 * @element rds-empty
 * @slot - Description
 * @slot title - Title text
 * @slot action - Optional CTA
 * @slot icon - Optional illustration / icon
 */
export class RdsEmpty extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: grid;
        place-items: center;
        text-align: center;
      }
      
      .root {
        display: grid;
        gap: var(--rds-space-3);
        justify-items: center;
        max-width: 24rem;
        padding: var(--rds-space-8) var(--rds-space-4);
        color: var(--rds-color-text-secondary);
      }
      
      .icon {
        display: grid;
        place-items: center;
        width: var(--rds-space-12, 3rem);
        height: var(--rds-space-12, 3rem);
        border-radius: var(--rds-radius-full);
        background: var(--rds-color-action-bg-hover);
        color: var(--rds-color-text-muted);
        font-size: var(--rds-typography-title-font-size, 1.25rem);
      }
      
      .title {
        margin: 0;
        color: var(--rds-color-text-primary);
        font-size: var(--rds-typography-heading-font-size, var(--rds-typography-body-font-size));
        font-weight: var(--rds-typography-weight-semibold);
      }
      
      .body {
        font-size: var(--rds-typography-body-small-font-size);
      }
    `,
  ];

  override render() {
    return html`
      <div class="root">
        <div class="icon"><slot name="icon">∅</slot></div>
        <h3 class="title"><slot name="title">Nothing here</slot></h3>
        <div class="body"><slot></slot></div>
        <slot name="action"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-empty': RdsEmpty;
  }
}
