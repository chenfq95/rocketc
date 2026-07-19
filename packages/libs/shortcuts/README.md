# @rocketc/shortcuts

---

不依赖任何框架的纯 JavaScript 快捷键解决方案。

A pure JavaScript shortcut solution without framework dependencies.

## 特性 / Features

- **框架无关**：适用于任意 JavaScript 框架或原生 JavaScript。<br>
  **Framework-agnostic**: Works with any JavaScript framework or vanilla JavaScript.
- **严格/宽松模式**：支持严格和宽松两种匹配模式。<br>
  **Strict/Loose Mode**: Supports both strict and loose matching modes.
- **动态注册/注销**：在运行时注册和注销快捷键。<br>
  **Dynamic Registration/Unregistration**: Registers and unregisters shortcuts at runtime.
- **动态启用/禁用**：动态启用或禁用已注册的快捷键。<br>
  **Dynamic Enable/Disable**: Dynamically enables or disables registered shortcuts.
- **灵活的按键组合**：支持复杂的修饰键和普通键组合。<br>
  **Flexible Key Combinations**: Supports complex combinations of modifier and normal keys.
- **现代浏览器 API**：使用 `KeyboardEvent.code` 等现代浏览器 API。<br>
  **Modern Browser APIs**: Uses modern browser APIs such as `KeyboardEvent.code`.
- **完整 TypeScript 支持**：包含完整的类型定义。<br>
  **Full TypeScript Support**: Includes complete type definitions.
- **快捷键校验**：内置快捷键字符串校验。<br>
  **Shortcut Validation**: Includes built-in validation for accelerator strings.
- **自定义过滤器**：按需过滤键盘事件。<br>
  **Custom Filters**: Filters keyboard events according to application needs.
- **自定义别名**：定义自定义按键名称别名。<br>
  **Custom Aliases**: Defines custom key name aliases.
- **事件监听器**：支持 `keydown` 和 `keyup` 事件监听。<br>
  **Event Listeners**: Supports `keydown` and `keyup` event listeners.

## 安装 / Installation

```bash
# npm
npm install @rocketc/shortcuts

# yarn
yarn add @rocketc/shortcuts

# pnpm
pnpm add @rocketc/shortcuts
```

## 支持的按键 / Supported Keys

### 修饰键 / Modifiers

| 按键 / Key     | 别名 / Aliases                                                                                     | 说明 / Notes                                                                            |
| -------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `ControlLeft`  | `Ctrl` `CtrlLeft` `Control` `ControlLeft`                                                          |                                                                                         |
| `ControlRight` | `Ctrl` `CtrlRight` `Control` `ControlRight`                                                        |                                                                                         |
| `MetaLeft`     | `Meta` `MetaLeft` `Super` `SuperLeft` `Command` `CommandLeft` `Cmd` `CmdLeft` `Win` `WinLeft`      | Windows 上为 `Windows`，macOS 上为 `Command` / `Windows` on Windows, `Command` on macOS |
| `MetaRight`    | `Meta` `MetaRight` `Super` `SuperRight` `Command` `CommandRight` `Cmd` `CmdRight` `Win` `WinRight` | Windows 上为 `Windows`，macOS 上为 `Command` / `Windows` on Windows, `Command` on macOS |
| `ShiftLeft`    | `Shift` `ShiftLeft`                                                                                |                                                                                         |
| `ShiftRight`   | `Shift` `ShiftRight`                                                                               |                                                                                         |
| `AltLeft`      | `Alt` `AltLeft` `Option` `OptionLeft`                                                              | `Option` 仅适用于 macOS / `Option` is available only on macOS                           |
| `AltRight`     | `Alt` `AltRight` `Option` `OptionRight`                                                            | `Option` 仅适用于 macOS / `Option` is available only on macOS                           |
| `OSLeft`       | `Meta` `MetaLeft` `Super` `SuperLeft`                                                              | 仅 Firefox / Firefox only                                                               |
| `OSRight`      | `Meta` `MetaRight` `Super` `SuperRight`                                                            | 仅 Firefox / Firefox only                                                               |

### 普通键 / Normal Keys

#### 功能键 / Function Keys

`F1`、`F2`、`F3`、`F4`、`F5`、`F6`、`F7`、`F8`、`F9`、`F10`、`F11`、`F12`

`F1`, `F2`, `F3`, `F4`, `F5`, `F6`, `F7`, `F8`, `F9`, `F10`, `F11`, `F12`

#### 数字键 / Number Keys

- 主键盘数字 / Main keyboard digits：`0`、`1`、`2`、`3`、`4`、`5`、`6`、`7`、`8`、`9`
- 主键盘运算符 / Main keyboard operators：`-`、`=`、`+`、`*`
- `+` 表示主键盘加号，而不是 `Shift+=`。 / `+` means the main keyboard plus key, not `Shift+=`.
- `*` 表示主键盘乘号，而不是 `Shift+8`。 / `*` means the main keyboard multiply key, not `Shift+8`.

#### 数字小键盘 / Numpad Keys

| 按键 / Key | 说明 / Notes                        |
| ---------- | ----------------------------------- |
| `num0`     | 小键盘 0 / Numpad zero              |
| `num1`     | 小键盘 1 / Numpad one               |
| `num2`     | 小键盘 2 / Numpad two               |
| `num3`     | 小键盘 3 / Numpad three             |
| `num4`     | 小键盘 4 / Numpad four              |
| `num5`     | 小键盘 5 / Numpad five              |
| `num6`     | 小键盘 6 / Numpad six               |
| `num7`     | 小键盘 7 / Numpad seven             |
| `num8`     | 小键盘 8 / Numpad eight             |
| `num9`     | 小键盘 9 / Numpad nine              |
| `numadd`   | 小键盘加号（`+`）/ Numpad add       |
| `numsub`   | 小键盘减号（`-`）/ Numpad subtract  |
| `nummult`  | 小键盘乘号（`*`）/ Numpad multiply  |
| `numdiv`   | 小键盘除号（`/`）/ Numpad divide    |
| `numenter` | 小键盘回车 / Numpad enter           |
| `numdec`   | 小键盘小数点（`.`）/ Numpad decimal |
| `numLock`  | 数字锁定键 / Num Lock               |

#### 字母键 / Alphabet Keys

- 小写字母 / Lowercase letters：`a`、`b`、`c`、`d`、`e`、`f`、`g`、`h`、`i`、`j`、`k`、`l`、`m`、`n`、`o`、`p`、`q`、`r`、`s`、`t`、`u`、`v`、`w`、`x`、`y`、`z`
- 大写字母 / Uppercase letters：`A`、`B`、`C`、`D`、`E`、`F`、`G`、`H`、`I`、`J`、`K`、`L`、`M`、`N`、`O`、`P`、`Q`、`R`、`S`、`T`、`U`、`V`、`W`、`X`、`Y`、`Z`

#### 标点键 / Punctuation Keys

| 按键 / Key | 说明 / Notes             |
| ---------- | ------------------------ |
| `,`        | 逗号 / Comma             |
| `.`        | 句点 / Period            |
| `/`        | 斜杠 / Slash             |
| `;`        | 分号 / Semicolon         |
| `'`        | 引号 / Quote             |
| `[`        | 左方括号 / Left bracket  |
| `]`        | 右方括号 / Right bracket |
| `\`        | 反斜杠 / Backslash       |
| `` ` ``    | 反引号 / Backquote       |

#### 其他按键 / Other Keys

| 按键 / Key   | 说明 / Notes                                    |
| ------------ | ----------------------------------------------- |
| `Space`      | 空格键 / Space bar                              |
| `Escape`     | Esc 键，别名为 `Esc` / Escape key; alias: `Esc` |
| `Esc`        | `Escape` 的别名 / Alias of `Escape`             |
| `Backspace`  | 退格键 / Backspace                              |
| `Delete`     | 删除键 / Delete                                 |
| `Tab`        | Tab 键 / Tab                                    |
| `CapsLock`   | 大写锁定键 / Caps Lock                          |
| `Enter`      | 回车键 / Enter                                  |
| `ArrowUp`    | 上箭头 / Up arrow                               |
| `ArrowDown`  | 下箭头 / Down arrow                             |
| `ArrowLeft`  | 左箭头 / Left arrow                             |
| `ArrowRight` | 右箭头 / Right arrow                            |
| `Home`       | Home 键 / Home                                  |
| `End`        | End 键 / End                                    |
| `PageUp`     | Page Up 键 / Page Up                            |
| `PageDown`   | Page Down 键 / Page Down                        |
| `Insert`     | Insert 键 / Insert                              |

## 快速开始 / Quick Start

### 基本用法 / Basic Usage

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

// 创建注册表实例。 / Create a registry instance.
const registry = new ShortcutRegistry();

// 绑定到 window。 / Attach to window.
const dispose = registry.attachElement(window);

// 注册快捷键。 / Register a shortcut.
registry.registerShortcut('Ctrl+a', (event) => {
  console.log('Ctrl+A pressed!');
  event.preventDefault();
});

// 使用完毕后清理。 / Clean up when finished.
dispose();
```

### 使用选项 / With Options

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry({
  strict: false, // 启用宽松模式，默认 false。 / Enable loose mode; default: false.
  debug: true, // 启用调试日志。 / Enable debug logging.
  filter: (event) => {
    // 自定义过滤逻辑。 / Custom filter logic.
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

## 示例 / Examples

### 1. 注册单键快捷键 / Register a Single-key Shortcut

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry();
registry.attachElement(window);

registry.registerShortcut('a', (event) => {
  console.log('Key A pressed');
  event.preventDefault();
});
```

### 2. 注册带修饰键的快捷键 / Register a Shortcut with Modifiers

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry();
registry.attachElement(window);

registry.registerShortcut('Ctrl+Shift+a', (event) => {
  console.log('Ctrl+Shift+A pressed');
  event.preventDefault();
});
```

### 3. 动态启用或禁用 / Dynamic Enable or Disable

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry();
registry.attachElement(window);

// 注册快捷键。 / Register the shortcut.
registry.registerShortcut('Ctrl+a', () => {
  console.log('Ctrl+A pressed');
});

// 禁用快捷键。 / Disable it.
registry.disableShortcut('Ctrl+a');

// 再次启用快捷键。 / Enable it again.
registry.enableShortcut('Ctrl+a');
```

### 4. 为同一快捷键注册多个回调 / Multiple Callbacks for the Same Shortcut

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry();
registry.attachElement(window);

const handler1 = () => console.log('Handler 1');
const handler2 = () => console.log('Handler 2');

// 注册多个处理器。 / Register multiple handlers.
registry.registerShortcut('Ctrl+a', handler1);
registry.registerShortcut('Ctrl+a', handler2);

// 仅禁用 handler1。 / Disable only handler1.
registry.disableShortcut('Ctrl+a', handler1);

// 仅注销 handler1。 / Unregister only handler1.
registry.unregisterShortcut('Ctrl+a', handler1);
```

### 5. 作用域快捷键 / Scoped Shortcuts

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry();
const element = document.getElementById('my-element');

// 绑定到指定元素。 / Attach to a specific element.
const dispose = registry.attachElement(element);

// 仅当元素获得焦点时生效。 / This works only while the element is focused.
registry.registerShortcut('Ctrl+a', () => {
  console.log('Ctrl+A pressed in element');
});

// 清理。 / Clean up.
dispose();
```

### 6. 事件监听器 / Event Listeners

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry();
registry.attachElement(window);

// 监听 keydown 和 keyup 触发的按键状态变化。 / Listen for key state changes from keydown and keyup.
const disposeListener = registry.onKeyPressedChanged((event) => {
  // event.detail 表示 'keydown' 或 'keyup'。 / event.detail is 'keydown' or 'keyup'.
  console.log('Key state changed:', event.detail);

  // 状态变化时获取当前按键。 / Get the currently pressed keys when state changes.
  const currentKeys = registry.getCurrentKeyPressed();
  console.log('Current keys:', currentKeys);
});

// 获取当前按键。 / Get the currently pressed keys.
const currentKeys = registry.getCurrentKeyPressed();
console.log('Current keys:', currentKeys);

// 清理。 / Clean up.
disposeListener();
```

### 6.1. 清除状态 / Clear State

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry();
registry.attachElement(window);

// 按下若干按键。 / Press some keys.
dispatchEvent('keydown', 'ControlLeft');
dispatchEvent('keydown', 'KeyA');
console.log(registry.getCurrentKeyPressed()); // 'ControlLeft+A'

// 清除已按下按键的状态。 / Clear the pressed-key state.
registry.clear();
console.log(registry.getCurrentKeyPressed()); // ''
```

### 7. 自定义过滤器 / Custom Filter

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry({
  filter: (event) => {
    // 仅处理非输入元素产生的事件。 / Handle only events from non-input elements.
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

### 8. 自定义别名 / Custom Aliases

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry({
  alias: {
    Save: 'Ctrl',
    Quit: 'Ctrl+Shift',
  },
});

registry.attachElement(window);

// 使用自定义别名。 / Use a custom alias.
registry.registerShortcut('Save+s', () => {
  console.log('Save shortcut');
});

registry.registerShortcut('Quit+q', () => {
  console.log('Quit shortcut');
});
```

### 9. 宽松模式 / Loose Mode

```typescript
import { ShortcutRegistry } from '@rocketc/shortcuts';

const registry = new ShortcutRegistry({
  strict: false, // 启用宽松模式。 / Enable loose mode.
});

registry.attachElement(window);

// 宽松模式下，getCurrentKeyPressed 返回标准化后的按键。 / In loose mode, getCurrentKeyPressed returns normalized keys.
registry.onKeyPressedChanged(() => {
  // 按下 ControlLeft+A 时返回 Ctrl+a。 / ControlLeft+A returns Ctrl+a.
  console.log(registry.getCurrentKeyPressed()); // 'Ctrl+a'
});
```

### 10. 使用快捷键解析器 / Using the Accelerator Parser

```typescript
import { acceleratorParser } from '@rocketc/shortcuts';

// 校验快捷键字符串。 / Validate an accelerator string.
const isValid = acceleratorParser.validate('Ctrl+a');
console.log(isValid); // true

// 转换为宽松模式。 / Convert to loose mode.
const loose = acceleratorParser.convertAcceleratorToLooseMode('ControlLeft+a');
console.log(loose); // 'Ctrl+a'

// 解析快捷键字符串。 / Parse an accelerator string.
const parsed = acceleratorParser.parse('Ctrl+Shift+a');
console.log(parsed); // ['Ctrl', 'Shift', 'a']

// 检查按键代码名称是否受支持。 / Check whether a key code name is supported.
const isSupported = acceleratorParser.isKeyCodeNameSupported('Ctrl');
console.log(isSupported); // true

// 检查两个快捷键字符串是否匹配。 / Check whether two accelerators match.
const isMatched = acceleratorParser.isAcceleratorMatched('Ctrl+a', 'ControlLeft+KeyA');
console.log(isMatched); // true

// 获取默认分隔符。 / Get the default separator.
const separator = acceleratorParser.defaultSeparator;
console.log(separator); // '+'
```

## API 参考 / API Reference

### `ShortcutRegistry`

用于管理键盘快捷键的主类。

The main class for managing keyboard shortcuts.

#### 构造函数 / Constructor

```typescript
new ShortcutRegistry(options?: ShortcutRegisterOptions)
```

**选项 / Options：**

```typescript
interface ShortcutRegisterOptions {
  separator?: string; // 默认：'+'。 / Default: '+'.
  strict?: boolean; // 默认：false（宽松模式）。 / Default: false (loose mode).
  debug?: boolean | ((...args: any[]) => void); // 默认：false。 / Default: false.
  filter?: Filter; // 自定义事件过滤器。 / Custom event filter.
  alias?: Record<string, string>; // 自定义按键别名。 / Custom key aliases.
}
```

#### 方法 / Methods

##### `attachElement(ele: Window | HTMLElement): Dispose`

将键盘事件监听器绑定到指定元素，并返回用于解绑监听器的清理函数。

Attaches keyboard event listeners to the specified element and returns a dispose function that detaches them.

**引用计数 / Reference Counting：**

- 同一元素被多次绑定时，库会通过引用计数跟踪绑定次数。<br>
  When the same element is attached multiple times, the library tracks the number of attachments through reference counting.
- 对同一元素的每次 `attachElement` 调用都会返回**不同的**清理函数，避免不同代码区域相互干扰。<br>
  Each `attachElement` call for the same element returns a **different** dispose function to avoid interference between different parts of the code.
- 每个清理函数只能生效一次，后续调用不会执行任何操作。<br>
  Each dispose function takes effect only once; subsequent calls are no-ops.
- 清理函数的调用次数必须与 `attachElement` 的调用次数相同，才能彻底移除监听器。<br>
  Dispose functions must be called as many times as `attachElement` was called to fully detach the listeners.
- 因此，多个代码区域可以独立绑定同一元素，并安全地清理各自的引用，而不影响其他区域。<br>
  This allows multiple parts of the code to attach the same element independently and safely dispose their own references without affecting others.

**注意 / Note：**

- 首次绑定元素时会自动添加全局 `window` blur 监听器，以便窗口失焦时清除内部状态；最后一个元素解绑后会移除此监听器。<br>
  A global `window` blur listener is added when the first element is attached to clear internal state when the window loses focus; it is removed after the last element is disposed.
- 当所有清理函数都已调用且引用计数归零时，所有 `keydown`、`keyup` 和 window blur 监听器都会被正确清理。<br>
  All `keydown`, `keyup`, and window blur listeners are cleaned up when every dispose function has been called and the reference count reaches zero.

##### `registerShortcut(accelerator: Accelerator, callback: KeyboardEventListener): boolean`

注册快捷键处理器。快捷键无效时返回 `false`。

Registers a shortcut handler. Returns `false` when the shortcut is invalid.

##### `unregisterShortcut(accelerator: Accelerator, cb?: KeyboardEventListener): boolean`

注销快捷键处理器。提供 `cb` 时仅注销指定回调；快捷键未注册时返回 `false`。

Unregisters a shortcut handler. When `cb` is provided, only that callback is unregistered. Returns `false` when the shortcut is not registered.

##### `enableShortcut(accelerator: Accelerator, cb?: KeyboardEventListener): boolean`

启用快捷键。提供 `cb` 时仅启用指定回调；快捷键未注册时返回 `false`。

Enables a shortcut. When `cb` is provided, only that callback is enabled. Returns `false` when the shortcut is not registered.

##### `disableShortcut(accelerator: Accelerator, cb?: KeyboardEventListener): boolean`

禁用快捷键。提供 `cb` 时仅禁用指定回调；快捷键未注册时返回 `false`。

Disables a shortcut. When `cb` is provided, only that callback is disabled. Returns `false` when the shortcut is not registered.

##### `isShortcutRegistered(accelerator: Accelerator): boolean`

检查快捷键是否已注册。

Checks whether a shortcut is registered.

##### `getCurrentKeyPressed(): Accelerator`

以快捷键字符串形式获取当前按下的按键。

Returns the currently pressed keys as an accelerator string.

**注意 / Note：**

- 当前未按下修饰键或普通键时返回空字符串（`''`）。<br>
  Returns an empty string (`''`) when no modifier or normal key is currently pressed.
- 窗口失焦时，内部状态（`modifiersPressed` 和 `normalKeyPressed`）会由 `attachElement` 添加的全局 blur 监听器自动清除；也可以调用 `clear()` 手动清除。<br>
  Internal state (`modifiersPressed` and `normalKeyPressed`) is cleared automatically by the global blur listener added by `attachElement` when the window loses focus; call `clear()` to clear it manually.

##### `onKeyPressedChanged(cb: (event: CustomEvent<'keydown' | 'keyup'>) => void): Dispose`

注册按键状态变化监听器。过滤后的 `keydown` 和 `keyup` 事件导致状态变化时会触发监听器。此方法返回一个清理函数。

Registers a key-state change listener. It runs when filtered `keydown` or `keyup` events change the state. The method returns a dispose function.

**事件详情 / Event Details：**

- `event.detail`：事件类型，为 `'keydown'` 或 `'keyup'`。 / The event type, either `'keydown'` or `'keyup'`.
- `event.type`：始终为 `'keyPressedChanged'`。 / Always `'keyPressedChanged'`.

**注意 / Note：**

- 内部 `modifiersPressed` 或 `normalKeyPressed` 状态变化时会触发监听器。<br>
  The listener runs when the internal `modifiersPressed` or `normalKeyPressed` state changes.
- `handleKeyup` 会先更新内部状态，再检查过滤器。即使过滤器返回 `false`，状态也能保持一致；但仅在过滤器返回 `true` 时触发 `keyPressedChanged`。<br>
  `handleKeyup` updates internal state before checking the filter. State therefore remains consistent even when the filter returns `false`, while `keyPressedChanged` is emitted only when the filter returns `true`.
- 如需在状态变化时获取当前按键，请在监听器回调中调用 `getCurrentKeyPressed()`。<br>
  To read the current keys after a state change, call `getCurrentKeyPressed()` inside the listener.

```typescript
registry.onKeyPressedChanged((event) => {
  if (event.detail === 'keydown') {
    console.log('Key pressed');
  } else if (event.detail === 'keyup') {
    console.log('Key released');
  }
  const currentKeys = registry.getCurrentKeyPressed();
  console.log('Current keys:', currentKeys);
});
```

##### `getOptions(): ShortcutRegisterOptions`

获取当前选项。 / Returns the current options.

##### `setOptions(options: ShortcutRegisterOptions): void`

更新选项。**注意**：此方法会替换全部选项，而不是合并选项。

Updates the options. **Note**: This method replaces all options instead of merging them.

##### `getShortcutRegisters(accelerator?: Accelerator): Array<ShortcutRegister>`

获取全部已注册快捷键，或指定快捷键字符串对应的注册项。

Returns all registered shortcuts or the registrations for a specific accelerator.

##### `clear(): void`

清除当前按下按键的状态，包括修饰键和普通键。窗口失焦时库会自动执行同样的清理；也可以在其他时机手动调用 `clear()`。

Clears the current pressed-key state, including modifier and normal keys. The library does this automatically when the window loses focus; call `clear()` manually at other times when needed.

```typescript
const registry = new ShortcutRegistry();
registry.attachElement(window);

// 按下若干按键。 / Press some keys.
dispatchEvent('keydown', 'ControlLeft');
dispatchEvent('keydown', 'KeyA');
console.log(registry.getCurrentKeyPressed()); // 'ControlLeft+A'

// 清除状态。 / Clear the state.
registry.clear();
console.log(registry.getCurrentKeyPressed()); // ''
```

### `acceleratorParser`

用于解析和校验快捷键字符串的工具对象。

A utility object for parsing and validating accelerator strings.

#### 方法 / Methods

##### `parse(accelerator: Accelerator, options?): Array<KeyCodeName>`

将快捷键字符串解析为按键代码名称数组。

Parses an accelerator string into an array of key code names.

**选项 / Options：**

```typescript
{
  separator?: string; // 默认：'+'。 / Default: '+'.
  alias?: Record<string, string>; // 自定义按键别名。 / Custom key aliases.
}
```

##### `validate(accelerator: Accelerator, options?): boolean`

校验快捷键字符串是否合法；合法时返回 `true`，否则返回 `false`。

Validates an accelerator string. Returns `true` when valid and `false` otherwise.

**选项 / Options：**

```typescript
{
  separator?: string; // 默认：'+'。 / Default: '+'.
  alias?: Record<string, string>; // 自定义按键别名。 / Custom key aliases.
}
```

##### `convertAcceleratorToLooseMode(accelerator: Accelerator, options?): Accelerator`

将快捷键转换为宽松模式格式。宽松模式会标准化修饰键，例如 `ControlLeft` 和 `ControlRight` 都会转换为 `Ctrl`。

Converts an accelerator to loose-mode format. Loose mode normalizes modifier keys; for example, both `ControlLeft` and `ControlRight` become `Ctrl`.

**选项 / Options：**

```typescript
{
  separator?: string; // 默认：'+'。 / Default: '+'.
  alias?: Record<string, string>; // 自定义按键别名。 / Custom key aliases.
}
```

##### `isKeyCodeNameSupported(keyCodeName: string): boolean`

检查按键代码名称是否合法。 / Checks whether a key code name is valid.

##### `isAcceleratorMatched(source: Accelerator, target: Accelerator, options?): boolean`

检查两个快捷键字符串是否相互匹配。

Checks whether two accelerators match each other.

**选项 / Options：**

```typescript
{
  separator?: string; // 默认：'+'。 / Default: '+'.
  alias?: Record<string, string>; // 自定义按键别名。 / Custom key aliases.
}
```

##### `defaultSeparator: string`

快捷键字符串使用的默认分隔符，默认值为 `'+'`。

The default separator used for accelerator strings. Its default value is `'+'`.

### 类型 / Types

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

**注意**：`KeyCodeName` 已从包中导出，可以直接导入。

**Note**: `KeyCodeName` is exported from the package and can be imported directly.

```typescript
import type { KeyCodeName } from '@rocketc/shortcuts';
```

## 行为说明 / Behavior Notes

### 状态管理 / State Management

- **窗口焦点**：窗口失焦时，内部状态（`modifiersPressed` 和 `normalKeyPressed`）会自动清除。首次调用 `attachElement()` 时添加全局 `window` blur 监听器，最后一个元素解绑后移除。使用 `attachElement()` 时无需手动处理。<br>
  **Window Focus**: Internal state (`modifiersPressed` and `normalKeyPressed`) is cleared automatically when the window loses focus. A global `window` blur listener is added on the first `attachElement()` call and removed after the last element is disposed. No manual handling is needed when using `attachElement()`.
- **按键状态变化事件**：过滤后的 `keydown` 和 `keyup` 事件导致按键状态变化时，会触发 `onKeyPressedChanged` 监听器。`handleKeyup` 在检查过滤器前更新内部状态，因此即使过滤器返回 `false`，状态仍保持一致；只有过滤器返回 `true` 时才触发 `keyPressedChanged`。<br>
  **Key State Change Events**: The `onKeyPressedChanged` listener runs when filtered `keydown` or `keyup` events change the key state. `handleKeyup` updates internal state before checking the filter, so state remains consistent even when the filter returns `false`; `keyPressedChanged` is emitted only when the filter returns `true`.
- **空状态**：没有按键被按下时，`getCurrentKeyPressed()` 返回空字符串（`''`），表示当前没有跟踪任何按键。<br>
  **Empty State**: When no key is pressed, `getCurrentKeyPressed()` returns an empty string (`''`), indicating that no key is currently tracked.
- **快速按键**：快速按下多个普通键时，`normalKeyPressed` 会被最新按键覆盖，因为同一时间只跟踪一个普通键。如果较早按键的 `keyup` 在其状态被覆盖后到达，由于它不再匹配当前状态，不会清除当前状态。这符合实际键盘状态。<br>
  **Rapid Key Presses**: When multiple normal keys are pressed rapidly, `normalKeyPressed` is overwritten by the latest key because only one normal key is tracked at a time. If an earlier key's `keyup` arrives after its state was overwritten, it does not clear the current state because it no longer matches. This reflects the actual keyboard state.

## 快捷键匹配规则 / Shortcut Match Rules

| 操作 / Actions                                                                                                                    | 快捷键 / Accelerator         | 匹配 / Matched |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------- |
| 按下 `ControlLeft`，按下 `AltLeft`，释放 `AltLeft`，按下 `A` / press `ControlLeft`, press `AltLeft`, release `AltLeft`, press `A` | `Control+a`                  | 是 / Yes       |
| 按下 `ControlLeft`，按下 `AltLeft`，按下 `A` / press `ControlLeft`, press `AltLeft`, press `A`                                    | `Control+a`                  | 否 / No        |
| 按下 `ControlRight`，按下 `A` / press `ControlRight`, press `A`                                                                   | `Control+a`                  | 是 / Yes       |
| 按下 `ControlRight`，按下 `B`，释放 `B`，按下 `A` / press `ControlRight`, press `B`, release `B`, press `A`                       | `Control+a`                  | 是 / Yes       |
| 按下 `ControlLeft`，按下 `A` / press `ControlLeft`, press `A`                                                                     | `Control+a`                  | 是 / Yes       |
| 按下 `MetaLeft`，按下 `A` / press `MetaLeft`, press `A`                                                                           | `Command+a` 或 / or `Meta+a` | 是 / Yes       |

## 浏览器兼容性 / Browser Compatibility

- Chrome ≥ 48
- Firefox ≥ 38
- Safari ≥ 10.1
- Edge ≥ 79

## React 集成 / React Integration

React 应用请使用 [`@rocketc/react-use-shortcuts`](../react-use-shortcuts/README.md)，它在此库之上提供 React Hook 和 Context Provider。

For React applications, use [`@rocketc/react-use-shortcuts`](../react-use-shortcuts/README.md), which provides React hooks and context providers built on this library.

## 许可证 / License

基于 MIT 许可证分发，详情请参阅 `LICENSE`。

Distributed under the MIT License. See `LICENSE` for more information.
