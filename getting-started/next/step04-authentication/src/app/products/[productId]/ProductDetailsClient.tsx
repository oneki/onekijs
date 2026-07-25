'use client';

import { useGlobalState } from 'onekijs-next';
import { ProductType } from '../../../../data/products';
import { STATE_CART } from '../../../modules/core/libs/constants';
import ProductDetails from '../../../modules/products/components/ProductDetails';

export default function ProductDetailsClient({ product }: { product: ProductType }) {
  const [cart, setCart] = useGlobalState<ProductType[]>(STATE_CART, []);

  return (
    <ProductDetails
      product={product}
      onBuy={() => {
        setCart(cart.concat(product));
        window.alert('Your product has been added to the cart!');
      }}
    />
  );
}
