import { theme } from 'onekijs';
import { App } from 'onekijs/cra';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AjaxListPage } from './pages/ajaxList';
import { ButtonPage } from './pages/button';
import { GridPage } from './pages/grid';
import { InputPage } from './pages/input';
import { ListPage } from './pages/list';
import { SelectPage } from './pages/select';

const customTheme = {};

ReactDOM.render(
  <App>
    <ThemeProvider theme={theme(customTheme)}>
      <div
        style={{
          backgroundColor: '#EEE',
          padding: '10px',
          marginBottom: '10px',
        }}
      >
        <Link to="/">Home</Link> | <Link to="/button">Button</Link> | <Link to="/select">Select</Link> |{' '}
        <Link to="/list">List</Link> | <Link to="/ajaxList">Ajax List</Link> | <Link to="/grid">Grid</Link> |{' '}
        <Link to="/input">Input</Link>
      </div>
      <Switch>
        <Route path="/button">
          <ButtonPage />
        </Route>
        <Route path="/select">
          <SelectPage />
        </Route>
        <Route path="/list">
          <ListPage />
        </Route>
        <Route path="/ajaxList">
          <AjaxListPage />
        </Route>
        <Route path="/grid">
          <GridPage />
        </Route>
        <Route path="/input">
          <InputPage />
        </Route>
        <Route>
          <div>This is the main page</div>
        </Route>
      </Switch>
    </ThemeProvider>
  </App>,
  document.getElementById('root'),
);
