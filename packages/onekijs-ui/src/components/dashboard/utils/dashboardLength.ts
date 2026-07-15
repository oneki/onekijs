import { isTrue, ucfirst } from 'onekijs-framework';
import { DashboardHorizontalPanel, DashboardSize, DashboardVerticalPanel } from '../typings';

export const getCollapseKey = (size: DashboardSize): 'collapseSmall' | 'collapseMedium' | 'collapseLarge' => {
  return `collapse${ucfirst(size)}` as 'collapseSmall' | 'collapseMedium' | 'collapseLarge';
};

export const getFloatingKey = (size: DashboardSize): 'floatingSmall' | 'floatingMedium' | 'floatingLarge' => {
  return `floating${ucfirst(size)}` as 'floatingSmall' | 'floatingMedium' | 'floatingLarge';
};

// full ignore collapse and float key => ask for the full width / height of the panel not collapsed and not floated
export const getDashboardPanelSize = (
  type: 'width' | 'height',
  size: DashboardSize,
  panel: DashboardHorizontalPanel | DashboardVerticalPanel | undefined,
  full = false,
): string | 0 => {
  if (!panel) return 0;

  let isCollapsed = isTrue(panel[getCollapseKey(size)]);
  let isCollapsing = isTrue(panel.collapsing);

  const collapseSize =
    type === 'width'
      ? (panel as DashboardVerticalPanel)?.collapseWidth
      : (panel as DashboardHorizontalPanel)?.collapseHeight;

  if (isTrue(panel[getFloatingKey(size)]) || parseInt(`${collapseSize}`) === 0) {
    if (isCollapsed && !isCollapsing && !full) return 0;
    isCollapsed = false;
  }

  if (isCollapsed && !full) {
    return type === 'width'
      ? (panel as DashboardVerticalPanel)?.collapseWidth
      : (panel as DashboardHorizontalPanel)?.collapseHeight;
  }

  return type === 'width' ? (panel as DashboardVerticalPanel).width : (panel as DashboardHorizontalPanel).height;
};

// full ignore collapse and float key => ask for the full width / height of the panel not collapsed and not floated
export const getDashboardPanelContainerSize = (
  type: 'width' | 'height',
  size: DashboardSize,
  panel: DashboardHorizontalPanel | DashboardVerticalPanel | undefined,
  full = false,
): string | 0 | null => {
  if (!panel || isTrue(panel[getFloatingKey(size)])) return null; // do not manage width/height at the container level

  const collapseSize =
    type === 'width'
      ? (panel as DashboardVerticalPanel)?.collapseWidth
      : (panel as DashboardHorizontalPanel)?.collapseHeight;

  if (parseInt(`${collapseSize}`) !== 0) return null; // do not manage width/height at the container level

  let isCollapsed = isTrue(panel[getCollapseKey(size)]);

  if (isCollapsed && !full) {
    return collapseSize;
  }

  return type === 'width' ? (panel as DashboardVerticalPanel).width : (panel as DashboardHorizontalPanel).height;
};
