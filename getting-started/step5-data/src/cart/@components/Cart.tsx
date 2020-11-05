import React, { FC } from 'react';
import { currency } from '../../@utils/format';
import { CartType } from '../../__server__/api/dto/cart';

const Cart: FC<CartOptions> = ({ cart }) => {
  return (
    <div>
      <h3>Cart</h3>

      {cart.products.map((item, index) => (
        <div key={`item-${index}`} className="cart-item">
          <span>{item.name}</span>
          <span>{currency(item.price)}</span>
        </div>
      ))}
    </div>
  );
};

type CartOptions = {
  cart: CartType;
};

export default Cart;
