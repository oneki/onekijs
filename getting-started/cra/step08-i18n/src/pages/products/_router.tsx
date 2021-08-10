import { Route, Switch, useRouteMatch } from 'onekijs';
import React from 'react';
import ProductsPage from '.';
import ProductDetailsPage from './[productId]/details';

const ProductsRouter = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:productId`}>
        <ProductDetailsPage />
      </Route>
      <Route path={match.path}>
        <ProductsPage />
      </Route>
    </Switch>
  );
};

export default ProductsRouter;
