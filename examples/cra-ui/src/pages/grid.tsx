import { Row, Col, ComponentStyle } from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';

const gridStyle: ComponentStyle<{}> = () => {
  return css``;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Row  >
      <Col size={12} sm={3} md={6} style={{backgroundColor:'red'}}>col-3</Col>
      <Col size={12} sm={9} md={6} style={{backgroundColor:'blue'}}>col-9</Col>
    </Row>
  );
};

export const GridPage = styled(Page)`
  ${gridStyle}
`;
