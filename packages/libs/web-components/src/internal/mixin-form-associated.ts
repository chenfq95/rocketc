import { LitElement, type PropertyDeclaration } from 'lit';

import { internals, type WithElementInternals } from './mixin-element-internals';

type Constructor<T> = abstract new (...args: any[]) => T;

/** A value that can be provided for form submission and state. */
export type FormValue = File | string | FormData;

/**
 * A value to be restored for a component's form value. If a component's form
 * state is a `FormData` object, its entry list of name and values will be
 * provided.
 */
export type FormRestoreState = File | string | Array<[string, FormDataEntryValue]>;

/** Why a form component is being restored. */
export type FormRestoreReason = 'restore' | 'autocomplete';

/** Symbol property to retrieve the form value for an element. */
export const getFormValue = Symbol('getFormValue');

/** Symbol property to retrieve the form state for an element. */
export const getFormState = Symbol('getFormState');

export interface FormAssociated {
  readonly form: HTMLFormElement | null;
  readonly labels: NodeList;
  name: string;
  disabled: boolean;
  [getFormValue](): FormValue | null;
  [getFormState](): FormValue | null;
  formDisabledCallback(disabled: boolean): void;
  formResetCallback?(): void;
  formStateRestoreCallback?(state: FormRestoreState | null, reason: FormRestoreReason): void;
  formAssociatedCallback?(form: HTMLFormElement | null): void;
}

export interface FormAssociatedConstructor {
  readonly formAssociated: true;
}

/**
 * Mixes in form-associated behavior. The base class must use
 * `mixinElementInternals()`.
 *
 * Implementing classes should override `[getFormValue]` (and optionally
 * `[getFormState]`) plus reset / restore callbacks.
 *
 * @example
 * ```ts
 * const base = mixinFormAssociated(mixinElementInternals(LitElement));
 *
 * class MyInput extends base {
 *   value = '';
 *   override [getFormValue]() { return this.value; }
 *   override formResetCallback() {
 *     this.value = this.getAttribute('value') ?? '';
 *   }
 * }
 * ```
 */
export function mixinFormAssociated<T extends Constructor<LitElement & WithElementInternals>>(
  base: T,
): T & FormAssociatedConstructor & Constructor<FormAssociated> {
  abstract class FormAssociatedElement extends base implements FormAssociated {
    static readonly formAssociated = true;

    get form(): HTMLFormElement | null {
      return this[internals].form;
    }

    get labels(): NodeList {
      return this[internals].labels;
    }

    /**
     * Sync accessors so form APIs see attribute updates immediately (Lit's
     * default attribute reflection is async).
     */
    get name(): string {
      return this.getAttribute('name') ?? '';
    }
    set name(name: string) {
      this.setAttribute('name', name);
    }

    get disabled(): boolean {
      return this.hasAttribute('disabled');
    }
    set disabled(disabled: boolean) {
      this.toggleAttribute('disabled', Boolean(disabled));
    }

    static {
      // Ensure `name` / `disabled` participate in `observedAttributes`.
      const ctor = this as unknown as typeof LitElement;
      ctor.createProperty('name', { noAccessor: true });
      ctor.createProperty('disabled', {
        type: Boolean,
        noAccessor: true,
      });
    }

    override attributeChangedCallback(
      name: string,
      old: string | null,
      value: string | null,
    ): void {
      if (name === 'name' || name === 'disabled') {
        const oldValue = name === 'disabled' ? old !== null : old;
        this.requestUpdate(name, oldValue);
        return;
      }
      super.attributeChangedCallback(name, old, value);
    }

    override requestUpdate(
      name?: PropertyKey,
      oldValue?: unknown,
      options?: PropertyDeclaration,
    ): void {
      super.requestUpdate(name, oldValue, options);
      // Lit calls `requestUpdate()` inside the base constructor, before subclass
      // field initializers run. Defer that first sync so `[getFormValue]` can
      // safely read instance/private fields (e.g. `#files` on file-upload).
      if (!this.hasUpdated && name === undefined) {
        queueMicrotask(() => this.#syncFormValue());
        return;
      }
      this.#syncFormValue();
    }

    #syncFormValue(): void {
      this[internals].setFormValue(this[getFormValue](), this[getFormState]());
    }

    [getFormValue](): FormValue | null {
      return this.getAttribute('value');
    }

    [getFormState](): FormValue | null {
      return this[getFormValue]();
    }

    formDisabledCallback(disabled: boolean): void {
      this.disabled = disabled;
    }
  }

  return FormAssociatedElement as unknown as T &
    FormAssociatedConstructor &
    Constructor<FormAssociated>;
}
