import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import ProductDetailsPage from './[id]';
import ProductsPage from '.';

const ProductsRouter = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <ProductDetailsPage />
      </Route>
      <Route path={match.path}>
        <ProductsPage />
      </Route>
    </Switch>
  );
};

export default ProductsRouter;
