import { secure, useDelete, useGet } from 'onekijs';
import React, { FC, useState } from 'react';
import { CartResponse } from '../__server__/api/dto/cart';
import Cart from './@components/Cart';

const CartPage: FC = () => {
  // retrieve the content of the cart from the server
  const [cart, loading, refresh] = useGet<CartResponse>('/cart');
  const [deleleCart] = useDelete('/cart', {
    onSuccess: () => {
      refresh();
    },
    onError: (error) => {
      window.alert(`An error occured while cleaning the cart: ${error.message}`);
    },
  });
  return (
    <div>
      {loading && <p>Loading ...</p>}
      <div>
        <button className="button" onClick={() => deleleCart()}>
          Empty the cart
        </button>
      </div>
      {cart && <Cart cart={cart} />}
    </div>
  );
};

export default secure(CartPage);
