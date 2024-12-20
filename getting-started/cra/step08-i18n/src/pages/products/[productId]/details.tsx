import { Link, useNotificationService, usePost, useTranslation } from 'onekijs';
import React from 'react';
import { useParams } from 'onekijs';
import { products } from '..';
import { URL_ADD_PRODUCT } from '../../../modules/core/libs/constants';
import ProductDetails from '../../../modules/products/components/ProductDetails';
import { ProductType } from '../../../__server__/api/dto/product';

const ProductDetailsPage: React.FC = () => {
  const { productId = '' } = useParams();
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

  let product = products[+productId];
  if (product.name === 'Phone Invalid') {
    // to simulate an error, we pickup a non entry in the array
    product = products[9999];
  }
  return (
    <>
      <div>
        <ProductDetails product={product} onBuy={() => submit(product)} />
      </div>
      <Link href="/products/0">Product 0</Link>
      <Link href="/products/1">Product 1</Link>
    </>
  );
};

export default ProductDetailsPage;
