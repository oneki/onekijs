import { useNotificationService } from 'onekijs';
import React from 'react';
import { NOTIF_TOPIC_INFO, NOTIF_TOPIC_SUCCESS } from '../../modules/core/libs/constants';
import Product from '../../modules/products/components/Product';
import { ProductType } from '../../__server__/api/dto/product';

const ProductsPage: React.FC = () => {
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
              topic: NOTIF_TOPIC_INFO,
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
