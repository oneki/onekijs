import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppLayout from '../modules/core/layouts/AppLayout';
import CartPage from './cart';
import ProductsRouter from './products/_router';

const RootRouter = (): JSX.Element => {
  return (
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
  );
};

export default RootRouter;
