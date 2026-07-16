import '../styles.css';
import '../styles/shadcn.css';

import { registerRocketcWebComponents } from '@rocketc/web-components';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Preview root element was not found.');
}

void registerRocketcWebComponents().then(() => {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
