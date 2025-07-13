import { FCC } from 'onekijs-framework';
import React, { CSSProperties, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { backgroundColor } from '../../../styles/background';
import { ComponentStyle } from '../../../styles/typings';
import { addClassname } from '../../../utils/style';
import useDashboardService from '../hooks/useDashboardService';
import useDashboardState from '../hooks/useDashboardState';
import { DashboardBodyComponentProps, DashboardBodyPanelProps } from '../typings';

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
    };
  });

  return (
    <div className={props.className} ref={ref} style={style}>
      {stepRef.current && props.children}
    </div>
  );
};

const style: ComponentStyle<DashboardBodyComponentProps> = (props) => {
  const t = props.theme.dashboard.body;
  return css`
    ${backgroundColor(t.bgColor)}
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    transition: ${() => (props.panel ? 'transform 0.3s, width 0.3s, height 0.3s' : 'none')};
    overflow-x: auto;
    overflow-y: scroll;

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
      <div className='o-dashboard-body-content'>
        {props.children}
      </div>
    </StyledDashboardBody>
  );
};

export default DashboardBody;
