import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Link } from 'react-router-dom';
import { HomePage } from './pages/home';
import { App } from 'onekijs';

ReactDOM.render(
  <App>
    <div style={{ backgroundColor: '#EEE', padding: '10px', marginBottom: '10px' }}>
      <Link to="/">Home</Link>

      <Switch>
        <Route>
          <HomePage />
        </Route>
      </Switch>
    </div>
  </App>,
  document.getElementById('root'),
);
