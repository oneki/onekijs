import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppLayout from '../modules/core/layouts/AppLayout';
import ProductsRouter from './products/_router';

const RootRouter = (): JSX.Element => {
  return (
    <AppLayout>
      {/* AppLayout is a layout common to all pages */}
      <Switch>
        <Route path="/products">
          {/* all routes starting with /products are defined in src/products/@router.tsx */}
          <ProductsRouter />
        </Route>
        <Route>
          {/* redirect by default to /products as we don't have any homepage in this example */}
          <Redirect to="/products" />
        </Route>
      </Switch>
    </AppLayout>
  );
};

export default RootRouter;
