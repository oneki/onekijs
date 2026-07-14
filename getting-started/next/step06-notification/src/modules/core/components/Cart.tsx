import Link from 'next/link';
import { CartType } from '../../../../data/dto/cart';
import { currency } from '../libs/format';

interface CartProps {
  cart: CartType;
}

const Cart = ({ cart }: CartProps) => {
  return (
    <div>
      <h3>Cart</h3>

      {cart.products.map((item, index) => (
        <div key={`item-${index}`} className="cart-item">
          <span>{item.name}</span>
          <span>{currency(item.price)}</span>
        </div>
      ))}
      {cart.products.length === 0 && <h4>There is no item in the shopping cart !</h4>}
      <p>
        <Link href="/">Buy another products</Link>
      </p>
    </div>
  );
};

export default Cart;
