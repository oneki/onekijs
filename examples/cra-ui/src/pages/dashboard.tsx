import { Form, useFormController } from 'onekijs';
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
  FormInput,
  height,
  MenuIcon,
  paddingLeft,
  paddingX,
  paddingY,
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
  const formController = useFormController();

  return (
    <div className={className}>
      <Dashboard controller={controller}>

      <DashboardHeader
          resizable
          floating={false}
          collapseHeight="50px"
          height="100px"
        >
          <Header>
            <MenuIcon color="white" width="16px" height="16px" onClick={() => controller.toggle('left')} />
            <span>Header</span>
          </Header>

        </DashboardHeader>

        <DashboardRight resizable  width="350px" collapseWidth="0px" floating={false}>
          Right
        </DashboardRight>

      <DashboardFooter resizable collapse={true} floating={false} collapseHeight="25px">
          Footer<br/>Footer<br/>Footer<br/>Footer<br/>Footer<br/>Footer<br/>Footer<br/>
        </DashboardFooter>

      <DashboardLeft resizable width="350px" collapseWidth="0px" backgroundColor="lightblue" floating={false}>

          <Form controller={formController} onSubmit={() => undefined} layout="horizontal" labelWidth={4} className='left'>
            <FormInput label="LastName" name="name" />
            <FormInput label="FirstName" name="firstname" />
          </Form>
        </DashboardLeft>



        <DashboardBody>
          <div style={{paddingLeft: '500px'}}>
            <button onClick={() => controller.collapse('left', true)}>Collapse Left</button><br/>
            <button onClick={() => controller.collapse('left', false)}>Expand Left</button><br/>
            <button onClick={() => controller.float('left', true)}>Float left</button><br/>
            <button onClick={() => controller.float('left', false)}>Unfloat left</button><br/><br/>

            <button onClick={() => controller.collapse('right', true)}>Collapse Right</button><br/>
            <button onClick={() => controller.collapse('right', false)}>Expand Right</button><br/>
            <button onClick={() => controller.float('right', true)}>Float Right</button><br/>
            <button onClick={() => controller.float('right', false)}>Unfloat Right</button><br/><br/>

            <button onClick={() => controller.collapse('header', true)}>Collapse Header</button><br/>
            <button onClick={() => controller.collapse('header', false)}>Expand Header</button><br/>
            <button onClick={() => controller.float('header', true)}>Float Header</button><br/>
            <button onClick={() => controller.float('header', false)}>Unfloat Header</button><br/><br/>

            <button onClick={() => controller.collapse('footer', true)}>Collapse Footer</button><br/>
            <button onClick={() => controller.collapse('footer', false)}>Expand Footer</button><br/>
            <button onClick={() => controller.float('footer', true)}>Float Footer</button><br/>
            <button onClick={() => controller.float('footer', false)}>Unfloat Footer</button><br/>
          </div>

        </DashboardBody>












      </Dashboard>
    </div>
  );
};

export const DashboardPage = styled(DashboardPageComponent)`
  .left {
    ${paddingX('md')}
    ${paddingY('xl')}
  }
`;
