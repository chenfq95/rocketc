type ThemeFamily = 'default' | 'sun';
type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'rocketc.wc.site.theme';

type ThemeState = {
  family: ThemeFamily;
  mode: ThemeMode;
};

function isFamily(value: string): value is ThemeFamily {
  return value === 'default' || value === 'sun';
}

function isMode(value: string): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

function readStored(): ThemeState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { family: 'default', mode: 'light' };
    const parsed = JSON.parse(raw) as Partial<ThemeState>;
    return {
      family: parsed.family && isFamily(parsed.family) ? parsed.family : 'default',
      mode: parsed.mode && isMode(parsed.mode) ? parsed.mode : 'light',
    };
  } catch {
    return { family: 'default', mode: 'light' };
  }
}

function writeStored(state: ThemeState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function themeName(state: ThemeState) {
  return `${state.family}.${state.mode}`;
}

function applyTheme(state: ThemeState) {
  const name = themeName(state);
  document.documentElement.dataset.theme = name;
  document.documentElement.style.colorScheme = state.mode;
  writeStored(state);
}

function syncControls(state: ThemeState) {
  const family = document.getElementById('theme-family') as
    | HTMLElementTagNameMap['rds-segment']
    | null;
  const dark = document.getElementById('theme-dark') as HTMLElementTagNameMap['rds-switch'] | null;

  if (family && family.value !== state.family) {
    family.value = state.family;
  }
  if (dark && dark.checked !== (state.mode === 'dark')) {
    dark.checked = state.mode === 'dark';
  }
}

let bound = false;

function bindControls() {
  const family = document.getElementById('theme-family');
  const dark = document.getElementById('theme-dark');
  if (!family || !dark || bound) return;
  bound = true;

  family.addEventListener('change', (event) => {
    if (event.target !== family) return;
    const value = (event as CustomEvent<{ value?: string }>).detail?.value;
    if (!value || !isFamily(value)) return;
    const next = { ...readStored(), family: value };
    applyTheme(next);
  });

  dark.addEventListener('change', (event) => {
    if (event.target !== dark) return;
    const checked = (event as CustomEvent<{ checked?: boolean }>).detail?.checked;
    const next = {
      ...readStored(),
      mode: checked ? ('dark' as const) : ('light' as const),
    };
    applyTheme(next);
  });
}

export function initTheme() {
  const state = readStored();
  applyTheme(state);

  const ready = Promise.all([
    customElements.whenDefined('rds-segment'),
    customElements.whenDefined('rds-switch'),
  ]);

  void ready.then(() => {
    syncControls(readStored());
    bindControls();
  });
}
