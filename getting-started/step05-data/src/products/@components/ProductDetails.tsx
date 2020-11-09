import React, { FC } from 'react';
import { currency } from '../../@utils/format';
import { ProductType } from './Product';

type ProductDetailsOptions = {
  product: ProductType;
  onBuy: () => void;
};

const ProductDetails: FC<ProductDetailsOptions> = ({ product, onBuy }) => {
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
