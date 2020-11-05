import { useDelete, useGlobalProp, usePost } from 'onekijs';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from './@components/ProductDetails';
import { products } from '.';
import { ProductType } from '../__server__/api/dto/product';

type ProductDetailsParams = {
  id: string;
};

const ProductDetailsPage: FC = () => {
  const { id } = useParams<ProductDetailsParams>();
  const [submit, loading] = usePost<ProductType>('/cart/products', {
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
