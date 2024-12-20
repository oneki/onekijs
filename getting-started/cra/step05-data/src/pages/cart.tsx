import { secure, useDelete, useGet } from 'onekijs';
import React from 'react';
import Cart from '../modules/core/components/Cart';
import { URL_CART } from '../modules/core/libs/constants';
import { CartResponse } from '../__server__/api/dto/cart';

const CartPage: React.FC = () => {
  // retrieve the content of the cart from the server
  const [cart, loading, refresh] = useGet<CartResponse>(URL_CART);
  const [deleleCart] = useDelete(URL_CART, {
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
