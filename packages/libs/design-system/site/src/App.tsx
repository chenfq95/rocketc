import { ThemeProvider, createTheme } from '@mui/material';
import type { ThemeOptions } from '@mui/material/styles';
import { registerRocketcCustomElements } from '@rocketc/web-components';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';

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

registerRocketcCustomElements();

const muiThemes: Record<DesignThemeName, ThemeOptions> = {
  'default.light': defaultLightMuiTheme,
  'default.dark': defaultDarkMuiTheme,
  'sun.light': sunLightMuiTheme,
  'sun.dark': sunDarkMuiTheme,
};

function useSegmentChange<T extends string>(
  ref: RefObject<HTMLElementTagNameMap['rds-segment'] | null>,
  onValue: (value: T) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onChange = (event: Event) => {
      // Ignore bubbled `change` from nested controls inside other panels.
      if (event.target !== el) return;
      const value = (event as CustomEvent<{ value: string }>).detail?.value;
      if (value) onValue(value as T);
    };
    el.addEventListener('change', onChange);
    return () => el.removeEventListener('change', onChange);
  }, [ref, onValue]);
}

export function App() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [family, setFamily] = useState<ThemeFamily>('default');
  const [activeTab, setActiveTab] = useState<PreviewTab>('design-system');
  const darkSwitchRef = useRef<HTMLElementTagNameMap['rds-switch']>(null);
  const familySegmentRef = useRef<HTMLElementTagNameMap['rds-segment']>(null);
  const tabSegmentRef = useRef<HTMLElementTagNameMap['rds-segment']>(null);
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

  useSegmentChange<ThemeFamily>(familySegmentRef, (value) => setFamily(value));
  useSegmentChange<PreviewTab>(tabSegmentRef, (value) => setActiveTab(value));

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
            <rds-typography class="eyebrow" variant="caption" as="p">
              Rocketc Design System
            </rds-typography>
            <rds-typography class="hero-title" variant="display" as="h1">
              Personal Tool UI
            </rds-typography>
            <rds-typography class="lede" variant="body" color="secondary" as="p">
              Neutral default chrome, optional orange brand focus, and dense hierarchy for tools,
              dashboards, and content surfaces—portable across frameworks.
            </rds-typography>
          </div>
          <div className="hero-actions" aria-label="Theme controls">
            <rds-segment ref={familySegmentRef} value={family} size="sm" aria-label="Theme family">
              <rds-segment-item value="default">Default</rds-segment-item>
              <rds-segment-item value="sun">Sun</rds-segment-item>
            </rds-segment>
            <div className="theme-switch">
              <rds-label {...{ for: 'dark-mode' }}>Dark</rds-label>
              <rds-switch
                id="dark-mode"
                ref={darkSwitchRef}
                checked={mode === 'dark' || undefined}
                aria-label="Dark mode"
              />
            </div>
          </div>
        </header>

        <nav className="tabs" aria-label="Preview sections">
          <rds-segment ref={tabSegmentRef} value={activeTab} size="sm">
            {tabs.map((tab) => (
              <rds-segment-item key={tab.value} value={tab.value}>
                {tab.label}
              </rds-segment-item>
            ))}
          </rds-segment>
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
