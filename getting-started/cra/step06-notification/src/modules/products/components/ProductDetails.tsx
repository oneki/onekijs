import React from 'react';
import { currency } from '../../core/libs/format';
import { ProductType } from './Product';

interface ProductDetailsProps {
  product: ProductType;
  onBuy: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBuy }) => {
  return (
    <div>
      <h2>Product Details</h2>

      <div>
        <h3>{product.name}</h3>
        <h4>{currency(product.price)}</h4>
        <p>{product.description}</p>

        <button onClick={onBuy}>Buy</button>
      </div>
    </div>
  );
};

export default ProductDetails;
