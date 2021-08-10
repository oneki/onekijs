import { secure, useDelete, useGet, useTranslation, withLayout } from 'onekijs-next';
import React from 'react';
import { CartResponse } from '../../data/dto/cart';
import Cart from '../modules/core/components/Cart';
import AppLayout from '../modules/core/layouts/AppLayout';
import { URL_CART } from '../modules/core/libs/constants';

const CartPage: React.FC = () => {
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

export default secure(withLayout(CartPage, AppLayout));
