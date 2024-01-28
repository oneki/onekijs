import { FCC } from 'onekijs-framework';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { addClassname } from '../../../utils/style';
import { DashboardContainerProps } from '../typings';

export const getDashboardTemplate = (dashboardContainerProps: DashboardContainerProps): string => {
  const { areas, left, right, header, footer } = dashboardContainerProps;
  if (!areas) {
    return '';
  }
  const clone = (items: any) => items.map((item: any) => (Array.isArray(item) ? clone(item) : item));
  const rows: (0 | string)[] = [0, '1fr', 0];
  const cols: (0 | string)[] = [0, '1fr', 0];

  if (!right) {
    // drop last column
    cols.splice(2, 1);
  }

  if (!left) {
    // drop first column
    cols.splice(0, 1);
  }

  if (!footer) {
    rows.splice(2, 1);
  }

  if (!header) {
    rows.splice(0, 1);
  }

  return `
    grid-template-columns: ${cols.join(' ')};
    grid-template-rows: ${rows.join(' ')};
    grid-template-areas: "${areas.map((row) => row.join(' ')).join('" "')}";
  `;
};

const DashboardContainerComponent: FCC<DashboardContainerProps> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    props.onInit(ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      props.onDestroy();
    }
  }, []);

  return (
    <div className={addClassname('o-dashboard', props.className)} ref={ref}>
      {props.children}
    </div>
  );
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
