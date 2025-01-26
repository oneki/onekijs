import {
  alignItems,
  backgroundColor,
  color,
  Dashboard,
  DashboardBody,
  DashboardFooter,
  DashboardHeader,
  DashboardLeft,
  DashboardRight,
  display,
  height,
  MenuIcon,
  paddingLeft,
  StylableProps,
  useDashboardController,
} from 'onekijs-ui';
import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  ${backgroundColor('secondary')}
  ${color('white')}
  ${display('flex')}
  ${alignItems('center')}
  ${paddingLeft('sm')}
`;

export const DashboardPageComponent: React.FC<StylableProps> = ({ className }) => {
  const controller = useDashboardController();

  return (
    <div className={className}>
      <Dashboard controller={controller}>

      <DashboardHeader
          resizable
          collapseSmall={true}
          collapseMedium={true}
          collapseLarge={false}
          floatingSmall={false}
        >
          <Header>
            <MenuIcon color="white" width="16px" height="16px" onClick={() => controller.toggle('left')} />
            <span>Header</span>
          </Header>

        </DashboardHeader>

        <DashboardRight resizable collapse={true} floating={false}>
          Right
        </DashboardRight>

      <DashboardFooter resizable collapse={true} floating={false}>
          Footer
        </DashboardFooter>







      <DashboardLeft resizable>
          <div style={{backgroundColor: 'darkblue', height: '100%'}}>Left</div>
        </DashboardLeft>



        <DashboardBody>
          This is the body
          {/* <button onClick={collapseHeader}>Collapse Header</button>
        <button onClick={expandHeader}>Expand Header</button>
        <button onClick={floatRight}>Float right</button>
        <button onClick={collapseRight}>Collapse right</button>
        <button onClick={expandRight}>Expand right</button> */}
        </DashboardBody>












      </Dashboard>
    </div>
  );
};

export const DashboardPage = styled(DashboardPageComponent)`

`;
