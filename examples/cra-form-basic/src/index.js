import { App } from 'onekijs-cra';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { IndexPage } from './pages';

ReactDOM.render(
  <App>
    <Switch>   
      <Route>
        <IndexPage />
      </Route>
    </Switch>
  </App>,
  document.getElementById('root')
);
