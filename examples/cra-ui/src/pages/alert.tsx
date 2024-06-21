import { Alert, ComponentStyle } from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';

const alertStyle: ComponentStyle<{}> = () => {
  return css``;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <>
      <Alert kind="info">This is an info</Alert>
      <Alert kind="info" size="small">This is an info</Alert>
      <Alert kind="info" size="large">This is an info</Alert>
      <Alert kind="error">This is an error</Alert>
      <Alert kind="warning">This is an warning</Alert>
      <Alert kind="success">This is an success</Alert>
      <Alert kind="debug">This is an debug</Alert>
    </>
  );
};

export const AlertPage = styled(Page)`
  ${alertStyle}
`;
