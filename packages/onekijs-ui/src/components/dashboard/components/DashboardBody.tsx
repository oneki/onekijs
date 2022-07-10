import { FCC } from 'onekijs-framework';
import React, { CSSProperties, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useDashboardService from '../hooks/useDashboardService';
import useDashboardState from '../hooks/useDashboardState';
import { DashboardBodyComponentProps, DashboardBodyPanelProps, DashboardSize } from '../typings';
import { getDashboardPanelLength, getFloatingKey, getWorkspacePanelLength } from '../utils/dashboardLength';

const DashboardBodyComponent: FCC<DashboardBodyComponentProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const service = useDashboardService();
  const stepRef = useRef<'initializing' | 'initialized' | undefined>();
  const style: CSSProperties = {};
  if (stepRef.current !== 'initialized') {
    style.transition = 'none';
  }

  useEffect(() => {
    if (stepRef.current === undefined) {
      stepRef.current = 'initializing';
      service.initBodyPanel(props, ref);
    } else if (stepRef.current === 'initializing' && ref.current) {
      stepRef.current = 'initialized';
      ref.current.style.transition = '';
    }
  });

  return (
    <div className={props.className} ref={ref} style={style}>
      {stepRef.current && props.children}
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

// const getTranslate = (axis: 'x' | 'y', size: DashboardSize, props: DashboardBodyComponentProps): string | 0 => {
//   let translate: string | 0 = 0;
//   const panel = axis === 'x' ? props.left : props.header;
//   const panelCollapseLength =
//     axis === 'x'
//       ? (panel as DashboardVerticalPanel)?.collapseWidth
//       : (panel as DashboardHorizontalPanel)?.collapseHeight;

//   const panelLength =
//     axis === 'x' ? (panel as DashboardVerticalPanel)?.width : (panel as DashboardHorizontalPanel)?.height;

//   if (size === 'small') {
//     if (panel && !panel.floating && panelCollapseLength !== 0) {
//       translate = panelCollapseLength;
//     }
//   } else if (panel && !panel.floating) {
//     translate = panel.collapse ? panelCollapseLength : panelLength;
//   }
//   return translate;
// };

const getTranslateX = (size: DashboardSize, props: DashboardBodyComponentProps): string | 0 => {
  const panel = props.left;
  if (panel) {
    return panel[getFloatingKey(size)]
      ? getDashboardPanelLength('width', size, panel) // actual size of the panel
      : getWorkspacePanelLength('width', size, panel); // size of the panel on the workspace (if floating, the workspace panel size is 0)
  }
  return 0;
};

const getTranslateY = (size: DashboardSize, props: DashboardBodyComponentProps): string | 0 => {
  const panel = props.header;
  if (panel) {
    return panel[getFloatingKey(size)]
      ? getDashboardPanelLength('height', size, panel) // actual size of the panel
      : getWorkspacePanelLength('height', size, panel); // size of the panel on the workspace (if floating, the workspace panel size is 0)
  }
  return 0;
};

const StyledDashboardBody = styled(DashboardBodyComponent)`
  grid-area: body;
  width: ${(props) => getLength('width', 'small', props)};
  height: ${(props) => getLength('height', 'small', props)};
  transition: ${(props) => (props.panel ? 'transform 0.6s, width 0.6s, height 0.6s' : 'none')};
  transform: translate(${(props) => getTranslateX('small', props)}, ${(props) => getTranslateY('small', props)});
  @media only screen and (min-width: 768px) {
    width: ${(props) => getLength('width', 'medium', props)};
    height: ${(props) => getLength('height', 'medium', props)};
    transform: translate(${(props) => getTranslateX('medium', props)}, ${(props) => getTranslateY('medium', props)});
  }
  @media only screen and (min-width: 992px) {
    width: ${(props) => getLength('width', 'large', props)};
    height: ${(props) => getLength('height', 'large', props)};
    transform: translate(${(props) => getTranslateX('large', props)}, ${(props) => getTranslateY('large', props)});
  }
`;

const DashboardBody: FCC<DashboardBodyPanelProps> = (props) => {
  const state = useDashboardState();

  const panel = state.body;
  return (
    <StyledDashboardBody {...state} panel={panel} className={props.className}>
      {props.children}
    </StyledDashboardBody>
  );
};

export default DashboardBody;
