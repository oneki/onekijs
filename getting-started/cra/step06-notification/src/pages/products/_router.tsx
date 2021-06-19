import React from 'react';
import { useRouteMatch, Route } from 'onekijs';
import ProductDetailsPage from './[productId]';
import ProductsPage from '.';
import { FadeSwitch } from 'onekijs';

const ProductsRouter = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <FadeSwitch>
      <Route path={`${match.path}/:productId`}>
        <ProductDetailsPage />
      </Route>
      <Route path={match.path}>
        <ProductsPage />
      </Route>
    </FadeSwitch>
  );
};

export default ProductsRouter;
