import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import ProductDetailsPage from './details';
import ProductsPage from './list';

const ProductsRouter = (): JSX.Element => {
  const match = useRouteMatch();
  console.log('match', match);
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