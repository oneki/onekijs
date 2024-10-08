import { useGlobalState, useParams } from 'onekijs';
import React from 'react';
import { products } from '..';
import { STATE_CART } from '../../../modules/core/libs/constants';
import { ProductType } from '../../../modules/products/components/Product';
import ProductDetails from '../../../modules/products/components/ProductDetails';

const ProductDetailsPage: React.FC = () => {
  const { productId = '' } = useParams();
  const [cart, setCart] = useGlobalState<ProductType[]>(STATE_CART, []); // TODO update to useGlobalState

  const product = products[+productId];
  return (
    <ProductDetails
      product={product}
      onBuy={() => {
        setCart(cart.concat(product));
        window.alert('Your product has been added to the cart!');
      }}
    />
  );
};

export default ProductDetailsPage;
