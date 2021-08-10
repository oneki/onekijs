import { GetStaticPaths, GetStaticProps } from 'next';
import { useNotificationService, usePost, withLayout } from 'onekijs-next';
import React, { FC } from 'react';
import { products, ProductType } from '../../../../data/products';
import AppLayout from '../../../modules/core/layouts/AppLayout';
import { URL_ADD_PRODUCT } from '../../../modules/core/libs/constants';
import ProductDetails from '../../../modules/products/components/ProductDetails';

interface PageProps {
  product: ProductType;
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const productId = params?.productId as string;
  return {
    props: {
      product: products[+productId],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((_, index) => ({
    params: { productId: '' + index },
  }));

  return { paths, fallback: false };
};

const ProductDetailsPage: FC<PageProps> = ({ product }) => {
  const notificationService = useNotificationService();
  const [submit] = usePost<ProductType>(URL_ADD_PRODUCT, {
    onSuccess: () => {
      notificationService.send({
        topic: 'success',
        payload: {
          message: 'Product added succesfully to the cart!',
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
  if (product.name === 'Phone Invalid' && typeof window !== 'undefined') {
    // to simulate an error during the rendering phase,
    // we pickup a non entry in the array
    product = products[9999];
  }
  return <ProductDetails product={product} onBuy={() => submit(product)} />;
};

export default withLayout(ProductDetailsPage, AppLayout);
