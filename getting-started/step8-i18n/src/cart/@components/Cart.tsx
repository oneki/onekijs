import { useTranslation } from 'onekijs';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { currency } from '../../@utils/format';
import { CartType } from '../../__server__/api/dto/cart';

const Cart: FC<CartOptions> = ({ cart }) => {
  const [T] = useTranslation();
  return (
    <div>
      <h3>
        <T>Cart</T>
      </h3>

      {cart.products.map((item, index) => (
        <div key={`item-${index}`} className="cart-item">
          <span>
            <T>{item.name}</T>
          </span>
          <span>
            <T>{currency(item.price)}</T>
          </span>
        </div>
      ))}
      {cart.products.length === 0 && (
        <h4>
          <T>There is no item in the shopping cart !</T>
        </h4>
      )}
      <p>
        <Link to="/products">
          <T>Buy another products</T>
        </Link>
      </p>
    </div>
  );
};

type CartOptions = {
  cart: CartType;
};

export default Cart;
