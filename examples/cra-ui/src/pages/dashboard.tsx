import {
  alignItems,
  backgroundColor,
  color,
  DashboardBody,
  DashboardFooter,
  DashboardHeader,
  DashboardLeft,
  DashboardRight,
  display,
  height,
  MenuIcon,
  paddingLeft,
  useDashboard,
} from 'onekijs-ui';
import React from 'react';
import styled from 'styled-components';

const MyDashboardLeft = styled(DashboardLeft)`
  ${backgroundColor('secondary')}
  color: white;
`;

const MyDashboardRight = styled(DashboardRight)`
  ${backgroundColor('secondary')}
  color: white;
`;

const Header = styled.div`
  ${backgroundColor('secondary')}
  ${color('white')}
  ${display('flex')}
  ${alignItems('center')}
  ${height('full')}
  ${paddingLeft('sm')}
`;

const MyDashboardBody = styled(DashboardBody)`
  ${backgroundColor('lightest')}
`;

const MyDashboardFooter = styled(DashboardFooter)`
  ${backgroundColor('primary')}
  color: white;
`;

export const DashboardPage = () => {
  const [Dashboard, controller] = useDashboard();

  return (
    <Dashboard>
      <MyDashboardLeft resizable collapse={false} floating={false} collapseSmall={true} floatingSmall={true}>
        <div style={{height: '5000px'}}>Left</div>
      </MyDashboardLeft>
      <DashboardHeader resizable collapseSmall={true} collapseMedium={true} collapseLarge={false} floatingSmall={false}>
        <Header>
          <MenuIcon color="white" width="16px" height="16px" onClick={() => controller.toggle('left')} />
        </Header>
      </DashboardHeader>
      <MyDashboardRight collapse={true} floating={false}>
        Right
      </MyDashboardRight>
      <MyDashboardFooter collapse={true} floating={true} resizable>
        Footer
      </MyDashboardFooter>
      <MyDashboardBody>
        This is the body
        {/* <button onClick={collapseHeader}>Collapse Header</button>
        <button onClick={expandHeader}>Expand Header</button>
        <button onClick={floatRight}>Float right</button>
        <button onClick={collapseRight}>Collapse right</button>
        <button onClick={expandRight}>Expand right</button> */}
      </MyDashboardBody>
    </Dashboard>
  );
};
