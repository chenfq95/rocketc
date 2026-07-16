/** Register a custom element once (safe under HMR / double import). Used by `register.ts`. */
export const defineElement = (tagName: string, ctor: CustomElementConstructor): void => {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, ctor);
  }
};
