# @rocketc/react-use-shortcuts

---

基于 [`@rocketc/shortcuts`](../shortcuts/README.md) 构建的完整 React 快捷键解决方案。

A complete React shortcut solution built on [`@rocketc/shortcuts`](../shortcuts/README.md).

## 特性 / Features

- **React Hook**：通过 `useShortcut` Hook 访问快捷键 API。<br>
  **React Hooks**: Access shortcut APIs through the `useShortcut` hook.
- **Context Provider**：通过 `ReactShortcutProvider` 集成 React Context。<br>
  **Context Provider**: Integrate React Context through `ReactShortcutProvider`.
- **严格/宽松模式**：支持严格和宽松两种匹配模式。<br>
  **Strict/Loose Mode**: Supports both strict and loose matching modes.
- **页面级作用域注册**：将快捷键注册到指定元素。<br>
  **Page-scoped Registration**: Registers shortcuts scoped to specific elements.
- **动态注册**：在运行时注册和注销快捷键。<br>
  **Dynamic Registration**: Registers and unregisters shortcuts at runtime.
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

## 安装 / Installation

```bash
# npm
npm install @rocketc/react-use-shortcuts

# yarn
yarn add @rocketc/react-use-shortcuts

# pnpm
pnpm add @rocketc/react-use-shortcuts
```

**注意**：此包依赖 [`@rocketc/shortcuts`](../shortcuts/README.md) 提供核心功能，该依赖会自动安装。

**Note**: This package depends on [`@rocketc/shortcuts`](../shortcuts/README.md) for core functionality. The dependency is installed automatically.

## 支持的按键 / Supported Keys

请参阅 `@rocketc/shortcuts` 文档中的[支持的按键](../shortcuts/README.md#支持的按键--supported-keys)章节。

See the [Supported Keys](../shortcuts/README.md#支持的按键--supported-keys) section in the `@rocketc/shortcuts` documentation.

## 快速开始 / Quick Start

```tsx
import React, { useEffect } from 'react';
import { ReactShortcutProvider, useShortcut } from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut } = useShortcut();

  useEffect(() => {
    registerShortcut('Ctrl+a', (event) => {
      console.log('Ctrl+A pressed!');
      event.preventDefault();
    });

    return () => {
      unregisterShortcut('Ctrl+a');
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

## 示例 / Examples

### 1. 注册单键快捷键 / Register a Single-key Shortcut

```tsx
import React, { useEffect } from 'react';
import { ReactShortcutProvider, useShortcut } from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut } = useShortcut();

  useEffect(() => {
    registerShortcut('a', (event) => {
      event.preventDefault();
      console.log('You pressed A');
    });
    return () => {
      unregisterShortcut('a');
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

### 2. 注册带修饰键的快捷键 / Register a Shortcut with Modifiers

```tsx
import React, { useEffect } from 'react';
import { ReactShortcutProvider, useShortcut } from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut } = useShortcut();

  useEffect(() => {
    registerShortcut('Ctrl+a', (event) => {
      console.log('You pressed Ctrl and A');
    });
    return () => {
      unregisterShortcut('Ctrl+a');
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

### 3. 注册作用域快捷键 / Register a Scoped Shortcut

```tsx
import React, { useEffect, useRef } from 'react';
import { ReactShortcutProvider, useShortcut } from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <div id="root">
      <ReactShortcutProvider options={{ auto: false }}>
        <Main />
      </ReactShortcutProvider>
      <ReactShortcutProvider options={{ auto: false }}>
        <Main />
        <Main />
      </ReactShortcutProvider>
    </div>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut, attachElement } = useShortcut();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (root.current) {
      return attachElement(root.current);
    }
  }, []);

  useEffect(() => {
    registerShortcut('Ctrl+a', (event) => {
      console.log('You pressed Ctrl and A');
    });
    return () => {
      unregisterShortcut('Ctrl+a');
    };
  }, []);

  return (
    <h1 ref={root} tabIndex={-1}>
      Hello World!
    </h1>
  );
}
```

**重要**：请将元素的 `tabIndex` 属性设为 `-1`，使元素可以获得焦点，否则作用域快捷键不会生效。

**Important**: Set the element's `tabIndex` property to `-1` to make it focusable. Scoped shortcuts do not work without it.

### 4. 宽松模式 / Loose Mode

`@rocketc/react-use-shortcuts` 默认使用严格模式（`strict: true`）。设置 `strict: false` 可启用宽松模式。此选项仅影响 `getCurrentKeyPressed` API。

`@rocketc/react-use-shortcuts` uses strict mode by default (`strict: true`). Set `strict: false` to enable loose mode. This option only affects the `getCurrentKeyPressed` API.

```tsx
import React, { useEffect } from 'react';
import { ReactShortcutProvider, useShortcut } from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider options={{ strict: false }}>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { onKeyPressedChanged, getCurrentKeyPressed } = useShortcut();

  useEffect(() => {
    return onKeyPressedChanged((event) => {
      // 如果按下 ControlLeft 和 A： / If ControlLeft and A are pressed:
      // - 严格模式输出 'ControlLeft+A'。 / Strict mode prints 'ControlLeft+A'.
      // - 宽松模式输出 'Ctrl+A'。 / Loose mode prints 'Ctrl+A'.
      console.log(getCurrentKeyPressed());
      // event.detail 表示 'keydown' 或 'keyup'。 / event.detail is 'keydown' or 'keyup'.
      console.log('Event type:', event.detail);
    });
  }, []);

  return <h1>Hello World!</h1>;
}
```

### 5. 动态启用或禁用快捷键 / Dynamically Enable or Disable a Shortcut

```tsx
import React, { useEffect, useCallback, useState } from 'react';
import { ReactShortcutProvider, useShortcut } from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut, enableShortcut, disableShortcut } = useShortcut();
  const [enable, setEnable] = useState<boolean>(true);

  const handleClick = useCallback(() => {
    setEnable((prev) => {
      if (prev) {
        disableShortcut('Ctrl+a');
      } else {
        enableShortcut('Ctrl+a');
      }
      return !prev;
    });
  }, []);

  useEffect(() => {
    registerShortcut('Ctrl+a', (event) => {
      console.log('You pressed Control and A');
    });
    return () => {
      unregisterShortcut('Ctrl+a');
    };
  }, []);

  return <button onClick={handleClick}>{enable ? 'disable' : 'enable'}</button>;
}
```

### 6. 为同一快捷键注册多个回调 / Multiple Callbacks for the Same Shortcut

可以为同一快捷键字符串注册多个回调，并分别管理它们：

You can register multiple callbacks for the same accelerator and manage them individually:

```tsx
import React, { useEffect, useCallback } from 'react';
import { ReactShortcutProvider, useShortcut } from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut, enableShortcut, disableShortcut } = useShortcut();

  useEffect(() => {
    const handler1 = () => console.log('Handler 1');
    const handler2 = () => console.log('Handler 2');

    // 为同一快捷键注册多个处理器。 / Register multiple handlers for the same shortcut.
    registerShortcut('Ctrl+a', handler1);
    registerShortcut('Ctrl+a', handler2);

    // 仅禁用 handler1。 / Disable only handler1.
    disableShortcut('Ctrl+a', handler1);

    // 再次启用 handler1。 / Enable handler1 again.
    enableShortcut('Ctrl+a', handler1);

    // 仅注销 handler1。 / Unregister only handler1.
    unregisterShortcut('Ctrl+a', handler1);

    return () => {
      // 注销 Ctrl+a 的所有处理器。 / Unregister all handlers for Ctrl+a.
      unregisterShortcut('Ctrl+a');
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

### 7. 自定义事件过滤器 / Custom Event Filter

默认过滤器会自动过滤：

The default filter automatically filters out:

- `event.repeat`（按键重复事件）。 / `event.repeat` (key repeat events).
- `event.isComposing`（输入法组合事件，例如输入中文、日文或韩文时）。 / `event.isComposing` (IME composition events, such as when typing Chinese, Japanese, or Korean).
- 来自 `INPUT`、`TEXTAREA` 和 `SELECT` 元素的事件。 / Events from `INPUT`, `TEXTAREA`, and `SELECT` elements.
- 来自 `contentEditable` 元素的事件。 / Events from `contentEditable` elements.

可以提供自定义过滤器来覆盖此行为：

You can provide a custom filter to override this behavior:

```tsx
import React, { useEffect } from 'react';
import { ReactShortcutProvider, useShortcut } from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider
      options={{
        filter: (event) => (event.target as HTMLElement)?.tagName !== 'INPUT',
      }}
    >
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut } = useShortcut();

  useEffect(() => {
    registerShortcut('Ctrl+a', (event) => {
      console.log('You pressed Control and A');
    });
    return () => {
      unregisterShortcut('Ctrl+a');
    };
  }, []);

  return (
    <div>
      <input />
    </div>
  );
}
```

### 8. 自定义按键别名 / Custom Key Aliases

可以定义自定义按键名称别名，并在快捷键中使用：

You can define custom key name aliases for use in shortcuts:

```tsx
import React, { useEffect } from 'react';
import { ReactShortcutProvider, useShortcut } from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider
      options={{
        alias: {
          Save: 'Ctrl',
          I: 'i',
        },
      }}
    >
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut } = useShortcut();

  useEffect(() => {
    // 使用自定义别名 Save 代替 Ctrl。 / Use the custom alias Save instead of Ctrl.
    registerShortcut('Save+s', () => {
      console.log('Save shortcut triggered');
    });

    return () => {
      unregisterShortcut('Save+s');
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

### 9. 自定义调试函数 / Custom Debug Function

可以提供自定义调试函数来代替默认调试日志器：

You can provide a custom debug function instead of the default debug logger:

```tsx
import React, { useEffect } from 'react';
import { ReactShortcutProvider, useShortcut } from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider
      options={{
        debug: (...args) => {
          console.log('[Shortcut Debug]', ...args);
        },
      }}
    >
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut } = useShortcut();

  useEffect(() => {
    registerShortcut('Ctrl+a', () => {
      console.log('You pressed Control and A');
    });
    return () => {
      unregisterShortcut('Ctrl+a');
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

## API 参考 / API Reference

### `ReactShortcutProvider`

React Context Provider 组件。使用此 Provider 包裹应用或组件树。

A React Context Provider component. Wrap your app or component tree with this provider.

**属性 / Props：**

```typescript
interface ReactShortcutProviderProps {
  options?: ReactShortcutOptions;
  children?: ReactNode;
}

interface ReactShortcutOptions {
  strict?: boolean; // 默认：false（默认使用严格模式）。 / Default: false (strict mode by default).
  debug?: boolean | ((...args: any[]) => void); // 默认：false。 / Default: false.
  auto?: boolean; // 默认：true。 / Default: true.
  filter?: Filter;
  alias?: Record<string, string>;
  separator?: string; // 默认：'+'。 / Default: '+'.
}
```

### `useShortcut`

用于访问快捷键 API 的 React Hook。

A React hook for accessing shortcut APIs.

**返回值 / Returns：**

```typescript
interface ReactShortcutContextValue {
  registerShortcut(accelerator: Accelerator, callback: KeyboardEventListener): boolean;
  unregisterShortcut(accelerator: Accelerator, cb?: KeyboardEventListener): boolean;
  enableShortcut(accelerator: Accelerator, cb?: KeyboardEventListener): boolean;
  disableShortcut(accelerator: Accelerator, cb?: KeyboardEventListener): boolean;
  isShortcutRegistered(accelerator: Accelerator): boolean;
  getCurrentKeyPressed(): Accelerator;
  onKeyPressedChanged(listener: KeyPressedChangedEventListener): Dispose;
  attachElement(ele: Window | HTMLElement): Dispose;
  getOptions(): ReactShortcutOptions;
  getShortcutRegisters(accelerator?: Accelerator): Array<ShortcutRegister>;
}
```

### `acceleratorParser`

用于解析和校验快捷键字符串的工具对象，从 `@rocketc/shortcuts` 重新导出。

A utility object for parsing and validating accelerator strings, re-exported from `@rocketc/shortcuts`.

```tsx
import { acceleratorParser } from '@rocketc/react-use-shortcuts';

// 校验快捷键字符串。 / Validate an accelerator string.
const isValid = acceleratorParser.validate('Ctrl+a');

// 转换为宽松模式。 / Convert to loose mode.
const loose = acceleratorParser.convertAcceleratorToLooseMode('ControlLeft+a');

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

完整 API 文档请参阅 [`@rocketc/shortcuts`](../shortcuts/README.md#api-参考--api-reference)。

For complete API documentation, see [`@rocketc/shortcuts`](../shortcuts/README.md#api-参考--api-reference).

## 快捷键匹配规则 / Shortcut Match Rules

请参阅 `@rocketc/shortcuts` 文档中的[快捷键匹配规则](../shortcuts/README.md#快捷键匹配规则--shortcut-match-rules)章节。

See the [Shortcut Match Rules](../shortcuts/README.md#快捷键匹配规则--shortcut-match-rules) section in the `@rocketc/shortcuts` documentation.

## 浏览器兼容性 / Browser Compatibility

- Chrome ≥ 48
- Firefox ≥ 38
- Safari ≥ 10.1
- Edge ≥ 79

## 核心库 / Core Library

此包基于 [`@rocketc/shortcuts`](../shortcuts/README.md) 构建，后者提供不依赖 React 的核心快捷键功能。如果需要在非 React 环境中使用快捷键，请直接使用 `@rocketc/shortcuts`。

This package is built on [`@rocketc/shortcuts`](../shortcuts/README.md), which provides the core shortcut functionality without React dependencies. Use `@rocketc/shortcuts` directly in non-React environments.

## 替代方案 / Alternatives

- [react-hotkeys-hook](https://www.npmjs.com/package/react-hotkeys-hook)
- [react-hot-keys](https://www.npmjs.com/package/react-hot-keys)

## 对比 / Comparisons

| 特性 / Feature                                | **@rocketc/react-use-shortcuts** | **react-hotkeys-hook** | **react-hot-keys** |
| --------------------------------------------- | -------------------------------- | ---------------------- | ------------------ |
| 动态注册 / Dynamic registration               | ✅                               | ❌                     | ❌                 |
| 页面级作用域注册 / Page-scoped registration   | ✅                               | ✅                     | ❌                 |
| 严格/宽松模式 / Strict/Loose mode             | ✅                               | ❌                     | ❌                 |
| 动态启用/禁用 / Dynamic enable/disable        | ✅                               | ✅                     | ❌                 |
| 普通键组合 / Normal key combinations          | ❌                               | ✅                     | ✅                 |
| 命名空间 / Namespace                          | ❌                               | ❌                     | ✅                 |
| 快捷键校验 / Shortcut validation              | ✅                               | ❌                     | ❌                 |
| 支持 React ≤ 18.0.0 / Supports React ≤ 18.0.0 | ❌                               | ❌                     | ✅                 |

## 许可证 / License

基于 MIT 许可证分发，详情请参阅 `LICENSE`。

Distributed under the MIT License. See `LICENSE` for more information.
