import React from 'react';
import styled from 'styled-components';
import { DashboardPanelProps } from '../typings';

const Component = styled.div`
  grid-area: footer;
`;

const DashboardFooter: React.FC<DashboardPanelProps> = (props) => {
  return <Component {...props}>{props.children}</Component>;
};

DashboardFooter.displayName = 'DashboardFooter';

export default DashboardFooter;
