const dispatchHooks = Symbol('dispatchHooks');

interface EventWithDispatchHooks extends Event {
  [dispatchHooks]: EventTarget;
}

const configuredEventTypes = new WeakMap<Element, Set<string>>();

/** 在事件完成传播后同步执行回调。 / Runs a callback synchronously after event propagation completes. */
export function afterDispatch(event: Event, callback: () => void): void {
  const hooks = (event as EventWithDispatchHooks)[dispatchHooks];
  if (!hooks) throw new Error(`'${event.type}' event needs setupDispatchHooks().`);
  hooks.addEventListener('after', callback, { once: true });
}

/** 为元素上的事件安装派发完成 hook。 / Installs after-dispatch hooks for events on an element. */
export function setupDispatchHooks(element: Element, ...eventTypes: string[]): void {
  let configured = configuredEventTypes.get(element);
  if (!configured) {
    configured = new Set();
    configuredEventTypes.set(element, configured);
  }

  for (const eventType of eventTypes) {
    if (configured.has(eventType)) continue;

    element.addEventListener(
      eventType,
      (event) => {
        const hooks = new EventTarget();
        (event as EventWithDispatchHooks)[dispatchHooks] = hooks;

        const cleanup = new AbortController();
        const finishDispatch = () => {
          cleanup.abort();
          hooks.dispatchEvent(new Event('after'));
        };
        const patchStopPropagation = (original: Event['stopPropagation']) =>
          function (this: Event): void {
            original.call(this);
            finishDispatch();
          };

        event.stopPropagation = patchStopPropagation(event.stopPropagation);
        event.stopImmediatePropagation = patchStopPropagation(event.stopImmediatePropagation);

        const path = event.composedPath();
        let lastTarget: EventTarget;
        if (event.composed && event.bubbles) {
          lastTarget = path[path.length - 1] ?? element;
        } else if (!event.bubbles) {
          lastTarget = path[0] ?? element;
        } else {
          lastTarget = (path[0] as Node | undefined)?.getRootNode() ?? element;
        }

        lastTarget.addEventListener(eventType, finishDispatch, {
          once: true,
          signal: cleanup.signal,
        });
      },
      { capture: true },
    );

    configured.add(eventType);
  }
}
