import { AnyFunction } from 'onekijs';
import React from 'react';

export type DashboardArea = 'right' | 'left' | 'header' | 'footer' | 'body';

export type DashboardContainerProps = {
  right?: DashboardPanel;
  left?: DashboardPanel;
  header?: DashboardPanel;
  footer?: DashboardPanel;
  body?: DashboardPanel;
  areas?: (DashboardArea | 'none')[][];
};

export type DashboardPanelProps = {
  initialCollapse?: boolean | 'auto';
  initialCollapseHeight?: string | 0;
  initialCollapseWidth?: string | 0;
  initialFloating?: boolean | 'auto';
  initialHeight?: string | 0;
  initialWidth?: string | 0;
};

export type DashboardPanel = {
  collapse?: boolean | 'auto';
  collapseHeight?: string | 0;
  collapseWidth?: string | 0;
  floating?: boolean | 'auto';
  height?: string | 0;
  present?: boolean;
  width?: string | 0;
};

export type DashboardProps = {
  ContainerComponent?: React.FC<DashboardContainerProps>;
  OverlayComponent?: React.FC<DashboardOverlayProps>;
};

export type DashboardOverlayProps = {
  show: boolean;
  onClick: AnyFunction<void>;
};

export type DashboardSidebarProps = React.InputHTMLAttributes<HTMLDivElement> & {
  area: DashboardArea;
  panel: DashboardPanel;
};

export type DashboardSize = 'small' | 'medium' | 'large';

export type DashboardState = {
  right?: DashboardPanel;
  left?: DashboardPanel;
  header?: DashboardPanel;
  footer?: DashboardPanel;
  body?: DashboardPanel;
  areas?: (DashboardArea | 'none')[][];
  initialized?: boolean;
};

export type DashboardTogglerProps = {
  area: DashboardArea;
};
