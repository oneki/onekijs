import { useNotificationService, useTranslation } from 'onekijs';
import React from 'react';
import { NOTIF_TOPIC_ERROR, NOTIF_TOPIC_SUCCESS } from '../../modules/core/libs/constants';
import Product, { ProductType } from '../../modules/products/components/Product';

const ProductsPage: React.FC = () => {
  const notificationService = useNotificationService();
  const [, t] = useTranslation();
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
                message: t('The product has been shared!'),
              },
            })
          }
          onNotify={() =>
            notificationService.send({
              topic: NOTIF_TOPIC_ERROR,
              payload: {
                message: t('You will be notified when the product goes on sale'),
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
    id: 0,
    name: 'Phone XL',
    price: 799,
    description: 'A large phone with one of the best screens',
  },
  {
    id: 1,
    name: 'Phone Mini',
    price: 699,
    description: 'A great phone with one of the best cameras',
  },
  {
    id: 2,
    name: 'Phone Invalid',
    price: 299,
    description: '',
  },
];

export default ProductsPage;
