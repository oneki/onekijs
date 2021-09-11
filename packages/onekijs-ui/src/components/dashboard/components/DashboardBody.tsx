import React from 'react';
import styled from 'styled-components';
import { DashboardPanelProps } from '../typings';

const Component = styled.div`
  grid-area: body;
`;

const DashboardBody: React.FC<DashboardPanelProps> = (props) => {
  return <Component {...props}>{props.children}</Component>;
};

DashboardBody.displayName = 'DashboardBody';

export default DashboardBody;
