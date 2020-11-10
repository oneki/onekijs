import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../@components/ProductDetails';
import { products } from '..';

type ProductDetailsParams = {
  productId: string;
};

const ProductDetailsPage: FC = () => {
  const { productId } = useParams<ProductDetailsParams>();
  const product = products[+productId];
  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
