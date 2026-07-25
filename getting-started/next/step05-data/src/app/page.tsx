'use client';

import { products } from '../../data/products';
import Product from '../modules/products/components/Product';

export default function ProductsPage() {
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
}
