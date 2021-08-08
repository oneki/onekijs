import { GetStaticPaths, GetStaticProps } from 'next';
import { usePost, withLayout } from 'onekijs';
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
  const [submit] = usePost<ProductType>(URL_ADD_PRODUCT, {
    onSuccess: () => {
      window.alert('Product added succesfully to the cart !');
    },
    onError: (error) => {
      window.alert(`An error occured while adding the product to the cart: ${error.message}`);
    },
  });
  return <ProductDetails product={product} onBuy={() => submit(product)} />;
};

export default withLayout(ProductDetailsPage, AppLayout);
