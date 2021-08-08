import { GetStaticProps } from 'next';
import React, { FC } from 'react';
import { products, ProductType } from '../../data/products';
import Navbar from '../modules/core/components/Navbar';
import Product from '../modules/products/components/Product';

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
      <Navbar />
      <div className="container">
        <div>
          <h2>Products</h2>
          {products.map((product, index) => (
            <Product
              key={product.name}
              product={product}
              onClick={() => window.alert('The product has been shared!')}
              onNotify={() => window.alert('You will be notified when the product goes on sale')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
