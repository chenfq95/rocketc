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

export interface FormSubmitter {
  type: FormSubmitterType;
  value: string;
}

/**
 * 混入原生按钮式的表单提交和重置行为。
 * Mixes in native button-like form submission and reset behavior.
 */
export function mixinFormSubmitter<
  T extends Constructor<LitElement & FormAssociated & WithElementInternals>,
>(base: T): T & Constructor<FormSubmitter> {
  abstract class FormSubmitterElement extends base implements FormSubmitter {
    @property({ type: String, reflect: true })
    accessor type: FormSubmitterType = 'button';

    @property({ type: String, reflect: true })
    accessor value: string = '';

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
      if (!form || (type !== 'submit' && type !== 'reset')) return;

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
        form.requestSubmit();
      } finally {
        form.removeEventListener('submit', patchSubmitter, { capture: true });
        this[internals].setFormValue(this[getFormValue](), this[getFormState]());
      }
    }
  }

  return FormSubmitterElement as unknown as T & Constructor<FormSubmitter>;
}
