import React from 'react';
import styled from 'styled-components';
import { DashboardArea, DashboardContainerProps } from '../typings';

export const getDashboardTemplate = (dashboardContainerProps: DashboardContainerProps): string => {
  const { areas, left, right, header, footer } = dashboardContainerProps;
  if (!areas) {
    return '';
  }
  const clone = (items: any) => items.map((item: any) => (Array.isArray(item) ? clone(item) : item));
  const dashboardAreas: (DashboardArea | undefined)[][] = clone(areas);
  const rows: (0 | string)[] = [0, '1fr', 0];
  const cols: (0 | string)[] = [0, '1fr', 0];

  if (!right) {
    // drop last column
    [0, 1, 2].forEach((i) => dashboardAreas[i].splice(2, 1));
    cols.splice(2, 1);
  }

  if (!left) {
    // drop first column
    [0, 1, 2].forEach((i) => dashboardAreas[i].splice(0, 1));
    cols.splice(0, 1);
  }

  if (!footer) {
    rows.splice(2, 1);
    dashboardAreas.splice(2, 1);
  }

  if (!header) {
    rows.splice(0, 1);
    dashboardAreas.splice(0, 1);
  }

  return `
    grid-template-columns: ${cols.join(' ')};
    grid-template-rows: ${rows.join(' ')};
    grid-template-areas: "${dashboardAreas.map((row) => row.join(' ')).join('" "')}";
  `;
};

const DashboardContainerComponent: React.FC<DashboardContainerProps> = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

const DashboardContainer = styled(DashboardContainerComponent)`
  display: grid;
  ${(props) => getDashboardTemplate(props)}
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export default DashboardContainer;
