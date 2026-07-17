import { LitElement, css, html } from 'lit';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Event row used inside `rds-timeline`.
 *
 * @element rds-timeline-item
 * @slot - Description / body
 * @slot title - Event title
 */
export class RdsTimelineItem extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--rds-space-3);
        position: relative;
        padding-bottom: var(--rds-space-4);
      }
      
      :host::before {
        content: '';
        position: absolute;
        left: 0.4rem;
        top: var(--rds-space-4);
        bottom: 0;
        width: 1px;
        background: var(--rds-color-border-subtle);
      }
      
      :host(:last-child)::before {
        display: none;
      }
      
      .dot {
        width: 0.85rem;
        height: 0.85rem;
        margin-top: 0.2rem;
        border-radius: var(--rds-radius-full);
        background: var(--rds-color-control-primary-bg);
        box-shadow: 0 0 0 3px var(--rds-color-surface-panel);
      }
      
      .title {
        font-size: var(--rds-typography-label-font-size);
        font-weight: var(--rds-typography-weight-medium);
      }
      
      .body {
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-body-small-font-size);
      }
    `,
  ];

  override render() {
    return html`
      <div class="dot" aria-hidden="true"></div>
      <div>
        <div class="title"><slot name="title"></slot></div>
        <div class="body"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-timeline-item': RdsTimelineItem;
  }
}
