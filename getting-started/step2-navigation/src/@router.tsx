import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductsRouter from './products/@router';

const MainRouter = (): JSX.Element => {
  return (
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
  );
};

export default MainRouter;
