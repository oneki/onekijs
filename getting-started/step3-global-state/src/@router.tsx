import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CartRouter from './cart/@router';
import ProductsRouter from './products/@router';

const MainRouter = (): JSX.Element => {
  return (
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
  );
};

export default MainRouter;
