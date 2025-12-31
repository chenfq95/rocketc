import {
  keyCodeName2KeyCode,
  type KeyCodeName,
  type ModifierKeyCodeName,
  type NormalKeyCodeName,
} from './key-codes';

export type Accelerator = string;

export class AcceleratorParser {
  private static ModifierKeyCodeNames = new Set<ModifierKeyCodeName>([
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

  private static keyCodeNameIsModifiers(
    keycode: string,
  ): keycode is ModifierKeyCodeName {
    return AcceleratorParser.ModifierKeyCodeNames.has(
      keycode as ModifierKeyCodeName,
    );
  }

  static separator = '+';

  parseAccelerator(
    accelerator: Accelerator,
  ): [Array<Array<Accelerator>>, Array<Accelerator>] {
    // remove all space
    accelerator = accelerator.replaceAll(/\s/gi, '');
    const keyCodeNames = accelerator.split(AcceleratorParser.separator);
    let position = 0;
    const modifiers: ModifierKeyCodeName[] = [];
    let normalKey: NormalKeyCodeName | undefined;
    for (let i = 0; i < keyCodeNames.length; i++) {
      let keyCodeName = keyCodeNames[i];
      if (keyCodeName === '') {
        if (keyCodeNames[i + 1] === '') {
          keyCodeNames[i] = AcceleratorParser.separator;
          keyCodeNames.splice(i + 1, 1);
          keyCodeName = keyCodeNames[i];
        } else {
          throwParseError(position);
        }
      }
      if (!keyCodeName2KeyCode.has(keyCodeName as KeyCodeName)) {
        throwParseError(position);
      }
      if (AcceleratorParser.keyCodeNameIsModifiers(keyCodeName)) {
        if (normalKey) {
          throwParseError(position);
        }
        modifiers.push(keyCodeName);
      } else {
        if (normalKey) {
          throwParseError(position);
        }
        normalKey = keyCodeName as NormalKeyCodeName;
      }
      position += keyCodeName.length + 1;
    }
    if (!normalKey) {
      throwParseError(position - 1);
    }
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

    function throwParseError(position: number): never {
      throw new Error(`parse accelerator failed in position ${position}.`);
    }
  }
}
