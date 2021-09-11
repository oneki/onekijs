import React from 'react';
import styled from 'styled-components';
import { DashboardPanelProps } from '../typings';

const Component = styled.div`
  grid-area: header;
`;

const Header: React.FC<DashboardPanelProps> = (props) => {
  return <Component {...props}>{props.children}</Component>;
};

Header.displayName = 'DashboardHeader';

export default Header;
