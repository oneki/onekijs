import React from 'react';
import styled from 'styled-components';
import MenuIcon from '../../icon/MenuIcon';
import useDashboardService from '../hooks/useDashboardService';
import { DashboardTogglerProps } from '../typings';

export const TogglerIcon = styled(MenuIcon)`
  cursor: pointer;
`;

const DashboardToggler: React.FC<DashboardTogglerProps> = ({ area }) => {
  const service = useDashboardService();

  return <MenuIcon onClick={() => service.toggle(area)} />;
};

export default DashboardToggler;
