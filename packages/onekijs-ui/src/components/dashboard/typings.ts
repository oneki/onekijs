import React, { ReactNode } from 'react';
import { ColorPropertyTheme, StylableProps } from '../../styles/typings';
import { DashboardService } from './DashboardService';


export type DashboardArea = DashboardHorizontalArea | DashboardVerticalArea | 'body' | 'none';

export type DashboardBodyComponentProps = {
  className?: string;
  footer?: DashboardHorizontalPanel;
  header?: DashboardHorizontalPanel;
  left?: DashboardVerticalPanel;
  right?: DashboardVerticalPanel;
  panel?: DashboardBodyPanel;
};

export type DashboardBodyPanel = {
  className?: string;
};

export type DashboardBodyPanelProps = {
  className?: string;
};

export type DashboardContainer = {

};

export type DashboardContainerProps = {
  areas?: DashboardArea[][];
  className?: string;
  footer?: DashboardHorizontalPanel;
  header?: DashboardHorizontalPanel;
  left?: DashboardVerticalPanel;
  right?: DashboardVerticalPanel;
  body?: DashboardBodyPanel;
  onInit: (ref: React.MutableRefObject<HTMLDivElement | null>) => void;
  onDestroy: () => void;
};

export type DashboardHorizontalArea = 'header' | 'footer';

export type DashboardHorizontalPanel = DashboardSidePanel &
  Required<DashboardHorizontalProps> & {
    area: DashboardHorizontalArea;
  };

export type DashboardHorizontalPanelComponentProps = React.InputHTMLAttributes<HTMLDivElement> &
  DashboardState &
  DashboardHorizontalPanelProps & {
    panel?: DashboardHorizontalPanel;
    area: DashboardHorizontalArea;
  };

type DashboardHorizontalProps = {
  collapseHeight?: string | 0;
  height?: string | 0;
  maxHeight?: string | 0;
  minHeight?: string | 0;
};

export type DashboardHorizontalPanelProps = StylableProps & DashboardSidePanelProps & DashboardHorizontalProps & {
  area?: DashboardHorizontalArea;
};

export type DashboardProps = StylableProps & {
  ContainerComponent?: React.FC<DashboardContainerProps>;
  OverlayComponent?: React.FC<DashboardOverlayProps>;
  controller?: DashboardService;
};

export type DashboardOverlayProps = React.InputHTMLAttributes<HTMLDivElement> & {
  show: boolean;
};

export type DashboardSidePanel = Omit<Required<DashboardSidePanelProps>, 'collapse' | 'floating'> & {
  collapsing: boolean;
  content?: ReactNode;
  expanding: boolean,
};

export type DashboardSidePanelProps = {
  animation?: number;
  backgroundColor?: ColorPropertyTheme | string;
  collapse?: boolean;
  collapseSmall?: boolean;
  collapseMedium?: boolean;
  collapseLarge?: boolean;
  floating?: boolean;
  floatingSmall?: boolean;
  floatingMedium?: boolean;
  floatingLarge?: boolean;
  resizable?: boolean;
  resizerGap?: number;
  resizing?: boolean;
};

export type DashboardSize = 'small' | 'medium' | 'large';

export type DashboardState = {
  right?: DashboardVerticalPanel;
  left?: DashboardVerticalPanel;
  header?: DashboardHorizontalPanel;
  footer?: DashboardHorizontalPanel;
  body?: DashboardBodyPanel;
  container?: DashboardContainer;
  areas?: DashboardArea[][];
};

export type DashboardTogglerProps = {
  area: DashboardVerticalArea;
};

export type DashboardVerticalArea = 'left' | 'right';

export type DashboardVerticalPanel = DashboardSidePanel &
  Required<DashboardVerticalProps> & {
    area: DashboardVerticalArea;
  };

export type DashboardVerticalPanelComponentProps = StylableProps & React.InputHTMLAttributes<HTMLDivElement> &
  DashboardState &
  DashboardVerticalPanelProps & {
    panel?: DashboardVerticalPanel;
    area: DashboardVerticalArea;
  };

type DashboardVerticalProps = {
  collapseWidth?: string | 0;
  maxWidth?: string | 0;
  minWidth?: string | 0;
  width?: string | 0;
};

export type DashboardVerticalPanelProps = DashboardSidePanelProps & DashboardVerticalProps & {
  area?: DashboardVerticalArea;
};
