import React, { FC } from 'react';
import { ProductType } from '../../../../data/products';
import Link from 'next/link';

interface ProductProps {
  product: ProductType;
  onClick: () => void;
  onNotify: () => void;
}

const Product: FC<ProductProps> = ({ product, onClick, onNotify }) => {
  return (
    <div>
      <h3>
        <Link href="/">{product.name}</Link>
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
