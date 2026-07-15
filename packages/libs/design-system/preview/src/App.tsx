import { ThemeProvider, createTheme } from '@mui/material';
import type { ThemeOptions } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';

import {
  defaultDarkMuiTheme,
  defaultLightMuiTheme,
  sunDarkMuiTheme,
  sunLightMuiTheme,
} from '../../dist/mui';
import { ChakraPanel } from './panels/ChakraPanel';
import { MuiPanel } from './panels/MuiPanel';
import { PlainHtmlPanel } from './panels/PlainHtmlPanel';
import { PrimitivePanel } from './panels/PrimitivePanel';
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
  const [activeTab, setActiveTab] = useState<PreviewTab>('primitive');
  const themeName: DesignThemeName = `${family}.${mode}`;

  useEffect(() => {
    document.documentElement.dataset.theme = themeName;
  }, [themeName]);

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
                <button
                  className={`theme-family-button${family === value ? ' is-active' : ''}`}
                  key={value}
                  type="button"
                  aria-pressed={family === value}
                  onClick={() => setFamily(value)}
                >
                  {value === 'default' ? 'Default' : 'Sun'}
                </button>
              ))}
            </div>
            <button
              className="theme-switch"
              type="button"
              role="switch"
              aria-checked={mode === 'dark'}
              onClick={() => setMode((current) => (current === 'dark' ? 'light' : 'dark'))}
            >
              <span className="theme-switch-track" aria-hidden="true">
                <span className="theme-switch-thumb" />
              </span>
              <span className="theme-switch-label">Dark</span>
            </button>
          </div>
        </header>

        <nav className="tabs" aria-label="Preview sections">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`tab${activeTab === tab.value ? ' is-active' : ''}`}
              type="button"
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <section className={`tab-panel${activeTab === 'primitive' ? ' is-active' : ''}`}>
          <PrimitivePanel />
        </section>

        <section className={`tab-panel${activeTab === 'plain-html' ? ' is-active' : ''}`}>
          <PlainHtmlPanel mode={mode} />
        </section>

        <section className={`tab-panel${activeTab === 'mui' ? ' is-active' : ''}`}>
          <MuiPanel />
        </section>

        <section className={`tab-panel${activeTab === 'chakra' ? ' is-active' : ''}`}>
          <ChakraPanel themeName={themeName} />
        </section>
      </main>
    </ThemeProvider>
  );
}
