import { css, html } from 'lit';
import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Vertical event timeline.
 *
 * @element rc-timeline
 * @slot - `rc-timeline-item` children
 */
export class RcTimeline extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  override render() {
    return html`
      <div part="container list" role="list"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-timeline': RcTimeline;
  }
}
