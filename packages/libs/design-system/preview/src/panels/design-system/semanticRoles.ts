/** Semantic role catalogs for the Design System Semantic tab (non-color). */

export const shadowRoles = [
  ['surface', 'shadow.surface', 'Resting content on the stage', 'shadow.xs'],
  ['raised', 'shadow.raised', 'Required with surface.elevated', 'shadow.md'],
  ['overlay', 'shadow.overlay', 'Modal / menu / top chrome', 'shadow.lg'],
  ['focus', 'shadow.focus', 'Neutral focus ring (not brand)', '0 0 0 3px'],
] as const;

export const layoutRoles = [
  ['page.maxWidth', 'layout.page.maxWidth', 'page-max-width', '1180px'],
  ['page.gutter', 'layout.page.gutter', 'page-gutter', '8px'],
  ['reading.maxWidth', 'layout.reading.maxWidth', 'reading-max-width', '720px'],
  ['header.height', 'layout.header.height', 'header-height', '44px'],
  ['toolbar.height', 'layout.toolbar.height', 'toolbar-height', '32px'],
  ['sidebar.width', 'layout.sidebar.width', 'sidebar-width', '248px'],
  ['sidebar.collapsedWidth', 'layout.sidebar.collapsedWidth', 'sidebar-collapsed-width', '48px'],
  ['content.maxWidth', 'layout.content.maxWidth', 'content-max-width', '1180px'],
] as const;

export const zIndexRoles = [
  ['base', 'zIndex.base', '0'],
  ['raised', 'zIndex.raised', '10'],
  ['dropdown', 'zIndex.dropdown', '100'],
  ['sticky', 'zIndex.sticky', '200'],
  ['overlay', 'zIndex.overlay', '300'],
  ['modal', 'zIndex.modal', '400'],
  ['popover', 'zIndex.popover', '500'],
  ['toast', 'zIndex.toast', '600'],
  ['tooltip', 'zIndex.tooltip', '700'],
] as const;

export const opacityRoles = [
  ['disabled', 'opacity.disabled', 'disabled', '0.4'],
  ['hover', 'opacity.hover', 'hover', '0.8'],
  ['pressed', 'opacity.pressed', 'pressed', '0.9'],
  ['muted', 'opacity.muted', 'muted', '0.6'],
  ['overlay', 'opacity.overlay', 'overlay', '0.5'],
  ['scrim', 'opacity.scrim', 'scrim', '0.7'],
  ['action.bgHover', 'opacity.action.bgHover', 'action-bg-hover', '0.04'],
  ['action.bgSelected', 'opacity.action.bgSelected', 'action-bg-selected', '0.08'],
  ['action.fgDisabled', 'opacity.action.fgDisabled', 'action-fg-disabled', '0.38'],
  ['action.bgFocus', 'opacity.action.bgFocus', 'action-bg-focus', '0.12'],
  ['action.bgActivated', 'opacity.action.bgActivated', 'action-bg-activated', '0.12'],
] as const;
