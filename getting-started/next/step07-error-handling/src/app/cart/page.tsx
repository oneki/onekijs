'use client';

import { secure, useDelete, useGet } from 'onekijs-next';
import { CartResponse } from '../../../data/dto/cart';
import Cart from '../../modules/core/components/Cart';
import { URL_CART } from '../../modules/core/libs/constants';

function CartPage() {
  const [cart, loading, refresh] = useGet<CartResponse>(URL_CART);
  const [deleteCart] = useDelete(URL_CART, {
    onSuccess: () => {
      refresh();
    },
    onError: (error) => {
      window.alert(`An error occurred while cleaning the cart: ${error.message}`);
    },
  });

  return (
    <div>
      {loading && <p>Loading ...</p>}
      <div>
        <button className="button" onClick={() => deleteCart()}>
          Empty the cart
        </button>
      </div>
      {cart && <Cart cart={cart} />}
    </div>
  );
}

export default secure(CartPage);
