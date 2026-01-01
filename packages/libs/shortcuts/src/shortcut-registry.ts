import {
  type KeyCode,
  type ModifierKeyCode,
  type NormalKeyCode,
} from './key-codes';

import acceleratorParser, { type Accelerator } from './accelerator-parser';

export type Dispose = () => void;
export type Filter = (event: KeyboardEvent) => boolean;
export type KeyboardEventListener = (event: KeyboardEvent) => void;
export type KeyPressedChangedEventListener = (
  event: CustomEvent<'keyup' | 'keydown'>,
) => void;

export interface ShortcutRegister {
  accelerator: Accelerator;
  enabled: boolean;
  callback: KeyboardEventListener;
}

interface ShortcutRegisterOptions {
  separator?: string;
  strict?: boolean;
  debug?: boolean | ((...args: any[]) => void);
  filter?: Filter;
  alias?: Record<string, string>;
}

class ShortcutRegistry {
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

  private readonly elementAttached = new Map<
    Window | HTMLElement,
    {
      dispose: Dispose;
      attachCount: number;
    }
  >();
  private readonly parser = acceleratorParser;
  private readonly eventTarget = new EventTarget();
  private options: ShortcutRegisterOptions;
  private shortcutRegistered: Array<ShortcutRegister> = [];
  private modifiersPressed: Array<ModifierKeyCode> = [];
  private normalKeyPressed: NormalKeyCode | undefined;

  constructor(options?: ShortcutRegisterOptions) {
    this.options = options ?? {};
    this.options.strict = this.options.strict ?? false;
    this.options.filter = this.options.filter ?? ShortcutRegistry.defaultFilter;
  }

  private debug(...args: any[]) {
    if (this.options.debug === true) {
      console.debug('@rocketc/shortcuts: ', ...args);
    } else if (typeof this.options.debug === 'function') {
      this.options.debug.apply(null, args);
    }
  }

  getOptions(): ShortcutRegisterOptions {
    return this.options;
  }

  setOptions(options: ShortcutRegisterOptions) {
    this.options = options;
  }

  getShortcutRegisters(accelerator?: Accelerator): Array<ShortcutRegister> {
    if (accelerator) {
      return this.matchShortcut(accelerator).map((item) => {
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
      const isValid = this.parser.validate(accelerator, {
        separator: this.options.separator ?? this.parser.defaultSeparator,
        alias: this.options.alias ?? {},
      });
      if (!isValid) {
        throw new Error(`Invalid accelerator: ${accelerator}`);
      }
      this.shortcutRegistered.push({
        accelerator,
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
      let shortcutRegisters = this.matchShortcut(accelerator);
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
      let matchShortcuts = this.matchShortcut(accelerator);
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
      let matchShortcuts = this.matchShortcut(accelerator);
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
      return this.matchShortcut(accelerator).length > 0;
    } catch (e: any) {
      this.debug(e.message);
      return false;
    }
  }

  getCurrentKeyPressed(): Accelerator {
    return this.getCurrentAccelerator(this.options.strict ?? false);
  }

  onKeyPressedChanged(cb: KeyPressedChangedEventListener): Dispose {
    this.eventTarget.addEventListener('keyPressedChanged', cb as EventListener);
    return () => {
      this.eventTarget.removeEventListener(
        'keyPressedChanged',
        cb as EventListener,
      );
    };
  }

  attachElement(ele: Window | HTMLElement): Dispose {
    const attached = this.elementAttached.get(ele);
    let dispose: Dispose;
    if (attached) {
      attached.attachCount++;
      dispose = attached.dispose;
    } else {
      const handleKeydown = this.handleKeydown.bind(this);
      const handleKeyup = this.handleKeyup.bind(this);
      ele.addEventListener('keydown', handleKeydown as any);
      ele.addEventListener('keyup', handleKeyup as any);
      if (this.elementAttached.size === 0) {
        window.addEventListener('blur', this.clear);
      }
      dispose = () => {
        const attached = this.elementAttached.get(ele);
        if (!attached) return; // Already disposed
        attached.attachCount--;
        if (attached.attachCount !== 0) return;
        ele.removeEventListener('keydown', handleKeydown as any);
        ele.removeEventListener('keyup', handleKeyup as any);
        this.elementAttached.delete(ele);
        if (this.elementAttached.size === 0) {
          window.removeEventListener('blur', this.clear);
        }
      };
      this.elementAttached.set(ele, { dispose, attachCount: 1 });
    }
    let disposed = false;
    return () => {
      if (disposed) return;
      disposed = true;
      dispose();
    };
  }

  private matchShortcut(accelerator: Accelerator): Array<ShortcutRegister> {
    const options = {
      separator: this.options.separator ?? this.parser.defaultSeparator,
      alias: this.options.alias ?? {},
    };
    return this.shortcutRegistered.filter((shortcutRegister) => {
      return this.parser.isAcceleratorMatched(
        shortcutRegister.accelerator,
        accelerator,
        options,
      );
    });
  }

  private handleKeydown(event: KeyboardEvent) {
    if (!(this.options.filter ?? ShortcutRegistry.defaultFilter)(event)) return;
    const keycode = event.code;
    if (!this.parser.__internal_isKeyCodeSupported(keycode)) {
      this.debug(`Unsupported keyCode: ${event.code}!`);
      return;
    }
    if (this.parser.__internal_isModifierKeyCode(keycode)) {
      if (!this.modifiersPressed.includes(keycode)) {
        this.modifiersPressed.push(keycode);
      }
    } else {
      this.normalKeyPressed = keycode as NormalKeyCode;
    }
    this.triggerShortcutEventIfHandlerFound(event);
    this.eventTarget.dispatchEvent(
      new CustomEvent<'keydown'>('keyPressedChanged', { detail: 'keydown' }),
    );
  }

  private handleKeyup(event: KeyboardEvent) {
    const keycode = event.code as KeyCode;
    if (!this.parser.__internal_isKeyCodeSupported(keycode)) {
      this.debug(`Unsupported keyCode: ${event.code}!`);
      return;
    }
    if (this.parser.__internal_isModifierKeyCode(keycode)) {
      if (this.modifiersPressed.includes(keycode)) {
        this.modifiersPressed = this.modifiersPressed.filter((code) => {
          return keycode !== code;
        });
      }
    } else if (this.normalKeyPressed === keycode) {
      this.normalKeyPressed = undefined;
    }
    if (!(this.options.filter ?? ShortcutRegistry.defaultFilter)(event)) return;
    this.eventTarget.dispatchEvent(
      new CustomEvent<'keyup'>('keyPressedChanged', { detail: 'keyup' }),
    );
  }

  clear = () => {
    this.modifiersPressed = [];
    this.normalKeyPressed = undefined;
  };

  private getCurrentAccelerator(strict: boolean = true): Accelerator {
    return this.parser.__internal_serializeAccelerator(
      this.modifiersPressed,
      this.normalKeyPressed,
      {
        separator: this.options.separator ?? this.parser.defaultSeparator,
        alias: this.options.alias ?? {},
        strict,
      },
    );
  }

  private triggerShortcutEventIfHandlerFound(event: KeyboardEvent) {
    if (this.normalKeyPressed && this.shortcutRegistered.length > 0) {
      const currentAccelerator = this.getCurrentAccelerator(true);
      this.matchShortcut(currentAccelerator).forEach((shortcutRegister) => {
        if (!shortcutRegister.enabled) return;
        try {
          shortcutRegister.callback(event);
        } catch (e: any) {
          this.debug(`Error in callback: ${e.message}`);
        }
      });
    }
  }
}

export default ShortcutRegistry;
