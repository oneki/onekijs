import React, { FC } from 'react';
import { Link } from 'onekijs';
import Button from '../../../components/Button';
import { ProductType } from '../../../data/product';

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
      <Button onClick={onClick}>Share</Button>
      {product.price > 700 && (
        <p>
          <Button onClick={onNotify}>Notify me</Button>
        </p>
      )}
    </div>
  );
};

export default Product;
