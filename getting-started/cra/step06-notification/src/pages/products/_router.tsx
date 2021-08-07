import { FadeSwitch, Route, useRouteMatch } from 'onekijs';
import React from 'react';
import ProductsPage from '.';
import ProductDetailsPage from './[productId]';

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
