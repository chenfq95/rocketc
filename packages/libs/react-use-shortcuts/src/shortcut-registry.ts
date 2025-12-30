import debug from 'debug';
import { EventEmitter } from 'events';
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
	modifiers: Array<Accelerator>;
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
	private readonly eventEmitter = new EventEmitter();
	private shortcutRegistered: Array<ShortcutRegister> = [];
	private modifiersPressed: Array<ModifierKeyCode> = [];
	private normalKeysPressed: Array<NormalKeyCode> = [];

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
			const matchShortcut = this.matchShortcut(modifiers, normalKeys);
			if (matchShortcut) {
				this.debug(
					`Shortcut ${accelerator} conflict with ${matchShortcut.accelerator}`,
				);
				return false;
			}
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
			const shortcutRegister = this.matchShortcut(
				...this.parser.parseAccelerator(accelerator),
			);
			if (!shortcutRegister) {
				this.debug(`Shortcut ${accelerator} is not register yet.`);
				return false;
			}
			this.shortcutRegistered = this.shortcutRegistered.filter(
				(item) => item !== shortcutRegister,
			);
			return true;
		} catch (e: any) {
			this.debug(e.message);
			return false;
		}
	}

	disableShortcut(accelerator: Accelerator): boolean {
		try {
			const [modifiers, normalKeys] = this.parser.parseAccelerator(accelerator);
			const matchShortcut = this.matchShortcut(modifiers, normalKeys);
			if (!matchShortcut) {
				this.debug(`Shortcut ${accelerator} is not register yet.`);
				return false;
			}
			matchShortcut.enabled = false;
			return true;
		} catch (e: any) {
			this.debug(e.message);
			return false;
		}
	}

	enableShortcut(accelerator: Accelerator): boolean {
		try {
			const [modifiers, normalKeys] = this.parser.parseAccelerator(accelerator);
			const matchShortcut = this.matchShortcut(modifiers, normalKeys);
			if (!matchShortcut) {
				this.debug(`Shortcut ${accelerator} is not register yet.`);
				return false;
			}
			matchShortcut.enabled = true;
			return true;
		} catch (e: any) {
			this.debug(e.message);
			return false;
		}
	}

	isShortcutRegistered(accelerator: Accelerator): boolean {
		try {
			return !!this.matchShortcut(...this.parser.parseAccelerator(accelerator));
		} catch (e: any) {
			this.debug(e.message);
			return false;
		}
	}

	getCurrentKeyPressed(): Accelerator {
		return [
			...this.modifiersPressed
				.map((item) => {
					if (
						!this.options.strict &&
						ShortcutRegistry.keyCodeIsModifiers(item)
					) {
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
			...this.normalKeysPressed.map((item) => keyCode2KeyCodeName.get(item)!),
		].join(AcceleratorParser.separator);
	}

	onKeydown(cb: KeyboardEventListener): Dispose {
		this.eventEmitter.addListener('keydown', cb);
		return () => {
			this.eventEmitter.removeListener('keydown', cb);
		};
	}

	onKeyup(cb: KeyboardEventListener): Dispose {
		this.eventEmitter.addListener('keyup', cb);
		return () => {
			this.eventEmitter.removeListener('keyup', cb);
		};
	}

	private matchShortcut(
		modifiers: Array<Accelerator>,
		normalKeys: Array<Accelerator>,
	): ShortcutRegister | undefined {
		return this.shortcutRegistered.find((item) => {
			const modifiersSet = new Set([...item.modifiers, ...modifiers]);
			const isModifierMatch =
				modifiersSet.size < item.modifiers.length + modifiers.length;
			const isNormalKeyMatch = normalKeys.find((normalKey) => {
				return item.normalKeys.find((itemNormalKey) => {
					return (
						itemNormalKey.includes(normalKey) ||
						normalKey.includes(itemNormalKey)
					);
				});
			});
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
			this.normalKeysPressed = [];
		} else {
			this.normalKeysPressed.push(keycode);
		}
		this.triggerShortcutEventIfHandlerFound(event);
		this.eventEmitter.emit('keydown', event);
	}

	private handleKeyup(event: KeyboardEvent) {
		if (!this.options.filter!(event)) return;
		const keycode = event.code as KeyCode;
		if (ShortcutRegistry.keyCodeIsModifiers(keycode)) {
			this.modifiersPressed = this.modifiersPressed.filter((code) => {
				return keycode !== code;
			});
			// reset keycode record when modifiers change
			this.normalKeysPressed = [];
		}
		this.eventEmitter.emit('keyup', event);
	}

	private clear() {
		this.modifiersPressed = [];
		this.normalKeysPressed = [];
	}

	private triggerShortcutEventIfHandlerFound(event: KeyboardEvent) {
		const modifier = [...this.modifiersPressed]
			.sort()
			.join(AcceleratorParser.separator);
		const normalKey = this.normalKeysPressed.join(AcceleratorParser.separator);
		const shortcutRegister = this.shortcutRegistered.find((item) => {
			return (
				item.modifiers.includes(modifier) &&
				item.normalKeys.find((itemNormalKey) =>
					normalKey.endsWith(itemNormalKey),
				)
			);
		});
		if (shortcutRegister) {
			if (shortcutRegister.enabled) {
				shortcutRegister.callback(event);
			}
			this.normalKeysPressed = [];
		}
	}
}
