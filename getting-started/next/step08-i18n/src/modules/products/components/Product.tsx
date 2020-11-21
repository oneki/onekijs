import { useTranslation, Link, useLocale } from 'onekijs-next';
import React, { FC } from 'react';

interface ProductProps {
  product: ProductType;
  id: number;
  onClick: () => void;
  onNotify: () => void;
}

const Product: FC<ProductProps> = ({ product, id, onClick, onNotify }) => {
  const currentLocale = useLocale();
  const nextLocale = currentLocale === 'fr' ? 'en' : 'fr';
  const [T] = useTranslation();
  return (
    <div>
      <Link href={`/cart`}>to Cart page {currentLocale}</Link>
      <br />
      <Link href={`/cart`} locale={nextLocale}>
        to Cart page {nextLocale}
      </Link>
      <br />
      <Link href="https://oneki.github.io">to Oneki</Link>
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
  id: number;
  name: string;
  price: number;
  description?: string;
}

export default Product;
