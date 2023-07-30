import { useGlobalProp } from 'onekijs';
import React from 'react';
import { STATE_CART } from '../modules/core/libs/constants';
import Cart from '../modules/core/components/Cart';
import { ProductType } from '../modules/products/components/Product';

const CartPage: React.FC = () => {
  // retrieve the content of the cart from the global store of the application
  // Each time the cart is updated, the component is refreshed
  const cart: ProductType[] = useGlobalProp(STATE_CART, []); 
  return <Cart cart={cart} />;
};

export default CartPage;
