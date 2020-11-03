import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from './@components/ProductDetails';
import { products } from '.';

type ProductDetailsParams = {
  id: string;
};

const ProductDetailsPage: FC = () => {
  const { id } = useParams<ProductDetailsParams>();
  const product = products[+id];
  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
