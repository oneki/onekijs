import { App, Link, Route, Switch } from 'onekijs';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <App>
    <div style={{ backgroundColor: '#EEE', padding: '10px', marginBottom: '10px' }}>
      <Link href="/">Home</Link> | <Link href="/users">Users</Link>
    </div>
    <Switch>
      <Route path="/users">
        <div>This is the user page</div>
      </Route>
      <Route>
        <div>
          <span>This is the main page</span>
        </div>
      </Route>
    </Switch>
  </App>,
  document.getElementById('root'),
);
