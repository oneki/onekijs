import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppLayout from './@layouts/AppLayout';
import AuthRouter from './auth/@router';
import CartRouter from './cart/@router';
import ProductsRouter from './products/@router';

const RootRouter = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/auth">
        <AuthRouter />
      </Route>
      <Route>
        <AppLayout>
          <Switch>
            <Route path="/products">
              <ProductsRouter />
            </Route>
            <Route path="/cart">
              <CartRouter />
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
