import { Dashboard, DashboardBody, DashboardFooter, DashboardHeader, DashboardLeft, DashboardRight } from 'onekijs-ui';
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
  return (
    <Dashboard>
      <MyDashboardLeft resizable>Left</MyDashboardLeft>
      <MyDashboardHeader resizable>Header</MyDashboardHeader>
      <MyDashboardRight resizable>Right</MyDashboardRight>
      <MyDashboardFooter resizable>Footer</MyDashboardFooter>
      <MyDashboardBody>Body</MyDashboardBody>
    </Dashboard>
  );
};