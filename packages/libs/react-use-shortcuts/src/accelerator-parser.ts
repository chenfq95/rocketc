import {
  keyCodeName2KeyCode,
  type KeyCodeName,
  type ModifierKeyCodeName,
  type NormalKeyCodeName,
} from './key-codes';
import { isEmpty } from './utils';

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
    keycode: string
  ): keycode is ModifierKeyCodeName {
    return AcceleratorParser.ModifierKeyCodeNames.has(
      keycode as ModifierKeyCodeName
    );
  }

  static separator = '+';

  parseAccelerator(
    accelerator: Accelerator
  ): [Array<Accelerator>, Array<Accelerator>] {
    // remove all space
    accelerator = accelerator.replaceAll(/\s/gi, '');
    const keyCodeNames = accelerator.split(AcceleratorParser.separator);
    let position = 0;
    const modifiers: ModifierKeyCodeName[] = [];
    const normalKeys: NormalKeyCodeName[] = [];
    for (let i = 0; i < keyCodeNames.length; i++) {
      // resolve alias
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
        if (!isEmpty(normalKeys)) {
          throwParseError(position + 1);
        }
        modifiers.push(keyCodeName);
      } else {
        normalKeys.push(keyCodeName as NormalKeyCodeName);
      }
      position += keyCodeName.length + 1;
    }
    return [
      modifiers
        .reduce<Array<Array<string>>>(
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
          [[]]
        )
        .map((item) => item.sort().join(AcceleratorParser.separator)),
      normalKeys
        .reduce<Array<Array<string>>>(
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
          [[]]
        )
        .map((item) => item.join(AcceleratorParser.separator)),
    ];

    function throwParseError(position: number): never {
      throw new Error(`parse accelerator failed in position ${position}.`);
    }
  }
}
