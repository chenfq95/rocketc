import { RdsButton, RdsIconButton, RdsCloseButton } from './components/basic/button';
import { RdsCheckbox } from './components/basic/checkbox';
import { RdsColorPicker } from './components/basic/color-picker';
import { RdsCombobox, RdsComboboxOption } from './components/basic/combobox';
import { RdsDetails } from './components/basic/details';
import { RdsDialog } from './components/basic/dialog';
import { RdsField } from './components/basic/field';
import { RdsFieldset } from './components/basic/fieldset';
import { RdsFileUpload } from './components/basic/file-upload';
import { RdsInput } from './components/basic/input';
import { RdsLabel } from './components/basic/label';
import { RdsLink } from './components/basic/link';
import { RdsMeter } from './components/basic/meter';
import { RdsNumberInput } from './components/basic/number-input';
import { RdsPasswordInput } from './components/basic/password-input';
import { RdsPinInput } from './components/basic/pin-input';
import { RdsProgress, RdsProgressCircle, RdsSpinner } from './components/basic/progress';
import { RdsRadio, RdsRadioGroup } from './components/basic/radio';
import { RdsRating } from './components/basic/rating';
import { RdsSegment, RdsSegmentItem } from './components/basic/segment';
import { RdsSelect } from './components/basic/select';
import { RdsSlider } from './components/basic/slider';
import { RdsSwitch } from './components/basic/switch';
import { RdsTagsInput } from './components/basic/tags-input';
import { RdsTextarea } from './components/basic/textarea';
import { RdsTypography } from './components/basic/typography';
import { RdsAvatar } from './components/data/avatar';
import { RdsEmpty } from './components/data/empty';
import { RdsList, RdsListItem } from './components/data/list';
import { RdsStat } from './components/data/stat';
import { RdsTable } from './components/data/table';
import { RdsAlert } from './components/feedback/alert';
import { RdsBadge, RdsTag } from './components/feedback/badge';
import { RdsBanner } from './components/feedback/banner';
import { RdsSkeleton } from './components/feedback/skeleton';
import { RdsSnackbar } from './components/feedback/snackbar';
import { RdsToast } from './components/feedback/toast';
import { RdsBox } from './components/layout/box';
import { RdsCenter } from './components/layout/center';
import { RdsDivider } from './components/layout/divider';
import { RdsFlex } from './components/layout/flex';
import { RdsGrid } from './components/layout/grid';
import { RdsScrollArea } from './components/layout/scroll-area';
import { RdsSeparator } from './components/layout/separator';
import { RdsStack } from './components/layout/stack';
import { RdsAccordion, RdsAccordionItem } from './components/navigation/accordion';
import { RdsBreadcrumb } from './components/navigation/breadcrumb';
import { RdsMenu, RdsMenuItem } from './components/navigation/menu';
import { RdsPagination } from './components/navigation/pagination';
import { RdsSidebar } from './components/navigation/sidebar';
import { RdsSteps, RdsStep } from './components/navigation/steps';
import { RdsTabs, RdsTab } from './components/navigation/tabs';
import { RdsTimeline, RdsTimelineItem } from './components/navigation/timeline';
import { RdsDrawer } from './components/overlay/drawer';
import { RdsDropdown } from './components/overlay/dropdown';
import { RdsHoverCard } from './components/overlay/hover-card';
import { RdsToggleTip } from './components/overlay/toggle-tip';
import { RdsTooltip } from './components/overlay/tooltip';
import { RdsCard } from './components/surfaces/card';
import { RdsPanel } from './components/surfaces/panel';
import { RdsPopover } from './components/surfaces/popover';
import { RdsSheet } from './components/surfaces/sheet';
import { defineElement } from './internal/define';

export * from './components/basic/button';
export * from './components/basic/checkbox';
export * from './components/basic/color-picker';
export * from './components/basic/combobox';
export * from './components/basic/details';
export * from './components/basic/dialog';
export * from './components/basic/field';
export * from './components/basic/fieldset';
export * from './components/basic/file-upload';
export * from './components/basic/input';
export * from './components/basic/label';
export * from './components/basic/link';
export * from './components/basic/meter';
export * from './components/basic/number-input';
export * from './components/basic/password-input';
export * from './components/basic/pin-input';
export * from './components/basic/progress';
export * from './components/basic/radio';
export * from './components/basic/rating';
export * from './components/basic/segment';
export * from './components/basic/select';
export * from './components/basic/slider';
export * from './components/basic/switch';
export * from './components/basic/tags-input';
export * from './components/basic/textarea';
export * from './components/basic/typography';
export * from './components/data/avatar';
export * from './components/data/empty';
export * from './components/data/list';
export * from './components/data/stat';
export * from './components/data/table';
export * from './components/feedback/alert';
export * from './components/feedback/badge';
export * from './components/feedback/banner';
export * from './components/feedback/skeleton';
export * from './components/feedback/snackbar';
export * from './components/feedback/toast';
export * from './components/layout/box';
export * from './components/layout/center';
export * from './components/layout/divider';
export * from './components/layout/flex';
export * from './components/layout/grid';
export * from './components/layout/scroll-area';
export * from './components/layout/separator';
export * from './components/layout/stack';
export * from './components/navigation/accordion';
export * from './components/navigation/breadcrumb';
export * from './components/navigation/menu';
export * from './components/navigation/pagination';
export * from './components/navigation/sidebar';
export * from './components/navigation/steps';
export * from './components/navigation/tabs';
export * from './components/navigation/timeline';
export * from './components/overlay/drawer';
export * from './components/overlay/dropdown';
export * from './components/overlay/hover-card';
export * from './components/overlay/toggle-tip';
export * from './components/overlay/tooltip';
export * from './components/surfaces/card';
export * from './components/surfaces/panel';
export * from './components/surfaces/popover';
export * from './components/surfaces/sheet';

export {
  ariaPropertyToAttribute,
  isAriaAttribute,
  mixinDelegatesAria,
  type ARIAMixinStrict,
  type ARIAProperty,
} from './internal/delegate-aria';
export { defineElement } from './internal/define';
export {
  internals,
  mixinElementInternals,
  type WithElementInternals,
} from './internal/element-internals';
export {
  getFormState,
  getFormValue,
  mixinFormAssociated,
  type FormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
  type FormValue,
} from './internal/form-associated';

/** Register every shipped custom element (idempotent). */
export function registerRocketcCustomElements(): void {
  // basic
  defineElement('rds-button', RdsButton);
  defineElement('rds-close-button', RdsCloseButton);
  defineElement('rds-color-picker', RdsColorPicker);
  defineElement('rds-combobox', RdsCombobox);
  defineElement('rds-combobox-option', RdsComboboxOption);
  defineElement('rds-checkbox', RdsCheckbox);
  defineElement('rds-details', RdsDetails);
  defineElement('rds-dialog', RdsDialog);
  defineElement('rds-field', RdsField);
  defineElement('rds-fieldset', RdsFieldset);
  defineElement('rds-file-upload', RdsFileUpload);
  defineElement('rds-icon-button', RdsIconButton);
  defineElement('rds-input', RdsInput);
  defineElement('rds-label', RdsLabel);
  defineElement('rds-link', RdsLink);
  defineElement('rds-meter', RdsMeter);
  defineElement('rds-number-input', RdsNumberInput);
  defineElement('rds-password-input', RdsPasswordInput);
  defineElement('rds-pin-input', RdsPinInput);
  defineElement('rds-progress', RdsProgress);
  defineElement('rds-progress-circle', RdsProgressCircle);
  defineElement('rds-radio', RdsRadio);
  defineElement('rds-radio-group', RdsRadioGroup);
  defineElement('rds-rating', RdsRating);
  defineElement('rds-segment', RdsSegment);
  defineElement('rds-segment-item', RdsSegmentItem);
  defineElement('rds-select', RdsSelect);
  defineElement('rds-slider', RdsSlider);
  defineElement('rds-spinner', RdsSpinner);
  defineElement('rds-switch', RdsSwitch);
  defineElement('rds-tags-input', RdsTagsInput);
  defineElement('rds-textarea', RdsTextarea);
  defineElement('rds-typography', RdsTypography);

  // feedback
  defineElement('rds-alert', RdsAlert);
  defineElement('rds-badge', RdsBadge);
  defineElement('rds-banner', RdsBanner);
  defineElement('rds-skeleton', RdsSkeleton);
  defineElement('rds-snackbar', RdsSnackbar);
  defineElement('rds-tag', RdsTag);
  defineElement('rds-toast', RdsToast);

  // surfaces
  defineElement('rds-card', RdsCard);
  defineElement('rds-panel', RdsPanel);
  defineElement('rds-popover', RdsPopover);
  defineElement('rds-sheet', RdsSheet);

  // navigation
  defineElement('rds-accordion', RdsAccordion);
  defineElement('rds-accordion-item', RdsAccordionItem);
  defineElement('rds-breadcrumb', RdsBreadcrumb);
  defineElement('rds-menu', RdsMenu);
  defineElement('rds-menu-item', RdsMenuItem);
  defineElement('rds-pagination', RdsPagination);
  defineElement('rds-sidebar', RdsSidebar);
  defineElement('rds-step', RdsStep);
  defineElement('rds-steps', RdsSteps);
  defineElement('rds-tab', RdsTab);
  defineElement('rds-tabs', RdsTabs);
  defineElement('rds-timeline', RdsTimeline);
  defineElement('rds-timeline-item', RdsTimelineItem);

  // overlay
  defineElement('rds-drawer', RdsDrawer);
  defineElement('rds-dropdown', RdsDropdown);
  defineElement('rds-hover-card', RdsHoverCard);
  defineElement('rds-toggle-tip', RdsToggleTip);
  defineElement('rds-tooltip', RdsTooltip);

  // data
  defineElement('rds-avatar', RdsAvatar);
  defineElement('rds-empty', RdsEmpty);
  defineElement('rds-list', RdsList);
  defineElement('rds-list-item', RdsListItem);
  defineElement('rds-stat', RdsStat);
  defineElement('rds-table', RdsTable);

  // layout
  defineElement('rds-box', RdsBox);
  defineElement('rds-center', RdsCenter);
  defineElement('rds-divider', RdsDivider);
  defineElement('rds-flex', RdsFlex);
  defineElement('rds-grid', RdsGrid);
  defineElement('rds-scroll-area', RdsScrollArea);
  defineElement('rds-separator', RdsSeparator);
  defineElement('rds-stack', RdsStack);
}
