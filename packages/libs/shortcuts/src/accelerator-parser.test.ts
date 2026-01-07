import { expect, describe, it } from 'vitest';
import parser from './accelerator-parser';

describe('acceleratorParser', () => {
  describe('validateAccelerator', () => {
    it('should validate correct accelerators', () => {
      expect(parser.validate('a')).toBe(true);
      expect(parser.validate('Ctrl+a')).toBe(true);
      expect(parser.validate('Control+Shift+a')).toBe(true);
      expect(parser.validate('Command+Option+Shift+i')).toBe(true);
      expect(parser.validate('F1')).toBe(true);
      expect(parser.validate('Escape')).toBe(true);
      expect(parser.validate('Space')).toBe(true);
      expect(parser.validate('ArrowUp')).toBe(true);
      // Note: ++ is not a valid format (would be parsed as + which is not a valid key name)
    });

    it('should reject invalid accelerators', () => {
      expect(parser.validate('')).toBe(false);
      expect(parser.validate('invalid')).toBe(false);
      expect(parser.validate('ctrl+i')).toBe(false); // lowercase
      expect(parser.validate('Control+')).toBe(false); // trailing +
      expect(parser.validate('+a')).toBe(false); // leading +
      expect(parser.validate('a+Ctrl')).toBe(false); // modifier after normal key
      expect(parser.validate('Control+i+Option')).toBe(false); // modifier at end
      expect(parser.validate('Control+Shift+1+2+3+4+5+6')).toBe(false); // multiple normal keys
    });

    it('should handle whitespace', () => {
      // Leading and trailing whitespace is trimmed
      expect(parser.validate('  Ctrl+a  ')).toBe(true);
      expect(parser.validate('  Control+Shift+a  ')).toBe(true);
      // Note: Whitespace around separator is not removed, so 'Ctrl + a' will fail
      // because 'Ctrl ' and ' a' are not valid key names
      expect(parser.validate('Ctrl + a')).toBe(false);
    });

    it('should handle custom separator', () => {
      // Test with different separators
      expect(parser.validate('Ctrl-a', { separator: '-' })).toBe(true);
      expect(parser.validate('Control-Shift-a', { separator: '-' })).toBe(true);
      expect(parser.validate('Ctrl_a', { separator: '_' })).toBe(true);
      expect(parser.validate('Control_Shift_a', { separator: '_' })).toBe(true);
      // Test with space separator
      expect(parser.validate('Ctrl a', { separator: ' ' })).toBe(true);
      expect(parser.validate('Control Shift a', { separator: ' ' })).toBe(true);
    });

    it('should reject invalid accelerators with custom separator', () => {
      expect(parser.validate('Ctrl-', { separator: '-' })).toBe(false);
      expect(parser.validate('-a', { separator: '-' })).toBe(false);
      expect(parser.validate('a-Ctrl', { separator: '-' })).toBe(false);
    });
  });

  describe('convertAcceleratorToLooseMode', () => {
    it('should convert modifiers to loose mode', () => {
      expect(parser.convertAcceleratorToLooseMode('ControlLeft+a')).toBe('Ctrl+a');
      expect(parser.convertAcceleratorToLooseMode('ControlRight+a')).toBe('Ctrl+a');
      expect(parser.convertAcceleratorToLooseMode('AltLeft+a')).toBe('Alt+a');
      expect(parser.convertAcceleratorToLooseMode('AltRight+a')).toBe('Alt+a');
      expect(parser.convertAcceleratorToLooseMode('ShiftLeft+a')).toBe('Shift+a');
      expect(parser.convertAcceleratorToLooseMode('ShiftRight+a')).toBe('Shift+a');
      expect(parser.convertAcceleratorToLooseMode('MetaLeft+a')).toBe('Meta+a');
      expect(parser.convertAcceleratorToLooseMode('MetaRight+a')).toBe('Meta+a');
    });

    it('should keep normal keys unchanged', () => {
      expect(parser.convertAcceleratorToLooseMode('a')).toBe('a');
      expect(parser.convertAcceleratorToLooseMode('F1')).toBe('F1');
      expect(parser.convertAcceleratorToLooseMode('Escape')).toBe('Escape');
    });

    it('should handle multiple modifiers', () => {
      expect(parser.convertAcceleratorToLooseMode('ControlLeft+AltLeft+ShiftLeft+a')).toBe(
        'Ctrl+Alt+Shift+a',
      );
      expect(parser.convertAcceleratorToLooseMode('ControlRight+AltRight+ShiftRight+a')).toBe(
        'Ctrl+Alt+Shift+a',
      );
    });

    it('should remove duplicate modifiers', () => {
      expect(parser.convertAcceleratorToLooseMode('ControlLeft+ControlRight+a')).toBe('Ctrl+a');
      expect(parser.convertAcceleratorToLooseMode('ShiftLeft+ShiftRight+a')).toBe('Shift+a');
    });

    it('should handle alias parameter', () => {
      // Alias format: { targetKey: sourceKey }
      // In convertAcceleratorToLooseMode with alias:
      // 1. Parse accelerator with alias: sourceKey (value) gets replaced with targetKey (key)
      // 2. If parsed keyCodeName is in alias keys, replace with alias value
      // 3. Convert modifiers to loose mode
      // 4. Finally, if result keyCodeName is in alias keys, replace with alias value
      const alias = { Ctrl: 'Control', i: 'I' };
      // 'Control' -> 'Ctrl' (from alias) -> 'Ctrl' (loose mode) -> 'Control' (final alias replacement)
      expect(parser.convertAcceleratorToLooseMode('Control+s', { alias })).toBe('Control+s');
      // 'Ctrl' -> stays 'Ctrl' -> 'Ctrl' (loose mode) -> 'Control' (final alias replacement)
      expect(parser.convertAcceleratorToLooseMode('Ctrl+s', { alias })).toBe('Control+s');
      // 'I' -> 'i' (from alias) -> 'i' (not a modifier, no loose mode) -> 'I' (final alias replacement)
      expect(parser.convertAcceleratorToLooseMode('Ctrl+I', { alias })).toBe('Control+I');
    });

    it('should handle Option alias', () => {
      // Option stays as Option in loose mode (not converted to Alt)
      expect(parser.convertAcceleratorToLooseMode('Option+a')).toBe('Option+a');
      expect(parser.convertAcceleratorToLooseMode('OptionLeft+a')).toBe('Option+a');
      expect(parser.convertAcceleratorToLooseMode('OptionRight+a')).toBe('Option+a');
    });

    it('should handle Command alias', () => {
      // Command stays as Command in loose mode (not converted to Meta)
      expect(parser.convertAcceleratorToLooseMode('Command+a')).toBe('Command+a');
      expect(parser.convertAcceleratorToLooseMode('CommandLeft+a')).toBe('Command+a');
      expect(parser.convertAcceleratorToLooseMode('CommandRight+a')).toBe('Command+a');
    });

    it('should handle custom separator', () => {
      // Test with different separators
      expect(
        parser.convertAcceleratorToLooseMode('ControlLeft-a', {
          separator: '-',
        }),
      ).toBe('Ctrl-a');
      expect(
        parser.convertAcceleratorToLooseMode('ControlRight-ShiftLeft-a', {
          separator: '-',
        }),
      ).toBe('Ctrl-Shift-a');
      expect(
        parser.convertAcceleratorToLooseMode('ControlLeft_a', {
          separator: '_',
        }),
      ).toBe('Ctrl_a');
      // Test with space separator
      expect(
        parser.convertAcceleratorToLooseMode('ControlLeft a', {
          separator: ' ',
        }),
      ).toBe('Ctrl a');
      expect(
        parser.convertAcceleratorToLooseMode('ControlLeft ShiftLeft a', {
          separator: ' ',
        }),
      ).toBe('Ctrl Shift a');
    });

    it('should handle custom separator with alias', () => {
      const alias = { Ctrl: 'Control', i: 'I' };
      // Custom separator works with alias
      expect(
        parser.convertAcceleratorToLooseMode('Control-s', {
          separator: '-',
          alias,
        }),
      ).toBe('Control-s');
      expect(
        parser.convertAcceleratorToLooseMode('Ctrl-s', {
          separator: '-',
          alias,
        }),
      ).toBe('Control-s');
    });
  });

  describe('defaultSeparator', () => {
    it('should export separator constant', () => {
      expect(parser.defaultSeparator).toBe('+');
    });
  });

  describe('isAcceleratorMatched', () => {
    it('should match identical accelerators', () => {
      expect(parser.isAcceleratorMatched('Ctrl+a', 'Ctrl+a')).toBe(true);
      expect(parser.isAcceleratorMatched('Control+Shift+a', 'Control+Shift+a')).toBe(true);
    });

    it('should match loose mode accelerators', () => {
      expect(parser.isAcceleratorMatched('ControlLeft+a', 'Ctrl+a')).toBe(true);
      expect(parser.isAcceleratorMatched('Ctrl+a', 'ControlLeft+a')).toBe(true);
      // ControlLeft and ControlRight are different key codes
      // They don't match because isAcceleratorMatched requires exact key code match
      // This is expected behavior - ControlLeft and ControlRight are distinct
      // To match them, use the loose mode key name (Ctrl) instead
      expect(parser.isAcceleratorMatched('ControlLeft+a', 'ControlRight+a')).toBe(false);
    });

    it('should not match different accelerators', () => {
      expect(parser.isAcceleratorMatched('Ctrl+a', 'Ctrl+b')).toBe(false);
      expect(parser.isAcceleratorMatched('Ctrl+a', 'Alt+a')).toBe(false);
      expect(parser.isAcceleratorMatched('Ctrl+a', 'Ctrl+Shift+a')).toBe(false);
    });

    it('should handle custom separator', () => {
      expect(parser.isAcceleratorMatched('Ctrl-a', 'Ctrl-a', { separator: '-' })).toBe(true);
      expect(
        parser.isAcceleratorMatched('ControlLeft-a', 'Ctrl-a', {
          separator: '-',
        }),
      ).toBe(true);
    });

    it('should handle alias', () => {
      const alias = { Ctrl: 'Control', i: 'I' };
      expect(parser.isAcceleratorMatched('Control+s', 'Ctrl+s', { alias })).toBe(true);
      expect(parser.isAcceleratorMatched('Ctrl+I', 'Control+i', { alias })).toBe(true);
    });
  });

  describe('isKeyCodeNameSupported', () => {
    it('should validate supported key code names', () => {
      expect(parser.isKeyCodeNameSupported('Ctrl')).toBe(true);
      expect(parser.isKeyCodeNameSupported('Control')).toBe(true);
      expect(parser.isKeyCodeNameSupported('a')).toBe(true);
      expect(parser.isKeyCodeNameSupported('F1')).toBe(true);
      expect(parser.isKeyCodeNameSupported('Escape')).toBe(true);
      expect(parser.isKeyCodeNameSupported('Space')).toBe(true);
    });

    it('should reject unsupported key code names', () => {
      expect(parser.isKeyCodeNameSupported('invalid')).toBe(false);
      expect(parser.isKeyCodeNameSupported('')).toBe(false);
      expect(parser.isKeyCodeNameSupported('ctrl')).toBe(false); // lowercase
    });
  });

  describe('parse', () => {
    it('should parse valid accelerators', () => {
      expect(parser.parse('a')).toEqual(['a']);
      expect(parser.parse('Ctrl+a')).toEqual(['Ctrl', 'a']);
      expect(parser.parse('Control+Shift+a')).toEqual(['Control', 'Shift', 'a']);
    });

    it('should throw on invalid accelerators', () => {
      expect(() => parser.parse('')).toThrow();
      expect(() => parser.parse('invalid')).toThrow();
      expect(() => parser.parse('Ctrl+')).toThrow();
      expect(() => parser.parse('+a')).toThrow();
      expect(() => parser.parse('a+Ctrl')).toThrow();
    });

    it('should handle custom separator', () => {
      expect(parser.parse('Ctrl-a', { separator: '-' })).toEqual(['Ctrl', 'a']);
      expect(parser.parse('Control-Shift-a', { separator: '-' })).toEqual([
        'Control',
        'Shift',
        'a',
      ]);
    });

    it('should handle alias', () => {
      const alias = { Ctrl: 'Control', i: 'I' };
      expect(parser.parse('Control+s', { alias })).toEqual(['Ctrl', 's']);
      expect(parser.parse('Ctrl+I', { alias })).toEqual(['Ctrl', 'i']);
    });
  });
});
