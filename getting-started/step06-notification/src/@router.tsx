import { FadeSwitch } from 'onekijs';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthRouter from './auth/@router';
import CartRouter from './cart/@router';
import ProductsRouter from './products/@router';

const MainRouter = (): JSX.Element => {
  return (
    <FadeSwitch>
      <Route path="/auth">
        <AuthRouter />
      </Route>
      <Route path="/products">
        <ProductsRouter />
      </Route>
      <Route path="/cart">
        <CartRouter />
      </Route>
      <Route>
        <Redirect to="/products" />
      </Route>
    </FadeSwitch>
  );
};

export default MainRouter;
