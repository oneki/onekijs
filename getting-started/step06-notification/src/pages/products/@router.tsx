import React from 'react';
import { useRouteMatch, Route } from 'react-router-dom';
import ProductDetailsPage from './[id]';
import ProductsPage from '.';
import { FadeSwitch } from 'onekijs';

const ProductsRouter = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <FadeSwitch>
      <Route path={`${match.path}/:id`}>
        <ProductDetailsPage />
      </Route>
      <Route path={match.path}>
        <ProductsPage />
      </Route>
    </FadeSwitch>
  );
};

export default ProductsRouter;
