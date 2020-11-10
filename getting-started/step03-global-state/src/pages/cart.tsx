import { useGlobalSelector } from 'onekijs';
import React, { FC } from 'react';
import { STATE_CART } from './@libs/constants';
import { ProductType } from './products/@components/Product';
import Cart from './@components/Cart';

const CartPage: FC = () => {
  // retrieve the content of the cart from the global store of the application
  // Each time the cart is updated, the component is refreshed
  const cart: ProductType[] = useGlobalSelector(STATE_CART, []); // TODO change to useGlobalProp
  return <Cart cart={cart} />;
};

export default CartPage;
