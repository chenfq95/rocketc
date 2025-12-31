import debug from 'debug';
import {
  type KeyCode,
  KeyCodesSupported,
  type ModifierKeyCode,
  type NormalKeyCode,
  keyCode2KeyCodeName,
  type ModifierKeyCodeName,
  type KeyCodeName,
} from './key-codes';
import {
  type Dispose,
  type Filter,
  type KeyboardEventListener,
} from './shortcut-context';
import { AcceleratorParser, type Accelerator } from './accelerator-parser';
import { noop } from './utils';

interface ShortcutRegister {
  accelerator: Accelerator;
  modifiers: Array<Array<Accelerator>>;
  normalKeys: Array<Accelerator>;
  enabled: boolean;
  callback: KeyboardEventListener;
}

interface ShortcutRegisterOptions {
  strict?: boolean;
  debug?: boolean;
  filter?: Filter;
}

export class ShortcutRegistry {
  private static KeyCodeModifiers = new Set<ModifierKeyCode>([
    'ControlLeft',
    'ControlRight',
    'ShiftLeft',
    'ShiftRight',
    'AltLeft',
    'AltRight',
    'MetaLeft',
    'MetaRight',
  ]);
  private static LooseModifiersName = new Map<
    ModifierKeyCode,
    ModifierKeyCodeName
  >([
    ['ControlLeft', 'Ctrl'],
    ['ControlRight', 'Ctrl'],
    ['AltLeft', 'Alt'],
    ['AltRight', 'Alt'],
    ['ShiftLeft', 'Shift'],
    ['ShiftRight', 'Shift'],
    ['MetaLeft', 'Meta'],
    ['MetaRight', 'Meta'],
  ]);

  private static keyCodeIsModifiers(
    keycode: string,
  ): keycode is ModifierKeyCode {
    return ShortcutRegistry.KeyCodeModifiers.has(keycode as ModifierKeyCode);
  }

  private static defaultFilter: Filter = (event) => {
    if (event.repeat) return false;
    if (event.target && event.target instanceof HTMLElement) {
      return (
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName) &&
        !event.target.isContentEditable
      );
    }
    return true;
  };

  private readonly debug: (...args: any[]) => void;
  private readonly options: ShortcutRegisterOptions;
  private readonly parser = new AcceleratorParser();
  private readonly eventTarget = new EventTarget();
  private shortcutRegistered: Array<ShortcutRegister> = [];
  private modifiersPressed: Array<ModifierKeyCode> = [];
  private normalKeyPressed: NormalKeyCode | undefined;

  constructor(options?: ShortcutRegisterOptions) {
    this.options = options ?? {};
    this.options.strict = this.options.strict ?? true;
    this.options.filter = this.options.filter ?? ShortcutRegistry.defaultFilter;
    if (this.options.debug) {
      if (typeof this.options.debug === 'function') {
        this.debug = this.options.debug;
      } else {
        this.debug = debug('ReactUseShortcuts');
        debug.enable('ReactUseShortcuts');
      }
    } else {
      this.debug = noop;
    }
  }

  registerShortcut(
    accelerator: Accelerator,
    callback: KeyboardEventListener,
  ): boolean {
    try {
      const [modifiers, normalKeys] = this.parser.parseAccelerator(accelerator);
      this.shortcutRegistered.push({
        accelerator,
        modifiers,
        normalKeys,
        callback,
        enabled: true,
      });
      return true;
    } catch (e: any) {
      this.debug(e.message);
      return false;
    }
  }

  unregisterShortcut(accelerator: Accelerator): boolean {
    try {
      const shortcutRegisters = this.matchShortcut(
        ...this.parser.parseAccelerator(accelerator),
      );
      if (shortcutRegisters.length === 0) {
        this.debug(`Shortcut ${accelerator} is not register yet.`);
        return false;
      }
      this.shortcutRegistered = this.shortcutRegistered.filter(
        (item) => !shortcutRegisters.includes(item),
      );
      return true;
    } catch (e: any) {
      this.debug(e.message);
      return false;
    }
  }

  disableShortcut(accelerator: Accelerator): boolean {
    try {
      const matchShortcuts = this.matchShortcut(
        ...this.parser.parseAccelerator(accelerator),
      );
      if (!matchShortcuts) {
        this.debug(`Shortcut ${accelerator} is not register yet.`);
        return false;
      }
      matchShortcuts.forEach((item) => {
        item.enabled = false;
      });
      return true;
    } catch (e: any) {
      this.debug(e.message);
      return false;
    }
  }

  enableShortcut(accelerator: Accelerator): boolean {
    try {
      const matchShortcuts = this.matchShortcut(
        ...this.parser.parseAccelerator(accelerator),
      );
      if (matchShortcuts.length === 0) {
        this.debug(`Shortcut ${accelerator} is not register yet.`);
        return false;
      }
      matchShortcuts.forEach((item) => {
        item.enabled = true;
      });
      return true;
    } catch (e: any) {
      this.debug(e.message);
      return false;
    }
  }

  isShortcutRegistered(accelerator: Accelerator): boolean {
    try {
      return (
        this.matchShortcut(...this.parser.parseAccelerator(accelerator))
          .length > 0
      );
    } catch (e: any) {
      this.debug(e.message);
      return false;
    }
  }

  getCurrentKeyPressed(): Accelerator {
    return [
      ...this.modifiersPressed
        .map((item) => {
          if (!this.options.strict) {
            return ShortcutRegistry.LooseModifiersName.get(item)!;
          }
          return keyCode2KeyCodeName.get(item)!;
        })
        .reduce<Array<KeyCodeName>>((memo, item) => {
          if (memo.includes(item)) {
            return memo;
          }
          memo.push(item);
          return memo;
        }, []),
      ...(this.normalKeyPressed
        ? [keyCode2KeyCodeName.get(this.normalKeyPressed)!]
        : []),
    ].join(AcceleratorParser.separator);
  }

  onKeydown(cb: KeyboardEventListener): Dispose {
    this.eventTarget.addEventListener('keydown', cb as EventListener);
    return () => {
      this.eventTarget.removeEventListener('keydown', cb as EventListener);
    };
  }

  onKeyup(cb: KeyboardEventListener): Dispose {
    this.eventTarget.addEventListener('keyup', cb as EventListener);
    return () => {
      this.eventTarget.removeEventListener('keyup', cb as EventListener);
    };
  }

  private matchShortcut(
    modifiers: Array<Array<Accelerator>>,
    normalKeys: Array<Accelerator>,
  ): Array<ShortcutRegister> {
    return this.shortcutRegistered.filter((item) => {
      const isModifierMatch = !!item.modifiers.find((item) => {
        return !!modifiers.find((modifier) => {
          const modifiersSet = new Set([...item, ...modifier]);
          return (
            modifiersSet.size === item.length &&
            modifiersSet.size === modifier.length
          );
        });
      });
      const normalKeySet = new Set([...item.normalKeys, ...normalKeys]);
      const isNormalKeyMatch =
        normalKeySet.size < item.normalKeys.length + normalKeys.length;
      return isModifierMatch && isNormalKeyMatch;
    });
  }

  attachElement(ele: Window | HTMLElement): Dispose {
    const handleKeydown = this.handleKeydown.bind(this);
    const handleKeyup = this.handleKeyup.bind(this);
    const clear = this.clear.bind(this);
    ele.addEventListener('keydown', handleKeydown as any);
    ele.addEventListener('keyup', handleKeyup as any);
    // window will unfocus when some system global shortcut triggered.
    ele.addEventListener('blur', clear);
    return () => {
      ele.removeEventListener('keydown', handleKeydown as any);
      ele.removeEventListener('keyup', handleKeyup as any);
      ele.removeEventListener('blur', clear);
      this.clear();
      this.shortcutRegistered = [];
    };
  }

  private handleKeydown(event: KeyboardEvent) {
    if (!this.options.filter!(event)) return;
    const keycode = event.code as KeyCode;
    if (!KeyCodesSupported.includes(keycode)) {
      this.debug(`Unsupported keyCode: ${event.code}!`);
      return;
    }
    if (ShortcutRegistry.keyCodeIsModifiers(keycode)) {
      this.modifiersPressed.push(keycode);
      // reset keycode record when modifiers change
      this.normalKeyPressed = undefined;
    } else {
      const modifiers = [];
      if (event.ctrlKey) {
        modifiers.push('ControlLeft');
      }
      this.normalKeyPressed = keycode;
    }
    this.triggerShortcutEventIfHandlerFound(event);
    this.eventTarget.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: event.code,
        repeat: event.repeat,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey,
        metaKey: event.metaKey,
      }),
    );
  }

  private handleKeyup(event: KeyboardEvent) {
    if (!this.options.filter!(event)) return;
    const keycode = event.code as KeyCode;
    if (ShortcutRegistry.keyCodeIsModifiers(keycode)) {
      this.modifiersPressed = this.modifiersPressed.filter((code) => {
        return keycode !== code;
      });
      this.normalKeyPressed = undefined;
    }
    this.eventTarget.dispatchEvent(
      new KeyboardEvent('keyup', {
        code: event.code,
        repeat: event.repeat,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey,
        metaKey: event.metaKey,
      }),
    );
  }

  private clear() {
    this.modifiersPressed = [];
    this.normalKeyPressed = undefined;
  }

  private triggerShortcutEventIfHandlerFound(event: KeyboardEvent) {
    if (this.normalKeyPressed) {
      const shortcutRegisters = this.shortcutRegistered.filter((item) => {
        return (
          !!item.modifiers.find((item) => {
            const modifiersSet = new Set([...item, ...this.modifiersPressed]);
            return (
              modifiersSet.size === item.length &&
              modifiersSet.size === this.modifiersPressed.length
            );
          }) && item.normalKeys.includes(this.normalKeyPressed!)
        );
      });
      shortcutRegisters.forEach((item) => {
        if (item.enabled) {
          item.callback(event);
        }
      });
    }
  }
}
