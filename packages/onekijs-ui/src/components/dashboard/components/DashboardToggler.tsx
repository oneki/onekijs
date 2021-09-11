import React from 'react';
import { useDashboardContext } from '../service';
import styled from 'styled-components';
import { DashboardTogglerProps } from '../typings';
import MenuIcon from '../../icon/MenuIcon';

export const TogglerIcon = styled(MenuIcon)`
  cursor: pointer;
`;

const DashboardToggler: React.FC<DashboardTogglerProps> = ({ area }) => {
  const service = useDashboardContext();

  return <MenuIcon onClick={() => service.toggle(area)} />;
};

export default DashboardToggler;
