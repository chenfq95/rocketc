# @rocketc/react-use-shortcuts

---

Full shortcut solution for react app.

## Features

- Strict/Loose mode.
- Page scoped register.
- Dynamic register shortcut.
- Dynamic enable/disable shortcut registered.
- Flexible normal key combinations.
- Use modern browser API.
- Full types supported.
- Shortcut validation.

## Installation

```bash
# npm
npm install @rocketc/react-use-shortcuts
# yarn
yarn add @rocketc/react-use-shortcuts
# pnpm
pnpm add @rocketc/react-use-shortcuts
```

## Supported Keys

### Modfiers

| Key            | Alias                                       | Notes                                    |
| -------------- | ------------------------------------------- | ---------------------------------------- |
| `ControlLeft`  | `Ctrl` `Control` `ControlOrCommand`         |                                          |
| `ControlRight` | `Ctrl` `Control` `ControlOrCommand`         |                                          |
| `MetaLeft`     | `Command` `CommandLeft` `ControlOrCommand`  | `Windows` on Windows, `Command` on MacOS |
| `MetaRight`    | `Command` `CommandRight` `ControlOrCommand` | `Windows` on Windows, `Command` on MacOS |
| `ShiftLeft`    | `Shift`                                     |                                          |
| `ShiftRight`   | `Shift`                                     |                                          |
| `AltLeft`      | `Option` `OptionLeft`                       | `Option` is only available on MacOS.     |
| `AltRight`     | `Option` `OptionRight`                      | `Option` is only available on MacOS.     |

### Normal Keys

| Key          | Notes                                             |
| ------------ | ------------------------------------------------- |
| `0` \~ `9`   | Number keys on keyboard main area or numpad area. |
| `a` \~ `z`   | Alphabet keys                                     |
| `F1`\~`F12`  | Function keys                                     |
| `,`          | Comma                                             |
| `.`          | Period or Decimal on numpad                       |
| `/`          | Slash                                             |
| `;`          | Semicolon                                         |
| `'`          | Quote                                             |
| `[`          | BracketLeft                                       |
| `]`          | BracketRight                                      |
| `\`          | Backslash                                         |
| `` ` ``      | Backquote                                         |
| `Escape`     | Alias`Esc`                                        |
| `-`          | Minus                                             |
| `=`          | Equal                                             |
| `+`          | `Add` on numpad. not `Shift+=`                    |
| `*`          | `Multiple` on numpad. not `Shift+8`               |
| `Backspace`  | Backspace                                         |
| `Delete`     | Alias`Del`                                        |
| `Tab`        | Tab                                               |
| `CapsLock`   | Capslock                                          |
| `Enter`      | Enter or Enter on numpad.                         |
| `ArrowUp`    | ArrowUp                                           |
| `ArrowDown`  | ArrowDown                                         |
| `ArrowLeft`  | ArrowLeft                                         |
| `ArrowRight` | ArrowRight                                        |
| `Insert`     | Insert                                            |
| `Home`       | Home                                              |
| `End`        | End                                               |
| `PageUp`     | PageUp                                            |
| `PageDown`   | PageDown                                          |
| `Space`      | Space                                             |

## Example

### 1. Register single key shortcut.

```tsx
import React, { useEffect } from 'react';
import {
  ReactShortcutProvider,
  useShortcut,
} from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut } = useShortcut();

  // RegisterShortcut should be invoked in useEffect.
  useEffect(() => {
    registerShortcut('a', (event) => {
      // event is the latest emitted keydown event.
      // you can invoke preventDefault to prevent browser default behavior.
      event.preventDefault();
      // invoked whenever key A pressed.
      console.log('You pressed A');
    });
    return () => {
      unregisterShortcut('a');
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

### 2. Register shortcut combined with modifier and normal key.

```tsx
import React, { useEffect } from 'react';
import {
  ReactShortcutProvider,
  useShortcut,
} from '@rocketc/react-use-shortcuts';

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
      // invoked whenever key Control and key A  pressed.
      console.log('You pressed Ctrl and A');
    });
    return () => {
      unregisterShortcut('Ctrl+a');
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

### 3. Register scoped shortcut.

```tsx
import React, { useEffect, useRef } from 'react';
import {
  ReactShortcutProvider,
  useShortcut,
} from '@rocketc/react-use-shortcuts';

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
      // invoked whenever key Control and key A  pressed.
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

‼️ **Important**: Set element tabIndex property to -1 is to make this element to focusable. Scoped shortcut will not work without this.

### 4. Loose mode.

`@rocketc/react-use-shortcuts` work in strict mode by default, if you want to enable loose mode, you can set `strict` to false. it is only affect the `getCurrentKeyPressed` API.

```tsx
import React, { useEffect } from 'react';
import {
  ReactShortcutProvider,
  useShortcut,
} from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider options={{ strict: false }}>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { onKeydown, getCurrentKeyPressed } = useShortcut();

  useEffect(() => {
    return onKeydown(() => {
      // if you pressed ControlLeft and A.
      // print ControlLeft+a in strict mode.
      // print Ctrl+a in loose mode.
      console.log(getCurrentKeyPressed());
    });
  }, []);

  return <h1>Hello World!</h1>;
}
```

### 5. Dynamic enable/disable shortcut.

```tsx
import React, { useEffect, useCallback, useState } from 'react';
import {
  ReactShortcutProvider,
  useShortcut,
} from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const {
    registerShortcut,
    unregisterShortcut,
    enableShortcut,
    disableShortcut,
  } = useShortcut();
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

  // RegisterShortcut should be invoked in useEffect.
  useEffect(() => {
    registerShortcut('Ctrl+a', (event) => {
      // invoked when key Control and key A pressed and enable is true.
      console.log('You pressed Control and A');
    });
    return () => {
      unregisterShortcut('Ctrl+a');
    };
  }, []);

  return <button onClick={handleClick}>{enable ? 'disable' : 'enable'}</button>;
}
```

### 6. Multiple callbacks for the same shortcut.

You can register multiple callbacks for the same accelerator and manage them individually:

```tsx
import React, { useEffect, useCallback } from 'react';
import {
  ReactShortcutProvider,
  useShortcut,
} from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const {
    registerShortcut,
    unregisterShortcut,
    enableShortcut,
    disableShortcut,
  } = useShortcut();

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

### 7. Custom event filter.

The default filter automatically filters out:

- `event.repeat` (key repeat events)
- `event.isComposing` (IME composition events, e.g., when typing Chinese/Japanese/Korean)
- Events from `INPUT`, `TEXTAREA`, `SELECT` elements
- Events from `contentEditable` elements

You can provide a custom filter to override this behavior:

```tsx
import React, { useEffect, useCallback, useState } from 'react';
import {
  ReactShortcutProvider,
  useShortcut,
} from '@rocketc/react-use-shortcuts';

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
      // listener is not invoked when focus on input element
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

### 8. Custom key aliases.

You can define custom key name aliases to use in your shortcuts. This is useful for creating domain-specific shortcuts or mapping custom names to actual key names:

```tsx
import React, { useEffect } from 'react';
import {
  ReactShortcutProvider,
  useShortcut,
} from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider
      options={{
        alias: {
          // Map custom alias 'Save' to 'Ctrl'
          // When you use 'Save' in accelerator, it will be treated as 'Ctrl'
          Save: 'Ctrl',
          // Map 'I' to 'i' (uppercase I)
          // When you use 'I' in accelerator, it will be treated as 'i'
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
    // This will work the same as 'Ctrl+s'
    registerShortcut('Save+s', () => {
      console.log('Save shortcut triggered');
    });

    // Use the mapped 'i' which will be treated as 'I'
    // This will work the same as 'Ctrl+I'
    registerShortcut('Ctrl+I', () => {
      console.log('Ctrl+I shortcut triggered');
    });

    return () => {
      unregisterShortcut('Save+s');
      unregisterShortcut('Ctrl+I');
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

**Note**:

- The alias mapping works by replacing the alias key (left side) with the actual key name (right side) during parsing.
- If you define `'Save': 'Ctrl'`, then using `'Save'` in your accelerator string will be resolved to `'Ctrl'`.
- The alias value (right side) must be a valid key name that exists in the supported keys list.
- Aliases are useful for creating more readable or domain-specific shortcut names.

### 9. Custom debug function.

You can provide a custom debug function instead of using the default debug logger:

```tsx
import React, { useEffect } from 'react';
import {
  ReactShortcutProvider,
  useShortcut,
} from '@rocketc/react-use-shortcuts';

function App() {
  return (
    <ReactShortcutProvider
      options={{
        debug: (...args) => {
          // Custom debug logging
          console.log('[Shortcut Debug]', ...args);
          // Or send to your logging service
          // logToService(...args);
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

### Some shortcut match rules example.

| **Actions**                                                    | **Accelerator**      | **Matched** |
| :------------------------------------------------------------- | -------------------- | ----------- |
| press`ControlLeft` press `AltLeft` release `AltLeft` press `A` | `Control+a`          | ✅          |
| press`ControlLeft` press `AltLeft` press `A`                   | `Control+a`          | ❌          |
| press`ControlRight` press `A`                                  | `Control+a`          | ✅          |
| press`ControlRight` press `B` release `B` press `A`            | `Control+a`          | ✅          |
| press`ControlLeft` press `A`                                   | `ControlOrCommand+a` | ✅          |
| press`MetaLeft` press `A`                                      | `ControlOrCommand+a` | ✅          |
| press`ControlLeft` press `A` release `A` press `A` release `A` | `Control+a+a`        | ✅          |

## API Reference

### Interface Definition

```typescript
type Accelerator = string;
type Dispose = () => void;
type KeyboardEventListener = (event: KeyboardEvent) => void;

interface ReactShortcutOptions {
  // work mode, default to true.
  strict?: boolean;
  // print the debug message, default to false.
  // can be a boolean or a custom debug function.
  debug?: boolean | ((...args: any[]) => void);
  // auto attach to window, default to true.
  // if set to false, you need to call attachElement manually.
  auto?: boolean;
  // filter some event which does not want to handled.
  // default behavior is filter:
  // - event.repeat (key repeat events)
  // - event.isComposing (IME composition events)
  // - event triggered by input/textarea/select or contentEditable element.
  filter?: Filter;
  // custom key name aliases.
  // allows you to define custom key names that map to actual key names.
  // key: custom alias name, value: actual key name.
  alias?: Record<string, string>;
}

interface ShortcutRegister {
  accelerator: Accelerator;
  enabled: boolean;
  callback: KeyboardEventListener;
}

interface ReactShortcutProviderProps {
  options?: ReactShortcutOptions;
  children?: ReactNode;
}

interface ReactShortcutContextValue {
  registerShortcut(
    accelerator: Accelerator,
    callback: KeyboardEventListener,
  ): boolean;
  unregisterShortcut(
    accelerator: Accelerator,
    cb?: KeyboardEventListener,
  ): boolean;
  enableShortcut(accelerator: Accelerator, cb?: KeyboardEventListener): boolean;
  disableShortcut(
    accelerator: Accelerator,
    cb?: KeyboardEventListener,
  ): boolean;
  isShortcutRegistered(accelerator: Accelerator): boolean;
  getCurrentKeyPressed(): Accelerator;
  onKeydown(listener: KeyboardEventListener): Dispose;
  onKeyup(listener: KeyboardEventListener): Dispose;
  attachElement(ele: Window | HTMLElement): Dispose;
  updateOptions(options: Partial<ReactShortcutOptions>): void;
  getOptions(): ReactShortcutOptions;
  getShortcutRegisters(accelerator?: Accelerator): Array<ShortcutRegister>;
}
```

### Accelerator: string;

Shortcut description, consist of multiple modifiers or normal keys join with `+`,for example `Ctrl+Alt+a`. All supported keys have list above. The order of modifiers does not affect, so the `Ctrl+Alt+a` and `Alt+Ctrl+a` are exact the same. But `Ctrl+Alt+a+b` is not equal to `Ctrl+Alt+b+a`. Modifiers must preceding normal keys, `a+Ctrl` is invalid.

### `ReactShortcutProvider: React.FC<ReactShortcutProviderProps>;`

React Context Provider of `@rocketc/react-use-shortcuts`. The most common used case is wrap in the root react component. You can also apply multiple `ReactShortcutProvider` to different part of your page to achieve scoped shortcut register.

### `useShortcut: () => ReactShortcutContextValue;`

React Hook, used to get `@rocketc/react-use-shortcuts` API.

### `ReactShortcutContextValue.registerShortcut: (accelerator: Accelerator, callback: KeyboardEventListener) => boolean;`

Register shortcut handler, return false if current shortcut has registered or current shortcut is invalid.

### `ReactShortcutContextValue.unregisterShortcut: (accelerator: Accelerator, cb?: KeyboardEventListener) => boolean;`

Unregister shortcut handler. If `cb` is provided, only unregister the specific callback for the accelerator. Otherwise, unregister all callbacks for the accelerator. Returns `false` if the shortcut has not been registered or the shortcut is invalid.

### `ReactShortcutContextValue.enableShortcut: (accelerator: Accelerator, cb?: KeyboardEventListener) => boolean;`

Enable shortcut. If `cb` is provided, only enable the specific callback for the accelerator. Otherwise, enable all callbacks for the accelerator. Returns `false` if the shortcut has not been registered or the shortcut is invalid.

### `ReactShortcutContextValue.disableShortcut: (accelerator: Accelerator, cb?: KeyboardEventListener) => boolean;`

Disable shortcut. If `cb` is provided, only disable the specific callback for the accelerator. Otherwise, disable all callbacks for the accelerator. Returns `false` if the shortcut has not been registered or the shortcut is invalid.

### `ReactShortcutContextValue.isShortcutRegistered: (accelerator: Accelerator) => boolean;`

Return true is current short has registered.

### `ReactShortcutContextValue.getCurrentKeyPressed: () => Accelerator;`

Return current keys pressed.

### `ReactShortcutContextValue.onKeydown: (listener: KeyboardEventListener) => Dispose;`

Register `keydown` keyboardEvent listener on element attached, unlike `registerShortcut`, listener will be invoked whenever key pressed.

### `ReactShortcutContextValue.onKeyup: (listener: KeyboardEventListener) => Dispose;`

Register `keyup` keyboardEvent listener on element attached, unlike `registerShortcut`, listener will be invoked whenever key released. If you pressed `Command` key on MacOS, the `keyup` event may be not triggered because it is a browser default behavior, more detail see: [https://github.com/electron/electron/issues/5188](https://github.com/electron/electron/issues/5188 'https://github.com/electron/electron/issues/5188').

### `ReactShortcutContextValue.attachElement: (ele: Window | HTMLElement) => Dispose;`

Attach keyboard event listener to specified element. Only available when `auto` option is set to `false`. Returns a dispose function to detach the listener.

### `ReactShortcutContextValue.updateOptions: (options: Partial<ReactShortcutOptions>) => void;`

Update the options of the shortcut registry dynamically. This allows you to change `strict`, `debug`, or `filter` options at runtime.

**Example:**

```tsx
const { updateOptions } = useShortcut();

// Enable debug mode dynamically
updateOptions({ debug: true });

// Change to loose mode
updateOptions({ strict: false });
```

### `ReactShortcutContextValue.getOptions: () => ReactShortcutOptions;`

Get the current options of the shortcut registry.

**Example:**

```tsx
const { getOptions } = useShortcut();

const options = getOptions();
console.log(options.strict); // true or false
console.log(options.debug); // boolean or function
console.log(options.alias); // Record<string, string> or undefined
```

### `ReactShortcutContextValue.getShortcutRegisters: (accelerator?: Accelerator) => Array<ShortcutRegister>;`

Get all registered shortcuts, or get shortcuts for a specific accelerator if provided. Returns an array of `ShortcutRegister` objects containing `accelerator`, `enabled`, and `callback` properties.

**Example:**

```tsx
const { getShortcutRegisters, registerShortcut } = useShortcut();

useEffect(() => {
  registerShortcut('Ctrl+a', () => console.log('Handler 1'));
  registerShortcut('Ctrl+a', () => console.log('Handler 2'));

  // Get all shortcuts
  const all = getShortcutRegisters();
  console.log(all.length); // 2

  // Get shortcuts for specific accelerator
  const ctrlA = getShortcutRegisters('Ctrl+a');
  console.log(ctrlA.length); // 2
}, []);
```

### `acceleratorParser`

Utility object for parsing and validating accelerator strings. Can be imported directly from the package.

#### `acceleratorParser.validateAccelerator: (accelerator: Accelerator) => boolean;`

Validate if an accelerator string is valid. Returns `true` if the accelerator is valid, `false` otherwise.

**Example:**

```tsx
import { acceleratorParser } from '@rocketc/react-use-shortcuts';

// Returns true
acceleratorParser.validateAccelerator('Ctrl+a');
acceleratorParser.validateAccelerator('ControlOrCommand+Shift+k');

// Returns false
acceleratorParser.validateAccelerator('invalid+shortcut');
acceleratorParser.validateAccelerator('a+Ctrl'); // modifiers must precede normal keys
```

#### `acceleratorParser.convertAcceleratorToLooseMode: (accelerator: Accelerator) => Accelerator;`

Convert an accelerator string to loose mode format. In loose mode, modifier keys are normalized (e.g., `ControlLeft` and `ControlRight` both become `Ctrl`).

**Example:**

```tsx
import { acceleratorParser } from '@rocketc/react-use-shortcuts';

// Returns 'Ctrl+a'
acceleratorParser.convertAcceleratorToLooseMode('ControlLeft+a');
acceleratorParser.convertAcceleratorToLooseMode('ControlRight+a');

// Returns 'Ctrl+Alt+a'
acceleratorParser.convertAcceleratorToLooseMode('ControlLeft+AltLeft+a');
```

## Browser Compatibility

- Chrome ≥ 48
- Firefox ≥ 38
- Safari ≥ 10.1
- Edge ≥ 79

## Alternatives

- [react-hotkeys-hook](https://www.npmjs.com/package/react-hotkeys-hook 'react-hotkeys-hook')
- [react-hot-keys](https://www.npmjs.com/package/react-hot-keys 'react-hot-keys')

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
