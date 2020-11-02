import React, { FC } from 'react';
import { currency } from '../../@utils/format';
import { ProductType } from '../../products/@components/Product';

const Cart: FC<CartOptions> = ({ cart }) => {
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

type CartOptions = {
  cart: ProductType[];
};

export default Cart;
