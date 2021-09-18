import { isTrue } from 'onekijs';
import { DashboardHorizontalPanel, DashboardSize, DashboardVerticalPanel } from '../typings';

export const getDashboardPanelLength = (
  type: 'width' | 'height',
  size: DashboardSize,
  panel: DashboardHorizontalPanel | DashboardVerticalPanel | undefined,
): string | 0 => {
  if (!panel) return 0;

  const panelCollapseLength =
    type === 'width'
      ? (panel as DashboardVerticalPanel)?.collapseWidth
      : (panel as DashboardHorizontalPanel)?.collapseHeight;

  const panelLength =
    type === 'width' ? (panel as DashboardVerticalPanel)?.width : (panel as DashboardHorizontalPanel)?.height;

  if (!panel.floating && (size === 'small' || isTrue(panel.collapse))) {
    return panelCollapseLength;
  }
  return panelLength;
};

// get the actual width of a panel on the workspace
// if the panel is floating, it takes no space
export const getWorkspacePanelLength = (
  type: 'width' | 'height',
  size: DashboardSize,
  panel: DashboardHorizontalPanel | DashboardVerticalPanel | undefined,
): string | 0 => {
  if (!panel || panel.floating) return 0;
  return getDashboardPanelLength(type, size, panel);
};
