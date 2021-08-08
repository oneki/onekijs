import React from 'react';
import { ProductType } from '../../../../data/products';
import { currency } from '../libs/format';

interface CartProps {
  cart: ProductType[];
}

const Cart: React.FC<CartProps> = ({ cart }) => {
  return (
    <div>
      <h3>Cart</h3>

      {cart.map((item, index) => (
        <div key={`item-${index}`} className="cart-item">
          <span>{item.name}</span>
          <span>{currency(item.price)}</span>
        </div>
      ))}
    </div>
  );
};

export default Cart;
