import { GetStaticPaths, GetStaticProps } from 'next';
import { useNotificationService, usePost, useTranslation, withLayout } from 'onekijs-next';
import { withI18nStaticPaths, withI18nStaticProps } from 'onekijs-ssr';
import React, { FC } from 'react';
import { products, ProductType } from '../../../../data/products';
import AppLayout from '../../../modules/core/layouts/AppLayout';
import { URL_ADD_PRODUCT } from '../../../modules/core/libs/constants';
import ProductDetails from '../../../modules/products/components/ProductDetails';

interface PageProps {
  product: ProductType;
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params, locale }) => {
  const productId = params?.productId as string;
  return withI18nStaticProps(locale || 'en', {
    props: {
      product: products[+productId],
    },
  });
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let paths = products.map((_, index) => ({
    params: { productId: '' + index },
  }));

  paths = withI18nStaticPaths(paths, locales);

  return { paths, fallback: false };
};

const ProductDetailsPage: FC<PageProps> = ({ product }) => {
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

  return <ProductDetails product={product} onBuy={() => submit(product)} />;
};

export default withLayout(ProductDetailsPage, AppLayout);
