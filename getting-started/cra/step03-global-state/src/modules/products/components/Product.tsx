import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface ProductProps {
  product: ProductType;
  id: number;
  onClick: () => void;
  onNotify: () => void;
}

const Product: FC<ProductProps> = ({ product, id, onClick, onNotify }) => {
  return (
    <div>
      <h3>
        <Link to={`/products/${id}`}>{product.name}</Link>
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

export interface ProductType {
  name: string;
  price: number;
  description?: string;
}

export default Product;
