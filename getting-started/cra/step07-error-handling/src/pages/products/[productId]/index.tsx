import { useNotificationService, usePost } from 'onekijs';
import React, { FC } from 'react';
import { useParams } from 'onekijs';
import { products } from '..';
import { ProductType } from '../../../__server__/api/dto/product';
import { URL_ADD_PRODUCT } from '../../../modules/core/libs/constants';
import ProductDetails from '../../../modules/products/components/ProductDetails';

const ProductDetailsPage: FC = () => {
  const { productId } = useParams();
  const notificationService = useNotificationService();
  const [submit] = usePost<ProductType>(URL_ADD_PRODUCT, {
    onSuccess: () => {
      notificationService.send({
        topic: 'success',
        payload: {
          message: 'Product added succesfully to the cart!',
        },
      });
    },
    onError: (error) => {
      notificationService.send({
        topic: 'error',
        payload: {
          message: error.message,
        },
      });
    },
  });

  let product = products[+productId];
  if (product.name === 'Phone Invalid') {
    // to simulate an error, we pickup a non entry in the array
    product = products[9999];
  }
  return (
    <div>
      <ProductDetails product={product} onBuy={() => submit(product)} />
    </div>
  );
};

export default ProductDetailsPage;
