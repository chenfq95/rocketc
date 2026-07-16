/**
 * Internal side-effect module: registers all Rocketc web components.
 * Load via `registerRocketcWebComponents()` from the package root.
 */
import { RdsAlert } from './components/alert';
import { RdsBadge } from './components/badge';
import { RdsButton } from './components/button';
import { RdsCard } from './components/card';
import { RdsInput } from './components/input';
import { RdsLabel } from './components/label';
import { RdsSwitch } from './components/switch';
import { defineElement } from './internal/define';

defineElement('rds-alert', RdsAlert);
defineElement('rds-badge', RdsBadge);
defineElement('rds-button', RdsButton);
defineElement('rds-card', RdsCard);
defineElement('rds-input', RdsInput);
defineElement('rds-label', RdsLabel);
defineElement('rds-switch', RdsSwitch);
