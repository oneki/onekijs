'use client';

import { useGlobalProp } from 'onekijs-next';
import { ProductType } from '../../../data/products';
import Cart from '../../modules/core/components/Cart';
import { STATE_CART } from '../../modules/core/libs/constants';

export default function CartPage() {
  const cart: ProductType[] = useGlobalProp(STATE_CART, []);
  return <Cart cart={cart} />;
}
