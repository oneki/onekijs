import { useTranslation } from 'onekijs';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { CartType } from '../../../__server__/api/dto/cart';
import { currency } from '../libs/format';

interface CartProps {
  cart: CartType;
}

const Cart: FC<CartProps> = ({ cart }) => {
  const nbItems = cart.products.length;
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
      {nbItems === 0 && (
        <h4>
          <T>
            There is <u>no item</u> in the shopping cart !
          </T>
        </h4>
      )}
      {nbItems > 0 && (
        <h4>
          <T count={nbItems}>
            There is <u>{{ nbItems }} item</u> in the shopping cart !
          </T>
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

export default Cart;
