import { useNotificationService } from 'onekijs';
import React, { FC } from 'react';
import { NOTIF_TOPIC_ERROR, NOTIF_TOPIC_SUCCESS } from '../@utils/constants';
import Product, { ProductType } from './@components/Product';

const ProductsPage: FC = () => {
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
              payload: {
                message: 'The product has been shared!',
              },
            })
          }
          onNotify={() =>
            notificationService.send({
              topic: NOTIF_TOPIC_ERROR,
              payload: {
                message: 'You will be notified when the product goes on sale',
              },
            })
          }
        />
      ))}
    </div>
  );
};

export const products: ProductType[] = [
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
    name: 'Phone Invalid',
    price: 299,
  },
];

export default ProductsPage;
