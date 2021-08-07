import React from 'react';
import { useRouteMatch, Switch, Route } from 'onekijs';
import ProductsPage from '.';
import ProductDetailsPage from './[productId]';

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
