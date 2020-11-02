import React, { FC } from 'react';
import { ProductType } from './Product';

type ProductDetailsOptions = {
  product: ProductType;
};

const ProductDetails: FC<ProductDetailsOptions> = ({ product }) => {
  return (
    <div>
      <h2>Product Details</h2>

      <div>
        <h3>{product.name}</h3>
        <h4>{currency(product.price)}</h4>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

export default ProductDetails;
