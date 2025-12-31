import { type KeyCode } from './key-codes';
import { ShortcutRegistry } from './shortcut-registry';

const shortRegistry = new ShortcutRegistry({ debug: true });

let dispose: () => void;
beforeEach(() => {
  dispose = shortRegistry.attachElement(window);
});

afterEach(() => {
  dispose();
});

describe('registerShortcut', () => {
  it('simple single key shortcut', () => {
    const a = jest.fn();
    let result = false;
    result = shortRegistry.registerShortcut('a', a);
    expect(result).toBe(true);
    dispatchEvent('keydown', 'KeyA');
    expect(a).toHaveBeenCalledTimes(1);
  });

  it('simple compose shortcut', () => {
    const ctrla = jest.fn();
    let result = false;
    result = shortRegistry.registerShortcut('Ctrl+a', ctrla);
    expect(result).toBe(true);
    dispatchEvent('keydown', 'ControlLeft');
    dispatchEvent('keydown', 'KeyA');
    expect(ctrla).toHaveBeenCalledTimes(1);
  });

  it('repeat key press', () => {
    const ctrla = jest.fn();
    let result = false;
    result = shortRegistry.registerShortcut('Ctrl+a+a', ctrla);
    expect(result).toBe(false);
    dispatchEvent('keydown', 'ControlLeft');
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyA');
    expect(ctrla).toHaveBeenCalledTimes(0);
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyA', true);
    expect(ctrla).toHaveBeenCalledTimes(0);
    dispatchEvent('keydown', 'KeyA');
    expect(ctrla).toHaveBeenCalledTimes(0);
  });

  it('register invalid shortcut', () => {
    const ctrla = jest.fn();
    let result = false;
    result = shortRegistry.registerShortcut('Ctrl+a+', ctrla);
    expect(result).toBe(false);
    dispatchEvent('keydown', 'ControlLeft');
    dispatchEvent('keydown', 'KeyA');
    expect(ctrla).toHaveBeenCalledTimes(0);
  });

  it('shortcut conflict', () => {
    const ctrla = jest.fn();
    let result = false;
    result = shortRegistry.registerShortcut('Ctrl+a', ctrla);
    expect(result).toBe(true);
    result = shortRegistry.registerShortcut('Ctrl+a', ctrla);
    expect(result).toBe(false);
    result = shortRegistry.registerShortcut('Control+a', ctrla);
    expect(result).toBe(false);
    dispatchEvent('keydown', 'ControlLeft');
    dispatchEvent('keydown', 'KeyA');
    expect(ctrla).toHaveBeenCalledTimes(1);
    result = shortRegistry.registerShortcut('Ctrl+b+c+d', ctrla);
    expect(result).toBe(false);
    result = shortRegistry.registerShortcut('Ctrl+c+d', ctrla);
    expect(result).toBe(false);
    result = shortRegistry.registerShortcut('Ctrl+b+c', ctrla);
    expect(result).toBe(false);
  });

  it('complex compose shortcut', () => {
    const ctrlabcd = jest.fn();
    let result = false;
    result = shortRegistry.registerShortcut('Option+a+b+c+d', ctrlabcd);
    expect(result).toBe(false);
    dispatchEvent('keydown', 'AltLeft');
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyB');
    dispatchEvent('keydown', 'KeyC');
    dispatchEvent('keydown', 'KeyD');
    expect(ctrlabcd).toHaveBeenCalledTimes(0);

    const ctrlaaa = jest.fn();
    result = shortRegistry.registerShortcut('Option+a+a+a', ctrlaaa);
    expect(result).toBe(false);
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyA');
    expect(ctrlaaa).toHaveBeenCalledTimes(0);
  });
});

describe('unregisterShortcut', () => {
  it('simple single key shortcut', () => {
    const a = jest.fn();
    let result = false;
    result = shortRegistry.registerShortcut('a', a);
    expect(result).toBe(true);
    dispatchEvent('keydown', 'KeyA');
    expect(a).toHaveBeenCalledTimes(1);
    result = shortRegistry.unregisterShortcut('a');
    expect(result).toBe(true);
    dispatchEvent('keydown', 'KeyA');
    expect(a).toHaveBeenCalledTimes(1);
  });
  it('simple compose shortcut', () => {
    const ctrla = jest.fn();
    let result = false;
    result = shortRegistry.registerShortcut('Ctrl+a', ctrla);
    expect(result).toBe(true);
    dispatchEvent('keydown', 'ControlLeft');
    dispatchEvent('keydown', 'KeyA');
    expect(ctrla).toHaveBeenCalledTimes(1);
    result = shortRegistry.unregisterShortcut('Ctrl+a');
    expect(result).toBe(true);
    dispatchEvent('keydown', 'KeyA');
    expect(ctrla).toHaveBeenCalledTimes(1);
  });

  it('repeat key press', () => {
    const ctrlaa = jest.fn();
    let result = false;
    result = shortRegistry.registerShortcut('Ctrl+a+a', ctrlaa);
    expect(result).toBe(false);
    dispatchEvent('keydown', 'ControlLeft');
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyA');
    expect(ctrlaa).toHaveBeenCalledTimes(0);
    result = shortRegistry.unregisterShortcut('Ctrl+a+a');
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyA');
    expect(ctrlaa).toHaveBeenCalledTimes(0);
  });

  it('complex compose shortcut', () => {
    const altabcd = jest.fn();
    let result = false;
    result = shortRegistry.registerShortcut('Option+a+b+c+d', altabcd);
    expect(result).toBe(false);
    dispatchEvent('keydown', 'AltLeft');
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyB');
    dispatchEvent('keydown', 'KeyC');
    dispatchEvent('keydown', 'KeyD');
    expect(altabcd).toHaveBeenCalledTimes(0);
    result = shortRegistry.unregisterShortcut('Option+a+b+c+d');
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyB');
    dispatchEvent('keydown', 'KeyC');
    dispatchEvent('keydown', 'KeyD');
    expect(altabcd).toHaveBeenCalledTimes(0);

    const altaaa = jest.fn();
    result = shortRegistry.registerShortcut('Option+a+a+a', altaaa);
    expect(result).toBe(false);
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyA');
    expect(altaaa).toHaveBeenCalledTimes(0);
    result = shortRegistry.unregisterShortcut('Option+a+a+a');
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyA');
    expect(altaaa).toHaveBeenCalledTimes(0);
  });

  it('unregister shortcut which is not exist or invalid', () => {
    let result = shortRegistry.unregisterShortcut('Ctrl+a');
    expect(result).toBe(false);
    result = shortRegistry.unregisterShortcut('ctrl+a');
    expect(result).toBe(false);
  });
});

describe('enableShortcut and disableShortcut', () => {
  it('return false when shortcut has not registered yet or accelerator is invalid', () => {
    let result = true;
    result = shortRegistry.enableShortcut('Ctrl+a');
    expect(result).toBe(false);
    result = shortRegistry.disableShortcut('Ctrl+a');
    expect(result).toBe(false);
    result = shortRegistry.enableShortcut('ctrl+a');
    expect(result).toBe(false);
    result = shortRegistry.disableShortcut('ctrl+a');
    expect(result).toBe(false);
  });

  it('handle should not be invoked while shortcut is disabled', () => {
    const handler = jest.fn();
    let result = false;
    result = shortRegistry.registerShortcut('Ctrl+a', handler);
    expect(result).toBe(true);
    dispatchEvent('keydown', 'ControlLeft');
    dispatchEvent('keydown', 'KeyA');
    expect(handler).toHaveBeenCalledTimes(1);
    result = shortRegistry.disableShortcut('Control+a');
    expect(result).toBe(true);
    dispatchEvent('keydown', 'KeyA');
    expect(handler).toHaveBeenCalledTimes(1);
    result = shortRegistry.enableShortcut('Control+a');
    expect(result).toBe(true);
    dispatchEvent('keydown', 'KeyA');
    expect(handler).toHaveBeenCalledTimes(2);
  });
});

describe('isShortcutRegistered', () => {
  it('return true when shortcut registered', () => {
    shortRegistry.registerShortcut('Ctrl+Alt+a', jest.fn());
    expect(shortRegistry.isShortcutRegistered('Ctrl+Alt+a')).toBe(true);
    expect(shortRegistry.isShortcutRegistered('Ctrl+Option+a')).toBe(true);
    expect(shortRegistry.isShortcutRegistered('Control+Option+a')).toBe(true);
    expect(shortRegistry.isShortcutRegistered('ControlLeft+Option+a')).toBe(
      true,
    );
  });

  it('return false when shortcut unregistered', () => {
    expect(shortRegistry.isShortcutRegistered('Ctrl+Alt+a')).toBe(false);
    expect(shortRegistry.isShortcutRegistered('Ctrl+Option+a')).toBe(false);
    expect(shortRegistry.isShortcutRegistered('Control+Option+a')).toBe(false);
    expect(shortRegistry.isShortcutRegistered('ControlLeft+Option+a')).toBe(
      false,
    );
  });

  it('return false when shortcut accelerator is invalid', () => {
    expect(shortRegistry.isShortcutRegistered('Ctrl+alt+a')).toBe(false);
    expect(shortRegistry.isShortcutRegistered('Ctrl+option+a')).toBe(false);
    expect(shortRegistry.isShortcutRegistered('Control+Option+a+')).toBe(false);
    expect(
      shortRegistry.isShortcutRegistered('ControlLeft+Option+a+Control'),
    ).toBe(false);
  });
});

describe('getCurrentKeyPressed', () => {
  it('simple compose key pressed', () => {
    dispatchEvent('keydown', 'ControlLeft');
    dispatchEvent('keydown', 'AltLeft');
    dispatchEvent('keydown', 'KeyA');
    expect(shortRegistry.getCurrentKeyPressed()).toMatchInlineSnapshot(
      '"ControlLeft+AltLeft+a"',
    );
    dispatchEvent('keyup', 'ControlLeft');
    expect(shortRegistry.getCurrentKeyPressed()).toMatchInlineSnapshot(
      '"AltLeft"',
    );
    dispatchEvent('keydown', 'AltRight');
    expect(shortRegistry.getCurrentKeyPressed()).toMatchInlineSnapshot(
      '"AltLeft+AltRight"',
    );
  });

  it('complex compose key', () => {
    dispatchEvent('keydown', 'ControlLeft');
    dispatchEvent('keydown', 'AltLeft');
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyA', true);
    expect(shortRegistry.getCurrentKeyPressed()).toMatchInlineSnapshot(
      '"ControlLeft+AltLeft+a"',
    );
    dispatchEvent('keydown', 'KeyA');
    expect(shortRegistry.getCurrentKeyPressed()).toMatchInlineSnapshot(
      '"ControlLeft+AltLeft+a+a"',
    );
  });
});

describe('loose mode', () => {
  const shortRegistry = new ShortcutRegistry({ strict: false, debug: true });

  let dispose: () => void;
  beforeEach(() => {
    dispose = shortRegistry.attachElement(window);
  });

  afterEach(() => {
    dispose();
  });

  it('simple compose key pressed', () => {
    dispatchEvent('keydown', 'ControlLeft');
    dispatchEvent('keydown', 'AltLeft');
    dispatchEvent('keydown', 'KeyA');
    expect(shortRegistry.getCurrentKeyPressed()).toMatchInlineSnapshot(
      '"Ctrl+Alt+a"',
    );
    dispatchEvent('keyup', 'ControlLeft');
    expect(shortRegistry.getCurrentKeyPressed()).toMatchInlineSnapshot('"Alt"');
    dispatchEvent('keydown', 'AltRight');
    expect(shortRegistry.getCurrentKeyPressed()).toMatchInlineSnapshot('"Alt"');
  });

  it('complex compose key', () => {
    dispatchEvent('keydown', 'ControlLeft');
    dispatchEvent('keydown', 'AltLeft');
    dispatchEvent('keydown', 'KeyA');
    dispatchEvent('keydown', 'KeyA', true);
    expect(shortRegistry.getCurrentKeyPressed()).toMatchInlineSnapshot(
      '"Ctrl+Alt+a"',
    );
  });
});

describe('onKeyup and onKeydown', () => {
  it('onKeydown', () => {
    const listener = jest.fn();
    const dispose = shortRegistry.onKeydown(listener);
    dispatchEvent('keydown', 'KeyA');
    expect(listener).toHaveBeenCalledTimes(1);
    dispatchEvent('keydown', 'KeyA', true);
    expect(listener).toHaveBeenCalledTimes(1);
    dispatchEvent('keydown', 'KeyA');
    expect(listener).toHaveBeenCalledTimes(2);
    dispose();
    dispatchEvent('keydown', 'KeyA');
    expect(listener).toHaveBeenCalledTimes(2);
  });
  it('onKeyup', () => {
    const listener = jest.fn();
    const dispose = shortRegistry.onKeyup(listener);
    dispatchEvent('keyup', 'KeyA');
    expect(listener).toHaveBeenCalledTimes(1);
    dispatchEvent('keyup', 'KeyA');
    expect(listener).toHaveBeenCalledTimes(2);
    dispatchEvent('keyup', 'KeyA');
    expect(listener).toHaveBeenCalledTimes(3);
    dispose();
    dispatchEvent('keyup', 'KeyA');
    expect(listener).toHaveBeenCalledTimes(3);
  });
});

function dispatchEvent(
  type: 'keydown' | 'keyup' | 'blur',
  code: KeyCode,
  repeat: boolean = false,
  ele: Window | HTMLElement = window,
) {
  ele.dispatchEvent(new window.KeyboardEvent(type, { code, repeat }));
}
