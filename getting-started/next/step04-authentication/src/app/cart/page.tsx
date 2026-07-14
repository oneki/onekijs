'use client';

import { secure, useGlobalProp } from 'onekijs-next';
import { ProductType } from '../../../data/products';
import Cart from '../../modules/core/components/Cart';
import { STATE_CART } from '../../modules/core/libs/constants';

function CartPage() {
  const cart: ProductType[] = useGlobalProp(STATE_CART, []);
  return <Cart cart={cart} />;
}

export default secure(CartPage);
