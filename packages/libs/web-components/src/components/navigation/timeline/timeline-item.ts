import { css, html } from 'lit';
import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Event row used inside `rc-timeline`.
 *
 * @element rc-timeline-item
 * @slot - Description / body
 * @slot title - Event title
 */
export class RcTimelineItem extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--rc-space-3);
        position: relative;
        padding-bottom: var(--rc-space-4);
      }
      
      :host::before {
        content: '';
        position: absolute;
        left: 0.4rem;
        top: var(--rc-space-4);
        bottom: 0;
        width: 1px;
        background: var(--rc-color-border-subtle);
      }
      
      :host(:last-child)::before {
        display: none;
      }
      
      .dot {
        width: 0.85rem;
        height: 0.85rem;
        margin-top: 0.2rem;
        border-radius: var(--rc-radius-full);
        background: var(--rc-color-control-primary-bg);
        box-shadow: 0 0 0 3px var(--rc-color-surface-panel);
      }
      
      .title {
        font-size: var(--rc-typography-label-font-size);
        font-weight: var(--rc-typography-weight-medium);
      }
      
      .body {
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-body-small-font-size);
      }
    `,
  ];

  override render() {
    return html`
      <div class="dot" part="dot" aria-hidden="true"></div>
      <div part="content">
        <div class="title" part="title"><slot name="title"></slot></div>
        <div class="body" part="body"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-timeline-item': RcTimelineItem;
  }
}
