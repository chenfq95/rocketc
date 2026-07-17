import type { LitElement } from 'lit';

type Constructor<T> = abstract new (...args: any[]) => T;

/**
 * Protected access to an instance's `ElementInternals`.
 *
 * @example
 * ```ts
 * class MyElement extends mixinElementInternals(LitElement) {
 *   connectedCallback() {
 *     super.connectedCallback();
 *     this[internals].role = 'button';
 *   }
 * }
 * ```
 */
export const internals = Symbol('internals');

const privateInternals = Symbol('privateInternals');

export interface WithElementInternals {
  readonly [internals]: ElementInternals;
}

/**
 * Mixes in a lazily attached `ElementInternals` instance.
 */
export function mixinElementInternals<T extends Constructor<LitElement>>(
  base: T,
): T & Constructor<WithElementInternals> {
  abstract class WithElementInternalsElement extends base implements WithElementInternals {
    declare [privateInternals]?: ElementInternals;

    get [internals](): ElementInternals {
      if (!this[privateInternals]) {
        this[privateInternals] = this.attachInternals();
      }
      return this[privateInternals];
    }
  }

  return WithElementInternalsElement as unknown as T & Constructor<WithElementInternals>;
}
