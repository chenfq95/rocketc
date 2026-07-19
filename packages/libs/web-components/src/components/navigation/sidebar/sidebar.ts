import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * App sidebar / navigation rail shell.
 *
 * @element rc-sidebar
 * @slot - Navigation content
 * @slot header - Brand / title region
 * @slot footer - Footer actions
 */
export class RcSidebar extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--rc-space-3);
        width: var(--rc-sidebar-width, 16rem);
        min-height: 100%;
        border-right: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        background: var(--rc-color-surface-panel);
        padding: var(--rc-space-4);
        color: var(--rc-color-text-primary);
        transition: width var(--rc-duration-fast, 150ms) var(--rc-easing-standard, ease);
      }
      
      :host([collapsed]) {
        width: var(--rc-sidebar-collapsed-width, 4.5rem);
        padding-inline: var(--rc-space-2);
      }
      
      .header,
      .footer {
        display: grid;
        gap: var(--rc-space-2);
      }
      
      .body {
        display: grid;
        gap: var(--rc-space-1);
        flex: 1;
        align-content: start;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor collapsed: boolean = false;

  override render() {
    return html`
      <aside class="root" part="container aside control root" aria-expanded=${String(!this.collapsed)}>
        <div class="header" part="header"><slot name="header"></slot></div>
        <div class="body" part="body"><slot></slot></div>
        <div class="footer" part="footer"><slot name="footer"></slot></div>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-sidebar': RcSidebar;
  }
}
