import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

export type RcProgressCircleSize = 'sm' | 'md' | 'lg';

/**
 * Circular progress. Omit `value` / set `indeterminate` for spinning state.
 *
 * @element rc-progress-circle
 */
export class RcProgressCircle extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      
      .root {
        position: relative;
        display: inline-grid;
        place-items: center;
      }
      
      :host([size='sm']) .root {
        width: var(--rc-space-8);
        height: var(--rc-space-8);
      }
      
      :host([size='md']) .root,
      :host(:not([size])) .root {
        width: var(--rc-space-10);
        height: var(--rc-space-10);
      }
      
      :host([size='lg']) .root {
        width: var(--rc-space-12);
        height: var(--rc-space-12);
      }
      
      svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
      }
      
      circle {
        fill: none;
        stroke-width: 3;
      }
      
      .track {
        stroke: var(--rc-color-border-subtle);
      }
      
      .bar {
        stroke: var(--rc-color-control-primary-bg);
        stroke-linecap: round;
        transition: stroke-dashoffset var(--rc-duration-fast) var(--rc-easing-standard);
      }
      
      :host([indeterminate]) .bar {
        animation: spin var(--rc-duration-slow, 0.8s) linear infinite;
        stroke-dasharray: 40 80;
      }
      
      .label {
        position: absolute;
        font-size: var(--rc-typography-caption-font-size);
        font-weight: var(--rc-typography-weight-medium);
      }
      
      @keyframes spin {
        to {
          transform: rotate(270deg);
        }
      }
    `,
  ];

  @property({ type: Number })
  accessor value: number = 0;

  @property({ type: Number, reflect: true })
  accessor max: number = 100;

  @property({ type: String, reflect: true })
  accessor size: RcProgressCircleSize = 'md';

  @property({ type: Boolean, reflect: true })
  accessor indeterminate: boolean = false;

  override render() {
    const r = 15;
    const c = 2 * Math.PI * r;
    const pct = this.indeterminate ? 0 : Math.min(1, Math.max(0, this.value / this.max));
    const offset = c * (1 - pct);

    return html`
      <div class="root" part="container root"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate ? nothing : this.value}
      >
        <svg viewBox="0 0 36 36" aria-hidden="true">
          <circle class="track" part="track" cx="18" cy="18" r=${r}></circle>
          <circle class="bar" part="bar"
            cx="18"
            cy="18"
            r=${r}
            stroke-dasharray=${c}
            stroke-dashoffset=${this.indeterminate ? nothing : offset}
          ></circle>
        </svg>
        ${this.indeterminate ? nothing : html`<span class="label" part="label">${Math.round(pct * 100)}%</span>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-progress-circle': RcProgressCircle;
  }
}
