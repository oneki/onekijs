import { GetStaticProps } from 'next';
import React, { FC } from 'react';
import { useNotificationService, useTranslation, withLayout } from 'onekijs';
import Product from '../modules/products/components/Product';
import { products, ProductType } from '../../data/products';
import AppLayout from '../modules/core/layouts/AppLayout';
import { NOTIF_TOPIC_ERROR, NOTIF_TOPIC_SUCCESS } from '../modules/core/libs/constants';
import { withI18nStaticProps } from 'onekijs/ssr';

interface PageProps {
  products: ProductType[];
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const result = withI18nStaticProps(locale || 'en', {
    props: {
      products: products,
    },
  });
  return result;
};

const ProductsPage: FC<PageProps> = ({ products }) => {
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
export default withLayout(ProductsPage, AppLayout);
