import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Progress indicator backed by native `<progress>`.
 * Omit `value` (or set `indeterminate`) for an indeterminate bar.
 *
 * @element rc-progress
 */
export class RcProgress extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      progress {
        display: block;
        width: 100%;
        height: var(--rc-space-2);
        border: 0;
        border-radius: var(--rc-radius-full);
        overflow: hidden;
        accent-color: var(--rc-color-control-primary-bg);
        background: var(--rc-color-border-subtle);
      }
      
      progress::-webkit-progress-bar {
        background: var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-full);
      }
      
      progress::-webkit-progress-value {
        background: var(--rc-color-control-primary-bg);
        border-radius: var(--rc-radius-full);
      }
      
      progress::-moz-progress-bar {
        background: var(--rc-color-control-primary-bg);
        border-radius: var(--rc-radius-full);
      }
    `,
  ];

  @property({ type: Number })
  accessor value: number = 0;

  @property({ type: Number, reflect: true })
  accessor max: number = 100;

  @property({ type: Boolean, reflect: true })
  accessor indeterminate: boolean = false;

  override render() {
    const hasValue = !this.indeterminate && !Number.isNaN(this.value);

    return html`
      <progress part="control"
        max=${this.max}
        value=${hasValue ? this.value : nothing}
        aria-valuemax=${this.max}
        aria-valuemin=${0}
        aria-valuenow=${hasValue ? this.value : nothing}
      ></progress>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-progress': RcProgress;
  }
}
