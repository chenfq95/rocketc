import debug from 'debug';
import {
  type KeyCode,
  KeyCodesSupported,
  type ModifierKeyCode,
  type NormalKeyCode,
  keyCode2KeyCodeName,
  type ModifierKeyCodeName,
  type KeyCodeName,
  keyCodeName2LooseModeKeyCodeName,
} from './key-codes';
import {
  type Dispose,
  type Filter,
  type KeyboardEventListener,
} from './shortcut-context';
import acceleratorParser, { type Accelerator } from './accelerator-parser';

export interface ShortcutRegister {
  accelerator: Accelerator;
  enabled: boolean;
  callback: KeyboardEventListener;
}

interface InternalShortcutRegister extends ShortcutRegister {
  modifiers: Array<Array<Accelerator>>;
  normalKeys: Array<Accelerator>;
}

interface ShortcutRegisterOptions {
  separator?: string;
  strict?: boolean;
  debug?: boolean | ((...args: any[]) => void);
  filter?: Filter;
  alias?: Record<string, string>;
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

  private static keyCodeIsModifiers(
    keycode: string,
  ): keycode is ModifierKeyCode {
    return ShortcutRegistry.KeyCodeModifiers.has(keycode as ModifierKeyCode);
  }

  private static defaultFilter: Filter = (event) => {
    if (event.repeat) return false;
    if (event.isComposing) return false;
    if (event.target && event.target instanceof HTMLElement) {
      return (
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName) &&
        !event.target.isContentEditable
      );
    }
    return true;
  };

  private readonly parser = acceleratorParser;
  private readonly eventTarget = new EventTarget();
  private readonly defaultDebug = debug('ReactUseShortcuts');
  private options: ShortcutRegisterOptions;
  private shortcutRegistered: Array<InternalShortcutRegister> = [];
  private modifiersPressed: Array<ModifierKeyCode> = [];
  private normalKeyPressed: NormalKeyCode | undefined;

  constructor(options?: ShortcutRegisterOptions) {
    debug.enable('ReactUseShortcuts');
    this.options = options ?? {};
    this.options.strict = this.options.strict ?? false;
    this.options.filter = this.options.filter ?? ShortcutRegistry.defaultFilter;
  }

  private debug(...args: any[]) {
    if (this.options.debug === true) {
      this.defaultDebug.apply(null, args as any);
    } else if (typeof this.options.debug === 'function') {
      this.options.debug.apply(null, args);
    }
  }

  getOptions(): ShortcutRegisterOptions {
    return this.options;
  }

  updateOptions(options: ShortcutRegisterOptions) {
    this.options = options;
  }

  getShortcutRegisters(accelerator?: Accelerator): Array<ShortcutRegister> {
    if (accelerator) {
      return this.matchShortcut(
        ...this.parser.__internal_decodeAccelerator(accelerator, {
          separator: this.options.separator ?? this.parser.defaultSeparator,
          alias: this.options.alias ?? {},
        }),
      ).map((item) => {
        return {
          accelerator: item.accelerator,
          callback: item.callback,
          enabled: item.enabled,
        };
      });
    }
    return this.shortcutRegistered.map((item) => {
      return {
        accelerator: item.accelerator,
        callback: item.callback,
        enabled: item.enabled,
      };
    });
  }

  registerShortcut(
    accelerator: Accelerator,
    callback: KeyboardEventListener,
  ): boolean {
    try {
      const [modifiers, normalKeys] = this.parser.__internal_decodeAccelerator(
        accelerator,
        {
          separator: this.options.separator ?? this.parser.defaultSeparator,
          alias: this.options.alias ?? {},
        },
      );
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

  unregisterShortcut(
    accelerator: Accelerator,
    cb?: KeyboardEventListener,
  ): boolean {
    try {
      let shortcutRegisters = this.matchShortcut(
        ...this.parser.__internal_decodeAccelerator(accelerator, {
          separator: this.options.separator ?? this.parser.defaultSeparator,
          alias: this.options.alias ?? {},
        }),
      );
      if (shortcutRegisters.length === 0) {
        this.debug(`Shortcut ${accelerator} is not register yet.`);
        return false;
      }
      if (cb) {
        shortcutRegisters = shortcutRegisters.filter(
          (item) => item.callback === cb,
        );
        if (shortcutRegisters.length === 0) {
          this.debug(`Callback ${cb.toString()} is not register yet.`);
          return false;
        }
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

  disableShortcut(
    accelerator: Accelerator,
    cb?: KeyboardEventListener,
  ): boolean {
    try {
      let matchShortcuts = this.matchShortcut(
        ...this.parser.__internal_decodeAccelerator(accelerator, {
          separator: this.options.separator ?? this.parser.defaultSeparator,
          alias: this.options.alias ?? {},
        }),
      );
      if (matchShortcuts.length === 0) {
        this.debug(`Shortcut ${accelerator} is not register yet.`);
        return false;
      }
      if (cb) {
        matchShortcuts = matchShortcuts.filter((item) => item.callback === cb);
        if (matchShortcuts.length === 0) {
          this.debug(`Callback ${cb.toString()} is not register yet.`);
          return false;
        }
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

  enableShortcut(
    accelerator: Accelerator,
    cb?: KeyboardEventListener,
  ): boolean {
    try {
      let matchShortcuts = this.matchShortcut(
        ...this.parser.__internal_decodeAccelerator(accelerator, {
          separator: this.options.separator ?? this.parser.defaultSeparator,
          alias: this.options.alias ?? {},
        }),
      );
      if (matchShortcuts.length === 0) {
        this.debug(`Shortcut ${accelerator} is not register yet.`);
        return false;
      }
      if (cb) {
        matchShortcuts = matchShortcuts.filter((item) => item.callback === cb);
        if (matchShortcuts.length === 0) {
          this.debug(`Callback ${cb.toString()} is not register yet.`);
          return false;
        }
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
        this.matchShortcut(
          ...this.parser.__internal_decodeAccelerator(accelerator, {
            separator: this.options.separator ?? this.parser.defaultSeparator,
            alias: this.options.alias ?? {},
          }),
        ).length > 0
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
          const keyCodeName = keyCode2KeyCodeName.get(item)!;
          if (this.options.strict) {
            return keyCodeName;
          }
          return keyCodeName2LooseModeKeyCodeName.get(
            keyCodeName as ModifierKeyCodeName,
          )!;
        })
        .reduce<Array<KeyCodeName>>((prev, item) => {
          if (prev.includes(item)) {
            return prev;
          }
          prev.push(item);
          return prev;
        }, []),
      ...(this.normalKeyPressed
        ? [keyCode2KeyCodeName.get(this.normalKeyPressed)!]
        : []),
    ]
      .map((keyCodeName) => {
        return this.options.alias?.[keyCodeName] ?? keyCodeName;
      })
      .join(this.options.separator ?? this.parser.defaultSeparator);
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
  ): Array<InternalShortcutRegister> {
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
    if (!(this.options.filter ?? ShortcutRegistry.defaultFilter)(event)) return;
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
    if (!(this.options.filter ?? ShortcutRegistry.defaultFilter)(event)) return;
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
          }) &&
          item.normalKeys.includes(this.normalKeyPressed!) &&
          item.enabled
        );
      });
      shortcutRegisters.forEach((item) => {
        item.callback(event);
      });
    }
  }
}
