import React, { useEffect } from 'react';
import styled from 'styled-components';
import useDashboardService from '../hooks/useDashboardService';
import useDashboardState from '../hooks/useDashboardState';
import {
  DashboardSize,
  DashboardVerticalArea,
  DashboardVerticalPanelComponentProps,
  DashboardVerticalPanelProps,
} from '../typings';
import { isAreaInRow } from '../utils/dashboardArea';
import { getDashboardPanelLength, getWorkspacePanelLength } from '../utils/dashboardLength';

const getTranslateY = (size: DashboardSize, props: DashboardVerticalPanelComponentProps): string | 0 => {
  let translate: string | 0 = 0;

  // if the panel is not in the first row, we have to translateY the height of the header panel
  if (!isAreaInRow('first', props.panel.area, props.areas)) {
    translate = getWorkspacePanelLength('height', size, props.header);
  }

  return translate;
};

const getTranslateX = (size: DashboardSize, props: DashboardVerticalPanelComponentProps): string | 0 => {
  let translate: string | 0 = 0;

  // for the right panel, we have to translate backwards, otherwise it will not be visible
  if (props.panel.area === 'right') {
    const width = getWorkspacePanelLength('width', size, props.panel);
    if (width !== 0) {
      translate = `-${width}`;
    }
  }

  return translate;
};

const getHeight = (size: DashboardSize, props: DashboardVerticalPanelComponentProps): string | 0 => {
  let height = '100%';

  // if the panel is not in the first row, we need to remove the size of the header panel
  if (!isAreaInRow('first', props.panel.area, props.areas)) {
    const headerHeight = getWorkspacePanelLength('height', size, props.header);
    if (headerHeight !== 0) {
      height = `${height} - ${headerHeight}`;
    }
  }

  // if the panel is not in the last column, we need to remove the size of the right panel
  if (!isAreaInRow('last', props.panel.area, props.areas)) {
    const footerHeight = getWorkspacePanelLength('height', size, props.footer);
    if (footerHeight !== 0) {
      height = `${height} - ${footerHeight}`;
    }
  }

  return height;
};

const Component: React.FC<DashboardVerticalPanelComponentProps> = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

const StyledComponent = styled(Component)`
  grid-area: ${(props) => props.panel.area};
  width: ${(props) => getDashboardPanelLength('width', 'small', props.panel)};
  height: ${(props) => getHeight('small', props)};
  transform: translate(${(props) => getTranslateX('small', props)}, ${(props) => getTranslateY('small', props)});
  transition: transform 0.6s, width 0.6s, height 0.6s;
  @media only screen and (min-width: 46.875em) {
    width: ${(props) => getDashboardPanelLength('width', 'large', props.panel)};
    height: ${(props) => getHeight('large', props)};
    transform: translate(${(props) => getTranslateX('large', props)}, ${(props) => getTranslateY('large', props)});
  }
`;

const dashboardVerticalPanel = (area: DashboardVerticalArea): React.FC<DashboardVerticalPanelProps> => {
  const Panel: React.FC<DashboardVerticalPanelProps> = (props) => {
    const service = useDashboardService();
    const state = useDashboardState();

    useEffect(() => {
      service.initVerticalPanel(area, props);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const panel = state[area];
    if (!panel) {
      return null;
    }

    return (
      <StyledComponent {...state} panel={panel} className={props.className}>
        {props.children}
      </StyledComponent>
    );
  };
  return Panel;
};

export default dashboardVerticalPanel;
