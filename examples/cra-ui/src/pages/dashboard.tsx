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
  ${height('full')}
  ${paddingLeft('sm')}
`;

export const DashboardPageComponent: React.FC<StylableProps> = ({ className }) => {
  const controller = useDashboardController();

  return (
    <div className={className}>
      <Dashboard controller={controller}>







        <DashboardBody>
          This is the body
          {/* <button onClick={collapseHeader}>Collapse Header</button>
        <button onClick={expandHeader}>Expand Header</button>
        <button onClick={floatRight}>Float right</button>
        <button onClick={collapseRight}>Collapse right</button>
        <button onClick={expandRight}>Expand right</button> */}
        </DashboardBody>

        <DashboardRight collapse={true} floating={false}>
          Right
        </DashboardRight>

        <DashboardHeader
          resizable
          collapseSmall={true}
          collapseMedium={true}
          collapseLarge={false}
          floatingSmall={false}
        >
          <Header>
            <MenuIcon color="white" width="16px" height="16px" onClick={() => controller.toggle('left')} />
          </Header>
        </DashboardHeader>




        <DashboardLeft>
          <div style={{ height: '5000px' }}>Left</div>
        </DashboardLeft>

        <DashboardFooter collapse={true} floating={true} resizable>
          Footer
        </DashboardFooter>

      </Dashboard>
    </div>
  );
};

export const DashboardPage = styled(DashboardPageComponent)`

`;
