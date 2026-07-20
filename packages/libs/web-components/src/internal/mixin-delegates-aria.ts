import { LitElement, isServer, noChange } from 'lit';
import { Directive, directive, type ElementPart } from 'lit/directive.js';

type Constructor<T> = abstract new (...args: any[]) => T;

/**
 * Accessibility Object Model reflective aria property names.
 * IDREF properties (`ariaLabelledBy`, `ariaControls`, …) are intentionally
 * omitted — copying them into Shadow DOM breaks ID resolution (same tradeoff
 * as Material Web's aria delegation).
 */
export type ARIAProperty = keyof ARIAMixin;

/** `ariaLabel` → `aria-label`; `role` → `role` */
export function ariaPropertyToAttribute(property: ARIAProperty): string {
  return property
    .replace('aria', 'aria-')
    .replace(/Elements?/g, '')
    .toLowerCase();
}

export const ARIA_PROPERTIES: ARIAProperty[] = [
  'role',
  'ariaAtomic',
  'ariaAutoComplete',
  'ariaBusy',
  'ariaChecked',
  'ariaColCount',
  'ariaColIndex',
  'ariaColSpan',
  'ariaCurrent',
  'ariaDisabled',
  'ariaExpanded',
  'ariaHasPopup',
  'ariaHidden',
  'ariaInvalid',
  'ariaKeyShortcuts',
  'ariaLabel',
  'ariaLevel',
  'ariaLive',
  'ariaModal',
  'ariaMultiLine',
  'ariaMultiSelectable',
  'ariaOrientation',
  'ariaPlaceholder',
  'ariaPosInSet',
  'ariaPressed',
  'ariaReadOnly',
  'ariaRequired',
  'ariaRoleDescription',
  'ariaRowCount',
  'ariaRowIndex',
  'ariaRowSpan',
  'ariaSelected',
  'ariaSetSize',
  'ariaSort',
  'ariaValueMax',
  'ariaValueMin',
  'ariaValueNow',
  'ariaValueText',
];

export type ARIAAttribute = string;

export const ARIA_ATTRIBUTES: string[] = ARIA_PROPERTIES.map(ariaPropertyToAttribute);

export function isAriaAttribute(attribute: string): boolean {
  return ARIA_ATTRIBUTES.includes(attribute);
}

/**
 * Cast helper for Lit templates when binding delegated ARIA onto the inner
 * control (`this as ARIAMixinStrict`).
 */
export type ARIAMixinStrict = ARIAMixin;

/** Optional per-property overrides applied while forwarding delegated ARIA. */
export type AriaDelegateOverrides = Partial<Record<ARIAProperty, string | null>>;

const ignoreAttributeChangesFor = Symbol('ignoreAttributeChangesFor');

class DelegateAriaDirective extends Directive {
  #previous = new Map<string, string | null>();

  render(_host: ARIAMixinStrict, _overrides?: AriaDelegateOverrides) {
    return noChange;
  }

  update(part: ElementPart, [host, overrides]: [ARIAMixinStrict, AriaDelegateOverrides?]) {
    const el = part.element;
    if (!(el instanceof Element)) return noChange;

    for (const property of ARIA_PROPERTIES) {
      const attribute = ariaPropertyToAttribute(property);
      const raw =
        overrides && Object.hasOwn(overrides, property) ? overrides[property] : host[property];
      const next = raw == null || raw === '' ? null : String(raw);
      if (this.#previous.get(attribute) === next) continue;
      this.#previous.set(attribute, next);
      if (next === null) el.removeAttribute(attribute);
      else el.setAttribute(attribute, next);
    }

    return noChange;
  }
}

/**
 * Forward every delegated ARIA property from a `mixinDelegatesAria` host onto
 * an inner element (`<button>`, `<rc-icon-button>`, …).
 *
 * @example
 * ```ts
 * html`<button ${delegateAria(this as ARIAMixinStrict)}></button>`
 * html`<rc-icon-button ${delegateAria(this as ARIAMixinStrict, { ariaLabel: 'Close' })}></rc-icon-button>`
 * ```
 */
export const delegateAria = directive(DelegateAriaDirective);

/**
 * Delegate ARIA from the host onto an inner Shadow DOM control.
 *
 * Host `aria-*` / `role` are shifted to `data-aria-*` / `data-role` so the host
 * stays out of the accessibility tree with duplicate semantics. Components
 * should forward values with `${delegateAria(this as ARIAMixinStrict)}`.
 *
 * Does not support IDREF attributes (`aria-labelledby`, `aria-controls`, …).
 * Those should remain on the host (see `rc-label`).
 *
 * Uses `observedAttributes` + `attributeChangedCallback` (via Lit
 * `createProperty`) instead of a MutationObserver.
 *
 * Inspired by Material Web's `mixinDelegatesAria`.
 */
export function mixinDelegatesAria<T extends Constructor<LitElement>>(base: T): T {
  if (isServer) {
    return base;
  }

  abstract class WithDelegatesAria extends base {
    [ignoreAttributeChangesFor] = new Set<string>();

    override attributeChangedCallback(
      name: string,
      oldValue: string | null,
      newValue: string | null,
    ): void {
      if (!isAriaAttribute(name)) {
        super.attributeChangedCallback(name, oldValue, newValue);
        return;
      }

      if (this[ignoreAttributeChangesFor].has(name)) {
        return;
      }

      this[ignoreAttributeChangesFor].add(name);
      this.removeAttribute(name);
      this[ignoreAttributeChangesFor].delete(name);

      const dataProperty = ariaAttributeToDataProperty(name);
      if (newValue === null) {
        delete this.dataset[dataProperty];
      } else {
        this.dataset[dataProperty] = newValue;
      }

      this.requestUpdate(dataProperty, oldValue);
    }

    override getAttribute(name: string): string | null {
      if (isAriaAttribute(name)) {
        return super.getAttribute(ariaAttributeToDataAttribute(name));
      }
      return super.getAttribute(name);
    }

    override removeAttribute(name: string): void {
      super.removeAttribute(name);
      if (isAriaAttribute(name)) {
        super.removeAttribute(ariaAttributeToDataAttribute(name));
        this.requestUpdate();
      }
    }
  }

  setupDelegatesAriaProperties(WithDelegatesAria as unknown as typeof LitElement);

  return WithDelegatesAria as unknown as T;
}

function setupDelegatesAriaProperties(ctor: typeof LitElement): void {
  for (const ariaProperty of ARIA_PROPERTIES) {
    const ariaAttribute = ariaPropertyToAttribute(ariaProperty);
    const dataAttribute = ariaAttributeToDataAttribute(ariaAttribute);
    const dataProperty = ariaAttributeToDataProperty(ariaAttribute);

    ctor.createProperty(ariaProperty, {
      attribute: ariaAttribute,
      noAccessor: true,
    });
    ctor.createProperty(Symbol(dataAttribute), {
      attribute: dataAttribute,
      noAccessor: true,
    });

    Object.defineProperty(ctor.prototype, ariaProperty, {
      configurable: true,
      enumerable: true,
      get(this: LitElement): string | null {
        return this.dataset[dataProperty] ?? null;
      },
      set(this: LitElement, value: string | null): void {
        const prevValue = this.dataset[dataProperty] ?? null;
        if (value === prevValue) return;

        if (value === null) {
          delete this.dataset[dataProperty];
        } else {
          this.dataset[dataProperty] = value;
        }

        this.requestUpdate(ariaProperty as ARIAProperty, prevValue);
      },
    });
  }
}

function ariaAttributeToDataAttribute(ariaAttribute: string): string {
  return `data-${ariaAttribute}`;
}

/** `aria-haspopup` → `ariaHaspopup` (dataset key). */
function ariaAttributeToDataProperty(ariaAttribute: string): string {
  return ariaAttribute.replace(/-\w/, (dashLetter) => dashLetter[1]!.toUpperCase());
}
