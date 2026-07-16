/** Register a custom element once (safe under HMR / double import). */
export const defineElement = (tagName: string, ctor: CustomElementConstructor): void => {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, ctor);
  }
};
