'use client';

import { useNotificationService, usePost, useTranslation } from 'onekijs-next';
import { products, ProductType } from '../../../../../data/products';
import { URL_ADD_PRODUCT } from '../../../../modules/core/libs/constants';
import ProductDetails from '../../../../modules/products/components/ProductDetails';

export default function ProductDetailsClient({ product }: { product: ProductType }) {
  const notificationService = useNotificationService();
  const [, t] = useTranslation();
  const [submit] = usePost<ProductType>(URL_ADD_PRODUCT, {
    onSuccess: () => {
      notificationService.send({
        topic: 'success',
        payload: { message: t('Product added succesfully to the cart!') },
      });
    },
    onError: (error) => {
      notificationService.send({
        topic: 'error',
        payload: { message: error.message },
      });
    },
  });

  if (product.name === 'Phone Invalid') {
    // Intentionally render an invalid product to demonstrate the app error boundary.
    product = products[9999];
  }

  return <ProductDetails product={product} onBuy={() => submit(product)} />;
}
