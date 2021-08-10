import { GetStaticPaths, GetStaticProps } from 'next';
import React, { FC } from 'react';
import { withLayout } from 'onekijs-next';
import ProductDetails from '../../../modules/products/components/ProductDetails';
import { products, ProductType } from '../../../../data/products';
import AppLayout from '../../../modules/core/layouts/AppLayout';

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
  return <ProductDetails product={product} />;
};

export default withLayout(ProductDetailsPage, AppLayout);
