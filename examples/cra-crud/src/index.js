import { App } from 'onekijs-cra';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import settings from './settings';
import Main from './components/main';

ReactDOM.render(
  <App settings={settings}>
    <Switch>
      <Route component={Main} />
    </Switch>
  </App>,
  document.getElementById('root')
);
