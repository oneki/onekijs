import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { currency } from '../@libs/format';
import { ProductType } from '../products/@components/Product';

interface CartProps {
  cart: ProductType[];
}

const Cart: FC<CartProps> = ({ cart }) => {
  return (
    <div>
      <h3>Cart</h3>

      {cart.map((item, index) => (
        <div key={`item-${index}`} className="cart-item">
          <span>{item.name}</span>
          <span>{currency(item.price)}</span>
        </div>
      ))}

      {(!cart || cart.length === 0) && <h4>There is no item in the shopping cart !</h4>}
      <p>
        <Link to="/products">Buy another products</Link>
      </p>
    </div>
  );
};

export default Cart;
