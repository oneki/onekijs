import React from 'react';
import { Redirect, Route, Switch } from 'onekijs/cra';
import AppLayout from '../modules/core/layouts/AppLayout';
import ProductsRouter from './products/_router';
import CartPage from './cart';
import LoginPage from './login';
import LogoutPage from './logout';

const RootRouter = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/logout">
        <LogoutPage />
      </Route>
      <Route>
        <AppLayout>
          <Switch>
            <Route path="/products">
              <ProductsRouter />
            </Route>
            <Route path="/cart">
              <CartPage />
            </Route>
            <Route>
              <Redirect to="/products" />
            </Route>
          </Switch>
        </AppLayout>
      </Route>
    </Switch>
  );
};

export default RootRouter;
