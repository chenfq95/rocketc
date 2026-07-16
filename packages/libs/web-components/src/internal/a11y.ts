import { css } from 'lit';

let idSeq = 0;

/** Generate a unique id for associating labels / aria references. */
export const nextId = (prefix = 'rds'): string => `${prefix}-${++idSeq}`;

/** Visually hide content while keeping it available to assistive tech. */
export const srOnlyStyles = css`
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
`;

/** Append a space-separated token to an attribute (e.g. aria-labelledby). */
export const addAttrToken = (el: Element, attr: string, token: string): void => {
  const tokens = el.getAttribute(attr)?.split(/\s+/).filter(Boolean) ?? [];
  if (tokens.includes(token)) return;
  el.setAttribute(attr, [...tokens, token].join(' '));
};

/** Remove a space-separated token from an attribute. */
export const removeAttrToken = (el: Element, attr: string, token: string): void => {
  const tokens = (el.getAttribute(attr)?.split(/\s+/).filter(Boolean) ?? []).filter(
    (item) => item !== token,
  );
  if (tokens.length > 0) {
    el.setAttribute(attr, tokens.join(' '));
  } else {
    el.removeAttribute(attr);
  }
};
