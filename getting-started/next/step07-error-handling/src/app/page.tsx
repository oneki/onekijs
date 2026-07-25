'use client';

import { useNotificationService } from 'onekijs-next';
import { products } from '../../data/products';
import { NOTIF_TOPIC_ERROR, NOTIF_TOPIC_SUCCESS } from '../modules/core/libs/constants';
import Product from '../modules/products/components/Product';

export default function ProductsPage() {
  const notificationService = useNotificationService();

  return (
    <div>
      <h2>Products</h2>
      {products.map((product, index) => (
        <Product
          key={product.name}
          product={product}
          id={index}
          onClick={() =>
            notificationService.send({
              topic: NOTIF_TOPIC_SUCCESS,
              ttl: 5000,
              payload: { message: 'The product has been shared!' },
            })
          }
          onNotify={() =>
            notificationService.send({
              topic: NOTIF_TOPIC_ERROR,
              payload: { message: 'You will be notified when the product goes on sale' },
            })
          }
        />
      ))}
    </div>
  );
}
