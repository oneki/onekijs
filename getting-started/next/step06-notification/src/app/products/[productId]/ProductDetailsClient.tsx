'use client';

import { usePost } from 'onekijs-next';
import { ProductType } from '../../../../data/products';
import { URL_ADD_PRODUCT } from '../../../modules/core/libs/constants';
import ProductDetails from '../../../modules/products/components/ProductDetails';

export default function ProductDetailsClient({ product }: { product: ProductType }) {
  const [submit] = usePost<ProductType>(URL_ADD_PRODUCT, {
    onSuccess: () => {
      window.alert('Product added successfully to the cart!');
    },
    onError: (error) => {
      window.alert(`An error occurred while adding the product to the cart: ${error.message}`);
    },
  });

  return <ProductDetails product={product} onBuy={() => submit(product)} />;
}
