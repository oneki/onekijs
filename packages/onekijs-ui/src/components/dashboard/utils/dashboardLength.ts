import { isTrue, ucfirst } from 'onekijs-framework';
import { DashboardHorizontalPanel, DashboardSize, DashboardVerticalPanel } from '../typings';

export const getCollapseKey = (size: DashboardSize): 'collapseSmall' | 'collapseMedium' | 'collapseLarge' => {
  return `collapse${ucfirst(size)}` as 'collapseSmall' | 'collapseMedium' | 'collapseLarge';
};

export const getFloatingKey = (size: DashboardSize): 'floatingSmall' | 'floatingMedium' | 'floatingLarge' => {
  return `floating${ucfirst(size)}` as 'floatingSmall' | 'floatingMedium' | 'floatingLarge';
};

export const getDashboardPanelLength = (
  type: 'width' | 'height',
  size: DashboardSize,
  panel: DashboardHorizontalPanel | DashboardVerticalPanel | undefined,
): string | 0 => {
  if (!panel || (panel[getFloatingKey(size)] && panel[getCollapseKey(size)])) return 0;

  const isCollapsed = isTrue(panel[getCollapseKey(size)]);

  if (isCollapsed) {
    return type === 'width'
    ? (panel as DashboardVerticalPanel)?.collapseWidth
    : (panel as DashboardHorizontalPanel)?.collapseHeight;
  }

  return type === 'width' ? (panel as DashboardVerticalPanel).width : (panel as DashboardHorizontalPanel).height;
};

// get the actual width of a panel on the workspace
// if the panel is floating, it takes no space
export const getWorkspacePanelLength = (
  type: 'width' | 'height',
  size: DashboardSize,
  panel: DashboardHorizontalPanel | DashboardVerticalPanel | undefined,
): string | 0 => {
  if (!panel || panel[getFloatingKey(size)]) return 0;
  return getDashboardPanelLength(type, size, panel);
};
