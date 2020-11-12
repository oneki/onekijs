import { useNotificationService, usePost, useTranslation } from 'onekijs';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '..';
import { ProductType } from '../../../__server__/api/dto/product';
import { URL_ADD_PRODUCT } from '../../../modules/core/libs/constants';
import ProductDetails from '../../../modules/products/components/ProductDetails';

type ProductDetailsParams = {
  productId: string;
};

const ProductDetailsPage: FC = () => {
  const { productId } = useParams<ProductDetailsParams>();
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

  const product = products[+productId];
  return (
    <div>
      <ProductDetails product={product} onBuy={() => submit(product)} />
    </div>
  );
};

export default ProductDetailsPage;
