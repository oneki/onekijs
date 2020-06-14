import { App } from 'onekijs-cra';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Link } from 'react-router-dom';
import { BasicPage } from './pages/basic';
import { WrapperPage } from './pages/wrapper';
import { InitialValuePage } from './pages/initial_value';
import { CustomComponentPage } from './pages/custom_component';
import { BindPage } from './pages/bind';
import { RulesPage } from './pages/rules';

ReactDOM.render(
  <App>
    <>
      <Link to="/">Basic</Link> | <Link to="/wrapper">Wrapper</Link> |{' '}
      <Link to="/initialvalue">Initial Value</Link> |{' '}
      <Link to="/customcomponent">Custom Components</Link> |{' '}
      <Link to="/bind">Bind</Link> |{' '}<Link to="/rules">Rules</Link>
      <Switch>
      <Route path="/rules">
          <RulesPage />
        </Route>        
        <Route path="/bind">
          <BindPage />
        </Route>
        <Route path="/customcomponent">
          <CustomComponentPage />
        </Route>
        <Route path="/initialvalue">
          <InitialValuePage />
        </Route>
        <Route path="/wrapper">
          <WrapperPage />
        </Route>
        <Route>
          <BasicPage />
        </Route>
      </Switch>
    </>
  </App>,
  document.getElementById('root')
);
