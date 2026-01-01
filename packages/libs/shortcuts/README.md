# @rocketc/shortcuts

---

Pure JavaScript shortcut solution without any framework dependencies.

## Features

- **Framework-agnostic**: Works with any JavaScript framework or vanilla JavaScript
- **Strict/Loose mode**: Support both strict and loose matching modes
- **Dynamic register/unregister**: Register and unregister shortcuts at runtime
- **Dynamic enable/disable**: Enable or disable registered shortcuts dynamically
- **Flexible key combinations**: Support complex modifier and normal key combinations
- **Modern browser API**: Uses modern browser APIs (`KeyboardEvent.code`)
- **Full TypeScript support**: Complete type definitions included
- **Shortcut validation**: Built-in validation for accelerator strings
- **Custom filters**: Filter keyboard events based on your needs
- **Custom aliases**: Define custom key name aliases
- **Event listeners**: Support `keydown` and `keyup` event listeners

## Installation

```bash
# npm
npm install @rocketc/shortcuts

# yarn
yarn add @rocketc/shortcuts

# pnpm
pnpm add @rocketc/shortcuts
```

## Supported Keys

### Modifiers

| Key            | Alias                                                                                              | Notes                                    |
| -------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `ControlLeft`  | `Ctrl` `CtrlLeft` `Control` `ControlLeft`                                                          |                                          |
| `ControlRight` | `Ctrl` `CtrlRight` `Control` `ControlRight`                                                        |                                          |
| `MetaLeft`     | `Meta` `MetaLeft` `Super` `SuperLeft` `Command` `CommandLeft` `Cmd` `CmdLeft` `Win` `WinLeft`      | `Windows` on Windows, `Command` on MacOS |
| `MetaRight`    | `Meta` `MetaRight` `Super` `SuperRight` `Command` `CommandRight` `Cmd` `CmdRight` `Win` `WinRight` | `Windows` on Windows, `Command` on MacOS |
| `ShiftLeft`    | `Shift` `ShiftLeft`                                                                                |                                          |
| `ShiftRight`   | `Shift` `ShiftRight`                                                                               |                                          |
| `AltLeft`      | `Alt` `AltLeft` `Option` `OptionLeft`                                                              | `Option` is only available on MacOS.     |
| `AltRight`     | `Alt` `AltRight` `Option` `OptionRight`                                                            | `Option` is only available on MacOS.     |
| `OSLeft`       | `Meta` `MetaLeft` `Super` `SuperLeft`                                                              | Firefox only                             |
| `OSRight`      | `Meta` `MetaRight` `Super` `SuperRight`                                                            | Firefox only                             |

### Normal Keys

#### Function Keys

| Key   | Notes        |
| ----- | ------------ |
| `F1`  | Function key |
| `F2`  | Function key |
| `F3`  | Function key |
| `F4`  | Function key |
| `F5`  | Function key |
| `F6`  | Function key |
| `F7`  | Function key |
| `F8`  | Function key |
| `F9`  | Function key |
| `F10` | Function key |
| `F11` | Function key |
| `F12` | Function key |

#### Number Keys

| Key | Notes                                   |
| --- | --------------------------------------- |
| `0` | Zero (main keyboard)                    |
| `1` | One (main keyboard)                     |
| `2` | Two (main keyboard)                     |
| `3` | Three (main keyboard)                   |
| `4` | Four (main keyboard)                    |
| `5` | Five (main keyboard)                    |
| `6` | Six (main keyboard)                     |
| `7` | Seven (main keyboard)                   |
| `8` | Eight (main keyboard)                   |
| `9` | Nine (main keyboard)                    |
| `-` | Minus (main keyboard)                   |
| `=` | Equal (main keyboard)                   |
| `+` | Plus (main keyboard, not `Shift+=`)     |
| `*` | Multiply (main keyboard, not `Shift+8`) |

#### Numpad Keys

| Key        | Notes                 |
| ---------- | --------------------- |
| `num0`     | Numpad zero           |
| `num1`     | Numpad one            |
| `num2`     | Numpad two            |
| `num3`     | Numpad three          |
| `num4`     | Numpad four           |
| `num5`     | Numpad five           |
| `num6`     | Numpad six            |
| `num7`     | Numpad seven          |
| `num8`     | Numpad eight          |
| `num9`     | Numpad nine           |
| `numadd`   | Numpad add (`+`)      |
| `numsub`   | Numpad subtract (`-`) |
| `nummult`  | Numpad multiply (`*`) |
| `numdiv`   | Numpad divide (`/`)   |
| `numenter` | Numpad enter          |
| `numdec`   | Numpad decimal (`.`)  |
| `numLock`  | NumLock               |

#### Alphabet Keys

| Key | Notes       |
| --- | ----------- |
| `a` | Lowercase a |
| `b` | Lowercase b |
| `c` | Lowercase c |
| `d` | Lowercase d |
| `e` | Lowercase e |
| `f` | Lowercase f |
| `g` | Lowercase g |
| `h` | Lowercase h |
| `i` | Lowercase i |
| `j` | Lowercase j |
| `k` | Lowercase k |
| `l` | Lowercase l |
| `m` | Lowercase m |
| `n` | Lowercase n |
| `o` | Lowercase o |
| `p` | Lowercase p |
| `q` | Lowercase q |
| `r` | Lowercase r |
| `s` | Lowercase s |
| `t` | Lowercase t |
| `u` | Lowercase u |
| `v` | Lowercase v |
| `w` | Lowercase w |
| `x` | Lowercase x |
| `y` | Lowercase y |
| `z` | Lowercase z |
| `A` | Uppercase A |
| `B` | Uppercase B |
| `C` | Uppercase C |
| `D` | Uppercase D |
| `E` | Uppercase E |
| `F` | Uppercase F |
| `G` | Uppercase G |
| `H` | Uppercase H |
| `I` | Uppercase I |
| `J` | Uppercase J |
| `K` | Uppercase K |
| `L` | Uppercase L |
| `M` | Uppercase M |
| `N` | Uppercase N |
| `O` | Uppercase O |
| `P` | Uppercase P |
| `Q` | Uppercase Q |
| `R` | Uppercase R |
| `S` | Uppercase S |
| `T` | Uppercase T |
| `U` | Uppercase U |
| `V` | Uppercase V |
| `W` | Uppercase W |
| `X` | Uppercase X |
| `Y` | Uppercase Y |
| `Z` | Uppercase Z |

#### Punctuation Keys

| Key     | Notes        |
| ------- | ------------ |
| `,`     | Comma        |
| `.`     | Period       |
| `/`     | Slash        |
| `;`     | Semicolon    |
| `'`     | Quote        |
| `[`     | BracketLeft  |
| `]`     | BracketRight |
| `\`     | Backslash    |
| `` ` `` | Backquote    |

#### Other Keys

| Key          | Notes                          |
| ------------ | ------------------------------ |
| `Space`      | Space bar                      |
| `Escape`     | Escape key (alias: `Esc`)      |
| `Esc`        | Escape key (alias of `Escape`) |
| `Backspace`  | Backspace                      |
| `Delete`     | Delete key                     |
| `Tab`        | Tab                            |
| `CapsLock`   | Caps Lock                      |
| `Enter`      | Enter key                      |
| `ArrowUp`    | Up arrow                       |
| `ArrowDown`  | Down arrow                     |
| `ArrowLeft`  | Left arrow                     |
| `ArrowRight` | Right arrow                    |
| `Home`       | Home                           |
| `End`        | End                            |
| `PageUp`     | Page Up                        |
| `PageDown`   | Page Down                      |
| `Insert`     | Insert                         |

## Quick Start

### Basic Usage

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

// Create a registry instance
const registry = new ShortcutRegistry();

// Attach to window
const dispose = registry.attachElement(window);

// Register a shortcut
registry.registerShortcut('Ctrl+a', (event) => {
  console.log('Ctrl+A pressed!');
  event.preventDefault();
});

// Clean up when done
dispose();
```

### With Options

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry({
  strict: false, // Enable loose mode (default: false)
  debug: true, // Enable debug logging
  filter: (event) => {
    // Custom filter logic
    return !event.repeat;
  },
  alias: {
    Save: 'Ctrl',
  },
});

registry.attachElement(window);
registry.registerShortcut('Save+s', () => {
  console.log('Save shortcut triggered');
});
```

## Examples

### 1. Register Single Key Shortcut

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry();
registry.attachElement(window);

registry.registerShortcut('a', (event) => {
  console.log('Key A pressed');
  event.preventDefault();
});
```

### 2. Register Shortcut with Modifiers

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry();
registry.attachElement(window);

registry.registerShortcut('Ctrl+Shift+a', (event) => {
  console.log('Ctrl+Shift+A pressed');
  event.preventDefault();
});
```

### 3. Dynamic Enable/Disable

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry();
registry.attachElement(window);

// Register shortcut
registry.registerShortcut('Ctrl+a', () => {
  console.log('Ctrl+A pressed');
});

// Disable it
registry.disableShortcut('Ctrl+a');

// Enable it again
registry.enableShortcut('Ctrl+a');
```

### 4. Multiple Callbacks for Same Shortcut

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry();
registry.attachElement(window);

const handler1 = () => console.log('Handler 1');
const handler2 = () => console.log('Handler 2');

// Register multiple handlers
registry.registerShortcut('Ctrl+a', handler1);
registry.registerShortcut('Ctrl+a', handler2);

// Disable only handler1
registry.disableShortcut('Ctrl+a', handler1);

// Unregister only handler1
registry.unregisterShortcut('Ctrl+a', handler1);
```

### 5. Scoped Shortcuts (Attach to Specific Element)

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry();
const element = document.getElementById('my-element');

// Attach to specific element
const dispose = registry.attachElement(element);

// Register shortcut (only works when element is focused)
registry.registerShortcut('Ctrl+a', () => {
  console.log('Ctrl+A pressed in element');
});

// Clean up
dispose();
```

### 6. Event Listeners

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry();
registry.attachElement(window);

// Listen to all keydown events
const disposeKeydown = registry.onKeydown((event) => {
  console.log('Key pressed:', event.code);
});

// Listen to all keyup events
const disposeKeyup = registry.onKeyup((event) => {
  console.log('Key released:', event.code);
});

// Get current pressed keys
const currentKeys = registry.getCurrentKeyPressed();
console.log('Current keys:', currentKeys);

// Clean up
disposeKeydown();
disposeKeyup();
```

### 6.1. Clear State

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry();
registry.attachElement(window);

// Press some keys
dispatchEvent('keydown', 'ControlLeft');
dispatchEvent('keydown', 'KeyA');
console.log(registry.getCurrentKeyPressed()); // 'ControlLeft+A'

// Clear the pressed keys state
registry.clear();
console.log(registry.getCurrentKeyPressed()); // ''
```

### 7. Custom Filter

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry({
  filter: (event) => {
    // Only handle events from non-input elements
    if (event.target instanceof HTMLElement) {
      return !['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName);
    }
    return true;
  },
});

registry.attachElement(window);
registry.registerShortcut('Ctrl+a', () => {
  console.log('Ctrl+A pressed');
});
```

### 8. Custom Aliases

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry({
  alias: {
    Save: 'Ctrl',
    Quit: 'Ctrl+Shift',
  },
});

registry.attachElement(window);

// Use custom alias
registry.registerShortcut('Save+s', () => {
  console.log('Save shortcut');
});

registry.registerShortcut('Quit+q', () => {
  console.log('Quit shortcut');
});
```

### 9. Loose Mode

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry({
  strict: false, // Enable loose mode
});

registry.attachElement(window);

// In loose mode, getCurrentKeyPressed returns normalized keys
registry.onKeydown(() => {
  // If ControlLeft+A is pressed, returns 'Ctrl+a' instead of 'ControlLeft+A'
  console.log(registry.getCurrentKeyPressed()); // 'Ctrl+a'
});
```

### 10. Using Accelerator Parser

```typescript
import { acceleratorParser } from '@rocketc/shortcuts';

// Validate accelerator string
const isValid = acceleratorParser.validate('Ctrl+a');
console.log(isValid); // true

// Convert to loose mode
const loose = acceleratorParser.convertAcceleratorToLooseMode('ControlLeft+a');
console.log(loose); // 'Ctrl+a'

// Parse accelerator
const parsed = acceleratorParser.parse('Ctrl+Shift+a');
console.log(parsed); // ['Ctrl', 'Shift', 'a']

// Check if key code name is supported
const isSupported = acceleratorParser.isKeyCodeNameSupported('Ctrl');
console.log(isSupported); // true

// Check if accelerators match
const isMatched = acceleratorParser.isAcceleratorMatched(
  'Ctrl+a',
  'ControlLeft+KeyA',
);
console.log(isMatched); // true

// Get default separator
const separator = acceleratorParser.defaultSeparator;
console.log(separator); // '+'
```

## API Reference

### `ShortcutRegistry`

Main class for managing keyboard shortcuts.

#### Constructor

```typescript
new ShortcutRegistry(options?: ShortcutRegisterOptions)
```

**Options:**

```typescript
interface ShortcutRegisterOptions {
  separator?: string; // Default: '+'
  strict?: boolean; // Default: false (loose mode by default)
  debug?: boolean | ((...args: any[]) => void); // Default: false
  filter?: Filter; // Custom event filter
  alias?: Record<string, string>; // Custom key aliases
}
```

#### Methods

##### `attachElement(ele: Window | HTMLElement): Dispose`

Attach keyboard event listeners to the specified element. Returns a dispose function to detach listeners.

**Note:**

- Automatically attaches a global `window` blur event listener to clear the internal state when the window loses focus. This listener is attached only once when the first element is attached, and removed when the last element is disposed.
- All listeners (keydown, keyup, and window blur) are properly cleaned up when the dispose function is called.

##### `registerShortcut(accelerator: Accelerator, callback: KeyboardEventListener): boolean`

Register a shortcut handler. Returns `false` if the shortcut is invalid.

##### `unregisterShortcut(accelerator: Accelerator, cb?: KeyboardEventListener): boolean`

Unregister a shortcut handler. If `cb` is provided, only unregister the specific callback. Returns `false` if the shortcut is not registered.

##### `enableShortcut(accelerator: Accelerator, cb?: KeyboardEventListener): boolean`

Enable a shortcut. If `cb` is provided, only enable the specific callback. Returns `false` if the shortcut is not registered.

##### `disableShortcut(accelerator: Accelerator, cb?: KeyboardEventListener): boolean`

Disable a shortcut. If `cb` is provided, only disable the specific callback. Returns `false` if the shortcut is not registered.

##### `isShortcutRegistered(accelerator: Accelerator): boolean`

Check if a shortcut is registered.

##### `getCurrentKeyPressed(): Accelerator`

Get the current pressed keys as an accelerator string.

**Note:**

- Returns an empty string (`''`) when no keys are currently pressed (no modifiers and no normal key).
- The internal state (`modifiersPressed` and `normalKeyPressed`) is automatically cleared when the window loses focus (via a global `window` blur event listener attached by `attachElement`). If you need to manually clear the state, you can call `clear()`.

##### `onKeydown(listener: KeyboardEventListener): Dispose`

Register a `keydown` event listener. Returns a dispose function.

##### `onKeyup(listener: KeyboardEventListener): Dispose`

Register a `keyup` event listener. Returns a dispose function.

**Note:** In `handleKeyup`, the internal state is updated before the filter check. This ensures that the state remains consistent even if the filter returns `false` for the event. However, the `eventTarget.dispatchEvent` (which triggers `onKeyup` listeners) only occurs if the filter returns `true`. This design ensures state consistency while respecting the filter configuration.

##### `getOptions(): ShortcutRegisterOptions`

Get current options.

##### `setOptions(options: ShortcutRegisterOptions): void`

Update options. **Note**: This replaces all options, not merges them.

##### `getShortcutRegisters(accelerator?: Accelerator): Array<ShortcutRegister>`

Get all registered shortcuts, or shortcuts for a specific accelerator.

##### `clear(): void`

Clear the current pressed keys state (modifiers and normal keys). This is useful for resetting the state when needed.

**Note:** The library automatically clears the state when the window loses focus (via a global `window` blur event listener attached by `attachElement`). You can also manually call `clear()` if you need to reset the state at other times.

**Example:**

```typescript
const registry = new ShortcutRegistry();
registry.attachElement(window);

// Press some keys
dispatchEvent('keydown', 'ControlLeft');
dispatchEvent('keydown', 'KeyA');
console.log(registry.getCurrentKeyPressed()); // 'ControlLeft+A'

// Clear the state
registry.clear();
console.log(registry.getCurrentKeyPressed()); // ''
```

### `acceleratorParser`

Utility object for parsing and validating accelerator strings.

#### Methods

##### `parse(accelerator: Accelerator, options?): Array<KeyCodeName>`

Parse an accelerator string into an array of key code names.

**Options:**

```typescript
{
  separator?: string; // Default: '+'
  alias?: Record<string, string>; // Custom key aliases
}
```

##### `validate(accelerator: Accelerator, options?): boolean`

Validate if an accelerator string is valid. Returns `true` if valid, `false` otherwise.

**Options:**

```typescript
{
  separator?: string; // Default: '+'
  alias?: Record<string, string>; // Custom key aliases
}
```

##### `convertAcceleratorToLooseMode(accelerator: Accelerator, options?): Accelerator`

Convert an accelerator to loose mode format. In loose mode, modifier keys are normalized (e.g., `ControlLeft` and `ControlRight` both become `Ctrl`).

**Options:**

```typescript
{
  separator?: string; // Default: '+'
  alias?: Record<string, string>; // Custom key aliases
}
```

##### `isKeyCodeNameSupported(keyCodeName: string): boolean`

Check if a key code name is valid.

##### `isAcceleratorMatched(source: Accelerator, target: Accelerator, options?): boolean`

Check if two accelerators match each other.

**Options:**

```typescript
{
  separator?: string; // Default: '+'
  alias?: Record<string, string>; // Custom key aliases
}
```

##### `defaultSeparator: string`

The default separator used for accelerator strings (default: `'+'`).

### Types

```typescript
type Accelerator = string;
type Dispose = () => void;
type Filter = (event: KeyboardEvent) => boolean;
type KeyboardEventListener = (event: KeyboardEvent) => void;
type KeyCodeName = ModifierKeyCodeName | NormalKeyCodeName;

interface ShortcutRegister {
  accelerator: Accelerator;
  enabled: boolean;
  callback: KeyboardEventListener;
}
```

**Note:** `KeyCodeName` is exported from the package and can be imported directly:

```typescript
import type { KeyCodeName } from '@rocketc/shortcuts';
```

## Behavior Notes

### State Management

- **Window Focus:** The internal state (`modifiersPressed` and `normalKeyPressed`) is automatically cleared when the window loses focus. This is handled by a global `window` blur event listener that is automatically attached when you call `attachElement()` for the first time, and removed when the last element is disposed. You don't need to manually handle this unless you're not using `attachElement()`.

- **Keyup Event Filtering:** In `handleKeyup`, the internal state is updated before the filter check. This ensures that the state remains consistent even if the filter returns `false` for the event. However, the `eventTarget.dispatchEvent` (which triggers `onKeyup` listeners) only occurs if the filter returns `true`. This design ensures state consistency while respecting the filter configuration.

- **Empty State:** When no keys are pressed, `getCurrentKeyPressed()` returns an empty string (`''`). This is the expected behavior and indicates that no keys are currently being tracked.

- **Rapid Key Presses:** When multiple normal keys are pressed rapidly, the `normalKeyPressed` state will be overwritten by the latest key. This is the normal behavior for keyboard events, as only one normal key can be pressed at a time. If a previous key's `keyup` event arrives after it has been overwritten, the state will not be cleared for that key (since it no longer matches the current state). This is expected behavior and reflects the actual keyboard state.

## Shortcut Match Rules

| **Actions**                                                    | **Accelerator**         | **Matched** |
| :------------------------------------------------------------- | ----------------------- | ----------- |
| press`ControlLeft` press `AltLeft` release `AltLeft` press `A` | `Control+a`             | ✅          |
| press`ControlLeft` press `AltLeft` press `A`                   | `Control+a`             | ❌          |
| press`ControlRight` press `A`                                  | `Control+a`             | ✅          |
| press`ControlRight` press `B` release `B` press `A`            | `Control+a`             | ✅          |
| press`ControlLeft` press `A`                                   | `Control+a`             | ✅          |
| press`MetaLeft` press `A`                                      | `Command+a` or `Meta+a` | ✅          |

## Browser Compatibility

- Chrome ≥ 48
- Firefox ≥ 38
- Safari ≥ 10.1
- Edge ≥ 79

## React Integration

For React applications, use [`@rocketc/react-use-shortcuts`](../react-use-shortcuts/README.md) which provides React hooks and context providers built on top of this library.

## License

Distributed under the MIT License. See `LICENSE` for more information.
