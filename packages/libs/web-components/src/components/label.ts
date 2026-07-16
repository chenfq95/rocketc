import { LitElement, css, html } from 'lit';

import { defineElement } from '../internal/define';
import { hostStyles } from '../internal/shared-styles';

/**
 * Form label typography role.
 *
 * @element rds-label
 * @slot - Label text
 */
export class RdsLabel extends LitElement {
  static override properties = {
    for: { type: String, reflect: true },
  };

  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-block;
      }
      
      label {
        display: inline-block;
        color: var(--rds-color-text-primary);
        font-size: var(--rds-typography-label-font-size);
        font-weight: var(--rds-typography-weight-medium);
        letter-spacing: var(--rds-typography-label-letter-spacing);
        line-height: var(--rds-typography-label-line-height);
      }
    `,
  ];

  declare for: string;

  constructor() {
    super();
    this.for = '';
  }

  override render() {
    return html`<label for=${this.for}><slot></slot></label>`;
  }
}

defineElement('rds-label', RdsLabel);

declare global {
  interface HTMLElementTagNameMap {
    'rds-label': RdsLabel;
  }
}
