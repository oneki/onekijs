import { Dashboard, DashboardBody, DashboardHeader, DashboardLeft, DashboardRight } from 'onekijs-ui';
import React from 'react';
import styled from 'styled-components';

const MyDashboardLeft = styled(DashboardLeft)`
  background: black;
  color: white;
`

const MyDashboardRight = styled(DashboardRight)`
  background: black;
  color: white;
`

const MyDashboardHeader = styled(DashboardHeader)`
  background: black;
  color: white;
`

export const DashboardPage = () => {
  return (
    <Dashboard>
      <MyDashboardLeft>Left</MyDashboardLeft>
      <MyDashboardRight>Right</MyDashboardRight>
      <MyDashboardHeader>Header</MyDashboardHeader>
      <DashboardBody>Body</DashboardBody>
    </Dashboard>
  );
};