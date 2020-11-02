import { useGlobalSelector } from 'onekijs';
import React, { FC } from 'react';
import Cart from './@components/Cart';

const CartPage: FC = () => {
  // retrieve the content of the cart from the global store of the application
  // Each time the cart is updated, the component is refreshed
  const cart = useGlobalSelector('cart', []); // TODO change to useGlobalProp
  return <Cart cart={cart} />;
};

export default CartPage;
