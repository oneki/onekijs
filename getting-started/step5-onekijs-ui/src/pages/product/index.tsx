import React, { FC } from 'react';
import H2 from '../../components/H2';
import { products } from '../../data/product';
import Product from './components/Product';

const Home: FC = () => {
  return (
    <div>
      <H2>Products</H2>
      {products.map((product) => (
        <Product
          key={product.name}
          product={product}
          onClick={() => window.alert('The product has been shared!')}
          onNotify={() => window.alert('You will be notified when the product goes on sale')}
        />
      ))}
    </div>
  );
};

export default Home;
