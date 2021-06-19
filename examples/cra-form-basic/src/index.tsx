import { App, Link, Route, Switch } from 'onekijs';
import React from 'react';
import ReactDOM from 'react-dom';
import { ArrayPage } from './pages/array';
import { BasicPage } from './pages/basic';
import { BindPage } from './pages/bind';
import { ComplexValidatorPage } from './pages/complex_validator';
import { ContainerPage } from './pages/container';
import { CustomComponentPage } from './pages/custom_component';
import { FieldPage } from './pages/field';
import { InitialValuePage } from './pages/initial_value';
import { RulesPage } from './pages/rules';
import { ValidatorPage } from './pages/validator';
import { WrapperPage } from './pages/wrapper';

ReactDOM.render(
  <App>
    <>
      <Link href="/">Basic</Link> | <Link href="/field">Field</Link> | <Link href="/wrapper">Wrapper</Link> |{' '}
      <Link href="/validator">Simple Validation</Link> | <Link href="/complex_validator">Complex Validation</Link> |{' '}
      <Link href="/customcomponent">Custom Components</Link> | <Link href="/initialvalue">Initial Value</Link> |{' '}
      <Link href="/bind">Bind</Link> | <Link href="/rules">Rules</Link> | <Link href="/container">Container</Link> |{' '}
      <Link href="/array">Array</Link>
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
  document.getElementById('root'),
);
