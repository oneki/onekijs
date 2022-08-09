import { App, Route, Switch } from 'onekijs';
import React from 'react';
import ReactDOM from 'react-dom';
import NotificationCenter from './components/NotificationCenter';
import NotificationPage from './pages/NotificationPage';

ReactDOM.render(
  <App>
    <NotificationCenter />
    <Switch>
      <Route>
        <NotificationPage />
      </Route>
    </Switch>
  </App>,
  document.getElementById('root'),
);
