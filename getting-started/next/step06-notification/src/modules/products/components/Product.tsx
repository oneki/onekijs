import Link from 'next/link';
import { ProductType } from '../../../../data/products';

interface ProductProps {
  product: ProductType;
  id: number;
  onClick: () => void;
  onNotify: () => void;
}

const Product = ({ product, id, onClick, onNotify }: ProductProps) => {
  return (
    <div>
      <h3>
        <Link href={`/products/${id}`}>{product.name}</Link>
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
