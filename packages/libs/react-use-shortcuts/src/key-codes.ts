export type ModifierKeyCode =
  // modifiers
  | 'ControlLeft'
  | 'ControlRight'
  | 'ShiftLeft'
  | 'ShiftRight'
  | 'AltLeft'
  | 'AltRight'
  | 'MetaLeft'
  | 'MetaRight';

export type NormalKeyCode =
  // firefox only
  | 'OSLeft'
  // firefox
  | 'OSRight'
  // functions
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'F10'
  | 'F11'
  | 'F12'
  // numbers
  | 'Digit1'
  | 'Digit2'
  | 'Digit3'
  | 'Digit4'
  | 'Digit5'
  | 'Digit6'
  | 'Digit7'
  | 'Digit8'
  | 'Digit9'
  | 'Digit0'
  // numpad
  | 'Numpad1'
  | 'Numpad2'
  | 'Numpad3'
  | 'Numpad4'
  | 'Numpad5'
  | 'Numpad6'
  | 'Numpad7'
  | 'Numpad8'
  | 'Numpad9'
  | 'Numpad0'
  | 'NumpadEnter'
  | 'NumpadMultiply'
  | 'NumpadDivide'
  | 'NumpadSubtract'
  | 'NumpadAdd'
  | 'NumLock'
  | 'NumpadDecimal'
  // words
  | 'KeyA'
  | 'KeyB'
  | 'KeyC'
  | 'KeyD'
  | 'KeyE'
  | 'KeyF'
  | 'KeyG'
  | 'KeyH'
  | 'KeyI'
  | 'KeyJ'
  | 'KeyK'
  | 'KeyL'
  | 'KeyM'
  | 'KeyN'
  | 'KeyO'
  | 'KeyP'
  | 'KeyQ'
  | 'KeyR'
  | 'KeyS'
  | 'KeyT'
  | 'KeyU'
  | 'KeyV'
  | 'KeyW'
  | 'KeyX'
  | 'KeyY'
  | 'KeyZ'
  // Punctuation
  | 'Comma'
  | 'Period'
  | 'Slash'
  | 'Semicolon'
  | 'Quote'
  | 'BracketLeft'
  | 'BracketRight'
  | 'Backslash'
  | 'Backquote'
  // others
  | 'Space'
  | 'Escape'
  | 'Minus'
  | 'Equal'
  | 'Backspace'
  | 'Delete'
  | 'Tab'
  | 'CapsLock'
  | 'Enter'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Home'
  | 'End'
  | 'PageUp'
  | 'PageDown'
  | 'Insert';

export type KeyCode = ModifierKeyCode | NormalKeyCode;

export type ModifierKeyCodeName =
  | 'ControlOrCommand'
  | 'Ctrl'
  | 'CtrlLeft'
  | 'CtrlRight'
  | 'Control'
  | 'ControlLeft'
  | 'ControlRight'
  | 'Shift'
  | 'ShiftLeft'
  | 'ShiftRight'
  | 'Option'
  | 'OptionLeft'
  | 'OptionRight'
  | 'Alt'
  | 'AltLeft'
  | 'AltRight'
  | 'Command'
  | 'CommandLeft'
  | 'CommandRight'
  | 'Meta'
  | 'MetaLeft'
  | 'MetaRight';

export type NormalKeyCodeName =
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'F10'
  | 'F11'
  | 'F12'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '0'
  // words
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  // punctuations
  | ','
  | '.'
  | '/'
  | ';'
  // eslint-disable-next-line quotes
  | "'"
  | '['
  | ']'
  | '\\'
  | '`'
  // others
  | 'Space'
  | 'Esc'
  | 'Escape'
  | '-'
  | '='
  | '+'
  | '*'
  | 'NumLock'
  | 'Backspace'
  | 'Delete'
  | 'Tab'
  | 'CapsLock'
  | 'Enter'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Home'
  | 'End'
  | 'PageUp'
  | 'PageDown'
  | 'Insert';

export type KeyCodeName = ModifierKeyCodeName | NormalKeyCodeName;

export const keyCodeName2KeyCode = new Map<KeyCodeName, Array<KeyCode>>([
  // modifiers
  [
    'ControlOrCommand',
    [
      'ControlLeft',
      'ControlRight',
      'MetaLeft',
      'MetaRight',
      'OSLeft',
      'OSRight',
    ],
  ],
  ['Ctrl', ['ControlLeft', 'ControlRight']],
  ['CtrlLeft', ['ControlLeft']],
  ['CtrlRight', ['ControlRight']],
  ['Control', ['ControlLeft', 'ControlRight']],
  ['ControlLeft', ['ControlLeft']],
  ['ControlRight', ['ControlRight']],
  ['Shift', ['ShiftLeft', 'ShiftRight']],
  ['ShiftLeft', ['ShiftLeft']],
  ['ShiftRight', ['ShiftRight']],
  ['Option', ['AltLeft', 'AltRight']],
  ['OptionLeft', ['AltLeft']],
  ['OptionRight', ['AltRight']],
  ['Alt', ['AltLeft', 'AltRight']],
  ['AltLeft', ['AltLeft']],
  ['AltRight', ['AltRight']],
  ['Command', ['MetaLeft', 'MetaRight', 'OSLeft', 'OSRight']],
  ['CommandLeft', ['MetaLeft', 'OSLeft']],
  ['CommandRight', ['MetaRight', 'OSRight']],
  ['Meta', ['MetaLeft', 'MetaRight', 'OSLeft', 'OSRight']],
  ['MetaLeft', ['MetaLeft', 'OSLeft']],
  ['MetaRight', ['MetaRight', 'OSRight']],
  // functions
  ['F1', ['F1']],
  ['F2', ['F2']],
  ['F3', ['F3']],
  ['F4', ['F4']],
  ['F5', ['F5']],
  ['F6', ['F6']],
  ['F7', ['F7']],
  ['F8', ['F8']],
  ['F9', ['F9']],
  ['F10', ['F10']],
  ['F11', ['F11']],
  ['F12', ['F12']],
  // numbers
  ['1', ['Digit1', 'Numpad1']],
  ['2', ['Digit2', 'Numpad2']],
  ['3', ['Digit3', 'Numpad3']],
  ['4', ['Digit4', 'Numpad4']],
  ['5', ['Digit5', 'Numpad5']],
  ['6', ['Digit6', 'Numpad6']],
  ['7', ['Digit7', 'Numpad7']],
  ['8', ['Digit8', 'Numpad8']],
  ['9', ['Digit9', 'Numpad9']],
  ['0', ['Digit0', 'Numpad0']],
  // words
  ['a', ['KeyA']],
  ['b', ['KeyB']],
  ['c', ['KeyC']],
  ['d', ['KeyD']],
  ['e', ['KeyE']],
  ['f', ['KeyF']],
  ['g', ['KeyG']],
  ['h', ['KeyH']],
  ['i', ['KeyI']],
  ['j', ['KeyJ']],
  ['k', ['KeyK']],
  ['l', ['KeyL']],
  ['m', ['KeyM']],
  ['n', ['KeyN']],
  ['o', ['KeyO']],
  ['p', ['KeyP']],
  ['q', ['KeyQ']],
  ['r', ['KeyR']],
  ['s', ['KeyS']],
  ['t', ['KeyT']],
  ['u', ['KeyU']],
  ['v', ['KeyV']],
  ['w', ['KeyW']],
  ['x', ['KeyX']],
  ['y', ['KeyY']],
  ['z', ['KeyZ']],
  // punctuations
  [',', ['Comma']],
  ['.', ['Period', 'NumpadDecimal']],
  ['/', ['Slash', 'NumpadDivide']],
  [';', ['Semicolon']],
  // eslint-disable-next-line quotes
  ["'", ['Quote']],
  ['[', ['BracketLeft']],
  [']', ['BracketRight']],
  ['\\', ['Backslash']],
  ['`', ['Backquote']],
  // others
  ['Space', ['Space']],
  ['Esc', ['Escape']],
  ['Escape', ['Escape']],
  ['-', ['Minus', 'NumpadSubtract']],
  ['=', ['Equal']],
  ['+', ['NumpadAdd']],
  ['*', ['NumpadMultiply']],
  ['NumLock', ['NumLock']],
  ['Backspace', ['Backspace']],
  ['Delete', ['Delete']],
  ['Tab', ['Tab']],
  ['CapsLock', ['CapsLock']],
  ['Enter', ['Enter', 'NumpadEnter']],
  ['ArrowUp', ['ArrowUp']],
  ['ArrowDown', ['ArrowDown']],
  ['ArrowLeft', ['ArrowLeft']],
  ['ArrowRight', ['ArrowRight']],
  ['Home', ['Home']],
  ['End', ['End']],
  ['PageUp', ['PageUp']],
  ['PageDown', ['PageDown']],
  ['Insert', ['Insert']],
]);

export const keyCode2KeyCodeName = new Map<KeyCode, KeyCodeName>([
  // modifiers
  ['ControlLeft', 'ControlLeft'],
  ['ControlRight', 'ControlRight'],
  ['ShiftLeft', 'ShiftLeft'],
  ['ShiftRight', 'ShiftRight'],
  ['AltLeft', 'AltLeft'],
  ['AltRight', 'AltRight'],
  ['MetaLeft', 'MetaLeft'],
  ['MetaRight', 'MetaRight'],
  ['OSLeft', 'MetaLeft'],
  ['OSRight', 'MetaRight'],
  // functions
  ['F1', 'F1'],
  ['F2', 'F2'],
  ['F3', 'F3'],
  ['F4', 'F4'],
  ['F5', 'F5'],
  ['F6', 'F6'],
  ['F7', 'F7'],
  ['F8', 'F8'],
  ['F9', 'F9'],
  ['F10', 'F10'],
  ['F11', 'F11'],
  ['F12', 'F12'],
  // numbers
  ['Digit1', '1'],
  ['Digit2', '2'],
  ['Digit3', '3'],
  ['Digit4', '4'],
  ['Digit5', '5'],
  ['Digit6', '6'],
  ['Digit7', '7'],
  ['Digit8', '8'],
  ['Digit9', '9'],
  ['Digit0', '0'],
  // numpad
  ['Numpad1', '1'],
  ['Numpad2', '2'],
  ['Numpad3', '3'],
  ['Numpad4', '4'],
  ['Numpad5', '5'],
  ['Numpad6', '6'],
  ['Numpad7', '7'],
  ['Numpad8', '8'],
  ['Numpad9', '9'],
  ['Numpad0', '0'],
  ['NumLock', 'NumLock'],
  ['NumpadEnter', 'Enter'],
  ['NumpadDivide', '/'],
  ['NumpadMultiply', '*'],
  ['NumpadSubtract', '-'],
  ['NumpadAdd', '+'],
  ['NumpadDecimal', '.'],
  // words
  ['KeyA', 'a'],
  ['KeyB', 'b'],
  ['KeyC', 'c'],
  ['KeyD', 'd'],
  ['KeyE', 'e'],
  ['KeyF', 'f'],
  ['KeyG', 'g'],
  ['KeyH', 'h'],
  ['KeyI', 'i'],
  ['KeyJ', 'j'],
  ['KeyK', 'k'],
  ['KeyL', 'l'],
  ['KeyM', 'm'],
  ['KeyN', 'n'],
  ['KeyO', 'o'],
  ['KeyP', 'p'],
  ['KeyQ', 'q'],
  ['KeyR', 'r'],
  ['KeyS', 's'],
  ['KeyT', 't'],
  ['KeyU', 'u'],
  ['KeyV', 'v'],
  ['KeyW', 'w'],
  ['KeyX', 'x'],
  ['KeyY', 'y'],
  ['KeyZ', 'z'],
  // punctuations
  ['Comma', ','],
  ['Period', '.'],
  ['Slash', '/'],
  ['Semicolon', ';'],
  // eslint-disable-next-line quotes
  ['Quote', "'"],
  ['BracketLeft', '['],
  ['BracketRight', ']'],
  ['Backslash', '\\'],
  ['Backquote', '`'],
  // others
  ['Space', 'Space'],
  ['Escape', 'Escape'],
  ['Minus', '-'],
  ['Equal', '='],
  ['Backspace', 'Backspace'],
  ['Delete', 'Delete'],
  ['Tab', 'Tab'],
  ['CapsLock', 'CapsLock'],
  ['Enter', 'Enter'],
  ['ArrowUp', 'ArrowUp'],
  ['ArrowDown', 'ArrowDown'],
  ['ArrowLeft', 'ArrowLeft'],
  ['ArrowRight', 'ArrowRight'],
  ['Home', 'Home'],
  ['End', 'End'],
  ['PageUp', 'PageUp'],
  ['PageDown', 'PageDown'],
  ['Insert', 'Insert'],
]);

export const KeyCodesSupported = [...keyCode2KeyCodeName.keys()];
