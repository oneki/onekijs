import { DashboardBody, DashboardFooter, DashboardHeader, DashboardLeft, DashboardRight, useDashboard } from 'onekijs-ui';
import React from 'react';
import styled from 'styled-components';

const MyDashboardLeft = styled(DashboardLeft)`
  background: black;
  color: white;
`

const MyDashboardRight = styled(DashboardRight)`
  background: blue;
  color: white;
`

const MyDashboardHeader = styled(DashboardHeader)`
  background: red;
  color: white;
`

const MyDashboardBody = styled(DashboardBody)`
  background: turquoise;
  color: white;
`

const MyDashboardFooter = styled(DashboardFooter)`
  background: yellow;
  color: white;
`


export const DashboardPage = () => {
  const [Dashboard, controller] = useDashboard();
  const collapseHeader = () => controller.collapse('header', true);
  const expandHeader = () => controller.collapse('header', false);
  const floatRight = () => controller.float('right');
  const collapseRight = () => controller.collapse('right', true);
  const expandRight = () => controller.collapse('right', false);

  return (
    <Dashboard>
      <MyDashboardLeft resizable>Left</MyDashboardLeft>
      <MyDashboardHeader height="100px" resizable>Header</MyDashboardHeader>
      <MyDashboardRight collapseSmall={true} collapseMedium={true} collapseLarge={true} floatingSmall={true}  floatingMedium={true} floatingLarge={true}>Right</MyDashboardRight>
      <MyDashboardFooter resizable>Footer</MyDashboardFooter>
      <MyDashboardBody>

        <button onClick={collapseHeader}>Collapse Header</button>
        <button onClick={expandHeader}>Expand Header</button>
        <button onClick={floatRight}>Float right</button>
        <button onClick={collapseRight}>Collapse right</button>
        <button onClick={expandRight}>Expand right</button>

      </MyDashboardBody>
    </Dashboard>
  );
};