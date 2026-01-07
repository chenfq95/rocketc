# @rocketc/react-use-shortcuts

---

Full React shortcut solution built on top of [`@rocketc/shortcuts`](../shortcuts/README.md).

## Features

- **React Hooks**: Use `useShortcut` hook to access shortcut APIs
- **Context Provider**: `ReactShortcutProvider` for React context integration
- **Strict/Loose mode**: Support both strict and loose matching modes
- **Page scoped register**: Register shortcuts scoped to specific elements
- **Dynamic register**: Register and unregister shortcuts at runtime
- **Dynamic enable/disable**: Enable or disable registered shortcuts dynamically
- **Flexible key combinations**: Support complex modifier and normal key combinations
- **Use modern browser API**: Uses modern browser APIs (`KeyboardEvent.code`)
- **Full TypeScript support**: Complete type definitions included
- **Shortcut validation**: Built-in validation for accelerator strings

## Installation

```bash
# npm
npm install @rocketc/react-use-shortcuts

# yarn
yarn add @rocketc/react-use-shortcuts

# pnpm
pnpm add @rocketc/react-use-shortcuts
```

**Note**: This package depends on [`@rocketc/shortcuts`](../shortcuts/README.md) for core functionality. It will be installed automatically.

## Supported Keys

See the [Supported Keys section](../shortcuts/README.md#supported-keys) in `@rocketc/shortcuts` documentation.

## Quick Start

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

## Examples

### 1. Register Single Key Shortcut

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

### 2. Register Shortcut with Modifiers

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

### 3. Register Scoped Shortcut

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

‼️ **Important**: Set element `tabIndex` property to `-1` to make the element focusable. Scoped shortcuts will not work without this.

### 4. Loose Mode

`@rocketc/react-use-shortcuts` works in strict mode by default (`strict: true`). Set `strict: false` to enable loose mode. This only affects the `getCurrentKeyPressed` API.

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
      // If you pressed ControlLeft and A:
      // - strict mode: prints 'ControlLeft+A'
      // - loose mode: prints 'Ctrl+A'
      console.log(getCurrentKeyPressed());
      // event.detail indicates the event type: 'keydown' or 'keyup'
      console.log('Event type:', event.detail);
    });
  }, []);

  return <h1>Hello World!</h1>;
}
```

### 5. Dynamic Enable/Disable Shortcut

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

### 6. Multiple Callbacks for the Same Shortcut

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

    // Register multiple handlers for the same shortcut
    registerShortcut('Ctrl+a', handler1);
    registerShortcut('Ctrl+a', handler2);

    // Disable only handler1
    disableShortcut('Ctrl+a', handler1);

    // Enable handler1 again
    enableShortcut('Ctrl+a', handler1);

    // Unregister only handler1
    unregisterShortcut('Ctrl+a', handler1);

    return () => {
      // Unregister all handlers for Ctrl+a
      unregisterShortcut('Ctrl+a');
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

### 7. Custom Event Filter

The default filter automatically filters out:

- `event.repeat` (key repeat events)
- `event.isComposing` (IME composition events, e.g., when typing Chinese/Japanese/Korean)
- Events from `INPUT`, `TEXTAREA`, `SELECT` elements
- Events from `contentEditable` elements

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

### 8. Custom Key Aliases

You can define custom key name aliases to use in your shortcuts:

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
    // Use the custom alias 'Save' instead of 'Ctrl'
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

### 9. Custom Debug Function

You can provide a custom debug function instead of using the default debug logger:

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

## API Reference

### `ReactShortcutProvider`

React Context Provider component. Wrap your app or component tree with this provider.

**Props:**

```typescript
interface ReactShortcutProviderProps {
  options?: ReactShortcutOptions;
  children?: ReactNode;
}

interface ReactShortcutOptions {
  strict?: boolean; // Default: false (strict mode by default)
  debug?: boolean | ((...args: any[]) => void); // Default: false
  auto?: boolean; // Default: true
  filter?: Filter;
  alias?: Record<string, string>;
  separator?: string; // Default: '+'
}
```

### `useShortcut`

React Hook to access shortcut APIs.

**Returns:**

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

Utility object for parsing and validating accelerator strings. Re-exported from `@rocketc/shortcuts`.

```tsx
import { acceleratorParser } from '@rocketc/react-use-shortcuts';

// Validate accelerator
const isValid = acceleratorParser.validate('Ctrl+a');

// Convert to loose mode
const loose = acceleratorParser.convertAcceleratorToLooseMode('ControlLeft+a');

// Parse accelerator
const parsed = acceleratorParser.parse('Ctrl+Shift+a');
console.log(parsed); // ['Ctrl', 'Shift', 'a']

// Check if key code name is supported
const isSupported = acceleratorParser.isKeyCodeNameSupported('Ctrl');
console.log(isSupported); // true

// Check if accelerators match
const isMatched = acceleratorParser.isAcceleratorMatched('Ctrl+a', 'ControlLeft+KeyA');
console.log(isMatched); // true

// Get default separator
const separator = acceleratorParser.defaultSeparator;
console.log(separator); // '+'
```

For complete API documentation, see [`@rocketc/shortcuts`](../shortcuts/README.md#api-reference).

## Shortcut Match Rules

See the [Shortcut Match Rules section](../shortcuts/README.md#shortcut-match-rules) in `@rocketc/shortcuts` documentation.

## Browser Compatibility

- Chrome ≥ 48
- Firefox ≥ 38
- Safari ≥ 10.1
- Edge ≥ 79

## Core Library

This package is built on top of [`@rocketc/shortcuts`](../shortcuts/README.md), which provides the core shortcut functionality without React dependencies. If you need to use shortcuts in a non-React environment, use `@rocketc/shortcuts` directly.

## Alternatives

- [react-hotkeys-hook](https://www.npmjs.com/package/react-hotkeys-hook)
- [react-hot-keys](https://www.npmjs.com/package/react-hot-keys)

## Comparisons

| **Features**                               | **@rocketc/react-use-shortcuts** | **react-hotkeys-hook** | **react-hot-keys** |
| ------------------------------------------ | -------------------------------- | ---------------------- | ------------------ |
| Dynamic register                           | ✅                               | ❌                     | ❌                 |
| Page scoped register                       | ✅                               | ✅                     | ❌                 |
| Strict/Loose mode                          | ✅                               | ❌                     | ❌                 |
| Dynamic enable/disable shortcut registered | ✅                               | ✅                     | ❌                 |
| Normal key combinations                    | ❌                               | ✅                     | ✅                 |
| Namespace                                  | ❌                               | ❌                     | ✅                 |
| Shortcuts validation                       | ✅                               | ❌                     | ❌                 |
| Used React ≤ 18.0.0                        | ❌                               | ❌                     | ✅                 |

## License

Distributed under the MIT License. See `LICENSE` for more information.
