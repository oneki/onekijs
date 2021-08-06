import { GetStaticProps } from 'next';
import React, { FC } from 'react';
import { withLayout } from 'onekijs';
import Product from '../modules/products/components/Product';
import { products, ProductType } from '../../data/products';
import AppLayout from '../modules/core/layouts/AppLayout';

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
  return (
    <div>
      <h2>Products</h2>
      {products.map((product, index) => (
        <Product
          key={product.name}
          product={product}
          id={index}
          onClick={() => window.alert('The product has been shared!')}
          onNotify={() => window.alert('You will be notified when the product goes on sale')}
        />
      ))}
    </div>
  );
};
export default withLayout(ProductsPage, AppLayout);
