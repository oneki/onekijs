import { isTrue } from 'onekijs';
import React from 'react';
import styled from 'styled-components';
import { DashboardContainerProps, DashboardPanel, DashboardSize } from '../typings';

export const getColWidth = (column: DashboardPanel, size: DashboardSize): string | 0 => {
  let width = column.width;
  if (!isTrue(column.floating)) {
    if (column.collapse === 'auto') {
      width = size === 'small' ? column.collapseWidth : column.width;
    } else if (isTrue(column.collapse)) {
      width = column.collapseWidth;
    }
  }
  return width || 0;
};

export const getDashboardTemplate = (size: DashboardSize, dashboardContainerProps: DashboardContainerProps): string => {
  const { areas, left, right, header, footer } = dashboardContainerProps;
  const clone = (items: any) => items.map((item: any) => (Array.isArray(item) ? clone(item) : item));
  const dashboardAreas: (DashboardPanel | undefined)[][] = clone(areas);
  const rows: (0 | 'auto' | string)[] = [0, 'auto', 0];
  const cols: (0 | 'auto' | string)[] = [0, 'auto', 0];

  if (!right || right.floating || !right.present) {
    // drop last column
    [0, 1, 2].forEach((i) => dashboardAreas[i].splice(2, 1));
    cols.splice(2, 1);
  } else {
    cols[2] = getColWidth(right, size);
  }

  if (!left || isTrue(left.floating) || !left.present) {
    // drop first column
    [0, 1, 2].forEach((i) => dashboardAreas[i].splice(0, 1));
    cols.splice(0, 1);
  } else {
    cols[0] = getColWidth(left, size);
  }

  if (!footer || isTrue(footer.floating) || !footer.present) {
    rows.splice(2, 1);
    dashboardAreas.splice(2, 1);
  } else {
    rows[2] = footer.height || 0;
  }

  if (!header || isTrue(header.floating) || !header.present) {
    rows.splice(0, 1);
    dashboardAreas.splice(0, 1);
  } else {
    rows[0] = header.height || 0;
  }

  if (rows.length === 1) rows[0] = '1fr';
  if (cols.length === 1) cols[0] = '1fr';

  return `
    grid-template-columns: ${cols.join(' ')};
    grid-template-rows: ${rows.join(' ')};
    grid-template-areas: "${dashboardAreas.map((row) => row.join(' ')).join('" "')}";
  `;
};

const DashboardContainer: React.FC<DashboardContainerProps> = (props) => {
  const Component = styled.div`
    display: grid;
    ${getDashboardTemplate('small', props)}
    height: 100vh;
    overflow-x: hidden;

    @media only screen and (min-width: 46.875em) {
      ${getDashboardTemplate('large', props)}
    }
  `;
  return <Component>{props.children}</Component>;
};

export default DashboardContainer;
