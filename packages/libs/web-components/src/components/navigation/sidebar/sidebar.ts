import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * App sidebar / navigation rail shell.
 *
 * @element rds-sidebar
 * @slot - Navigation content
 * @slot header - Brand / title region
 * @slot footer - Footer actions
 */
export class RdsSidebar extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--rds-space-3);
        width: var(--rds-sidebar-width, 16rem);
        min-height: 100%;
        border-right: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        background: var(--rds-color-surface-panel);
        padding: var(--rds-space-4);
        color: var(--rds-color-text-primary);
        transition: width var(--rds-duration-fast, 150ms) var(--rds-easing-standard, ease);
      }
      
      :host([collapsed]) {
        width: var(--rds-sidebar-collapsed-width, 4.5rem);
        padding-inline: var(--rds-space-2);
      }
      
      .header,
      .footer {
        display: grid;
        gap: var(--rds-space-2);
      }
      
      .body {
        display: grid;
        gap: var(--rds-space-1);
        flex: 1;
        align-content: start;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor collapsed: boolean = false;

  override render() {
    return html`
      <aside class="root" aria-expanded=${String(!this.collapsed)}>
        <div class="header"><slot name="header"></slot></div>
        <div class="body"><slot></slot></div>
        <div class="footer"><slot name="footer"></slot></div>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-sidebar': RdsSidebar;
  }
}
