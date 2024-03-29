import { useTranslation } from 'onekijs';
import React from 'react';
import { currency } from '../../core/libs/format';
import { ProductType } from './Product';

interface ProductDetailsProps {
  product: ProductType;
  onBuy: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBuy }) => {
  const [T] = useTranslation();
  return (
    <div>
      <h2>
        <T>Product Details</T>
      </h2>

      <div>
        <h3>
          <T>{product.name}</T>
        </h3>
        <h4>
          <T>{currency(product.price)}</T>
        </h4>
        <p>
          <T>{product.description}</T>
        </p>

        <button onClick={onBuy}>
          <T>Buy</T>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
