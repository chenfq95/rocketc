import { ThemeProvider, createTheme } from '@mui/material';
import type { ThemeOptions } from '@mui/material/styles';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  defaultDarkMuiTheme,
  defaultLightMuiTheme,
  sunDarkMuiTheme,
  sunLightMuiTheme,
} from '../../dist/mui';
import { ChakraPanel } from './panels/ChakraPanel';
import { MuiPanel } from './panels/MuiPanel';
import { DesignSystemPanel } from './panels/DesignSystemPanel';
import { ShadcnPanel } from './panels/ShadcnPanel';
import {
  tabs,
  type DesignThemeName,
  type PreviewTab,
  type ThemeFamily,
  type ThemeMode,
} from './previewModel';

const muiThemes: Record<DesignThemeName, ThemeOptions> = {
  'default.light': defaultLightMuiTheme,
  'default.dark': defaultDarkMuiTheme,
  'sun.light': sunLightMuiTheme,
  'sun.dark': sunDarkMuiTheme,
};

export function App() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [family, setFamily] = useState<ThemeFamily>('default');
  const [activeTab, setActiveTab] = useState<PreviewTab>('design-system');
  const darkSwitchRef = useRef<HTMLElementTagNameMap['rds-switch']>(null);
  const themeName: DesignThemeName = `${family}.${mode}`;

  useEffect(() => {
    document.documentElement.dataset.theme = themeName;
  }, [themeName]);

  useEffect(() => {
    const el = darkSwitchRef.current;
    if (!el) return;
    const onChange = (event: Event) => {
      const { checked } = (event as CustomEvent<{ checked: boolean }>).detail;
      setMode(checked ? 'dark' : 'light');
    };
    el.addEventListener('change', onChange);
    return () => el.removeEventListener('change', onChange);
  }, []);

  const muiTheme = useMemo(
    () =>
      createTheme({
        ...muiThemes[themeName],
        cssVariables: { cssVarPrefix: 'mui' },
      }),
    [themeName],
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <main className="shell">
        <header className="hero">
          <div>
            <p className="eyebrow">Rocketc Design System</p>
            <h1>Personal Tool UI</h1>
            <p className="lede">
              Neutral default chrome, optional orange brand focus, and dense hierarchy for tools,
              dashboards, and content surfaces—portable across frameworks.
            </p>
          </div>
          <div className="hero-actions" aria-label="Theme controls">
            <div className="theme-family" role="group" aria-label="Theme family">
              {(['default', 'sun'] as const).map((value) => (
                <rds-button
                  key={value}
                  size="sm"
                  type="button"
                  variant={family === value ? 'solid' : 'ghost'}
                  aria-pressed={family === value}
                  onClick={() => setFamily(value)}
                >
                  {value === 'default' ? 'Default' : 'Sun'}
                </rds-button>
              ))}
            </div>
            <label className="theme-switch">
              <span>Dark</span>
              <rds-switch
                ref={darkSwitchRef}
                checked={mode === 'dark' || undefined}
                aria-label="Dark mode"
              />
            </label>
          </div>
        </header>

        <nav className="tabs" aria-label="Preview sections">
          {tabs.map((tab) => (
            <rds-button
              key={tab.value}
              size="sm"
              type="button"
              variant={activeTab === tab.value ? 'solid' : 'outline'}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </rds-button>
          ))}
        </nav>

        <section className={`tab-panel${activeTab === 'design-system' ? ' is-active' : ''}`}>
          <DesignSystemPanel themeName={themeName} />
        </section>

        <section className={`tab-panel${activeTab === 'mui' ? ' is-active' : ''}`}>
          <MuiPanel themeName={themeName} />
        </section>

        <section className={`tab-panel${activeTab === 'chakra' ? ' is-active' : ''}`}>
          <ChakraPanel themeName={themeName} />
        </section>

        <section className={`tab-panel${activeTab === 'shadcn' ? ' is-active' : ''}`}>
          <ShadcnPanel themeName={themeName} />
        </section>
      </main>
    </ThemeProvider>
  );
}
