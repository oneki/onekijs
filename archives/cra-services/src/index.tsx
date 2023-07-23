import React from 'react';
import ReactDOM from 'react-dom';
import { HomePage } from './pages/home';
import { App, Route, Switch, Link } from 'onekijs';

ReactDOM.render(
  <App>
    <div style={{ backgroundColor: '#EEE', padding: '10px', marginBottom: '10px' }}>
      <Link href="/">Home</Link>

      <Switch>
        <Route>
          <HomePage />
        </Route>
      </Switch>
    </div>
  </App>,
  document.getElementById('root'),
);
