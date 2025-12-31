import { type KeyCode } from './key-codes';
import { ShortcutRegistry } from './shortcut-registry';

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
      const handler = jest.fn();
      const result = registry.registerShortcut('a', handler);
      expect(result).toBe(true);

      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should register a shortcut with modifier', () => {
      const handler = jest.fn();
      const result = registry.registerShortcut('Ctrl+a', handler);
      expect(result).toBe(true);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should register a shortcut with multiple modifiers', () => {
      const handler = jest.fn();
      const result = registry.registerShortcut('Ctrl+Shift+a', handler);
      expect(result).toBe(true);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'ShiftLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should return false for invalid accelerator', () => {
      const handler = jest.fn();
      expect(registry.registerShortcut('Ctrl+a+', handler)).toBe(false);
      expect(registry.registerShortcut('invalid', handler)).toBe(false);
      expect(registry.registerShortcut('a+Ctrl', handler)).toBe(false);
    });

    it('should not register multiple normal keys', () => {
      const handler = jest.fn();
      expect(registry.registerShortcut('Ctrl+a+b', handler)).toBe(false);
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      dispatchEvent('keydown', 'KeyB');
      expect(handler).not.toHaveBeenCalled();
    });

    it('should support multiple callbacks for the same shortcut', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();

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
      const handler = jest.fn();

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
      const handler = jest.fn();

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
      const handler = jest.fn();
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
      const handler1 = jest.fn();
      const handler2 = jest.fn();

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
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      registry.registerShortcut('Ctrl+a', handler1);
      expect(registry.unregisterShortcut('Ctrl+a', handler2)).toBe(false);
    });
  });

  describe('enableShortcut and disableShortcut', () => {
    it('should disable and enable a shortcut', () => {
      const handler = jest.fn();
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
      const handler1 = jest.fn();
      const handler2 = jest.fn();

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
  });

  describe('isShortcutRegistered', () => {
    it('should return true for registered shortcut', () => {
      registry.registerShortcut('Ctrl+a', jest.fn());
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
        expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+AltLeft+a');

        dispatchEvent('keyup', 'ControlLeft');
        expect(registry.getCurrentKeyPressed()).toBe('AltLeft');
      });

      it('should handle modifier key changes', () => {
        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'AltLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+AltLeft+a');

        dispatchEvent('keyup', 'ControlLeft');
        dispatchEvent('keydown', 'AltRight');
        expect(registry.getCurrentKeyPressed()).toBe('AltLeft+AltRight');
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
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Ctrl+Alt+a');

        dispatchEvent('keyup', 'ControlLeft');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Alt');
      });

      it('should normalize modifiers in loose mode', () => {
        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'ControlRight');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Ctrl+a');
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
      expect(customRegistry.getCurrentKeyPressed()).toBe('ControlLeft-a');

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
      expect(aliasRegistry.getCurrentKeyPressed()).toBe('Save+Open+a');

      disposeAlias();
    });
  });

  describe('onKeydown and onKeyup', () => {
    it('should register keydown listener', () => {
      const listener = jest.fn();
      const disposeListener = registry.onKeydown(listener);

      dispatchEvent('keydown', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(1);

      dispatchEvent('keydown', 'KeyA', true); // repeat
      expect(listener).toHaveBeenCalledTimes(1); // Should not be called for repeat

      dispatchEvent('keydown', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(2);

      disposeListener();
      dispatchEvent('keydown', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(2); // Should not be called after dispose
    });

    it('should register keyup listener', () => {
      const listener = jest.fn();
      const disposeListener = registry.onKeyup(listener);

      dispatchEvent('keyup', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(1);

      dispatchEvent('keyup', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(2);

      disposeListener();
      dispatchEvent('keyup', 'KeyA');
      expect(listener).toHaveBeenCalledTimes(2); // Should not be called after dispose
    });
  });

  describe('attachElement', () => {
    it('should attach to window', () => {
      const handler = jest.fn();
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
      const handler = jest.fn();

      elementRegistry.registerShortcut('Ctrl+a', handler);
      element.focus();

      dispatchEvent('keydown', 'ControlLeft', false, element);
      dispatchEvent('keydown', 'KeyA', false, element);
      expect(handler).toHaveBeenCalledTimes(1);

      disposeElement();
      document.body.removeChild(element);
    });

    it('should clear shortcuts on dispose', () => {
      const handler = jest.fn();
      registry.registerShortcut('Ctrl+a', handler);

      dispose();
      const newRegistry = new ShortcutRegistry({ debug: false });
      newRegistry.attachElement(window);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).not.toHaveBeenCalled();
    });

    it('should clear state on blur', () => {
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+a');

      dispatchEvent('blur', 'ControlLeft' as KeyCode);
      expect(registry.getCurrentKeyPressed()).toBe('');
    });
  });

  describe('getOptions and updateOptions', () => {
    it('should get current options', () => {
      const options = registry.getOptions();
      expect(options.strict).toBe(true);
      expect(options.debug).toBe(false);
    });

    it('should update options', () => {
      registry.updateOptions({ strict: false });
      expect(registry.getOptions().strict).toBe(false);

      const customFilter = jest.fn(() => true);
      registry.updateOptions({ filter: customFilter });
      expect(registry.getOptions().filter).toBe(customFilter);
    });

    it('should apply updated options', () => {
      registry.updateOptions({ strict: false });
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('Ctrl+a');
    });
  });

  describe('getShortcutRegisters', () => {
    it('should return all registered shortcuts', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      registry.registerShortcut('Ctrl+a', handler1);
      registry.registerShortcut('Ctrl+b', handler2);

      const registers = registry.getShortcutRegisters();
      expect(registers).toHaveLength(2);
      expect(registers[0].accelerator).toBe('Ctrl+a');
      expect(registers[1].accelerator).toBe('Ctrl+b');
    });

    it('should return shortcuts for specific accelerator', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      registry.registerShortcut('Ctrl+a', handler1);
      registry.registerShortcut('Ctrl+a', handler2);
      registry.registerShortcut('Ctrl+b', jest.fn());

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
      const handler = jest.fn();
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
      const handler = jest.fn();
      registry.registerShortcut('Ctrl+a', handler);

      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).toHaveBeenCalledTimes(1);

      dispatchEvent('keydown', 'KeyA', true); // repeat
      expect(handler).toHaveBeenCalledTimes(1); // Should not be called
    });

    it('should filter IME composition events', () => {
      const handler = jest.fn();
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

      const handler = jest.fn();
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

      const handler = jest.fn();
      registry.registerShortcut('Ctrl+a', handler);

      dispatchEvent('keydown', 'ControlLeft', false, div);
      dispatchEvent('keydown', 'KeyA', false, div);
      expect(handler).not.toHaveBeenCalled();

      document.body.removeChild(div);
    });

    it('should use custom filter', () => {
      const customFilter = jest.fn(() => false);
      const customRegistry = new ShortcutRegistry({
        filter: customFilter,
        debug: false,
      });
      const disposeCustom = customRegistry.attachElement(window);
      const handler = jest.fn();

      customRegistry.registerShortcut('Ctrl+a', handler);
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(handler).not.toHaveBeenCalled();
      expect(customFilter).toHaveBeenCalled();

      disposeCustom();
    });
  });

  describe('modifier key handling', () => {
    it('should handle modifier key release', () => {
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'AltLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+AltLeft+a');

      dispatchEvent('keyup', 'ControlLeft');
      expect(registry.getCurrentKeyPressed()).toBe('AltLeft');
    });

    it('should reset normal key when modifier changes', () => {
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+a');

      dispatchEvent('keydown', 'AltLeft');
      expect(registry.getCurrentKeyPressed()).toBe('ControlLeft+AltLeft');
    });

    it('should handle multiple modifier keys', () => {
      dispatchEvent('keydown', 'ControlLeft');
      dispatchEvent('keydown', 'ShiftLeft');
      dispatchEvent('keydown', 'AltLeft');
      dispatchEvent('keydown', 'KeyA');
      expect(registry.getCurrentKeyPressed()).toBe(
        'ControlLeft+ShiftLeft+AltLeft+a',
      );
    });
  });

  describe('edge cases', () => {
    it('should handle unsupported key codes', () => {
      const handler = jest.fn();
      registry.registerShortcut('Ctrl+a', handler);

      const event = new window.KeyboardEvent('keydown', {
        code: 'UnsupportedKey' as KeyCode,
      });
      window.dispatchEvent(event);
      expect(handler).not.toHaveBeenCalled();
    });

    it('should handle empty accelerator', () => {
      const handler = jest.fn();
      expect(registry.registerShortcut('', handler)).toBe(false);
    });

    it('should handle modifier-only accelerator', () => {
      const handler = jest.fn();
      expect(registry.registerShortcut('Ctrl', handler)).toBe(false);
      expect(registry.registerShortcut('Ctrl+', handler)).toBe(false);
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
        const handler = jest.fn();
        looseRegistry.registerShortcut('Ctrl+a', handler);

        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(handler).toHaveBeenCalledTimes(1);

        // ControlRight should also trigger the same shortcut
        dispatchEvent('keyup', 'ControlLeft');
        dispatchEvent('keydown', 'ControlRight');
        dispatchEvent('keydown', 'KeyA');
        expect(handler).toHaveBeenCalledTimes(2);
      });

      it('should match shortcuts regardless of modifier side in loose mode', () => {
        const handler1 = jest.fn();
        const handler2 = jest.fn();

        looseRegistry.registerShortcut('Ctrl+a', handler1);
        looseRegistry.registerShortcut('Shift+b', handler2);

        // ControlLeft should match Ctrl
        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(handler1).toHaveBeenCalledTimes(1);

        // ControlRight should also match Ctrl
        dispatchEvent('keyup', 'ControlLeft');
        dispatchEvent('keydown', 'ControlRight');
        dispatchEvent('keydown', 'KeyA');
        expect(handler1).toHaveBeenCalledTimes(2);

        // ShiftLeft should match Shift
        dispatchEvent('keyup', 'ControlRight');
        dispatchEvent('keydown', 'ShiftLeft');
        dispatchEvent('keydown', 'KeyB');
        expect(handler2).toHaveBeenCalledTimes(1);

        // ShiftRight should also match Shift
        dispatchEvent('keyup', 'ShiftLeft');
        dispatchEvent('keydown', 'ShiftRight');
        dispatchEvent('keydown', 'KeyB');
        expect(handler2).toHaveBeenCalledTimes(2);
      });
    });

    describe('unregisterShortcut in loose mode', () => {
      it('should unregister shortcuts in loose mode', () => {
        const handler = jest.fn();
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
        const handler = jest.fn();
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
        const handler = jest.fn();
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
        looseRegistry.registerShortcut('Ctrl+a', jest.fn());

        // All these should return true in loose mode
        expect(looseRegistry.isShortcutRegistered('Ctrl+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('Control+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('ControlLeft+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('ControlRight+a')).toBe(true);
      });

      it('should check Alt/Option aliases in loose mode', () => {
        looseRegistry.registerShortcut('Alt+a', jest.fn());

        expect(looseRegistry.isShortcutRegistered('Alt+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('Option+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('AltLeft+a')).toBe(true);
        expect(looseRegistry.isShortcutRegistered('AltRight+a')).toBe(true);
      });

      it('should check Meta/Command aliases in loose mode', () => {
        looseRegistry.registerShortcut('Meta+a', jest.fn());

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
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Ctrl+Shift+Alt+a');
      });

      it('should normalize ControlLeft and ControlRight to Ctrl', () => {
        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'ControlRight');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Ctrl+a');
      });

      it('should normalize ShiftLeft and ShiftRight to Shift', () => {
        dispatchEvent('keydown', 'ShiftLeft');
        dispatchEvent('keydown', 'ShiftRight');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Shift+a');
      });

      it('should normalize AltLeft and AltRight to Alt', () => {
        dispatchEvent('keydown', 'AltLeft');
        dispatchEvent('keydown', 'AltRight');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Alt+a');
      });

      it('should normalize MetaLeft and MetaRight to Meta', () => {
        dispatchEvent('keydown', 'MetaLeft');
        dispatchEvent('keydown', 'MetaRight');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Meta+a');
      });

      it('should handle multiple modifier combinations in loose mode', () => {
        dispatchEvent('keydown', 'ControlLeft');
        dispatchEvent('keydown', 'ShiftLeft');
        dispatchEvent('keydown', 'AltLeft');
        dispatchEvent('keydown', 'MetaLeft');
        dispatchEvent('keydown', 'KeyA');
        expect(looseRegistry.getCurrentKeyPressed()).toBe(
          'Ctrl+Shift+Alt+Meta+a',
        );
      });
    });

    describe('getShortcutRegisters in loose mode', () => {
      it('should return shortcuts in loose mode', () => {
        const handler1 = jest.fn();
        const handler2 = jest.fn();

        looseRegistry.registerShortcut('Ctrl+a', handler1);
        looseRegistry.registerShortcut('Shift+b', handler2);

        const registers = looseRegistry.getShortcutRegisters();
        expect(registers).toHaveLength(2);
        expect(registers[0].accelerator).toBe('Ctrl+a');
        expect(registers[1].accelerator).toBe('Shift+b');
      });

      it('should find shortcuts using different formats in loose mode', () => {
        const handler = jest.fn();
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

    describe('onKeydown and onKeyup in loose mode', () => {
      it('should work the same in loose mode', () => {
        const listener = jest.fn();
        const disposeListener = looseRegistry.onKeydown(listener);

        dispatchEvent('keydown', 'KeyA');
        expect(listener).toHaveBeenCalledTimes(1);

        disposeListener();
        dispatchEvent('keydown', 'KeyA');
        expect(listener).toHaveBeenCalledTimes(1);
      });
    });

    describe('filter functionality in loose mode', () => {
      it('should filter events the same way in loose mode', () => {
        const handler = jest.fn();
        looseRegistry.registerShortcut('Ctrl+a', handler);

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
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Ctrl+Alt+a');

        dispatchEvent('keyup', 'ControlLeft');
        expect(looseRegistry.getCurrentKeyPressed()).toBe('Alt');
      });
    });
  });
});
