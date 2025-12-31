import parser from './accelerator-parser';

describe('acceleratorParser', () => {
  describe('validateAccelerator', () => {
    it('should validate correct accelerators', () => {
      expect(parser.validateAccelerator('a')).toBe(true);
      expect(parser.validateAccelerator('Ctrl+a')).toBe(true);
      expect(parser.validateAccelerator('Control+Shift+a')).toBe(true);
      expect(parser.validateAccelerator('Command+Option+Shift+i')).toBe(true);
      expect(parser.validateAccelerator('ControlOrCommand+a')).toBe(true);
      expect(parser.validateAccelerator('F1')).toBe(true);
      expect(parser.validateAccelerator('Escape')).toBe(true);
      expect(parser.validateAccelerator('Space')).toBe(true);
      expect(parser.validateAccelerator('ArrowUp')).toBe(true);
      // Note: ++ is not a valid format (would be parsed as + which is not a valid key name)
    });

    it('should reject invalid accelerators', () => {
      expect(parser.validateAccelerator('')).toBe(false);
      expect(parser.validateAccelerator('invalid')).toBe(false);
      expect(parser.validateAccelerator('ctrl+i')).toBe(false); // lowercase
      expect(parser.validateAccelerator('Control+')).toBe(false); // trailing +
      expect(parser.validateAccelerator('+a')).toBe(false); // leading +
      expect(parser.validateAccelerator('a+Ctrl')).toBe(false); // modifier after normal key
      expect(parser.validateAccelerator('Control+i+Option')).toBe(false); // modifier at end
      expect(parser.validateAccelerator('Control+Shift+1+2+3+4+5+6')).toBe(
        false,
      ); // multiple normal keys
    });

    it('should handle whitespace', () => {
      // Leading and trailing whitespace is trimmed
      expect(parser.validateAccelerator('  Ctrl+a  ')).toBe(true);
      expect(parser.validateAccelerator('  Control+Shift+a  ')).toBe(true);
      // Note: Whitespace around separator is not removed, so 'Ctrl + a' will fail
      // because 'Ctrl ' and ' a' are not valid key names
      expect(parser.validateAccelerator('Ctrl + a')).toBe(false);
    });

    it('should handle custom separator', () => {
      // Test with different separators
      expect(parser.validateAccelerator('Ctrl-a', { separator: '-' })).toBe(
        true,
      );
      expect(
        parser.validateAccelerator('Control-Shift-a', { separator: '-' }),
      ).toBe(true);
      expect(parser.validateAccelerator('Ctrl_a', { separator: '_' })).toBe(
        true,
      );
      expect(
        parser.validateAccelerator('Control_Shift_a', { separator: '_' }),
      ).toBe(true);
      // Test with space separator
      expect(parser.validateAccelerator('Ctrl a', { separator: ' ' })).toBe(
        true,
      );
      expect(
        parser.validateAccelerator('Control Shift a', { separator: ' ' }),
      ).toBe(true);
    });

    it('should reject invalid accelerators with custom separator', () => {
      expect(parser.validateAccelerator('Ctrl-', { separator: '-' })).toBe(
        false,
      );
      expect(parser.validateAccelerator('-a', { separator: '-' })).toBe(false);
      expect(parser.validateAccelerator('a-Ctrl', { separator: '-' })).toBe(
        false,
      );
    });
  });

  describe('convertAcceleratorToLooseMode', () => {
    it('should convert modifiers to loose mode', () => {
      expect(parser.convertAcceleratorToLooseMode('ControlLeft+a')).toBe(
        'Ctrl+a',
      );
      expect(parser.convertAcceleratorToLooseMode('ControlRight+a')).toBe(
        'Ctrl+a',
      );
      expect(parser.convertAcceleratorToLooseMode('AltLeft+a')).toBe('Alt+a');
      expect(parser.convertAcceleratorToLooseMode('AltRight+a')).toBe('Alt+a');
      expect(parser.convertAcceleratorToLooseMode('ShiftLeft+a')).toBe(
        'Shift+a',
      );
      expect(parser.convertAcceleratorToLooseMode('ShiftRight+a')).toBe(
        'Shift+a',
      );
      expect(parser.convertAcceleratorToLooseMode('MetaLeft+a')).toBe('Meta+a');
      expect(parser.convertAcceleratorToLooseMode('MetaRight+a')).toBe(
        'Meta+a',
      );
    });

    it('should keep normal keys unchanged', () => {
      expect(parser.convertAcceleratorToLooseMode('a')).toBe('a');
      expect(parser.convertAcceleratorToLooseMode('F1')).toBe('F1');
      expect(parser.convertAcceleratorToLooseMode('Escape')).toBe('Escape');
    });

    it('should handle multiple modifiers', () => {
      expect(
        parser.convertAcceleratorToLooseMode('ControlLeft+AltLeft+ShiftLeft+a'),
      ).toBe('Ctrl+Alt+Shift+a');
      expect(
        parser.convertAcceleratorToLooseMode(
          'ControlRight+AltRight+ShiftRight+a',
        ),
      ).toBe('Ctrl+Alt+Shift+a');
    });

    it('should remove duplicate modifiers', () => {
      expect(
        parser.convertAcceleratorToLooseMode('ControlLeft+ControlRight+a'),
      ).toBe('Ctrl+a');
      expect(
        parser.convertAcceleratorToLooseMode('ShiftLeft+ShiftRight+a'),
      ).toBe('Shift+a');
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
      expect(parser.convertAcceleratorToLooseMode('Control+s', { alias })).toBe(
        'Control+s',
      );
      // 'Ctrl' -> stays 'Ctrl' -> 'Ctrl' (loose mode) -> 'Control' (final alias replacement)
      expect(parser.convertAcceleratorToLooseMode('Ctrl+s', { alias })).toBe(
        'Control+s',
      );
      // 'I' -> 'i' (from alias) -> 'i' (not a modifier, no loose mode) -> 'I' (final alias replacement)
      expect(parser.convertAcceleratorToLooseMode('Ctrl+I', { alias })).toBe(
        'Control+I',
      );
    });

    it('should handle ControlOrCommand', () => {
      // ControlOrCommand is not in loose mode mapping
      // It will be converted based on its internal representation
      // Since ControlOrCommand maps to both Control and Meta, the conversion is complex
      // We verify it doesn't throw and produces a valid result
      expect(() =>
        parser.convertAcceleratorToLooseMode('ControlOrCommand+a'),
      ).not.toThrow();
    });

    it('should handle Option alias', () => {
      // Option stays as Option in loose mode (not converted to Alt)
      expect(parser.convertAcceleratorToLooseMode('Option+a')).toBe('Option+a');
      expect(parser.convertAcceleratorToLooseMode('OptionLeft+a')).toBe(
        'Option+a',
      );
      expect(parser.convertAcceleratorToLooseMode('OptionRight+a')).toBe(
        'Option+a',
      );
    });

    it('should handle Command alias', () => {
      // Command stays as Command in loose mode (not converted to Meta)
      expect(parser.convertAcceleratorToLooseMode('Command+a')).toBe(
        'Command+a',
      );
      expect(parser.convertAcceleratorToLooseMode('CommandLeft+a')).toBe(
        'Command+a',
      );
      expect(parser.convertAcceleratorToLooseMode('CommandRight+a')).toBe(
        'Command+a',
      );
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

  describe('__internal_decodeAccelerator', () => {
    describe('single modifier keys', () => {
      it('should decode Ctrl variants', () => {
        const result = parser.__internal_decodeAccelerator('Ctrl+a');
        expect(result[0]).toEqual([['ControlLeft'], ['ControlRight']]);
        expect(result[1]).toEqual(['KeyA']);

        const result2 = parser.__internal_decodeAccelerator('Control+a');
        expect(result2[0]).toEqual([['ControlLeft'], ['ControlRight']]);
        expect(result2[1]).toEqual(['KeyA']);

        const result3 = parser.__internal_decodeAccelerator('ControlLeft+a');
        expect(result3[0]).toEqual([['ControlLeft']]);
        expect(result3[1]).toEqual(['KeyA']);

        const result4 = parser.__internal_decodeAccelerator('ControlRight+a');
        expect(result4[0]).toEqual([['ControlRight']]);
        expect(result4[1]).toEqual(['KeyA']);
      });

      it('should decode Shift variants', () => {
        const result = parser.__internal_decodeAccelerator('Shift+a');
        expect(result[0]).toEqual([['ShiftLeft'], ['ShiftRight']]);
        expect(result[1]).toEqual(['KeyA']);

        const result2 = parser.__internal_decodeAccelerator('ShiftLeft+a');
        expect(result2[0]).toEqual([['ShiftLeft']]);
        expect(result2[1]).toEqual(['KeyA']);

        const result3 = parser.__internal_decodeAccelerator('ShiftRight+a');
        expect(result3[0]).toEqual([['ShiftRight']]);
        expect(result3[1]).toEqual(['KeyA']);
      });

      it('should decode Alt variants', () => {
        const result = parser.__internal_decodeAccelerator('Alt+a');
        expect(result[0]).toEqual([['AltLeft'], ['AltRight']]);
        expect(result[1]).toEqual(['KeyA']);

        const result2 = parser.__internal_decodeAccelerator('AltLeft+a');
        expect(result2[0]).toEqual([['AltLeft']]);
        expect(result2[1]).toEqual(['KeyA']);

        const result3 = parser.__internal_decodeAccelerator('AltRight+a');
        expect(result3[0]).toEqual([['AltRight']]);
        expect(result3[1]).toEqual(['KeyA']);
      });

      it('should decode Option variants (alias for Alt)', () => {
        const result = parser.__internal_decodeAccelerator('Option+a');
        expect(result[0]).toEqual([['AltLeft'], ['AltRight']]);
        expect(result[1]).toEqual(['KeyA']);

        const result2 = parser.__internal_decodeAccelerator('OptionLeft+a');
        expect(result2[0]).toEqual([['AltLeft']]);
        expect(result2[1]).toEqual(['KeyA']);

        const result3 = parser.__internal_decodeAccelerator('OptionRight+a');
        expect(result3[0]).toEqual([['AltRight']]);
        expect(result3[1]).toEqual(['KeyA']);
      });

      it('should decode Meta/Command variants', () => {
        const result = parser.__internal_decodeAccelerator('Meta+a');
        expect(result[0]).toEqual([
          ['MetaLeft'],
          ['MetaRight'],
          ['OSLeft'],
          ['OSRight'],
        ]);
        expect(result[1]).toEqual(['KeyA']);

        const result2 = parser.__internal_decodeAccelerator('MetaLeft+a');
        expect(result2[0]).toEqual([['MetaLeft'], ['OSLeft']]);
        expect(result2[1]).toEqual(['KeyA']);

        const result3 = parser.__internal_decodeAccelerator('MetaRight+a');
        expect(result3[0]).toEqual([['MetaRight'], ['OSRight']]);
        expect(result3[1]).toEqual(['KeyA']);

        const result4 = parser.__internal_decodeAccelerator('Command+a');
        expect(result4[0]).toEqual([
          ['MetaLeft'],
          ['MetaRight'],
          ['OSLeft'],
          ['OSRight'],
        ]);
        expect(result4[1]).toEqual(['KeyA']);

        const result5 = parser.__internal_decodeAccelerator('CommandLeft+a');
        expect(result5[0]).toEqual([['MetaLeft'], ['OSLeft']]);
        expect(result5[1]).toEqual(['KeyA']);

        const result6 = parser.__internal_decodeAccelerator('CommandRight+a');
        expect(result6[0]).toEqual([['MetaRight'], ['OSRight']]);
        expect(result6[1]).toEqual(['KeyA']);
      });

      it('should decode ControlOrCommand', () => {
        const result =
          parser.__internal_decodeAccelerator('ControlOrCommand+a');
        expect(result[0]).toEqual([
          ['ControlLeft'],
          ['ControlRight'],
          ['MetaLeft'],
          ['MetaRight'],
          ['OSLeft'],
          ['OSRight'],
        ]);
        expect(result[1]).toEqual(['KeyA']);
      });
    });

    describe('multiple modifiers', () => {
      it('should decode two modifiers', () => {
        const result = parser.__internal_decodeAccelerator(
          'ControlLeft+Option+a',
        );
        expect(result[0]).toEqual([
          ['ControlLeft', 'AltLeft'],
          ['ControlLeft', 'AltRight'],
        ]);
        expect(result[1]).toEqual(['KeyA']);
      });

      it('should decode three modifiers', () => {
        const result = parser.__internal_decodeAccelerator(
          'Command+Option+Shift+=',
        );
        // Command (4 variants) * Option (2 variants) * Shift (2 variants) = 16 combinations
        expect(result[0].length).toBe(16);
        expect(result[0][0]).toEqual(['MetaLeft', 'AltLeft', 'ShiftLeft']);
        expect(result[1]).toEqual(['Equal']);
      });

      it('should decode ControlOrCommand with other modifiers', () => {
        const result = parser.__internal_decodeAccelerator(
          'ControlOrCommand+Option+Shift+i',
        );
        // ControlOrCommand (6 variants) * Option (2 variants) * Shift (2 variants) = 24 combinations
        expect(result[0].length).toBe(24);
        expect(result[0][0]).toEqual(['ControlLeft', 'AltLeft', 'ShiftLeft']);
        expect(result[1]).toEqual(['KeyI']);
      });
    });

    describe('normal keys', () => {
      it('should decode alphabet keys', () => {
        const result = parser.__internal_decodeAccelerator('Ctrl+i');
        expect(result[1]).toEqual(['KeyI']);

        const result2 = parser.__internal_decodeAccelerator('Ctrl+a');
        expect(result2[1]).toEqual(['KeyA']);

        const result3 = parser.__internal_decodeAccelerator('Ctrl+z');
        expect(result3[1]).toEqual(['KeyZ']);
      });

      it('should decode number keys', () => {
        const result = parser.__internal_decodeAccelerator('Ctrl+1');
        // Number keys include both Digit and Numpad variants
        expect(result[1]).toContain('Digit1');
        expect(result[1]).toContain('Numpad1');

        const result2 = parser.__internal_decodeAccelerator('Ctrl+0');
        expect(result2[1]).toContain('Digit0');
        expect(result2[1]).toContain('Numpad0');
      });

      it('should decode function keys', () => {
        const result = parser.__internal_decodeAccelerator('F1');
        expect(result[1]).toEqual(['F1']);

        const result2 = parser.__internal_decodeAccelerator('Ctrl+F12');
        expect(result2[1]).toEqual(['F12']);
      });

      it('should decode special keys', () => {
        const result = parser.__internal_decodeAccelerator('Escape');
        expect(result[1]).toEqual(['Escape']);

        const result2 = parser.__internal_decodeAccelerator('Space');
        expect(result2[1]).toEqual(['Space']);

        const result3 = parser.__internal_decodeAccelerator('Enter');
        // Enter includes both Enter and NumpadEnter
        expect(result3[1]).toContain('Enter');
        expect(result3[1]).toContain('NumpadEnter');

        const result4 = parser.__internal_decodeAccelerator('Backspace');
        expect(result4[1]).toEqual(['Backspace']);

        const result5 = parser.__internal_decodeAccelerator('Delete');
        expect(result5[1]).toEqual(['Delete']);
      });

      it('should decode arrow keys', () => {
        const result = parser.__internal_decodeAccelerator('ArrowUp');
        expect(result[1]).toEqual(['ArrowUp']);

        const result2 = parser.__internal_decodeAccelerator('ArrowDown');
        expect(result2[1]).toEqual(['ArrowDown']);

        const result3 = parser.__internal_decodeAccelerator('ArrowLeft');
        expect(result3[1]).toEqual(['ArrowLeft']);

        const result4 = parser.__internal_decodeAccelerator('ArrowRight');
        expect(result4[1]).toEqual(['ArrowRight']);
      });

      it('should decode symbol keys', () => {
        const result = parser.__internal_decodeAccelerator('Ctrl+=');
        expect(result[1]).toEqual(['Equal']);

        const result2 = parser.__internal_decodeAccelerator('Ctrl+-');
        // Minus includes both Minus and NumpadSubtract
        expect(result2[1]).toContain('Minus');
        expect(result2[1]).toContain('NumpadSubtract');

        const result3 = parser.__internal_decodeAccelerator('Ctrl+[');
        expect(result3[1]).toEqual(['BracketLeft']);

        const result4 = parser.__internal_decodeAccelerator('Ctrl+]');
        expect(result4[1]).toEqual(['BracketRight']);
      });

      it('should handle + as normal key', () => {
        // Note: '++' is not a valid format
        // When parsing '++', it splits into ['', '', ''] (empty strings)
        // The parser tries to handle consecutive separators by converting them to '+',
        // but '+' is not a valid key name in the key code mapping
        expect(() => parser.__internal_decodeAccelerator('++')).toThrow();
      });
    });

    describe('error cases', () => {
      it('should throw error for empty string', () => {
        expect(() => parser.__internal_decodeAccelerator('')).toThrow(
          'parse accelerator failed in position 0.',
        );
      });

      it('should throw error for invalid key names', () => {
        expect(() => parser.__internal_decodeAccelerator('ctrl+i')).toThrow(
          'parse accelerator failed in position 0.',
        );
        expect(() =>
          parser.__internal_decodeAccelerator('InvalidKey'),
        ).toThrow();
      });

      it('should throw error for trailing modifier', () => {
        expect(() => parser.__internal_decodeAccelerator('Control+')).toThrow();
        expect(() =>
          parser.__internal_decodeAccelerator('Control+i+Option'),
        ).toThrow();
      });

      it('should throw error for modifier after normal key', () => {
        expect(() => parser.__internal_decodeAccelerator('a+Ctrl')).toThrow();
        expect(() =>
          parser.__internal_decodeAccelerator('Control+i+i'),
        ).toThrow();
      });

      it('should throw error for multiple normal keys', () => {
        expect(() =>
          parser.__internal_decodeAccelerator('Control+Shift+1+2+3+4+5+6'),
        ).toThrow();
      });

      it('should throw error for leading separator', () => {
        expect(() => parser.__internal_decodeAccelerator('+a')).toThrow();
      });
    });

    describe('alias support', () => {
      it('should handle alias in decodeAccelerator', () => {
        // Alias format: { targetKey: sourceKey }
        // During parsing, if a key name matches alias value, it gets replaced with alias key
        // Example: { 'Ctrl': 'o', 'i': 'I' }
        // - When 'o' appears in accelerator, it gets replaced with 'Ctrl' during parsing
        // - When 'I' appears in accelerator, it gets replaced with 'i' during parsing
        const alias = { Ctrl: 'o', i: 'I' };
        // 'o' (alias value) -> 'Ctrl' (alias key) during parsing
        const result1 = parser.__internal_decodeAccelerator('o+s', { alias });
        const result2 = parser.__internal_decodeAccelerator('Ctrl+s');
        expect(result1).toEqual(result2);

        // 'I' (alias value) -> 'i' (alias key) during parsing
        const result3 = parser.__internal_decodeAccelerator('Ctrl+I', {
          alias,
        });
        const result4 = parser.__internal_decodeAccelerator('Ctrl+i');
        expect(result3).toEqual(result4);
      });

      it('should handle multiple aliases', () => {
        // Multiple aliases can be defined simultaneously
        // Each alias value gets replaced with its corresponding key during parsing
        const alias = { Ctrl: 'o', Alt: 'p', Shift: 's' };
        // 'o' -> 'Ctrl', 'p' -> 'Alt', 's' -> 'Shift' during parsing
        const result1 = parser.__internal_decodeAccelerator('o+p+s+f', {
          alias,
        });
        const result2 = parser.__internal_decodeAccelerator('Ctrl+Alt+Shift+f');
        expect(result1).toEqual(result2);
      });

      it('should handle alias with ControlOrCommand', () => {
        // Alias can map to special keys like ControlOrCommand
        const alias = { ControlOrCommand: 'Meta' };
        // 'Meta' (alias value) -> 'ControlOrCommand' (alias key) during parsing
        const result1 = parser.__internal_decodeAccelerator('Meta+a', {
          alias,
        });
        const result2 =
          parser.__internal_decodeAccelerator('ControlOrCommand+a');
        expect(result1).toEqual(result2);
      });
    });

    describe('whitespace handling', () => {
      it('should trim leading and trailing whitespace', () => {
        // Only leading and trailing whitespace is removed (trim), not all whitespace
        const result1 = parser.__internal_decodeAccelerator('  Ctrl+a  ');
        const result2 = parser.__internal_decodeAccelerator('Ctrl+a');
        expect(result1).toEqual(result2);

        const result3 = parser.__internal_decodeAccelerator(
          '  Control+Shift+a  ',
        );
        const result4 = parser.__internal_decodeAccelerator('Control+Shift+a');
        expect(result3).toEqual(result4);
      });

      it('should fail when whitespace is around separator with default separator', () => {
        // When using default '+' separator, whitespace around separator causes failure
        // because 'Ctrl ' and ' a' are not valid key names
        expect(() => parser.__internal_decodeAccelerator('Ctrl + a')).toThrow();
      });

      it('should preserve whitespace when using space as separator', () => {
        // When space is used as separator, whitespace between keys is preserved
        const result1 = parser.__internal_decodeAccelerator('Ctrl a', {
          separator: ' ',
        });
        const result2 = parser.__internal_decodeAccelerator('Ctrl+a');
        expect(result1).toEqual(result2);

        const result3 = parser.__internal_decodeAccelerator('Control Shift a', {
          separator: ' ',
        });
        const result4 = parser.__internal_decodeAccelerator('Control+Shift+a');
        expect(result3).toEqual(result4);
      });
    });

    describe('custom separator support', () => {
      it('should handle custom separator in decodeAccelerator', () => {
        // Test with dash separator
        const result1 = parser.__internal_decodeAccelerator('Ctrl-a', {
          separator: '-',
        });
        const result2 = parser.__internal_decodeAccelerator('Ctrl+a');
        expect(result1).toEqual(result2);

        // Test with underscore separator
        const result3 = parser.__internal_decodeAccelerator('Control_Shift_a', {
          separator: '_',
        });
        const result4 = parser.__internal_decodeAccelerator('Control+Shift+a');
        expect(result3).toEqual(result4);

        // Test with space separator
        const result5 = parser.__internal_decodeAccelerator('Ctrl a', {
          separator: ' ',
        });
        const result6 = parser.__internal_decodeAccelerator('Ctrl+a');
        expect(result5).toEqual(result6);

        const result7 = parser.__internal_decodeAccelerator('Control Shift a', {
          separator: ' ',
        });
        const result8 = parser.__internal_decodeAccelerator('Control+Shift+a');
        expect(result7).toEqual(result8);
      });

      it('should handle custom separator with multiple modifiers', () => {
        const result1 = parser.__internal_decodeAccelerator(
          'Control-Alt-Shift-a',
          { separator: '-' },
        );
        const result2 = parser.__internal_decodeAccelerator(
          'Control+Alt+Shift+a',
        );
        expect(result1).toEqual(result2);
      });

      it('should handle custom separator with alias', () => {
        const alias = { Ctrl: 'o', Alt: 'p' };
        // Custom separator works with alias
        const result1 = parser.__internal_decodeAccelerator('o-p-a', {
          separator: '-',
          alias,
        });
        const result2 = parser.__internal_decodeAccelerator('Ctrl-Alt-a', {
          separator: '-',
        });
        expect(result1).toEqual(result2);

        // Test space separator with alias
        const result3 = parser.__internal_decodeAccelerator('o p a', {
          separator: ' ',
          alias,
        });
        const result4 = parser.__internal_decodeAccelerator('Ctrl Alt a', {
          separator: ' ',
        });
        expect(result3).toEqual(result4);
      });

      it('should handle separator as part of key name', () => {
        // When separator appears consecutively, it should be parsed as the separator character as a key
        // For example, if separator is '-', then 'Ctrl--' should parse the second '-' as a key
        // Note: This depends on how the separator character maps to key codes
        const result = parser.__internal_decodeAccelerator('Ctrl--', {
          separator: '-',
        });
        // The consecutive separators get converted to a single separator character
        // which then needs to be a valid key name
        expect(result[0]).toEqual([['ControlLeft'], ['ControlRight']]);
        // The '-' character should map to Minus key
        expect(result[1]).toContain('Minus');
      });
    });
  });

  describe('defaultSeparator', () => {
    it('should export separator constant', () => {
      expect(parser.defaultSeparator).toBe('+');
    });
  });
});
