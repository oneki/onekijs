'use client';

import { useNotificationService, useTranslation } from 'onekijs-next';
import { products } from '../../../data/products';
import { NOTIF_TOPIC_ERROR, NOTIF_TOPIC_SUCCESS } from '../../modules/core/libs/constants';
import Product from '../../modules/products/components/Product';

export default function ProductsPage() {
  const notificationService = useNotificationService();
  const [, t] = useTranslation();

  return (
    <div>
      <h2>{t('Products')}</h2>
      {products.map((product, index) => (
        <Product
          key={product.name}
          product={product}
          id={index}
          onClick={() =>
            notificationService.send({
              topic: NOTIF_TOPIC_SUCCESS,
              ttl: 5000,
              payload: { message: t('The product has been shared!') },
            })
          }
          onNotify={() =>
            notificationService.send({
              topic: NOTIF_TOPIC_ERROR,
              payload: { message: t('You will be notified when the product goes on sale') },
            })
          }
        />
      ))}
    </div>
  );
}
