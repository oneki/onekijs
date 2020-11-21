import React, { FC } from 'react';
import { ProductType } from '../../../pages/products';

interface ProductProps {
  product: ProductType;
  onClick: () => void;
  onNotify: () => void;
}

const Product: FC<ProductProps> = ({ product, onClick, onNotify }) => {
  return (
    <div>
      <h3>
        <a href="/">{product.name}</a>
      </h3>
      {product.description && <p>Description: {product.description}</p>}
      <button onClick={onClick}>Share</button>
      {product.price > 700 && (
        <p>
          <button onClick={onNotify}>Notify me</button>
        </p>
      )}
    </div>
  );
};

export default Product;
