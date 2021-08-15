import { App, createReduxStore, useGlobalProp, useGlobalService } from 'onekijs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import LoadingService from './LoadingService';
import settings from './settings';

// Example of a Redux store created manually
// The store must be created via createReduxStore from Oneki.js
const initialState = {};
const store = createReduxStore(initialState, [createSagaMiddleware()]);

// The <Main /> component can call the global service
// defined in src/LoadingService.ts
const Main = () => {
  const service = useGlobalService(LoadingService);
  const loading = useGlobalProp('loading');
  return <button onClick={() => service.load(1000)}>{loading ? 'Loading ...' : 'Click me'}</button>;
};

const LoadingComponent = () => {
  return <div>Loading ...</div>;
};

ReactDOM.render(
  <App settings={settings} store={store} services={[LoadingService]} LoadingComponent={LoadingComponent}>
    <div style={{ backgroundColor: '#EEE', padding: '10px', marginBottom: '10px' }}>
      <Link to="/">Home</Link> | <Link to="/users">Users</Link>
    </div>
    <Switch>
      <Route path="/users">
        <div>This is the user page</div>
      </Route>
      <Route>
        <Main />
      </Route>
    </Switch>
  </App>,
  document.getElementById('root'),
);
