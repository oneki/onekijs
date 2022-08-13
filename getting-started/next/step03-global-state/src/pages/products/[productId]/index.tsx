import { GetStaticPaths, GetStaticProps } from 'next';
import React, { FC } from 'react';
import { withLayout, useGlobalState } from 'onekijs-next';
import ProductDetails from '../../../modules/products/components/ProductDetails';
import { products, ProductType } from '../../../../data/products';
import AppLayout from '../../../modules/core/layouts/AppLayout';
import { STATE_CART } from '../../../modules/core/libs/constants';

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
  const [cart, setCart] = useGlobalState<ProductType[]>(STATE_CART, []); // TODO update to useGlobalState
  return (
    <ProductDetails
      product={product}
      onBuy={() => {
        setCart(cart.concat(product));
        window.alert('Your product has been added to the cart!');
      }}
    />
  );
};

export default withLayout(ProductDetailsPage, AppLayout);
