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
import { FieldPage } from './pages/field';
import { ValidatorPage } from './pages/validator';
import { ComplexValidatorPage } from './pages/complex_validator';
import { ContainerPage } from './pages/container';
import { ArrayPage } from './pages/array';

ReactDOM.render(
  <App>
    <>
      <Link to="/">Basic</Link> | <Link to="/field">Field</Link> |{' '}
      <Link to="/wrapper">Wrapper</Link> |{' '}
      <Link to="/validator">Simple Validation</Link> |{' '}
      <Link to="/complex_validator">Complex Validation</Link> |{' '}
      <Link to="/customcomponent">Custom Components</Link> |{' '}
      <Link to="/initialvalue">Initial Value</Link> |{' '}
      <Link to="/bind">Bind</Link> | <Link to="/rules">Rules</Link> |{' '}
      <Link to="/container">Container</Link> | <Link to="/array">Array</Link>
      <Switch>
      <Route path="/array">
          <ArrayPage />
        </Route>        
        <Route path="/container">
          <ContainerPage />
        </Route>
        <Route path="/complex_validator">
          <ComplexValidatorPage />
        </Route>
        <Route path="/validator">
          <ValidatorPage />
        </Route>
        <Route path="/field">
          <FieldPage />
        </Route>
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