let squelchingEvents = false;

/** 向内部控件派发不跨越 Shadow DOM 的激活点击。 / Dispatches an activation click that does not cross the shadow boundary. */
export function dispatchActivationClick(element: HTMLElement): MouseEvent {
  const event = new MouseEvent('click', { bubbles: true, cancelable: true });
  element.dispatchEvent(event);
  return event;
}

/** 判断 click 是否直接针对 host 的外部激活。 / Checks whether a click is an external activation directly targeting the host. */
export function isActivationClick(event: Event): boolean {
  if (event.currentTarget !== event.target || event.composedPath()[0] !== event.target) {
    return false;
  }
  if ((event.target as EventTarget & { disabled?: boolean }).disabled) return false;

  const squelched = squelchingEvents;
  if (squelched) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  squelchEventsForMicrotask();
  return !squelched;
}

async function squelchEventsForMicrotask(): Promise<void> {
  squelchingEvents = true;
  await null;
  squelchingEvents = false;
}
