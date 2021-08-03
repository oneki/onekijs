import { useParams } from 'onekijs/cra';
import React, { FC } from 'react';
import { products } from '..';
import ProductDetails from '../../../modules/products/components/ProductDetails';

type ProductParams = {
  productId: string;
};
const ProductDetailsPage: FC = () => {
  const { productId } = useParams<ProductParams>();
  const product = products[+productId];
  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
