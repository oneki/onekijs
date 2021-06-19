import React from 'react';
import { Redirect, Route, Switch } from 'onekijs';
import AppLayout from '../modules/core/layouts/AppLayout';
import ProductsRouter from './products/_router';
import CartPage from './cart';
import LoginPage from './login';
import LogoutPage from './logout';
import SignupPage from './signup';

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
            <Route path="/signup">
              <SignupPage />
            </Route>
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
