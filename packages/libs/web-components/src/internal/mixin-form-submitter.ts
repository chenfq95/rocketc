import { isServer, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { afterDispatch, setupDispatchHooks } from './dispatch-hooks';
import { internals, type WithElementInternals } from './mixin-element-internals';
import {
  formDisabled,
  getFormState,
  getFormValue,
  type FormAssociated,
} from './mixin-form-associated';

type Constructor<T> = abstract new (...args: any[]) => T;

export type FormSubmitterType = 'button' | 'submit' | 'reset';

/** 控制当前元素是否执行表单提交默认行为的可选 hook。 / Optional hook controlling whether the element performs form-submitter default actions. */
export const formSubmitterCandidate = Symbol('formSubmitterCandidate');

export interface FormSubmitter {
  type: FormSubmitterType;
  value: string;
  formAction: string;
  formEnctype: string;
  formMethod: string;
  formNoValidate: boolean;
  formTarget: string;
  [formSubmitterCandidate]?(): boolean;
}

/**
 * 混入原生按钮式的表单提交和重置行为。
 * Mixes in native button-like form submission and reset behavior.
 */
export function mixinFormSubmitter<
  T extends Constructor<LitElement & FormAssociated & WithElementInternals>,
>(base: T): T & Constructor<FormSubmitter> {
  abstract class FormSubmitterElement extends base implements FormSubmitter {
    declare [formSubmitterCandidate]?: () => boolean;

    @property({ type: String, reflect: true })
    accessor type: FormSubmitterType = 'button';

    @property({ type: String, reflect: true })
    accessor value: string = '';

    @property({ type: String, attribute: 'formaction', reflect: true })
    accessor formAction: string = '';

    @property({ type: String, attribute: 'formenctype', reflect: true })
    accessor formEnctype: string = '';

    @property({ type: String, attribute: 'formmethod', reflect: true })
    accessor formMethod: string = '';

    @property({ type: Boolean, attribute: 'formnovalidate', reflect: true })
    accessor formNoValidate: boolean = false;

    @property({ type: String, attribute: 'formtarget', reflect: true })
    accessor formTarget: string = '';

    constructor(...args: any[]) {
      super(...args);
      if (isServer) return;
      setupDispatchHooks(this, 'click');
      this.addEventListener('click', this.#handleClick);
    }

    override [getFormValue](): null {
      return null;
    }

    #handleClick = (event: MouseEvent): void => {
      const form = this.form;
      const type = this.type;
      if (
        !form ||
        this[formSubmitterCandidate]?.() === false ||
        (type !== 'submit' && type !== 'reset')
      ) {
        return;
      }

      afterDispatch(event, () => {
        if (event.defaultPrevented || this[formDisabled]) return;

        if (type === 'reset') {
          form.reset();
          return;
        }

        this.#submit(form);
      });
    };

    #submit(form: HTMLFormElement): void {
      const patchSubmitter = (event: SubmitEvent) => {
        Object.defineProperty(event, 'submitter', {
          configurable: true,
          enumerable: true,
          get: () => this,
        });
      };

      form.addEventListener('submit', patchSubmitter, { capture: true, once: true });
      this[internals].setFormValue(this.name ? this.value : null);

      try {
        this.#withFormOverrides(form, () => form.requestSubmit());
      } finally {
        form.removeEventListener('submit', patchSubmitter, { capture: true });
        this[internals].setFormValue(this[getFormValue](), this[getFormState]());
      }
    }

    #withFormOverrides(form: HTMLFormElement, callback: () => void): void {
      const overrides = new Map<string, string>();
      if (this.formAction) overrides.set('action', this.formAction);
      if (this.formEnctype) overrides.set('enctype', this.formEnctype);
      if (this.formMethod) overrides.set('method', this.formMethod);
      if (this.formTarget) overrides.set('target', this.formTarget);
      if (this.formNoValidate) overrides.set('novalidate', '');

      const originalAttributes = new Map<string, string | null>();
      for (const [attribute, value] of overrides) {
        originalAttributes.set(attribute, form.getAttribute(attribute));
        form.setAttribute(attribute, value);
      }

      try {
        callback();
      } finally {
        for (const [attribute, value] of originalAttributes) {
          if (value === null) form.removeAttribute(attribute);
          else form.setAttribute(attribute, value);
        }
      }
    }
  }

  return FormSubmitterElement as unknown as T & Constructor<FormSubmitter>;
}
