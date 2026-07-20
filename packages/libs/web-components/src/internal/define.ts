import { isServer } from 'lit';

/**
 * Register a custom element once (safe under HMR / double import).
 * No-op during SSR — call freely from universal modules; defines only in the browser.
 */
export const defineElement = (tagName: string, ctor: CustomElementConstructor): void => {
  if (isServer || typeof customElements === 'undefined') return;
  if (!customElements.get(tagName)) {
    customElements.define(tagName, ctor);
  }
};
