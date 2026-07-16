import type { ReactiveController, ReactiveControllerHost } from 'lit';

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

/** Common `on*` hooks patched eagerly (no full `for…in` scan). */
const COMMON_ON_EVENTS = [
  'click',
  'focus',
  'blur',
  'focusin',
  'focusout',
  'input',
  'change',
  'keydown',
  'keyup',
  'pointerdown',
  'pointerup',
  'mousedown',
  'mouseup',
  'touchstart',
  'touchend',
] as const;

export type ControlRelayAttrsOptions = {
  /** Extra host-only attribute names. */
  hostOnly?: Iterable<string>;
  /**
   * Attribute names to always copy when present on the host.
   * `aria-*` / `data-*` / `title` are included by default.
   */
  include?: Iterable<string>;
};

export type ControlRelayOptions = {
  /** Resolve the inner control to relay. Called after each host update. */
  target: () => Element | null | undefined;
  /** Attribute relay options (`aria-*` / `data-*` / `title` by default). */
  attrs?: ControlRelayAttrsOptions;
  /**
   * Event types allowed to be relayed.
   * Defaults to `'*'` (any type the consumer subscribes to).
   * Pass an explicit list to limit, or `[]` to disable event relay.
   *
   * Inner listeners are bound lazily when the host gains interest via
   * `addEventListener` or an `on*` property setter.
   */
  events?: Iterable<string> | '*';
};

type Host = ReactiveControllerHost & HTMLElement;
type OnHandler = ((this: GlobalEventHandlers, event: Event) => unknown) | null;

const isOnce = (options?: boolean | AddEventListenerOptions): boolean =>
  typeof options === 'object' && !!options?.once;

const invokeListener = (
  listener: EventListenerOrEventListenerObject,
  event: Event,
  target: EventTarget,
): void => {
  if (typeof listener === 'function') {
    listener.call(target, event);
  } else {
    listener.handleEvent(event);
  }
};

/**
 * Relay between a Lit host and an inner native control:
 * host attributes → inner node; inner events → host (composed), on demand.
 *
 * Register explicitly from the component:
 * `this.addController(new ControlRelayController(this, options))`.
 */
export class ControlRelayController implements ReactiveController {
  readonly #host: Host;
  readonly #targetOf: () => Element | null | undefined;
  readonly #hostOnly: ReadonlySet<string>;
  readonly #include: ReadonlySet<string>;
  readonly #events: ReadonlySet<string> | '*';

  readonly #origAdd: typeof EventTarget.prototype.addEventListener;
  readonly #origRemove: typeof EventTarget.prototype.removeEventListener;

  #target: Element | null = null;
  #attrObserver?: MutationObserver;
  #pendingAttrNames = new Set<string>();
  #attrFlushScheduled = false;
  /** Attribute names this controller has copied onto the current target. */
  #relayedAttrs = new Set<string>();
  /** Host-side subscription counts per event type. */
  #interest = new Map<string, number>();
  /** Event types currently bound on the inner target. */
  #boundTypes = new Set<string>();
  /** Shared inner → host re-dispatch listener. */
  readonly #onInnerEvent: EventListener = (event) => {
    this.#redispatch(event);
  };
  /** `once` wrappers keyed by the consumer's original listener. */
  #onceWrappers = new WeakMap<EventListenerOrEventListenerObject, EventListener>();
  #patchedOnTypes = new Set<string>();

  constructor(host: Host, options: ControlRelayOptions) {
    this.#host = host;
    this.#targetOf = options.target;
    const attrs = options.attrs ?? {};
    this.#hostOnly = new Set([...DEFAULT_HOST_ONLY, ...(attrs.hostOnly ?? [])]);
    this.#include = new Set(attrs.include ?? []);
    const { events } = options;
    this.#events = events === undefined || events === '*' ? '*' : new Set(events);

    this.#origAdd = host.addEventListener.bind(host);
    this.#origRemove = host.removeEventListener.bind(host);
    this.#patchEventTargetApi();
    for (const type of COMMON_ON_EVENTS) {
      this.#patchOnProperty(type);
    }
  }

  hostConnected(): void {
    this.#attrObserver ??= new MutationObserver((records) => {
      this.#onHostAttrsMutated(records);
    });
    this.#attrObserver.observe(this.#host, { attributes: true });
    this.#sync();
  }

  hostDisconnected(): void {
    this.#attrObserver?.disconnect();
    this.#pendingAttrNames.clear();
    this.#attrFlushScheduled = false;
    this.#unbindAllInner();
    this.#relayedAttrs.clear();
    this.#target = null;
  }

  hostUpdated(): void {
    this.#sync();
  }

  #isForwardable(name: string): boolean {
    if (this.#hostOnly.has(name)) return false;
    if (this.#include.has(name)) return true;
    return name === 'title' || name.startsWith('aria-') || name.startsWith('data-');
  }

  #patchEventTargetApi(): void {
    const host = this.#host;

    host.addEventListener = ((
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: boolean | AddEventListenerOptions,
    ) => {
      if (!listener) return;

      this.#patchOnProperty(type);

      let tracked: EventListenerOrEventListenerObject = listener;
      if (isOnce(options)) {
        const wrapper: EventListener = (event) => {
          this.#onceWrappers.delete(listener);
          this.#release(type);
          invokeListener(listener, event, host);
        };
        this.#onceWrappers.set(listener, wrapper);
        tracked = wrapper;
      }

      this.#origAdd(type, tracked, options);
      this.#retain(type);
    }) as typeof host.addEventListener;

    host.removeEventListener = ((
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: boolean | EventListenerOptions,
    ) => {
      if (!listener) return;

      const tracked = this.#onceWrappers.get(listener) ?? listener;
      this.#onceWrappers.delete(listener);
      this.#origRemove(type, tracked, options);
      this.#release(type);
    }) as typeof host.removeEventListener;
  }

  #patchOnProperty(type: string): void {
    if (this.#patchedOnTypes.has(type)) return;

    const name = `on${type}`;
    const descriptor = this.#lookupOnDescriptor(name);
    if (!descriptor?.get || !descriptor?.set) return;

    this.#patchedOnTypes.add(type);
    const host = this.#host;
    const { get, set } = descriptor;

    Object.defineProperty(host, name, {
      configurable: true,
      enumerable: true,
      get() {
        return get.call(this);
      },
      set: (value: OnHandler) => {
        const prev = get.call(host) as OnHandler;
        set.call(host, value);
        if (!prev && value) this.#retain(type);
        else if (prev && !value) this.#release(type);
      },
    });
  }

  #lookupOnDescriptor(name: string): PropertyDescriptor | undefined {
    let proto: object | null = Object.getPrototypeOf(this.#host);
    while (proto) {
      const descriptor = Object.getOwnPropertyDescriptor(proto, name);
      if (descriptor) return descriptor;
      proto = Object.getPrototypeOf(proto);
    }
    return undefined;
  }

  #isAllowed(type: string): boolean {
    return this.#events === '*' || this.#events.has(type);
  }

  #retain(type: string): void {
    if (!this.#isAllowed(type)) return;
    const next = (this.#interest.get(type) ?? 0) + 1;
    this.#interest.set(type, next);
    if (next === 1) this.#bindInner(type);
  }

  #release(type: string): void {
    if (!this.#isAllowed(type)) return;
    const prev = this.#interest.get(type) ?? 0;
    if (prev <= 1) {
      this.#interest.delete(type);
      this.#unbindInner(type);
      return;
    }
    this.#interest.set(type, prev - 1);
  }

  #sync(): void {
    const next = this.#targetOf() ?? null;
    if (next === this.#target) return;

    this.#unbindAllInner();
    this.#relayedAttrs.clear();
    this.#target = next;
    if (next) {
      for (const type of this.#interest.keys()) {
        this.#bindInner(type);
      }
      this.#syncAllHostAttrs();
    }
  }

  /** Full pass over host attributes when the inner target is (re)attached. */
  #syncAllHostAttrs(): void {
    if (!this.#target) return;
    for (const attr of this.#host.attributes) {
      if (!this.#isForwardable(attr.name)) continue;
      this.#writeRelayedAttr(attr.name, attr.value);
    }
  }

  #onHostAttrsMutated(records: MutationRecord[]): void {
    for (const record of records) {
      const name = record.attributeName;
      if (!name || !this.#isForwardable(name)) continue;
      this.#pendingAttrNames.add(name);
    }
    if (this.#pendingAttrNames.size === 0 || this.#attrFlushScheduled) return;
    this.#attrFlushScheduled = true;
    queueMicrotask(() => this.#flushPendingAttrs());
  }

  #flushPendingAttrs(): void {
    this.#attrFlushScheduled = false;
    if (!this.#target) {
      this.#pendingAttrNames.clear();
      return;
    }
    for (const name of this.#pendingAttrNames) {
      this.#relayAttr(name);
    }
    this.#pendingAttrNames.clear();
  }

  #relayAttr(name: string): void {
    if (!this.#target) return;
    if (this.#host.hasAttribute(name)) {
      this.#writeRelayedAttr(name, this.#host.getAttribute(name) ?? '');
      return;
    }
    if (this.#relayedAttrs.has(name)) {
      this.#target.removeAttribute(name);
      this.#relayedAttrs.delete(name);
    }
  }

  #writeRelayedAttr(name: string, value: string): void {
    if (!this.#target) return;
    if (this.#target.getAttribute(name) !== value) {
      this.#target.setAttribute(name, value);
    }
    this.#relayedAttrs.add(name);
  }

  #bindInner(type: string): void {
    if (!this.#target || this.#boundTypes.has(type)) return;
    this.#boundTypes.add(type);
    this.#target.addEventListener(type, this.#onInnerEvent);
  }

  #unbindInner(type: string): void {
    if (!this.#boundTypes.has(type)) return;
    this.#target?.removeEventListener(type, this.#onInnerEvent);
    this.#boundTypes.delete(type);
  }

  #unbindAllInner(): void {
    for (const type of [...this.#boundTypes]) {
      this.#unbindInner(type);
    }
  }

  #redispatch(event: Event): void {
    // Prevent the composed native event from also surfacing on the host.
    event.stopPropagation();

    if (event instanceof CustomEvent) {
      this.#host.dispatchEvent(
        new CustomEvent(event.type, {
          detail: event.detail,
          bubbles: true,
          composed: true,
          cancelable: event.cancelable,
        }),
      );
      return;
    }

    this.#host.dispatchEvent(
      new Event(event.type, {
        bubbles: true,
        composed: true,
        cancelable: event.cancelable,
      }),
    );
  }
}
