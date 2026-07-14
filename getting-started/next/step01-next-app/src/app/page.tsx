'use client';

import { products } from '../../data/products';
import Navbar from '../modules/core/components/Navbar';
import Product from '../modules/products/components/Product';

export default function ProductsPage() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div>
          <h2>Products</h2>
          {products.map((product) => (
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
}
