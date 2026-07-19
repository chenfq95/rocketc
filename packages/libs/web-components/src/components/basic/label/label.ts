import { css, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { addAttrToken, nextId, removeAttrToken } from '../../../internal/a11y';

/**
 * Form label. Use `for` to point at a light-DOM control id (e.g. `rc-input`).
 *
 * Native `<label for>` cannot see across this component's Shadow root, so
 * association is done via click-to-focus and `aria-labelledby` on the target
 * host. That IDREF stays on the host (not delegated into Shadow DOM).
 *
 * @element rc-label
 * @slot - Label text
 */
export class RcLabel extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: inline-block;
      }
      
      label {
        display: inline-block;
        color: var(--rc-color-text-primary);
        font-size: var(--rc-typography-label-font-size);
        font-weight: var(--rc-typography-weight-medium);
        letter-spacing: var(--rc-typography-label-letter-spacing);
        line-height: var(--rc-typography-label-line-height);
        cursor: default;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor for: string = '';

  #labelled: Element | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.id) this.id = nextId('rc-label');
    this.#syncAssociation();
    // Target may mount in the same frame after this label.
    requestAnimationFrame(() => this.#syncAssociation());
  }

  override disconnectedCallback(): void {
    this.#clearAssociation();
    super.disconnectedCallback();
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has('for')) this.#syncAssociation();
  }

  #resolveControl(): Element | null {
    if (!this.for) return null;
    const root = this.getRootNode();
    const scope = root instanceof Document || root instanceof ShadowRoot ? root : document;
    return scope.getElementById(this.for);
  }

  #clearAssociation(): void {
    if (!this.#labelled || !this.id) {
      this.#labelled = null;
      return;
    }
    removeAttrToken(this.#labelled, 'aria-labelledby', this.id);
    this.#labelled = null;
  }

  #syncAssociation(): void {
    const control = this.#resolveControl();
    if (control === this.#labelled) return;
    this.#clearAssociation();
    if (!control || !this.id) return;
    addAttrToken(control, 'aria-labelledby', this.id);
    this.#labelled = control;
  }

  #onClick(event: Event): void {
    if (!this.for) return;
    this.#syncAssociation();
    const control = this.#resolveControl();
    if (!control) return;
    // Ignore clicks that originated on the control itself (wrapped usage).
    if (event.composedPath().includes(control)) return;
    if (typeof (control as HTMLElement).focus === 'function') {
      (control as HTMLElement).focus();
    }
  }

  override render() {
    return html`
      <label part="container label" @click=${this.#onClick}>
        <slot></slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-label': RcLabel;
  }
}
