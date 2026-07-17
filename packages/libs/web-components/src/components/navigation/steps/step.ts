import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Step used inside `rds-steps`.
 *
 * @element rds-step
 * @slot - Step title
 * @slot description - Optional description
 */
export class RdsStep extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--rds-space-2);
        align-items: start;
        min-width: 0;
      }
      
      .indicator {
        display: grid;
        place-items: center;
        width: var(--rds-space-7);
        height: var(--rds-space-7);
        border-radius: var(--rds-radius-full);
        border: var(--rds-border-sm) solid var(--rds-color-border-default);
        background: var(--rds-color-surface-panel);
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-caption-font-size);
        font-weight: var(--rds-typography-weight-semibold);
      }
      
      :host([state='active']) .indicator {
        border-color: var(--rds-color-control-primary-border);
        background: var(--rds-color-control-primary-bg);
        color: var(--rds-color-control-primary-fg-contrast);
      }
      
      :host([state='complete']) .indicator {
        border-color: var(--rds-color-success-solid, var(--rds-color-control-primary-border));
        background: var(--rds-color-success-solid, var(--rds-color-control-primary-bg));
        color: var(--rds-color-success-contrast, var(--rds-color-control-primary-fg-contrast));
      }
      
      .title {
        font-size: var(--rds-typography-label-font-size);
        font-weight: var(--rds-typography-weight-medium);
      }
      
      .description {
        color: var(--rds-color-text-muted);
        font-size: var(--rds-typography-caption-font-size);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor value: string = '';

  @property({ type: Number, reflect: true })
  accessor index: number = 0;

  @property({ type: String, reflect: true })
  accessor state: 'incomplete' | 'active' | 'complete' = 'incomplete';

  override render() {
    const mark = this.state === 'complete' ? '✓' : String(this.index + 1);
    return html`
      <div class="indicator" aria-hidden="true">${mark}</div>
      <div>
        <div class="title"><slot></slot></div>
        <div class="description"><slot name="description"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-step': RdsStep;
  }
}
