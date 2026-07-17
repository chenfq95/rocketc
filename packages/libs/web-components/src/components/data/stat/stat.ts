import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Metric / KPI tile.
 *
 * @element rds-stat
 * @slot - Optional footnote
 * @slot label - Metric label
 * @slot value - Metric value
 * @slot trend - Optional trend text
 */
export class RdsStat extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      .root {
        display: grid;
        gap: var(--rds-space-1);
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        border-radius: var(--rds-radius-lg);
        background: var(--rds-color-surface-panel);
        padding: var(--rds-space-4);
      }
      
      .label {
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-caption-font-size);
        font-weight: var(--rds-typography-weight-medium);
      }
      
      .value {
        color: var(--rds-color-text-primary);
        font-size: var(--rds-typography-title-font-size, 1.5rem);
        font-weight: var(--rds-typography-weight-bold);
        line-height: var(--rds-typography-title-line-height, 1.2);
      }
      
      .trend {
        color: var(--rds-color-text-muted);
        font-size: var(--rds-typography-caption-font-size);
      }
      
      :host([trend='up']) .trend {
        color: var(--rds-color-success-fg);
      }
      
      :host([trend='down']) .trend {
        color: var(--rds-color-danger-fg);
      }
      
      .note {
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-body-small-font-size);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor trend: '' | 'up' | 'down' | 'neutral' = '';

  override render() {
    return html`
      <div class="root">
        <div class="label"><slot name="label"></slot></div>
        <div class="value"><slot name="value"></slot></div>
        <div class="trend"><slot name="trend"></slot></div>
        <div class="note"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-stat': RdsStat;
  }
}
