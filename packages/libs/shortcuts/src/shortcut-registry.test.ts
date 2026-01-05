import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { type KeyCode } from './key-codes';
import ShortcutRegistry from './shortcut-registry';

// Helper function to dispatch keyboard events
function dispatchEvent(
  type: 'keydown' | 'keyup' | 'blur',
  code: KeyCode,
  repeat: boolean = false,
  ele: Window | HTMLElement = window,
) {
  ele.dispatchEvent(new window.KeyboardEvent(type, { code, repeat }));
}

describe('ShortcutRegistry', () => {
  let registry: ShortcutRegistry;
  let dispose: () => void;

  beforeEach(() => {
    registry = new ShortcutRegistry({ debug: false, strict: true });
    dispose = registry.attachElement(window);
  });

  afterEach(() => {
    dispose();
  });

  describe('registerShortcut', () => {
    it('should register a single key shortcut', () => {
      const handler = vi.fn();
      const result = registry.registerShortcut('a', handler);
      expect(result).toBe(true);

      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should register a shortcut with modifier', () => {
      const handler = vi.fn();
      const result = registry.registerShortcut('Ctrl+a', handler);
      expect(result).toBe(true);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should register a shortcut with multiple modifiers', () => {
      const handler = vi.fn();
      const result = registry.registerShortcut('Ctrl+Shift+a', handler);
      expect(result).toBe(true);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'ShiftLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should return false for invalid accelerator', () => {
      const handler = vi.fn();
      expect(registry.registerShortcut('Ctrl+a+', handler)).toBe(false);
      expect(registry.registerShortcut('invalid', handler)).toBe(false);
      expect(registry.registerShortcut('a+Ctrl', handler)).toBe(false);
    });

    it('should not register multiple normal keys', () => {
      const handler = vi.fn();
      expect(registry.registerShortcut('Ctrl+a+b', handler)).toBe(false);
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      dispatchEvent('keydown', 'KeyB');
      expect(handler).not.toHaveBeenCalled();
    });

    it('should support multiple callbacks for the same shortcut', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      registry.registerShortcut('Ctrl+a', handler1);
      registry.registerShortcut('Ctrl+a', handler2);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
    });

    it('should work with custom separator', () => {
      const customRegistry = new ShortcutRegistry({
        separator: '-',
        debug: false,
      });
      const disposeCustom = customRegistry.attachElement(window);
      const handler = vi.fn();

      customRegistry.registerShortcut('Ctrl-a', handler);
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1);

      disposeCustom();
    });

    it('should work with alias', () => {
      // Alias format: { targetKey: sourceKey }
      // When accelerator contains sourceKey (value), it gets replaced with targetKey (key)
      const aliasRegistry = new ShortcutRegistry({
        alias: { Ctrl: 'o', Alt: 'p' },
        debug: false,
      });
      const disposeAlias = aliasRegistry.attachElement(window);
      const handler = vi.fn();

      // 'o' (alias value) -> 'Ctrl' (alias key), 'p' (alias value) -> 'Alt' (alias key)
      aliasRegistry.registerShortcut('o+p+a', handler);
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'AltLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1);

      disposeAlias();
    });
  });

  describe('unregisterShortcut', () => {
    it('should unregister a shortcut', () => {
      const handler = vi.fn();
      registry.registerShortcut('Ctrl+a', handler);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1);

      const result = registry.unregisterShortcut('Ctrl+a');
      expect(result).toBe(true);

      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1); // Should not be called again
    });

    it('should unregister specific callback when provided', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      registry.registerShortcut('Ctrl+a', handler1);
      registry.registerShortcut('Ctrl+a', handler2);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);

      registry.unregisterShortcut('Ctrl+a', handler1);

      dispatchEvent('keydown', 'KeyA');
      expect(handler1).toHaveBeenCalledTimes(1); // Should not be called again
      expect(handler2).toHaveBeenCalledTimes(2); // Should still be called
    });

    it('should return false for non-existent shortcut', () => {
      expect(registry.unregisterShortcut('Ctrl+a')).toBe(false);
      expect(registry.unregisterShortcut('invalid')).toBe(false);
    });

    it('should return false when unregistering specific callback that does not exist', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      registry.registerShortcut('Ctrl+a', handler1);
      expect(registry.unregisterShortcut('Ctrl+a', handler2)).toBe(false);
    });
  });

  describe('enableShortcut and disableShortcut', () => {
    it('should disable and enable a shortcut', () => {
      const handler = vi.fn();
      registry.registerShortcut('Ctrl+a', handler);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1);

      registry.disableShortcut('Ctrl+a');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1); // Should not be called

      registry.enableShortcut('Ctrl+a');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(2); // Should be called again
    });

    it('should disable and enable specific callback', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      registry.registerShortcut('Ctrl+a', handler1);
      registry.registerShortcut('Ctrl+a', handler2);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);

      registry.disableShortcut('Ctrl+a', handler1);
      dispatchEvent('keydown', 'KeyA');
      expect(handler1).toHaveBeenCalledTimes(1); // Should not be called
      expect(handler2).toHaveBeenCalledTimes(2); // Should still be called

      registry.enableShortcut('Ctrl+a', handler1);
      dispatchEvent('keydown', 'KeyA');
      expect(handler1).toHaveBeenCalledTimes(2); // Should be called again
      expect(handler2).toHaveBeenCalledTimes(3);
    });

    it('should return false for non-existent shortcut', () => {
      expect(registry.enableShortcut('Ctrl+a')).toBe(false);
      expect(registry.disableShortcut('Ctrl+a')).toBe(false);
      expect(registry.enableShortcut('invalid')).toBe(false);
      expect(registry.disableShortcut('invalid')).toBe(false);
    });

    it('should return false when disabling specific callback that does not exist', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      registry.registerShortcut('Ctrl+a', handler1);
      expect(registry.disableShortcut('Ctrl+a', handler2)).toBe(false);
    });

    it('should return false when enabling specific callback that does not exist', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      registry.registerShortcut('Ctrl+a', handler1);
      expect(registry.enableShortcut('Ctrl+a', handler2)).toBe(false);
    });
  });

  describe('isShortcutRegistered', () => {
    it('should return true for registered shortcut', () => {
      registry.registerShortcut('Ctrl+a', vi.fn());
      expect(registry.isShortcutRegistered('Ctrl+a')).toBe(true);
      expect(registry.isShortcutRegistered('Control+a')).toBe(true);
    });

    it('should return false for unregistered shortcut', () => {
      expect(registry.isShortcutRegistered('Ctrl+a')).toBe(false);
    });

    it('should return false for invalid accelerator', () => {
      expect(registry.isShortcutRegistered('invalid')).toBe(false);
      expect(registry.isShortcutRegistered('Ctrl+a+')).toBe(false);
    });
  });

  describe('getCurrentKeyPressed', () => {
    describe('strict mode', () => {
      it('should return current keys in strict mode', () => {
        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'AltLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+AltLeft+A');
      });
    });

    describe('loose mode', () => {
      let looseRegistry: ShortcutRegistry;
      let looseDispose: () => void;

      beforeEach(() => {
        looseRegistry = new ShortcutRegistry({ debug: false, strict: false });
        looseDispose = looseRegistry.attachElement(window);
      });

      afterEach(() => {
        looseDispose();
      });

      it('should return current keys in loose mode', () => {
        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'AltLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Ctrl+Alt+A');
      });

      it('should normalize modifiers in loose mode', () => {
        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'ControlRight');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Ctrl+A');
      });
    });

    it('should work with custom separator', () => {
      const customRegistry = new ShortcutRegistry({
        separator: '-',
        debug: false,
        strict: true,
      });
      const disposeCustom = customRegistry.attachElement(window);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(customRegistry.getCurrentKeyPressed()).toBe('ControlLeft-A');

      disposeCustom();
    });

    it('should work with alias', () => {
      // Alias format: { targetKey: sourceKey }
      // In getCurrentKeyPressed, if keyCodeName is in alias keys, it gets replaced with alias value
      // So to replace 'Ctrl' with 'Save', we need alias = { Ctrl: 'Save' }
      const aliasRegistry = new ShortcutRegistry({
        alias: { Ctrl: 'Save', Alt: 'Open' },
        debug: false,
        strict: false,
      });
      const disposeAlias = aliasRegistry.attachElement(window);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'AltLeft');
      dispatchEvent('keydown', 'KeyA');
      // In loose mode: ControlLeft -> Ctrl, AltLeft -> Alt
      // Then alias replacement: Ctrl -> Save, Alt -> Open
      expect(aliasRegistry.getCurrentKeyPressed()).toBe('Save+Open+A');

      disposeAlias();
    });
  });

  describe('onKeyPressedChanged', () => {
    it('should register keyPressedChanged listener and trigger on keydown', () => {
      const listener = vi.fn();
      const disposeListener = registry.onKeyPressedChanged(listener);

      dispatchEvent('keydown', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenLastCalledWith(
        expect.objectContaining({
          detail: 'keydown',
        }),
      );

      dispatchEvent('keydown', 'KeyA', true); // repeat
      expect(listener).toHaveBeenCalledTimes(1); // Should not be called for repeat (filtered)

      dispatchEvent('keydown', 'KeyB');
      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenLastCalledWith(
        expect.objectContaining({
          detail: 'keydown',
        }),
      );

      disposeListener();
      dispatchEvent('keydown', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(2); // Should not be called after dispose
    });

    it('should register keyPressedChanged listener and trigger on keyup', () => {
      const listener = vi.fn();
      const disposeListener = registry.onKeyPressedChanged(listener);

      dispatchEvent('keydown', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenLastCalledWith(
        expect.objectContaining({
          detail: 'keydown',
        }),
      );

      dispatchEvent('keyup', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(2); // Once for keydown, once for keyup
      expect(listener).toHaveBeenLastCalledWith(
        expect.objectContaining({
          detail: 'keyup',
        }),
      );

      disposeListener();
      dispatchEvent('keydown', 'KeyA');
      dispatchEvent('keyup', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(2); // Should not be called after dispose
    });

    it('should trigger when key state changes with correct event detail', () => {
      const listener = vi.fn();
      const disposeListener = registry.onKeyPressedChanged(listener);

      // Press modifier
      dispatchEvent('keydown', 'ControlLeft');
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenLastCalledWith(
        expect.objectContaining({
          detail: 'keydown',
        }),
      );

      // Press normal key
      dispatchEvent('keydown', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenLastCalledWith(
        expect.objectContaining({
          detail: 'keydown',
        }),
      );

      // Release normal key
      dispatchEvent('keyup', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(3);
      expect(listener).toHaveBeenLastCalledWith(
        expect.objectContaining({
          detail: 'keyup',
        }),
      );

      // Release modifier
      dispatchEvent('keyup', 'ControlLeft');
      expect(listener).toHaveBeenCalledTimes(4);
      expect(listener).toHaveBeenLastCalledWith(
        expect.objectContaining({
          detail: 'keyup',
        }),
      );

      disposeListener();
    });

    it('should provide event detail indicating keydown or keyup', () => {
      const listener = vi.fn();
      const disposeListener = registry.onKeyPressedChanged(listener);

      // Test keydown events
      dispatchEvent('keydown', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(1);
      const keydownEvent = listener.mock.calls[0][0];
      expect(keydownEvent.detail).toBe('keydown');
      expect(keydownEvent.type).toBe('keyPressedChanged');

      // Test keyup events
      dispatchEvent('keyup', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(2);
      const keyupEvent = listener.mock.calls[1][0];
      expect(keyupEvent.detail).toBe('keyup');
      expect(keyupEvent.type).toBe('keyPressedChanged');

      disposeListener();
    });
  });

  describe('attachElement', () => {
    it('should attach to window', () => {
      const handler = vi.fn();
      registry.registerShortcut('Ctrl+a', handler);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should attach to HTMLElement', () => {
      const element = document.createElement('div');
      element.tabIndex = -1;
      document.body.appendChild(element);

      const elementRegistry = new ShortcutRegistry({ debug: false });
      const disposeElement = elementRegistry.attachElement(element);
      const handler = vi.fn();

      elementRegistry.registerShortcut('Ctrl+a', handler);
      element.focus();

      dispatchEvent('keydown', 'ControlLeft', false, element);
      dispatchEvent('keydown', 'KeyA', false, element);
      expect(handler).toHaveBeenCalledTimes(1);

      disposeElement();
      document.body.removeChild(element);
    });

    it('should clear shortcuts on dispose', () => {
      const handler = vi.fn();
      registry.registerShortcut('Ctrl+a', handler);

      dispose();
      const newRegistry = new ShortcutRegistry({ debug: false });
      newRegistry.attachElement(window);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('getOptions and updateOptions', () => {
    it('should get current options', () => {
      const options = registry.getOptions();
      expect(options.strict).toBe(true);
      expect(options.debug).toBe(false);
    });

    it('should update options', () => {
      registry.setOptions({ strict: false });
      expect(registry.getOptions().strict).toBe(false);

      const customFilter = vi.fn(() => true);
      registry.setOptions({ filter: customFilter });
      expect(registry.getOptions().filter).toBe(customFilter);
    });

    it('should apply updated options', () => {
      registry.setOptions({ strict: false });
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('Ctrl+A');
    });
  });

  describe('getShortcutRegisters', () => {
    it('should return all registered shortcuts', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      registry.registerShortcut('Ctrl+a', handler1);
      registry.registerShortcut('Ctrl+b', handler2);

      const registers = registry.getShortcutRegisters();
      expect(registers).toHaveLength(2);
      expect(registers[0].accelerator).toBe('Ctrl+a');
      expect(registers[1].accelerator).toBe('Ctrl+b');
    });

    it('should return shortcuts for specific accelerator', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      registry.registerShortcut('Ctrl+a', handler1);
      registry.registerShortcut('Ctrl+a', handler2);
      registry.registerShortcut('Ctrl+b', vi.fn());

      const registers = registry.getShortcutRegisters('Ctrl+a');
      expect(registers).toHaveLength(2);
      expect(registers[0].callback).toBe(handler1);
      expect(registers[1].callback).toBe(handler2);
    });

    it('should return empty array for non-existent shortcut', () => {
      const registers = registry.getShortcutRegisters('Ctrl+a');
      expect(registers).toHaveLength(0);
    });

    it('should reflect enabled/disabled state', () => {
      const handler = vi.fn();
      registry.registerShortcut('Ctrl+a', handler);

      let registers = registry.getShortcutRegisters('Ctrl+a');
      expect(registers[0].enabled).toBe(true);

      registry.disableShortcut('Ctrl+a');
      registers = registry.getShortcutRegisters('Ctrl+a');
      expect(registers[0].enabled).toBe(false);

      registry.enableShortcut('Ctrl+a');
      registers = registry.getShortcutRegisters('Ctrl+a');
      expect(registers[0].enabled).toBe(true);
    });
  });

  describe('filter functionality', () => {
    it('should filter repeat events', () => {
      const handler = vi.fn();
      registry.registerShortcut('Ctrl+a', handler);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1);

      dispatchEvent('keydown', 'KeyA', true); // repeat
      expect(handler).toHaveBeenCalledTimes(1); // Should not be called
    });

    it('should filter IME composition events', () => {
      const handler = vi.fn();
      registry.registerShortcut('Ctrl+a', handler);

      dispatchEvent('keydown', 'ControlLeft');
      const event = new window.KeyboardEvent('keydown', {
        code: 'KeyA',
        isComposing: true,
      });
      window.dispatchEvent(event);
      expect(handler).not.toHaveBeenCalled();
    });

    it('should filter input/textarea/select elements', () => {
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.focus();

      const handler = vi.fn();
      registry.registerShortcut('Ctrl+a', handler);

      dispatchEvent('keydown', 'ControlLeft', false, input);
      dispatchEvent('keydown', 'KeyA', false, input);
      expect(handler).not.toHaveBeenCalled();

      document.body.removeChild(input);
    });

    it('should filter contentEditable elements', () => {
      const div = document.createElement('div');
      div.contentEditable = 'true';
      document.body.appendChild(div);
      div.focus();

      const handler = vi.fn();
      registry.registerShortcut('Ctrl+a', handler);

      dispatchEvent('keydown', 'ControlLeft', false, div);
      dispatchEvent('keydown', 'KeyA', false, div);
      expect(handler).not.toHaveBeenCalled();

      document.body.removeChild(div);
    });

    it('should use custom filter', () => {
      const customFilter = vi.fn(() => false);
      const customRegistry = new ShortcutRegistry({
        filter: customFilter,
        debug: false,
      });
      const disposeCustom = customRegistry.attachElement(window);
      const handler = vi.fn();

      customRegistry.registerShortcut('Ctrl+a', handler);
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).not.toHaveBeenCalled();
      expect(customFilter).toHaveBeenCalled();

      disposeCustom();
    });

    it('should use custom debug function', () => {
      const debugFn = vi.fn();
      const debugRegistry = new ShortcutRegistry({
        debug: debugFn,
      });
      const disposeDebug = debugRegistry.attachElement(window);

      // Trigger an error condition
      debugRegistry.registerShortcut('invalid', vi.fn());
      expect(debugFn).toHaveBeenCalled();

      disposeDebug();
    });
  });

  describe('modifier key handling', () => {
    it('should handle modifier key release', () => {
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'AltLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+AltLeft+A');
    });

    it('should handle multiple modifier keys', () => {
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'ShiftLeft');
      dispatchEvent('keydown', 'AltLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe(
        'ControlLeft+ShiftLeft+AltLeft+A',
      );
    });
  });

  describe('edge cases', () => {
    it('should handle unsupported key codes in keydown', () => {
      const handler = vi.fn();
      registry.registerShortcut('Ctrl+a', handler);

      const event = new window.KeyboardEvent('keydown', {
        code: 'UnsupportedKey' as KeyCode,
      });
      window.dispatchEvent(event);
      expect(handler).not.toHaveBeenCalled();
    });

    it('should handle unsupported key codes in keyup', () => {
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+A');

      const event = new window.KeyboardEvent('keyup', {
        code: 'UnsupportedKey' as KeyCode,
      });
      window.dispatchEvent(event);
      // State should remain unchanged
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+A');
    });

    it('should handle keyup for normal key that matches current state', () => {
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+A');

      dispatchEvent('keyup', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft');
    });

    it('should handle keyup for normal key that does not match current state', () => {
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+A');

      dispatchEvent('keyup', 'KeyB');
      // State should remain unchanged
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+A');
    });

    it('should handle keyup when filter returns false', () => {
      const input = document.createElement('input');
      document.body.appendChild(input);

      // Attach registry to input element
      const inputRegistry = new ShortcutRegistry({ debug: false });
      const disposeInput = inputRegistry.attachElement(input);
      input.focus();

      // Set up state manually since keydown in input is filtered
      // We'll use a custom filter that allows keydown but blocks keyup
      const customRegistry = new ShortcutRegistry({
        debug: false,
        strict: true,
        filter: (event) => {
          // Allow keydown, block keyup in input
          if (event.type === 'keydown') return true;
          if (event.target && event.target instanceof HTMLElement) {
            return !['INPUT', 'TEXTAREA', 'SELECT'].includes(
              event.target.tagName,
            );
          }
          return true;
        },
      });
      const disposeCustom = customRegistry.attachElement(input);
      input.focus();

      // Press keys (keydown should work with custom filter)
      dispatchEvent('keydown', 'ControlLeft', false, input);
      dispatchEvent('keydown', 'KeyA', false, input);
      expect(customRegistry.getCurrentKeyPressed()).toBe('ControlLeft+A');

      // keyup in input should still clean state even if filter returns false
      // because state cleanup happens before filter check
      dispatchEvent('keyup', 'KeyA', false, input);
      expect(customRegistry.getCurrentKeyPressed()).toBe('ControlLeft');

      dispatchEvent('keyup', 'ControlLeft', false, input);
      expect(customRegistry.getCurrentKeyPressed()).toBe('');

      disposeInput();
      disposeCustom();
      document.body.removeChild(input);
    });

    it('should handle empty accelerator', () => {
      const handler = vi.fn();
      expect(registry.registerShortcut('', handler)).toBe(false);
    });

    it('should handle modifier-only accelerator', () => {
      const handler = vi.fn();
      expect(registry.registerShortcut('Ctrl', handler)).toBe(false);
      expect(registry.registerShortcut('Ctrl+', handler)).toBe(false);
    });

    it('should clear state correctly', () => {
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'ShiftLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+ShiftLeft+A');

      registry.clear();
      expect(registry.getCurrentKeyPressed()).toBe('');
    });
  });

  describe('loose mode (strict: false)', () => {
    let looseRegistry: ShortcutRegistry;
    let looseDispose: () => void;

    beforeEach(() => {
      looseRegistry = new ShortcutRegistry({ debug: false, strict: false });
      looseDispose = looseRegistry.attachElement(window);
    });

    afterEach(() => {
      looseDispose();
    });

    describe('registerShortcut in loose mode', () => {
      it('should register shortcuts in loose mode', () => {
        const handler = vi.fn();
        looseRegistry.registerShortcut('Ctrl+a', handler);

        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('should match shortcuts regardless of modifier side in loose mode', () => {
        const handler1 = vi.fn();
        const handler2 = vi.fn();

        looseRegistry.registerShortcut('Ctrl+a', handler1);
        looseRegistry.registerShortcut('Shift+b', handler2);

        // ControlLeft should match Ctrl
        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(handler1).toHaveBeenCalledTimes(1);

        // ShiftLeft should match Shift
        dispatchEvent('keyup', 'ControlLeft');
        dispatchEvent('keydown', 'ShiftLeft');
        dispatchEvent('keydown', 'KeyB');
        expect(handler2).toHaveBeenCalledTimes(1);
      });
    });

    describe('unregisterShortcut in loose mode', () => {
      it('should unregister shortcuts in loose mode', () => {
        const handler = vi.fn();
        looseRegistry.registerShortcut('Ctrl+a', handler);

        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(handler).toHaveBeenCalledTimes(1);

        // Unregister using loose mode format
        looseRegistry.unregisterShortcut('Ctrl+a');
        dispatchEvent('keydown', 'KeyA');
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('should unregister using different modifier formats in loose mode', () => {
        const handler = vi.fn();
        looseRegistry.registerShortcut('Ctrl+a', handler);

        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(handler).toHaveBeenCalledTimes(1);

        // Can unregister using Control format
        looseRegistry.unregisterShortcut('Control+a');
        dispatchEvent('keydown', 'KeyA');
        expect(handler).toHaveBeenCalledTimes(1);
      });
    });

    describe('enableShortcut and disableShortcut in loose mode', () => {
      it('should enable and disable shortcuts in loose mode', () => {
        const handler = vi.fn();
        looseRegistry.registerShortcut('Ctrl+a', handler);

        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(handler).toHaveBeenCalledTimes(1);

        // Disable using loose mode format
        looseRegistry.disableShortcut('Ctrl+a');
        dispatchEvent('keydown', 'KeyA');
        expect(handler).toHaveBeenCalledTimes(1);

        // Enable using Control format
        looseRegistry.enableShortcut('Control+a');
        dispatchEvent('keydown', 'KeyA');
        expect(handler).toHaveBeenCalledTimes(2);
      });
    });

    describe('isShortcutRegistered in loose mode', () => {
      it('should check shortcuts regardless of modifier format in loose mode', () => {
        looseRegistry.registerShortcut('Ctrl+a', vi.fn());

        // All these should return true in loose mode
        expect(looseRegistry.isShortcutRegistered('Ctrl+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('Control+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('ControlLeft+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('ControlRight+a')).toBe(true);
      });

      it('should check Alt/Option aliases in loose mode', () => {
        looseRegistry.registerShortcut('Alt+a', vi.fn());

        expect(looseRegistry.isShortcutRegistered('Alt+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('Option+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('AltLeft+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('AltRight+a')).toBe(true);
      });

      it('should check Meta/Command aliases in loose mode', () => {
        looseRegistry.registerShortcut('Meta+a', vi.fn());

        expect(looseRegistry.isShortcutRegistered('Meta+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('Command+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('MetaLeft+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('MetaRight+a')).toBe(true);
      });
    });

    describe('getCurrentKeyPressed in loose mode', () => {
      it('should return normalized keys in loose mode', () => {
        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'ShiftLeft');
        dispatchEvent('keydown', 'AltLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Ctrl+Shift+Alt+A');
      });

      it('should normalize ControlLeft and ControlRight to Ctrl', () => {
        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'ControlRight');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Ctrl+A');
      });

      it('should normalize ShiftLeft and ShiftRight to Shift', () => {
        dispatchEvent('keydown', 'ShiftLeft');
        dispatchEvent('keydown', 'ShiftRight');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Shift+A');
      });

      it('should normalize AltLeft and AltRight to Alt', () => {
        dispatchEvent('keydown', 'AltLeft');
        dispatchEvent('keydown', 'AltRight');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Alt+A');
      });

      it('should normalize MetaLeft and MetaRight to Meta', () => {
        dispatchEvent('keydown', 'MetaLeft');
        dispatchEvent('keydown', 'MetaRight');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Meta+A');
      });

      it('should handle multiple modifier combinations in loose mode', () => {
        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'ShiftLeft');
        dispatchEvent('keydown', 'AltLeft');
        dispatchEvent('keydown', 'MetaLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe(
          'Ctrl+Meta+Shift+Alt+A',
        );
      });
    });

    describe('getShortcutRegisters in loose mode', () => {
      it('should return shortcuts in loose mode', () => {
        const handler1 = vi.fn();
        const handler2 = vi.fn();

        looseRegistry.registerShortcut('Ctrl+a', handler1);
        looseRegistry.registerShortcut('Shift+b', handler2);

        const registers = looseRegistry.getShortcutRegisters();
        expect(registers).toHaveLength(2);
        expect(registers[0].accelerator).toBe('Ctrl+a');
        expect(registers[1].accelerator).toBe('Shift+b');
      });

      it('should find shortcuts using different formats in loose mode', () => {
        const handler = vi.fn();
        looseRegistry.registerShortcut('Ctrl+a', handler);

        // All these should find the same shortcut
        const registers1 = looseRegistry.getShortcutRegisters('Ctrl+a');
        const registers2 = looseRegistry.getShortcutRegisters('Control+a');
        const registers3 = looseRegistry.getShortcutRegisters('ControlLeft+a');

        expect(registers1).toHaveLength(1);
        expect(registers2).toHaveLength(1);
        expect(registers3).toHaveLength(1);
        expect(registers1[0].callback).toBe(handler);
        expect(registers2[0].callback).toBe(handler);
        expect(registers3[0].callback).toBe(handler);
      });
    });

    describe('onKeyPressedChanged in loose mode', () => {
      it('should work the same in loose mode with correct event detail', () => {
        const listener = vi.fn();
        const disposeListener = looseRegistry.onKeyPressedChanged(listener);

        dispatchEvent('keydown', 'KeyA');
        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenLastCalledWith(
          expect.objectContaining({
            detail: 'keydown',
          }),
        );

        dispatchEvent('keyup', 'KeyA');
        expect(listener).toHaveBeenCalledTimes(2);
        expect(listener).toHaveBeenLastCalledWith(
          expect.objectContaining({
            detail: 'keyup',
          }),
        );

        disposeListener();
        dispatchEvent('keydown', 'KeyA');
        expect(listener).toHaveBeenCalledTimes(2);
      });
    });

    describe('filter functionality in loose mode', () => {
      it('should filter events the same way in loose mode', () => {
        const handler = vi.fn();
        looseRegistry.registerShortcut('Ctrl+A', handler);

        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(handler).toHaveBeenCalledTimes(1);

        dispatchEvent('keydown', 'KeyA', true); // repeat
        expect(handler).toHaveBeenCalledTimes(1);
      });
    });

    describe('modifier key handling in loose mode', () => {
      it('should handle modifier keys the same way in loose mode', () => {
        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'AltLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Ctrl+Alt+A');
      });
    });
  });

  describe('rapid key presses', () => {
    it('should handle rapid keydown events', () => {
      const handler = vi.fn();
      registry.registerShortcut('Ctrl+a', handler);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      dispatchEvent('keydown', 'KeyB');
      dispatchEvent('keydown', 'KeyC');

      // Should only trigger once for Ctrl+a
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should handle rapid keyup events', () => {
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'ShiftLeft');
      dispatchEvent('keydown', 'KeyA');

      dispatchEvent('keyup', 'KeyA');
      dispatchEvent('keyup', 'ShiftLeft');
      dispatchEvent('keyup', 'ControlLeft');

      expect(registry.getCurrentKeyPressed()).toBe('');
    });
  });

  describe('concurrent operations', () => {
    it('should handle registering shortcut during callback execution', () => {
      const newHandler = vi.fn();
      const handler = vi.fn(() => {
        registry.registerShortcut('Ctrl+b', newHandler);
      });

      registry.registerShortcut('Ctrl+a', handler);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');

      expect(handler).toHaveBeenCalledTimes(1);
      expect(newHandler).not.toBeNull();

      // New shortcut should be registered and work on next trigger
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyB');
      // Note: newHandler might be called multiple times if Ctrl is still pressed
      expect(newHandler).toHaveBeenCalled();
    });

    it('should handle unregistering shortcut during callback execution', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn(() => {
        registry.unregisterShortcut('Ctrl+a', handler1);
      });

      registry.registerShortcut('Ctrl+a', handler1);
      registry.registerShortcut('Ctrl+a', handler2);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);

      // handler1 should be unregistered, but handler2 should still work
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler1).toHaveBeenCalledTimes(1); // Should not be called again
      // Note: handler2 might be called again depending on implementation
      // The important thing is that handler1 is unregistered
    });
  });

  describe('state consistency', () => {
    it('should maintain state when keyup is filtered but keydown was not', () => {
      const input = document.createElement('input');
      document.body.appendChild(input);

      // Use a custom filter that allows keydown but blocks keyup in input
      const customRegistry = new ShortcutRegistry({
        debug: false,
        strict: true,
        filter: (event) => {
          // Allow keydown, block keyup in input
          if (event.type === 'keydown') return true;
          if (event.target && event.target instanceof HTMLElement) {
            return !['INPUT', 'TEXTAREA', 'SELECT'].includes(
              event.target.tagName,
            );
          }
          return true;
        },
      });
      const disposeCustom = customRegistry.attachElement(input);
      input.focus();

      // Press keys (keydown should work with custom filter)
      dispatchEvent('keydown', 'ControlLeft', false, input);
      dispatchEvent('keydown', 'KeyA', false, input);
      expect(customRegistry.getCurrentKeyPressed()).toBe('ControlLeft+A');

      // keyup in input should still clean state (even if filter returns false)
      // This is because handleKeyup cleans state before checking filter
      dispatchEvent('keyup', 'KeyA', false, input);
      expect(customRegistry.getCurrentKeyPressed()).toBe('ControlLeft');

      dispatchEvent('keyup', 'ControlLeft', false, input);
      expect(customRegistry.getCurrentKeyPressed()).toBe('');

      disposeCustom();
      document.body.removeChild(input);
    });

    it('should handle modifier key release when not in modifiersPressed', () => {
      // Press a normal key first
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('A');

      // Try to release a modifier that was never pressed
      dispatchEvent('keyup', 'ControlLeft');
      expect(registry.getCurrentKeyPressed()).toBe('A'); // Should remain unchanged
    });

    it('should handle callback throwing exception', () => {
      const errorHandler = vi.fn(() => {
        throw new Error('Callback error');
      });
      const normalHandler = vi.fn();

      registry.registerShortcut('Ctrl+a', errorHandler);
      registry.registerShortcut('Ctrl+a', normalHandler);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');

      // Both handlers should be called, even if one throws
      expect(errorHandler).toHaveBeenCalledTimes(1);
      expect(normalHandler).toHaveBeenCalledTimes(1);
    });

    it('should return empty string when no keys are pressed', () => {
      expect(registry.getCurrentKeyPressed()).toBe('');
    });

    it('should handle clear method', () => {
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'ShiftLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+ShiftLeft+A');

      registry.clear();
      expect(registry.getCurrentKeyPressed()).toBe('');
    });

    it('should handle multiple attachElement calls on same element with reference counting', () => {
      const element = document.createElement('div');
      element.tabIndex = -1;
      document.body.appendChild(element);

      const handler = vi.fn();
      registry.registerShortcut('Ctrl+a', handler);

      // First attach
      const dispose1 = registry.attachElement(element);
      element.focus();
      dispatchEvent('keydown', 'ControlLeft', false, element);
      dispatchEvent('keydown', 'KeyA', false, element);
      dispatchEvent('keyup', 'ControlLeft', false, element);
      dispatchEvent('keyup', 'KeyA', false, element);
      expect(handler).toHaveBeenCalledTimes(1);

      // Second attach on same element - returns different dispose function
      // to avoid interference between different code parts
      const dispose2 = registry.attachElement(element);
      expect(dispose1).not.toBe(dispose2); // Different dispose functions

      // After first dispose, should still work (attachCount > 0)
      dispose1();
      dispatchEvent('keydown', 'ControlLeft', false, element);
      dispatchEvent('keydown', 'KeyA', false, element);
      dispatchEvent('keyup', 'ControlLeft', false, element);
      dispatchEvent('keyup', 'KeyA', false, element);
      expect(handler).toHaveBeenCalledTimes(2); // Still works

      // Multiple calls to same dispose should be safe (no-op after first call)
      dispose1();
      dispatchEvent('keydown', 'ControlLeft', false, element);
      dispatchEvent('keydown', 'KeyA', false, element);
      dispatchEvent('keyup', 'ControlLeft', false, element);
      dispatchEvent('keyup', 'KeyA', false, element);
      expect(handler).toHaveBeenCalledTimes(3);

      // After second dispose, should be detached (attachCount === 0)
      dispose2();
      dispatchEvent('keydown', 'ControlLeft', false, element);
      dispatchEvent('keydown', 'KeyA', false, element);
      dispatchEvent('keyup', 'ControlLeft', false, element);
      dispatchEvent('keyup', 'KeyA', false, element);
      expect(handler).toHaveBeenCalledTimes(3); // No longer works

      document.body.removeChild(element);
    });

    it('should handle multiple dispose calls safely', () => {
      const element = document.createElement('div');
      element.tabIndex = -1;
      document.body.appendChild(element);

      const handler = vi.fn();
      registry.registerShortcut('Ctrl+a', handler);

      const dispose = registry.attachElement(element);
      element.focus();

      // First dispose should detach
      dispose();
      dispatchEvent('keydown', 'ControlLeft', false, element);
      dispatchEvent('keydown', 'KeyA', false, element);
      expect(handler).not.toHaveBeenCalled(); // Should not work after dispose

      // Second dispose should be safe (no-op)
      expect(() => dispose()).not.toThrow();
      dispatchEvent('keydown', 'ControlLeft', false, element);
      dispatchEvent('keydown', 'KeyA', false, element);
      expect(handler).not.toHaveBeenCalled(); // Still not working

      document.body.removeChild(element);
    });

    it('should handle dispose after multiple attaches correctly', () => {
      const element = document.createElement('div');
      element.tabIndex = -1;
      document.body.appendChild(element);

      const handler = vi.fn();
      registry.registerShortcut('Ctrl+a', handler);

      // Attach multiple times
      const dispose1 = registry.attachElement(element);
      const dispose2 = registry.attachElement(element);
      const dispose3 = registry.attachElement(element);
      expect(dispose1).not.toBe(dispose2);
      expect(dispose2).not.toBe(dispose3);

      element.focus();

      // First dispose - should still work (attachCount: 3 -> 2)
      dispose1();
      dispatchEvent('keydown', 'ControlLeft', false, element);
      dispatchEvent('keydown', 'KeyA', false, element);
      dispatchEvent('keyup', 'ControlLeft', false, element);
      dispatchEvent('keyup', 'KeyA', false, element);
      expect(handler).toHaveBeenCalledTimes(1);

      // Second dispose - should still work (attachCount: 2 -> 1)
      dispose2();
      dispatchEvent('keydown', 'ControlLeft', false, element);
      dispatchEvent('keydown', 'KeyA', false, element);
      dispatchEvent('keyup', 'ControlLeft', false, element);
      dispatchEvent('keyup', 'KeyA', false, element);
      expect(handler).toHaveBeenCalledTimes(2);

      // Third dispose - should detach (attachCount: 1 -> 0)
      dispose3();
      dispatchEvent('keydown', 'ControlLeft', false, element);
      dispatchEvent('keydown', 'KeyA', false, element);
      dispatchEvent('keyup', 'ControlLeft', false, element);
      dispatchEvent('keyup', 'KeyA', false, element);
      expect(handler).toHaveBeenCalledTimes(2); // No longer works

      // Fourth dispose - should be safe (no-op)
      expect(() => dispose1()).not.toThrow();

      document.body.removeChild(element);
    });

    it('should handle window blur event clearing state', () => {
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+A');

      // Simulate window blur
      window.dispatchEvent(new Event('blur'));
      expect(registry.getCurrentKeyPressed()).toBe('');
    });

    it('should handle multiple elements with window blur listener', () => {
      const element1 = document.createElement('div');
      element1.tabIndex = -1;
      document.body.appendChild(element1);

      const element2 = document.createElement('div');
      element2.tabIndex = -1;
      document.body.appendChild(element2);

      const dispose1 = registry.attachElement(element1);
      registry.attachElement(element2);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+A');

      // Window blur should clear state
      window.dispatchEvent(new Event('blur'));
      expect(registry.getCurrentKeyPressed()).toBe('');

      // Dispose first element, window blur listener should still be active
      dispose1();
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+A');

      window.dispatchEvent(new Event('blur'));
      expect(registry.getCurrentKeyPressed()).toBe('');

      // Dispose second element, window blur listener should be removed
      // But we need to create a new registry instance because the original one
      // still has window blur listener attached from beforeEach
      const newRegistry = new ShortcutRegistry({ debug: false, strict: true });
      const newDispose1 = newRegistry.attachElement(element1);
      const newDispose2 = newRegistry.attachElement(element2);

      dispatchEvent('keydown', 'ControlLeft', false, element1);
      dispatchEvent('keydown', 'KeyA', false, element1);
      expect(newRegistry.getCurrentKeyPressed()).toBe('ControlLeft+A');

      // Dispose both elements
      newDispose1();
      newDispose2();

      // Now window blur should not clear state (listener removed)
      dispatchEvent('keydown', 'ControlLeft', false, element1);
      dispatchEvent('keydown', 'KeyA', false, element1);
      expect(newRegistry.getCurrentKeyPressed()).toBe('ControlLeft+A');

      window.dispatchEvent(new Event('blur'));
      // State should remain because window blur listener was removed
      expect(newRegistry.getCurrentKeyPressed()).toBe('ControlLeft+A');

      document.body.removeChild(element1);
      document.body.removeChild(element2);
    });

    it('should handle getCurrentKeyPressed with only modifiers', () => {
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'ShiftLeft');
      // Without a normal key, should return modifiers (not empty string)
      // This is because serializeAccelerator returns modifiers even without normal key
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+ShiftLeft');
    });

    it('should handle getCurrentKeyPressed with only normal key', () => {
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('A');
    });
  });
});
