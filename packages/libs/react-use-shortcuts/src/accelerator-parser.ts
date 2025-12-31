import {
  keyCodeName2KeyCode,
  keyCodeName2LooseModeKeyCodeName,
  type KeyCodeName,
  type ModifierKeyCodeName,
  type NormalKeyCodeName,
} from './key-codes';

export type Accelerator = string;

const defaultSeparator = '+';

const modifierKeyCodeNames = new Set<ModifierKeyCodeName>([
  'ControlOrCommand',
  'Ctrl',
  'CtrlLeft',
  'CtrlRight',
  'Control',
  'ControlLeft',
  'ControlRight',
  'Shift',
  'ShiftLeft',
  'ShiftRight',
  'Option',
  'OptionLeft',
  'OptionRight',
  'Alt',
  'AltLeft',
  'AltRight',
  'Command',
  'CommandLeft',
  'CommandRight',
  'Meta',
  'MetaLeft',
  'MetaRight',
]);

function keyCodeNameIsModifiers(
  keycode: string,
): keycode is ModifierKeyCodeName {
  return modifierKeyCodeNames.has(keycode as ModifierKeyCodeName);
}

function throwParseError(position: number): never {
  throw new Error(`parse accelerator failed in position ${position}.`);
}

function parseAccelerator(
  accelerator: Accelerator,
  options: { separator?: string; alias?: Record<string, string> } = {},
): Array<KeyCodeName> {
  const { separator = defaultSeparator, alias = {} } = options;
  // remove all space
  accelerator = accelerator.trim();
  const keyCodeNames = accelerator.split(separator);
  let position = 0;
  const result: Array<KeyCodeName> = [];
  for (let i = 0; i < keyCodeNames.length; i++) {
    if (i > 0) {
      position += keyCodeNames[i - 1].length + 1;
    }
    if (keyCodeNames[i] === '') {
      if (keyCodeNames[i + 1] === '') {
        keyCodeNames[i] = separator;
        keyCodeNames.splice(i + 1, 1);
      } else {
        throwParseError(position);
      }
    }
    let keyCodeName = keyCodeNames[i] as KeyCodeName;
    if (alias) {
      if (Object.values(alias).includes(keyCodeName)) {
        keyCodeName = Object.keys(alias).find(
          (key) => alias?.[key] === keyCodeName,
        )! as KeyCodeName;
      }
    }
    if (!keyCodeName2KeyCode.has(keyCodeName)) {
      throwParseError(position);
    }
    if (
      result.length > 0 &&
      !keyCodeNameIsModifiers(result[result.length - 1])
    ) {
      throwParseError(position);
    }
    result.push(keyCodeName);
  }
  if (result.length === 0) {
    throwParseError(position);
  }
  if (keyCodeNameIsModifiers(result[result.length - 1])) {
    throwParseError(position);
  }
  return result;
}

function validateAccelerator(
  accelerator: Accelerator,
  options: { separator?: string; alias?: Record<string, string> } = {},
): boolean {
  const { separator = defaultSeparator, alias = {} } = options;
  try {
    parseAccelerator(accelerator, { separator, alias });
    return true;
  } catch {
    return false;
  }
}

function decodeAccelerator(
  accelerator: Accelerator,
  options: { separator?: string; alias?: Record<string, string> } = {},
): [Array<Array<Accelerator>>, Array<Accelerator>] {
  const { separator = defaultSeparator, alias = {} } = options;
  const keyCodeNames = parseAccelerator(accelerator, { separator, alias });
  const modifiers = keyCodeNames.filter((keyCodeName) =>
    keyCodeNameIsModifiers(keyCodeName),
  );
  const normalKey = keyCodeNames[keyCodeNames.length - 1];
  return [
    modifiers.reduce<Array<Array<string>>>(
      (prev, item) => {
        const next: Array<Array<string>> = [];
        const keyCodes = keyCodeName2KeyCode.get(item)!;
        keyCodes.forEach((keycode) => {
          prev.forEach((resolved) => {
            next.push([...resolved, keycode]);
          });
        });
        return next;
      },
      [[]],
    ),
    keyCodeName2KeyCode.get(normalKey)!,
  ];
}

function convertAcceleratorToLooseMode(
  accelerator: Accelerator,
  options: { separator?: string; alias?: Record<string, string> } = {},
): Accelerator {
  const { separator = defaultSeparator, alias = {} } = options;
  const keyCodeNames = parseAccelerator(accelerator, { separator, alias });
  return keyCodeNames
    .map((keyCodeName) => {
      if (alias?.[keyCodeName]) {
        keyCodeName = alias[keyCodeName] as KeyCodeName;
      }
      if (keyCodeNameIsModifiers(keyCodeName)) {
        return keyCodeName2LooseModeKeyCodeName.get(
          keyCodeName as ModifierKeyCodeName,
        )!;
      }
      return keyCodeName as NormalKeyCodeName;
    })
    .reduce<Array<KeyCodeName>>((prev, item) => {
      if (prev.includes(item)) {
        return prev;
      }
      prev.push(item);
      return prev;
    }, [])
    .map((keyCodeName) => {
      return alias?.[keyCodeName] ?? keyCodeName;
    })
    .join(separator);
}

export default {
  defaultSeparator,
  validateAccelerator,
  convertAcceleratorToLooseMode,
  __internal_decodeAccelerator: decodeAccelerator,
};
