import React, { FC } from 'react';
import { ProductType } from '../../../../data/products';
import { currency } from '../../../modules/core/libs/format';

interface ProductDetailsProps {
  product: ProductType;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
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

export default ProductDetails;
