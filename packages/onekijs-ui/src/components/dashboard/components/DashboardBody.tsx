import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useDashboardService from '../hooks/useDashboardService';
import useDashboardState from '../hooks/useDashboardState';
import {
  DashboardBodyComponentProps,
  DashboardBodyPanelProps,
  DashboardHorizontalPanel,
  DashboardSize,
  DashboardVerticalPanel,
} from '../typings';
import { getWorkspacePanelLength } from '../utils/dashboardLength';

const DashboardBodyComponent: React.FC<DashboardBodyComponentProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const service = useDashboardService();

  useEffect(() => {
    service.initBodyPanel(props, ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={props.className} ref={ref}>
      {props.children}
    </div>
  );
};

const getLength = (type: 'width' | 'height', size: DashboardSize, props: DashboardBodyComponentProps): string => {
  let result = '100%';

  const front = type === 'width' ? props.left : props.header;
  const back = type === 'width' ? props.right : props.footer;

  const frontLength = getWorkspacePanelLength(type, size, front);
  if (frontLength !== 0) {
    result = `${result} - ${frontLength}`;
  }
  const backLength = getWorkspacePanelLength(type, size, back);
  if (backLength !== 0) {
    result = `${result} - ${backLength}`;
  }

  return result === '100%' ? result : `calc(${result})`;
};

const getTranslate = (axis: 'x' | 'y', size: DashboardSize, props: DashboardBodyComponentProps): string | 0 => {
  let translate: string | 0 = 0;
  const panel = axis === 'x' ? props.left : props.header;
  const panelCollapseLength =
    axis === 'x'
      ? (panel as DashboardVerticalPanel)?.collapseWidth
      : (panel as DashboardHorizontalPanel)?.collapseHeight;

  const panelLength =
    axis === 'x' ? (panel as DashboardVerticalPanel)?.width : (panel as DashboardHorizontalPanel)?.height;

  if (size === 'small') {
    if (panel && !panel.floating && panelCollapseLength !== 0) {
      translate = panelCollapseLength;
    }
  } else if (panel && !panel.floating) {
    translate = panel.collapse ? panelCollapseLength : panelLength;
  }
  return translate;
};

const StyledDashboardBody = styled(DashboardBodyComponent)`
  grid-area: body;
  width: ${(props) => getLength('width', 'small', props)};
  height: ${(props) => getLength('height', 'small', props)};
  transition: transform 0.6s, width 0.6s, height 0.6s;
  transform: translate(
    ${(props) => getTranslate('x', 'small', props)},
    ${(props) => getTranslate('y', 'small', props)}
  );
  @media only screen and (min-width: 46.875em) {
    width: ${(props) => getLength('width', 'large', props)};
    height: ${(props) => getLength('height', 'large', props)};
    transform: translate(
      ${(props) => getTranslate('x', 'large', props)},
      ${(props) => getTranslate('y', 'large', props)}
    );
  }
`;

const DashboardBody: React.FC<DashboardBodyPanelProps> = (props) => {
  const state = useDashboardState();

  const panel = state.body;

  return (
    <StyledDashboardBody {...panel} {...state} className={props.className}>
      {props.children}
    </StyledDashboardBody>
  );
};

export default DashboardBody;
