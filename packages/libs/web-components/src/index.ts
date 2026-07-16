export { RdsAlert, type RdsAlertVariant } from './components/alert';
export { RdsBadge, type RdsBadgeVariant } from './components/badge';
export { RdsButton, type RdsButtonSize, type RdsButtonVariant } from './components/button';
export { RdsCard } from './components/card';
export { RdsInput } from './components/input';
export { RdsLabel } from './components/label';
export { RdsSwitch } from './components/switch';
export { defineElement } from './internal/define';

/** Register every shipped custom element (idempotent). */
export const registerRocketcWebComponents = async (): Promise<void> => {
  await import('./register');
};
