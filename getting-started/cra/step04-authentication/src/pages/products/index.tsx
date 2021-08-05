import React from 'react';
import Product, { ProductType } from '../../modules/products/components/Product';

const ProductsPage: React.FC = () => {
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

export const products: ProductType[] = [
  {
    name: 'Phone XL',
    price: 799,
    description: 'A large phone with one of the best screens',
  },
  {
    name: 'Phone Mini',
    price: 699,
    description: 'A great phone with one of the best cameras',
  },
  {
    name: 'Phone Standard',
    price: 299,
  },
];

export default ProductsPage;
