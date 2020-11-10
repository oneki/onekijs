import { useGlobalProp } from 'onekijs';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '..';
import { STATE_CART } from '../../@libs/constants';
import { ProductType } from '../@components/Product';
import ProductDetails from '../@components/ProductDetails';

type ProductDetailsParams = {
  productId: string;
};

const ProductDetailsPage: FC = () => {
  const { productId } = useParams<ProductDetailsParams>();
  const [cart, setCart] = useGlobalProp<ProductType[]>(STATE_CART, []); // TODO update to useGlobalState

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
