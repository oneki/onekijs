import {
  alignItems,
  backgroundColor,
  display,
  flexDirection,
  height,
  justifyContent,
  padding,
  width,
} from 'onekijs-ui';
import React, { FC } from 'react';

import styled from 'styled-components';
import NavbarBrand from './NavbarBrand';
import NavbarCheckout from './NavbarCheckout';

const Container = styled.div`
  ${width('full')}
  ${height('68px')}
  ${backgroundColor('primary')}
  ${padding('16px')}
  ${display('flex')}
  ${flexDirection('row')}
  ${justifyContent('space-between')}
  ${alignItems('center')}
`;

const Navbar: FC = () => {
  return (
    <Container>
      <NavbarBrand to="/">My Store</NavbarBrand>
      <NavbarCheckout to="/checkout">
        <i className="material-icons">shopping_cart</i> Checkout
      </NavbarCheckout>
    </Container>
  );
};

export default Navbar;
