import { RcButton, RcIconButton, RcCloseButton } from './components/basic/button';
import { RcButtonGroup } from './components/basic/button-group';
import { RcCheckbox } from './components/basic/checkbox';
import { RcColorPicker } from './components/basic/color-picker';
import { RcCombobox, RcComboboxOption } from './components/basic/combobox';
import { RcDetails } from './components/basic/details';
import { RcDialog } from './components/basic/dialog';
import { RcField } from './components/basic/field';
import { RcFieldset } from './components/basic/fieldset';
import { RcFileUpload } from './components/basic/file-upload';
import { RcInput } from './components/basic/input';
import { RcLabel } from './components/basic/label';
import { RcLink } from './components/basic/link';
import { RcMeter } from './components/basic/meter';
import { RcNumberInput } from './components/basic/number-input';
import { RcPasswordInput } from './components/basic/password-input';
import { RcPinInput } from './components/basic/pin-input';
import { RcProgress, RcProgressCircle, RcSpinner } from './components/basic/progress';
import { RcRadio, RcRadioGroup } from './components/basic/radio';
import { RcRating } from './components/basic/rating';
import { RcSegment, RcSegmentItem } from './components/basic/segment';
import { RcSelect } from './components/basic/select';
import { RcSlider } from './components/basic/slider';
import { RcSwitch } from './components/basic/switch';
import { RcTagsInput } from './components/basic/tags-input';
import { RcTextarea } from './components/basic/textarea';
import { RcTypography } from './components/basic/typography';
import { RcAvatar } from './components/data/avatar';
import { RcEmpty } from './components/data/empty';
import { RcList, RcListItem } from './components/data/list';
import { RcStat } from './components/data/stat';
import { RcTable } from './components/data/table';
import { RcAlert } from './components/feedback/alert';
import { RcBadge, RcTag } from './components/feedback/badge';
import { RcBanner } from './components/feedback/banner';
import { RcSkeleton } from './components/feedback/skeleton';
import { RcSnackbar } from './components/feedback/snackbar';
import { RcToast } from './components/feedback/toast';
import { RcBox } from './components/layout/box';
import { RcCenter } from './components/layout/center';
import { RcDivider } from './components/layout/divider';
import { RcFlex } from './components/layout/flex';
import { RcGrid } from './components/layout/grid';
import { RcScrollArea } from './components/layout/scroll-area';
import { RcSeparator } from './components/layout/separator';
import { RcStack } from './components/layout/stack';
import { RcAccordion, RcAccordionItem } from './components/navigation/accordion';
import { RcBreadcrumb } from './components/navigation/breadcrumb';
import { RcMenu, RcMenuItem } from './components/navigation/menu';
import { RcPagination } from './components/navigation/pagination';
import { RcSidebar } from './components/navigation/sidebar';
import { RcSteps, RcStep } from './components/navigation/steps';
import { RcTabs, RcTab } from './components/navigation/tabs';
import { RcTimeline, RcTimelineItem } from './components/navigation/timeline';
import { RcDrawer } from './components/overlay/drawer';
import { RcDropdown } from './components/overlay/dropdown';
import { RcHoverCard } from './components/overlay/hover-card';
import { RcToggleTip } from './components/overlay/toggle-tip';
import { RcTooltip } from './components/overlay/tooltip';
import { RcCard } from './components/surfaces/card';
import { RcPanel } from './components/surfaces/panel';
import { RcPopover } from './components/surfaces/popover';
import { RcSheet } from './components/surfaces/sheet';
import { defineElement } from './internal/define';

export * from './components/basic/button';
export * from './components/basic/button-group';
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
  delegateAria,
  isAriaAttribute,
  mixinDelegatesAria,
  type AriaDelegateOverrides,
  type ARIAMixinStrict,
  type ARIAProperty,
} from './internal/mixin-delegates-aria';
export { defineElement } from './internal/define';
export {
  internals,
  mixinElementInternals,
  type WithElementInternals,
} from './internal/mixin-element-internals';
export {
  getFormState,
  getFormValue,
  mixinFormAssociated,
  type FormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
  type FormValue,
} from './internal/mixin-form-associated';
export {
  rcStyleProperties,
  type RcBorderWidthValue,
  type RcFontWeightValue,
  type RcJustifyValue,
  type RcOpenString,
  type RcRadiusValue,
  type RcSpaceValue,
  type RcStylePropertyDefinition,
  type RcStylePropertyName,
  type RcStyleProps,
  type RcSurfaceValue,
  type RcTextColorValue,
  type RcTypographyValue,
} from './internal/style-properties';
export { resolveRcStyleValue } from './internal/style-value';
export { RcStyledElement } from './internal/styled-element';

/** Register every shipped custom element (idempotent). */
export function registerRocketcCustomElements(): void {
  // basic
  defineElement('rc-button', RcButton);
  defineElement('rc-button-group', RcButtonGroup);
  defineElement('rc-close-button', RcCloseButton);
  defineElement('rc-color-picker', RcColorPicker);
  defineElement('rc-combobox', RcCombobox);
  defineElement('rc-combobox-option', RcComboboxOption);
  defineElement('rc-checkbox', RcCheckbox);
  defineElement('rc-details', RcDetails);
  defineElement('rc-dialog', RcDialog);
  defineElement('rc-field', RcField);
  defineElement('rc-fieldset', RcFieldset);
  defineElement('rc-file-upload', RcFileUpload);
  defineElement('rc-icon-button', RcIconButton);
  defineElement('rc-input', RcInput);
  defineElement('rc-label', RcLabel);
  defineElement('rc-link', RcLink);
  defineElement('rc-meter', RcMeter);
  defineElement('rc-number-input', RcNumberInput);
  defineElement('rc-password-input', RcPasswordInput);
  defineElement('rc-pin-input', RcPinInput);
  defineElement('rc-progress', RcProgress);
  defineElement('rc-progress-circle', RcProgressCircle);
  defineElement('rc-radio', RcRadio);
  defineElement('rc-radio-group', RcRadioGroup);
  defineElement('rc-rating', RcRating);
  defineElement('rc-segment', RcSegment);
  defineElement('rc-segment-item', RcSegmentItem);
  defineElement('rc-select', RcSelect);
  defineElement('rc-slider', RcSlider);
  defineElement('rc-spinner', RcSpinner);
  defineElement('rc-switch', RcSwitch);
  defineElement('rc-tags-input', RcTagsInput);
  defineElement('rc-textarea', RcTextarea);
  defineElement('rc-typography', RcTypography);

  // feedback
  defineElement('rc-alert', RcAlert);
  defineElement('rc-badge', RcBadge);
  defineElement('rc-banner', RcBanner);
  defineElement('rc-skeleton', RcSkeleton);
  defineElement('rc-snackbar', RcSnackbar);
  defineElement('rc-tag', RcTag);
  defineElement('rc-toast', RcToast);

  // surfaces
  defineElement('rc-card', RcCard);
  defineElement('rc-panel', RcPanel);
  defineElement('rc-popover', RcPopover);
  defineElement('rc-sheet', RcSheet);

  // navigation
  defineElement('rc-accordion', RcAccordion);
  defineElement('rc-accordion-item', RcAccordionItem);
  defineElement('rc-breadcrumb', RcBreadcrumb);
  defineElement('rc-menu', RcMenu);
  defineElement('rc-menu-item', RcMenuItem);
  defineElement('rc-pagination', RcPagination);
  defineElement('rc-sidebar', RcSidebar);
  defineElement('rc-step', RcStep);
  defineElement('rc-steps', RcSteps);
  defineElement('rc-tab', RcTab);
  defineElement('rc-tabs', RcTabs);
  defineElement('rc-timeline', RcTimeline);
  defineElement('rc-timeline-item', RcTimelineItem);

  // overlay
  defineElement('rc-drawer', RcDrawer);
  defineElement('rc-dropdown', RcDropdown);
  defineElement('rc-hover-card', RcHoverCard);
  defineElement('rc-toggle-tip', RcToggleTip);
  defineElement('rc-tooltip', RcTooltip);

  // data
  defineElement('rc-avatar', RcAvatar);
  defineElement('rc-empty', RcEmpty);
  defineElement('rc-list', RcList);
  defineElement('rc-list-item', RcListItem);
  defineElement('rc-stat', RcStat);
  defineElement('rc-table', RcTable);

  // layout
  defineElement('rc-box', RcBox);
  defineElement('rc-center', RcCenter);
  defineElement('rc-divider', RcDivider);
  defineElement('rc-flex', RcFlex);
  defineElement('rc-grid', RcGrid);
  defineElement('rc-scroll-area', RcScrollArea);
  defineElement('rc-separator', RcSeparator);
  defineElement('rc-stack', RcStack);
}
