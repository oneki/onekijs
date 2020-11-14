import React from 'react';
import { Route } from 'onekijs';
import { useRouteMatch, Switch } from 'react-router-dom';
import ProductDetailsPage from './[productId]';
import ProductsPage from '.';

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
