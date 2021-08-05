import { display, flexDirection, paddingX, paddingY } from 'onekijs-ui';
import React from 'react';
import styled from 'styled-components';
import Navbar from '../navbar/Navbar';

const Container = styled.div`
  ${display('flex')}
  ${flexDirection('row')}
  ${paddingY(0)}
  ${paddingX(4)}
`;

const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};

export default AppLayout;
