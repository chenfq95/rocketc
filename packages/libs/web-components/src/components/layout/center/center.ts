import { LitElement, css, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Centers children on both axes (Chakra-style `Center`).
 *
 * @element rds-center
 * @slot - Centered content
 */
export class RdsCenter extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 0;
        min-height: var(--_min-height, auto);
      }
      
      :host([inline]) {
        display: inline-flex;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor inline: boolean = false;

  @property({ type: String, attribute: 'min-height', reflect: true })
  accessor minHeight: string = '';

  protected override updated(_changed: PropertyValues<this>): void {
    if (this.minHeight) {
      this.style.setProperty('--_min-height', this.minHeight);
    } else {
      this.style.removeProperty('--_min-height');
    }
  }

  override render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-center': RdsCenter;
  }
}
