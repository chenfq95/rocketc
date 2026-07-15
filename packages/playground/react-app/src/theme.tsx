import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import defaultDarkTheme from '@rocketc/design-system/chakra/default.dark';
import defaultLightTheme from '@rocketc/design-system/chakra/default.light';
import { createContext, useContext, useMemo, useState } from 'react';

type ThemeMode = 'light' | 'dark';

type PlaygroundThemeContextValue = {
  mode: ThemeMode;
  toggleMode: () => void;
};

const PlaygroundThemeContext = createContext<PlaygroundThemeContextValue | null>(null);

export function PlaygroundThemeProvider({ children }: React.PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const system = useMemo(
    () => createSystem(defaultConfig, mode === 'dark' ? defaultDarkTheme : defaultLightTheme),
    [mode],
  );
  const value = useMemo(
    () => ({
      mode,
      toggleMode: () => setMode((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [mode],
  );

  return (
    <PlaygroundThemeContext.Provider value={value}>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </PlaygroundThemeContext.Provider>
  );
}

export function usePlaygroundTheme() {
  const context = useContext(PlaygroundThemeContext);
  if (!context) throw new Error('usePlaygroundTheme must be used within PlaygroundThemeProvider');
  return context;
}
