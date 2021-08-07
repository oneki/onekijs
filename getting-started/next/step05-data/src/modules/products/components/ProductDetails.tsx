import React, { FC } from 'react';
import { ProductType } from '../../../../data/products';
import { currency } from '../../../modules/core/libs/format';

interface ProductDetailsProps {
  product: ProductType;
  onBuy: () => void;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product, onBuy }) => {
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
