import {
  keyCode2KeyCodeName,
  keyCodeName2KeyCode,
  keyCodeName2LooseModeKeyCodeName,
  ModifierKeyCodeLookupTable,
  ModifierKeyCodeNameLookupTable,
  ModifierKeyCodeOrder,
  NormalKeyCodeLookupTable,
  NormalKeyCodeNameLookupTable,
  type KeyCode,
  type KeyCodeName,
  type ModifierKeyCode,
  type ModifierKeyCodeName,
  type NormalKeyCode,
  type NormalKeyCodeName,
} from './key-codes';

export type Accelerator = string;

export type AcceleratorObject = {
  modifiersList: Array<Array<ModifierKeyCode>>;
  normalKeyCodes: Array<NormalKeyCode>;
};

const defaultSeparator = '+';

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
    let keyCodeName = keyCodeNames[i];
    if (alias) {
      const aliasKey = Object.keys(alias).find((key) => alias[key] === keyCodeName);
      if (aliasKey) {
        keyCodeName = aliasKey;
      }
    }
    if (!isKeyCodeNameSupported(keyCodeName)) {
      throwParseError(position);
    }
    if (result.length > 0 && !isModifierKeyCodeName(result[result.length - 1])) {
      throwParseError(position);
    }
    result.push(keyCodeName);
  }
  if (result.length === 0) {
    throwParseError(position);
  }
  if (isModifierKeyCodeName(result[result.length - 1])) {
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

function serializeAccelerator(
  modifiers: Array<ModifierKeyCode>,
  keyCode?: NormalKeyCode,
  options: {
    separator?: string;
    alias?: Record<string, string>;
    strict?: boolean;
  } = {},
): Accelerator {
  const { separator = defaultSeparator, alias = {}, strict = false } = options;
  const modifierKeyCodeNames = modifiers
    .sort((a, b) => ModifierKeyCodeOrder.indexOf(a) - ModifierKeyCodeOrder.indexOf(b))
    .map((modifier) => {
      const keyCodeName = keyCode2KeyCodeName[modifier];
      if (!keyCodeName) {
        throw new Error(`Unsupported modifier keyCode: ${modifier}.`);
      }
      if (strict) {
        return keyCodeName;
      }
      return keyCodeName2LooseModeKeyCodeName[keyCodeName] ?? keyCodeName;
    })
    .reduce<Array<KeyCodeName>>((prev, item) => {
      if (prev.includes(item)) {
        return prev;
      }
      prev.push(item);
      return prev;
    }, []);
  const normalKeyCodeName = keyCode ? keyCode2KeyCodeName[keyCode] : undefined;
  return [...modifierKeyCodeNames, normalKeyCodeName]
    .filter((item) => item !== undefined)
    .map((item) => alias?.[item] ?? item)
    .join(separator);
}

function decodeAccelerator(
  accelerator: Accelerator,
  options: { separator?: string; alias?: Record<string, string> } = {},
): AcceleratorObject {
  const { separator = defaultSeparator, alias = {} } = options;
  const keyCodeNames = parseAccelerator(accelerator, { separator, alias });
  const modifiers = keyCodeNames.filter((keyCodeName) => isModifierKeyCodeName(keyCodeName));
  const keyCodeName = keyCodeNames[keyCodeNames.length - 1];
  return {
    modifiersList: modifiers.reduce<Array<Array<ModifierKeyCode>>>(
      (prev, keyCodeName) => {
        const next: Array<Array<ModifierKeyCode>> = [];
        const keyCodes = keyCodeName2KeyCode[keyCodeName] as Array<ModifierKeyCode>;
        keyCodes.forEach((keycode) => {
          prev.forEach((resolved) => {
            next.push([...resolved, keycode]);
          });
        });
        return next;
      },
      [[]],
    ),
    normalKeyCodes: keyCodeName2KeyCode[keyCodeName] as Array<NormalKeyCode>,
  };
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
      return keyCodeName2LooseModeKeyCodeName[keyCodeName] ?? keyCodeName;
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

function isModifierKeyCode(keyCode: string): keyCode is ModifierKeyCode {
  return ModifierKeyCodeLookupTable.has(keyCode as ModifierKeyCode);
}

function isModifierKeyCodeName(keyCodeName: string): keyCodeName is ModifierKeyCodeName {
  return ModifierKeyCodeNameLookupTable.has(keyCodeName as ModifierKeyCodeName);
}

function isKeyCodeSupported(keyCode: string): keyCode is KeyCode {
  return (
    ModifierKeyCodeLookupTable.has(keyCode as ModifierKeyCode) ||
    NormalKeyCodeLookupTable.has(keyCode as NormalKeyCode)
  );
}

function isKeyCodeNameSupported(keyCodeName: string): keyCodeName is KeyCodeName {
  return (
    ModifierKeyCodeNameLookupTable.has(keyCodeName as ModifierKeyCodeName) ||
    NormalKeyCodeNameLookupTable.has(keyCodeName as NormalKeyCodeName)
  );
}

function isAcceleratorMatched(
  source: Accelerator,
  target: Accelerator,
  options: { separator?: string; alias?: Record<string, string> } = {},
): boolean {
  const { modifiersList: sourceModifiersList, normalKeyCodes: sourceNormalKeyCodes } =
    decodeAccelerator(source, options);
  const { modifiersList: targetModifiersList, normalKeyCodes: targetNormalKeyCodes } =
    decodeAccelerator(target, options);
  const isModifierMatched = sourceModifiersList.some((sourceModifier) =>
    targetModifiersList.some((targetModifier) => {
      const set = new Set([...targetModifier, ...sourceModifier]);
      return set.size === sourceModifier.length && set.size === targetModifier.length;
    }),
  );
  const normalKeyCodesSet = new Set([...targetNormalKeyCodes, ...sourceNormalKeyCodes]);
  const isNormalKeyCodeMatched =
    normalKeyCodesSet.size === sourceNormalKeyCodes.length &&
    normalKeyCodesSet.size === targetNormalKeyCodes.length;
  return isModifierMatched && isNormalKeyCodeMatched;
}

export default {
  parse: parseAccelerator,
  defaultSeparator,
  validate: validateAccelerator,
  isKeyCodeNameSupported,
  isAcceleratorMatched,
  convertAcceleratorToLooseMode,
  __internal_isModifierKeyCode: isModifierKeyCode,
  __internal_isKeyCodeSupported: isKeyCodeSupported,
  __internal_serializeAccelerator: serializeAccelerator,
};
