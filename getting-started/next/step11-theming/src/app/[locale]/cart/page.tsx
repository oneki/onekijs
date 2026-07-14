'use client';

import { secure, useDelete, useGet, useTranslation } from 'onekijs-next';
import { CartResponse } from '../../../../data/dto/cart';
import Cart from '../../../modules/core/components/Cart';
import { URL_CART } from '../../../modules/core/libs/constants';

function CartPage() {
  const [T, t] = useTranslation();
  const [cart, loading, refresh] = useGet<CartResponse>(URL_CART);
  const [deleteCart] = useDelete(URL_CART, {
    onSuccess: refresh,
    onError: (error) => {
      window.alert(`${t('An error occured while cleaning the cart')}: ${error.message}`);
    },
  });

  return (
    <div>
      {loading && <p><T>Loading</T> ...</p>}
      <div>
        <button className="button" onClick={() => deleteCart()}><T>Empty the cart</T></button>
      </div>
      {cart && <Cart cart={cart} />}
    </div>
  );
}

export default secure(CartPage);
