import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Form field grouping backed by native `<fieldset>` / `<legend>`.
 *
 * @element rc-fieldset
 * @slot - Fieldset content
 * @slot legend - Legend label
 */
export class RcFieldset extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      fieldset {
        margin: 0;
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-lg);
        background: var(--rc-color-surface-panel);
        padding: var(--rc-space-4);
        min-inline-size: 0;
      }
      
      legend {
        padding: 0 var(--rc-space-1);
        color: var(--rc-color-text-primary);
        font-size: var(--rc-typography-label-font-size);
        font-weight: var(--rc-typography-weight-semibold);
        letter-spacing: var(--rc-typography-label-letter-spacing);
      }
      
      .content {
        display: grid;
        gap: var(--rc-space-3);
      }
      
      fieldset:disabled {
        opacity: var(--rc-opacity-disabled);
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
        part="container fieldset"
        ?disabled=${this.disabled}
        form=${this.form || nothing}
        name=${this.name || nothing}
      >
        <legend part="label legend"><slot name="legend"></slot></legend>
        <div class="content" part="content"><slot></slot></div>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-fieldset': RcFieldset;
  }
}
