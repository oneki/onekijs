import { usePost } from 'onekijs';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '..';
import { ProductType } from '../../../__server__/api/dto/product';
import { URL_ADD_PRODUCT } from '../../@utils/constants';
import ProductDetails from '../@components/ProductDetails';

type ProductDetailsParams = {
  id: string;
};

const ProductDetailsPage: FC = () => {
  const { id } = useParams<ProductDetailsParams>();
  const [submit] = usePost<ProductType>(URL_ADD_PRODUCT, {
    onSuccess: () => {
      window.alert('Product added succesfully to the cart!');
    },
    onError: (error) => {
      window.alert(`An error occured while adding the product to the cart: ${error.message}`);
    },
  });

  const product = products[+id];
  return (
    <div>
      <ProductDetails product={product} onBuy={() => submit(product)} />
    </div>
  );
};

export default ProductDetailsPage;
