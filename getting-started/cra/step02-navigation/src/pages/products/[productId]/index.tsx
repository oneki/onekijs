import { useParams } from 'onekijs';
import React from 'react';
import { products } from '..';
import ProductDetails from '../../../modules/products/components/ProductDetails';

type ProductParams = {
  productId: string;
};
const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<ProductParams>();
  const product = products[+productId];
  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
