import { secure, useDelete, useGet, useTranslation } from 'onekijs-next';
import React, { FC } from 'react';
import { URL_CART } from '../modules/core/libs/constants';
import { CartResponse } from '../__server__/api/dto/cart';
import Cart from '../modules/core/components/Cart';

const CartPage: FC = () => {
  const [T, t] = useTranslation();
  const [cart, loading, refresh] = useGet<CartResponse>(URL_CART);
  const [deleleCart] = useDelete(URL_CART, {
    onSuccess: () => {
      refresh();
    },
    onError: (error) => {
      window.alert(`${t('An error occured while cleaning the cart')}: ${error.message}`);
    },
  });
  return (
    <div>
      {loading && (
        <p>
          <T>Loading</T> ...
        </p>
      )}
      <div>
        <button className="button" onClick={() => deleleCart()}>
          <T>Empty the cart</T>
        </button>
      </div>
      {cart && <Cart cart={cart} />}
    </div>
  );
};

export default secure(CartPage);
