import { useNotificationService, usePost, useTranslation } from 'onekijs';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '.';
import { URL_ADD_PRODUCT } from '../@utils/constants';
import { ProductType } from '../__server__/api/dto/product';
import ProductDetails from './@components/ProductDetails';

type ProductDetailsParams = {
  id: string;
};

const ProductDetailsPage: FC = () => {
  const { id } = useParams<ProductDetailsParams>();
  const notificationService = useNotificationService();
  const [, t] = useTranslation();
  const [submit] = usePost<ProductType>(URL_ADD_PRODUCT, {
    onSuccess: () => {
      notificationService.send({
        topic: 'success',
        payload: {
          message: t('Product added succesfully to the cart!'),
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

  let product = products[+id];
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
