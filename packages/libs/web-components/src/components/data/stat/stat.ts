import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Metric / KPI tile.
 *
 * @element rc-stat
 * @slot - Optional footnote
 * @slot label - Metric label
 * @slot value - Metric value
 * @slot trend - Optional trend text
 */
export class RcStat extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      .root {
        display: grid;
        gap: var(--rc-space-1);
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-lg);
        background: var(--rc-color-surface-panel);
        padding: var(--rc-space-4);
      }
      
      .label {
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-caption-font-size);
        font-weight: var(--rc-typography-weight-medium);
      }
      
      .value {
        color: var(--rc-color-text-primary);
        font-size: var(--rc-typography-title-font-size, 1.5rem);
        font-weight: var(--rc-typography-weight-bold);
        line-height: var(--rc-typography-title-line-height, 1.2);
      }
      
      .trend {
        color: var(--rc-color-text-muted);
        font-size: var(--rc-typography-caption-font-size);
      }
      
      :host([trend='up']) .trend {
        color: var(--rc-color-success-fg);
      }
      
      :host([trend='down']) .trend {
        color: var(--rc-color-danger-fg);
      }
      
      .note {
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-body-small-font-size);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor trend: '' | 'up' | 'down' | 'neutral' = '';

  override render() {
    return html`
      <div class="root" part="container root">
        <div class="label" part="label"><slot name="label"></slot></div>
        <div class="value" part="value"><slot name="value"></slot></div>
        <div class="trend" part="trend"><slot name="trend"></slot></div>
        <div class="note" part="note"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-stat': RcStat;
  }
}
