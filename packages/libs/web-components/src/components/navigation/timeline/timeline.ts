import { LitElement, css, html } from 'lit';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Vertical event timeline.
 *
 * @element rds-timeline
 * @slot - `rds-timeline-item` children
 */
export class RdsTimeline extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  override render() {
    return html`
      <div role="list"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-timeline': RdsTimeline;
  }
}
