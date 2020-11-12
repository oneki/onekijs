import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '..';
import ProductDetails from '../../../modules/products/components/ProductDetails';

type ProductDetailsParams = {
  productId: string;
};

const ProductDetailsPage: FC = () => {
  const { productId } = useParams<ProductDetailsParams>();
  const product = products[+productId];
  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
