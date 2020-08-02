import { App } from 'onekijs-cra';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import { UserForm } from './components/UserForm';

ReactDOM.render(
  <App>
    <div style={{ backgroundColor: '#EEE', padding: '10px', marginBottom: '10px' }}>
      <Link to="/">Home</Link> | <Link to="/users">Users</Link>
    </div>
    <Switch>
      <Route path="/users">
        <div>This is the user page</div>
      </Route>
      <Route>
        <div>
          <span>This is the main page</span>
          <UserForm />
        </div>
      </Route>
    </Switch>
  </App>,
  document.getElementById('root'),
);
