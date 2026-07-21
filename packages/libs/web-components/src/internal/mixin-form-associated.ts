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

/** 表单控件自身或表单上下文导致的有效禁用状态。 / Effective disabled state from the control or its form context. */
export const formDisabled = Symbol('formDisabled');

/** 表单控件当前是否参与约束校验的可选 hook。 / Optional hook that determines whether the form control participates in constraint validation. */
export const formValidationCandidate = Symbol('formValidationCandidate');

export interface FormAssociated {
  readonly form: HTMLFormElement | null;
  readonly labels: NodeList;
  readonly [formDisabled]: boolean;
  [formValidationCandidate]?(): boolean;
  readonly validity: ValidityState;
  readonly validationMessage: string;
  readonly willValidate: boolean;
  name: string;
  disabled: boolean;
  [getFormValue](): FormValue | null;
  [getFormState](): FormValue | null;
  checkValidity(): boolean;
  reportValidity(): boolean;
  setCustomValidity(error: string): void;
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

    declare [formValidationCandidate]?: () => boolean;

    #formDisabled = false;
    #customValidationMessage = '';

    get form(): HTMLFormElement | null {
      return this[internals].form;
    }

    get labels(): NodeList {
      return this[internals].labels;
    }

    get [formDisabled](): boolean {
      return this.disabled || this.#formDisabled;
    }

    get validity(): ValidityState {
      if (!this.#isValidationCandidate() && this.#customValidationMessage) {
        return {
          badInput: false,
          customError: true,
          patternMismatch: false,
          rangeOverflow: false,
          rangeUnderflow: false,
          stepMismatch: false,
          tooLong: false,
          tooShort: false,
          typeMismatch: false,
          valid: false,
          valueMissing: false,
        };
      }
      return this[internals].validity;
    }

    get validationMessage(): string {
      return this.#isValidationCandidate() ? this[internals].validationMessage : '';
    }

    get willValidate(): boolean {
      return this.#isValidationCandidate() && this[internals].willValidate;
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
      if (this.#customValidationMessage) this.#syncCustomValidity();
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

    checkValidity(): boolean {
      return !this.#isValidationCandidate() || this[internals].checkValidity();
    }

    reportValidity(): boolean {
      return !this.#isValidationCandidate() || this[internals].reportValidity();
    }

    setCustomValidity(error: string): void {
      this.#customValidationMessage = String(error);
      this.#syncCustomValidity();
    }

    #syncCustomValidity(): void {
      if (this.#isValidationCandidate() && this.#customValidationMessage) {
        this[internals].setValidity({ customError: true }, this.#customValidationMessage);
        return;
      }
      this[internals].setValidity({});
    }

    #isValidationCandidate(): boolean {
      return this[formValidationCandidate]?.() ?? true;
    }

    formDisabledCallback(disabled: boolean): void {
      this.#formDisabled = disabled;
      this.requestUpdate();
    }
  }

  return FormAssociatedElement as unknown as T &
    FormAssociatedConstructor &
    Constructor<FormAssociated>;
}
