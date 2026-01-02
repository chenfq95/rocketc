import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@rocketc/react/style.css';
import App from './index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
