import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Form field grouping backed by native `<fieldset>` / `<legend>`.
 *
 * @element rds-fieldset
 * @slot - Fieldset content
 * @slot legend - Legend label
 */
export class RdsFieldset extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      fieldset {
        margin: 0;
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        border-radius: var(--rds-radius-lg);
        background: var(--rds-color-surface-panel);
        padding: var(--rds-space-4);
        min-inline-size: 0;
      }
      
      legend {
        padding: 0 var(--rds-space-1);
        color: var(--rds-color-text-primary);
        font-size: var(--rds-typography-label-font-size);
        font-weight: var(--rds-typography-weight-semibold);
        letter-spacing: var(--rds-typography-label-letter-spacing);
      }
      
      .content {
        display: grid;
        gap: var(--rds-space-3);
      }
      
      fieldset:disabled {
        opacity: var(--rds-opacity-disabled);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  @property({ type: String, reflect: true })
  accessor name: string = '';

  @property({ type: String, reflect: true })
  accessor form: string = '';

  override render() {
    return html`
      <fieldset
        ?disabled=${this.disabled}
        form=${this.form || nothing}
        name=${this.name || nothing}
      >
        <legend><slot name="legend"></slot></legend>
        <div class="content"><slot></slot></div>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-fieldset': RdsFieldset;
  }
}
