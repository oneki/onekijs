import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import CartPage from './cart';

const CartRouter = (): JSX.Element => {
  const match = useRouteMatch();
  console.log('match', match);
  return (
    <Switch>
      <Route path={match.path}>
        <CartPage />
      </Route>
    </Switch>
  );
};

export default CartRouter;
