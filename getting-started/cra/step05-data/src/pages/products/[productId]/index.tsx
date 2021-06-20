import { useParams, usePost } from 'onekijs';
import React, { FC } from 'react';
import { URL_ADD_PRODUCT } from '../../../modules/core/libs/constants';
import ProductDetails from '../../../modules/products/components/ProductDetails';
import { ProductType } from '../../../__server__/api/dto/product';

const ProductDetailsPage: FC = () => {
  const { productId } = useParams<any>();
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

const products: ProductType[] = [
  {
    name: 'Phone XL',
    price: 799,
    description: 'A large phone with one of the best screens',
  },
  {
    name: 'Phone Mini',
    price: 699,
    description: 'A great phone with one of the best cameras',
  },
  {
    name: 'Phone Standard',
    price: 299,
  },
];

export default ProductDetailsPage;
