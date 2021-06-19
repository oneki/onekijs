import { useParams } from 'onekijs';
import React, { FC } from 'react';
import { products } from '..';
import ProductDetails from '../../../modules/products/components/ProductDetails';

const ProductDetailsPage: FC = () => {
  const { productId } = useParams();
  const product = products[+productId];
  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
