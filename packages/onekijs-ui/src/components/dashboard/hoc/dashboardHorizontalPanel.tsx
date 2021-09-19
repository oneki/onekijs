import React, { useEffect } from 'react';
import styled from 'styled-components';
import Resizer from '../../resizer';
import useDashboardService from '../hooks/useDashboardService';
import useDashboardState from '../hooks/useDashboardState';
import {
  DashboardHorizontalArea,
  DashboardHorizontalPanelComponentProps,
  DashboardHorizontalPanelProps,
  DashboardSize,
} from '../typings';
import { isAreaInColumn } from '../utils/dashboardArea';
import { getDashboardPanelLength, getWorkspacePanelLength } from '../utils/dashboardLength';

const getTranslateX = (size: DashboardSize, props: DashboardHorizontalPanelComponentProps): string | 0 => {
  let translate: string | 0 = 0;

  // if the panel is not in the first column, we have to translateX the width of the left panel
  if (!isAreaInColumn('first', props.panel.area, props.areas)) {
    translate = getWorkspacePanelLength('width', size, props.left);
  }

  return translate;
};

const getTranslateY = (size: DashboardSize, props: DashboardHorizontalPanelComponentProps): string | 0 => {
  let translate: string | 0 = 0;

  // for the footer panel, we have to translate upwards, otherwise it will not be visible
  if (props.panel.area === 'footer') {
    const height = getWorkspacePanelLength('height', size, props.panel);
    if (height !== 0) {
      translate = `-${height}`;
    }
  }

  return translate;
};

const getWidth = (size: DashboardSize, props: DashboardHorizontalPanelComponentProps): string | 0 => {
  let width = '100%';

  // if the panel is not in the first column, we need to remove the size of the left panel
  if (!isAreaInColumn('first', props.panel.area, props.areas)) {
    const leftWidth = getWorkspacePanelLength('width', size, props.left);
    if (leftWidth !== 0) {
      width = `${width} - ${leftWidth}`;
    }
  }

  // if the panel is not in the last column, we need to remove the size of the right panel
  if (!isAreaInColumn('last', props.panel.area, props.areas)) {
    const rightWidth = getWorkspacePanelLength('width', size, props.right);
    if (rightWidth !== 0) {
      width = `${width} - ${rightWidth}`;
    }
  }

  return width;
};

const Component: React.FC<DashboardHorizontalPanelComponentProps> = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

const StyledComponent = styled(Component)`
  grid-area: ${(props) => props.panel.area};
  height: ${(props) => getDashboardPanelLength('height', 'small', props.panel)};
  width: ${(props) => getWidth('small', props)};
  transform: translate(${(props) => getTranslateX('small', props)}, ${(props) => getTranslateY('small', props)});
  transition: transform 0.6s, width 0.6s, height 0.6s;
  @media only screen and (min-width: 46.875em) {
    height: ${(props) => getDashboardPanelLength('height', 'large', props.panel)};
    width: ${(props) => getWidth('large', props)};
    transform: translate(${(props) => getTranslateX('large', props)}, ${(props) => getTranslateY('large', props)});
  }
`;

const dashboardHorizontalPanel = (area: DashboardHorizontalArea): React.FC<DashboardHorizontalPanelProps> => {
  const Panel: React.FC<DashboardHorizontalPanelProps> = (props) => {
    const service = useDashboardService();
    const state = useDashboardState();

    useEffect(() => {
      service.initHorizontalPanel(area, props);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const panel = state[area];
    if (!panel) {
      return null;
    }

    const onResize = (width?: string | number, height?: string | number) => {
      console.log(width, height);
    };

    return (
      <StyledComponent {...state} panel={panel} className={props.className}>
        <Resizer onResize={onResize}>{props.children}</Resizer>
      </StyledComponent>
    );
  };
  return Panel;
};

export default dashboardHorizontalPanel;
