import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import type { ThemeOptions } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';

import { darkMuiTheme, lightMuiTheme } from '../../dist/mui';
import { ChakraPanel } from './panels/ChakraPanel';
import { MuiPanel } from './panels/MuiPanel';
import { PlainHtmlPanel } from './panels/PlainHtmlPanel';
import { PrimitivePanel } from './panels/PrimitivePanel';
import { tabs, type PreviewTab, type ThemeMode } from './previewModel';

export function App() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [activeTab, setActiveTab] = useState<PreviewTab>('primitive');

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const muiTheme = useMemo(
    () =>
      createTheme({
        ...((mode === 'dark' ? darkMuiTheme : lightMuiTheme) as ThemeOptions),
        cssVariables: { cssVarPrefix: 'mui' },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <main className="shell">
        <header className="hero">
          <div>
            <p className="eyebrow">Rocketc Design System</p>
            <h1>Expressive Personal UI</h1>
            <p className="lede">
              A framework-agnostic visual system for personal products, tools, dashboards, and
              content surfaces.
            </p>
          </div>
          <div className="hero-actions" aria-label="Theme controls">
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
          <PlainHtmlPanel />
        </section>

        <section className={`tab-panel${activeTab === 'mui' ? ' is-active' : ''}`}>
          <MuiPanel />
        </section>

        <section className={`tab-panel${activeTab === 'chakra' ? ' is-active' : ''}`}>
          <ChakraPanel mode={mode} />
        </section>
      </main>
    </ThemeProvider>
  );
}
