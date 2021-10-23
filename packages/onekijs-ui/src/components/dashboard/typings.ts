import { AnyFunction } from 'onekijs';
import React from 'react';

export type DashboardArea = DashboardHorizontalArea | DashboardVerticalArea | 'body' | 'none';

export type DashboardBodyComponentProps = {
  className?: string;
  footer?: DashboardHorizontalPanel;
  header?: DashboardHorizontalPanel;
  left?: DashboardVerticalPanel;
  right?: DashboardVerticalPanel;
};

export type DashboardBodyPanel = {
  className?: string;
  ref: React.RefObject<HTMLDivElement>;
};

export type DashboardBodyPanelProps = {
  className?: string;
};

export type DashboardContainerProps = {
  areas?: DashboardArea[][];
  className?: string;
  footer?: DashboardHorizontalPanel;
  header?: DashboardHorizontalPanel;
  left?: DashboardVerticalPanel;
  right?: DashboardVerticalPanel;
  body?: DashboardBodyPanel;
};

export type DashboardHorizontalArea = 'header' | 'footer';

export type DashboardHorizontalPanel = {
  area: DashboardHorizontalArea;
  className?: string;
  collapse: boolean;
  collapseHeight: string | 0;
  floating: boolean;
  height: string | 0;
  ref: React.RefObject<HTMLDivElement>;
};

export type DashboardHorizontalPanelComponentProps = React.InputHTMLAttributes<HTMLDivElement> &
  DashboardState &
  DashboardHorizontalPanelProps & {
    panel?: DashboardHorizontalPanel;
    area: DashboardHorizontalArea;
  };

export type DashboardHorizontalPanelProps = {
  className?: string;
  initialCollapse?: boolean;
  initialCollapseHeight?: string | 0;
  initialFloating?: boolean;
  initialHeight?: string | 0;
  resizable?: boolean;
};

export type DashboardProps = {
  ContainerComponent?: React.FC<DashboardContainerProps>;
  OverlayComponent?: React.FC<DashboardOverlayProps>;
};

export type DashboardOverlayProps = {
  show: boolean;
  onClick: AnyFunction<void>;
};

export type DashboardSize = 'small' | 'medium' | 'large';

export type DashboardState = {
  right?: DashboardVerticalPanel;
  left?: DashboardVerticalPanel;
  header?: DashboardHorizontalPanel;
  footer?: DashboardHorizontalPanel;
  body?: DashboardBodyPanel;
  areas?: DashboardArea[][];
};

export type DashboardTogglerProps = {
  area: DashboardVerticalArea;
};

export type DashboardVerticalArea = 'left' | 'right';

export type DashboardVerticalPanel = {
  area: DashboardVerticalArea;
  className?: string;
  collapse: boolean;
  collapseWidth: string | 0;
  floating: boolean;
  ref: React.RefObject<HTMLDivElement>;
  width: string | 0;
};

export type DashboardVerticalPanelComponentProps = React.InputHTMLAttributes<HTMLDivElement> &
  DashboardState &
  DashboardVerticalPanelProps & {
    panel?: DashboardVerticalPanel;
    area: DashboardVerticalArea;
  };

export type DashboardVerticalPanelProps = {
  className?: string;
  initialCollapse?: boolean;
  initialCollapseWidth?: string | 0;
  initialFloating?: boolean;
  initialWidth?: string | 0;
  resizable?: boolean;
};
