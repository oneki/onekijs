import { FCC } from 'onekijs-framework';
import React, { CSSProperties, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { backgroundColor } from '../../../styles/background';
import { ComponentStyle } from '../../../styles/typings';
import { addClassname } from '../../../utils/style';
import useDashboardService from '../hooks/useDashboardService';
import useDashboardState from '../hooks/useDashboardState';
import { DashboardBodyComponentProps, DashboardBodyPanelProps, DashboardSize } from '../typings';
import { getDashboardPanelLength, getFloatingKey, getWorkspacePanelLength } from '../utils/dashboardLength';

const DashboardBodyComponent: FCC<DashboardBodyComponentProps> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const service = useDashboardService();
  const stepRef = useRef<'initializing' | 'initialized' | undefined>();
  const style: CSSProperties = {};
  if (stepRef.current !== 'initialized') {
    style.transition = 'none';
  }

  useEffect(() => {
    service.setRef('body', ref);
    if (stepRef.current === undefined) {
      stepRef.current = 'initializing';
      service.initBodyPanel(props);
    } else if (stepRef.current === 'initializing' && ref.current) {
      stepRef.current = 'initialized';
      ref.current.style.transition = '';
    }
    return () => {
      service.destroyPanel('body');
    }
  });

  return (
    <div className={props.className} ref={ref} style={style}>
      {stepRef.current && props.children}
    </div>
  );
};

export const getBodyLength = (
  type: 'width' | 'height',
  size: DashboardSize,
  props: DashboardBodyComponentProps,
): string => {
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

const style: ComponentStyle<DashboardBodyComponentProps> = (props) => {
  const t = props.theme.dashboard.body;
  return css`
    ${backgroundColor(t.bgColor)}
    grid-area: body;
    width: ${() => getBodyLength('width', 'small', props)};
    height: ${() => getBodyLength('height', 'small', props)};
    overflow-x: auto;
    overflow-y: scroll;
    transition: ${() => (props.panel ? 'transform 0.3s, width 0.3s, height 0.3s' : 'none')};
    transform: translate(${() => getTranslateX('small', props)}, ${() => getTranslateY('small', props)});
    @media only screen and (min-width: 768px) {
      width: ${() => getBodyLength('width', 'medium', props)};
      height: ${() => getBodyLength('height', 'medium', props)};
      transform: translate(${() => getTranslateX('medium', props)}, ${() => getTranslateY('medium', props)});
    }
    @media only screen and (min-width: 992px) {
      width: ${() => getBodyLength('width', 'large', props)};
      height: ${() => getBodyLength('height', 'large', props)};
      transform: translate(${() => getTranslateX('large', props)}, ${() => getTranslateY('large', props)});
    }
  `;
};

const StyledDashboardBody = styled(DashboardBodyComponent)`
  ${style}
`;

const DashboardBody: FCC<DashboardBodyPanelProps> = (props) => {
  const state = useDashboardState();

  const panel = state.body;
  return (
    <StyledDashboardBody {...state} panel={panel} className={addClassname('o-dashboard-body', props.className)}>
      {props.children}
    </StyledDashboardBody>
  );
};

export default DashboardBody;
