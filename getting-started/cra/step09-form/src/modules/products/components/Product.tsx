import { useTranslation } from 'onekijs';
import React, { FC } from 'react';
import { Link } from 'onekijs';

interface ProductProps {
  product: ProductType;
  id: number;
  onClick: () => void;
  onNotify: () => void;
}

const Product: FC<ProductProps> = ({ product, id, onClick, onNotify }) => {
  const [T] = useTranslation();
  return (
    <div>
      <h3>
        <Link href={`/products/${id}`}>
          <T>{product.name}</T>
        </Link>
      </h3>
      {product.description && (
        <p>
          <T>Description</T>: <T>{product.description}</T>
        </p>
      )}
      <button onClick={onClick}>
        <T>Share</T>
      </button>
      {product.price > 700 && (
        <p>
          <button onClick={onNotify}>
            <T>Notify me</T>
          </button>
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
