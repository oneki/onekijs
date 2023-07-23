import { useTranslation } from 'onekijs';
import React from 'react';
import { Link } from 'onekijs';
import { Button } from 'onekijs-ui';

interface ProductProps {
  product: ProductType;
  id: number;
  onClick: () => void;
  onNotify: () => void;
}

const Product: React.FC<ProductProps> = ({ product, id, onClick, onNotify }) => {
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
      <Button onClick={onClick}>
        <T>Share</T>
      </Button>
      {product.price > 700 && (
        <p>
          <Button onClick={onNotify}>
            <T>Notify me</T>
          </Button>
        </p>
      )}
    </div>
  );
};

export interface ProductType {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export default Product;
