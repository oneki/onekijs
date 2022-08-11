import { useParams, usePost } from 'onekijs';
import React from 'react';
import { products } from '..';
import { URL_ADD_PRODUCT } from '../../../modules/core/libs/constants';
import ProductDetails from '../../../modules/products/components/ProductDetails';
import { ProductType } from '../../../__server__/api/dto/product';

const ProductDetailsPage: React.FC = () => {
  const { productId = '' } = useParams();
  const [submit] = usePost<ProductType>(URL_ADD_PRODUCT, {
    onSuccess: () => {
      window.alert('Product added succesfully to the cart!');
    },
    onError: (error) => {
      window.alert(`An error occured while adding the product to the cart: ${error.message}`);
    },
  });

  const product = products[+productId];
  return (
    <div>
      <ProductDetails product={product} onBuy={() => submit(product)} />
    </div>
  );
};

export default ProductDetailsPage;
