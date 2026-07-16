/** Attributes that belong on the host only (API / layout), never the inner control. */
const DEFAULT_HOST_ONLY = new Set([
  'variant',
  'size',
  'loading',
  'class',
  'style',
  'id',
  'slot',
  'part',
  'exportparts',
]);

export type ForwardAttrsOptions = {
  /** Extra host-only attribute names. */
  hostOnly?: Iterable<string>;
  /**
   * Attribute names to always copy when present on the host.
   * `aria-*` / `data-*` / `title` are included by default via `isForwardable`.
   */
  include?: Iterable<string>;
};

const isForwardable = (name: string, include: Set<string>, hostOnly: Set<string>): boolean => {
  if (hostOnly.has(name)) return false;
  if (include.has(name)) return true;
  return name === 'title' || name.startsWith('aria-') || name.startsWith('data-');
};

/**
 * Copy selected attributes from a host custom element onto an inner control.
 * Call from `updated()` / `firstUpdated()` after the inner node exists.
 */
export const forwardAttributes = (
  host: HTMLElement,
  target: Element,
  options: ForwardAttrsOptions = {},
): void => {
  const hostOnly = new Set([...DEFAULT_HOST_ONLY, ...(options.hostOnly ?? [])]);
  const include = new Set(options.include ?? []);

  for (const name of target.getAttributeNames()) {
    if (isForwardable(name, include, hostOnly) && !host.hasAttribute(name)) {
      target.removeAttribute(name);
    }
  }

  for (const attr of host.attributes) {
    if (!isForwardable(attr.name, include, hostOnly)) continue;
    if (target.getAttribute(attr.name) !== attr.value) {
      target.setAttribute(attr.name, attr.value);
    }
  }
};
