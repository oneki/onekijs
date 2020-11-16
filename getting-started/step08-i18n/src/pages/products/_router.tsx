import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import ProductDetailsPage from './[productId]/details';
import ProductsPage from '.';
import { Route, Switch } from 'onekijs';

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
