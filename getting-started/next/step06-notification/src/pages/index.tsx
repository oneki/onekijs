import { GetStaticProps } from 'next';
import React, { FC } from 'react';
import { useNotificationService, withLayout } from 'onekijs-next';
import Product from '../modules/products/components/Product';
import { products, ProductType } from '../../data/products';
import AppLayout from '../modules/core/layouts/AppLayout';
import { NOTIF_TOPIC_ERROR, NOTIF_TOPIC_SUCCESS } from '../modules/core/libs/constants';

interface PageProps {
  products: ProductType[];
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  return {
    props: {
      products: products,
    },
  };
};

const ProductsPage: FC<PageProps> = ({ products }) => {
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
export default withLayout(ProductsPage, AppLayout);
