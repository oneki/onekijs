import React, { FC } from 'react';
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
    </div>
  );
};

export default Cart;
