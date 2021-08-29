import { theme } from 'onekijs-ui';
import { App } from 'onekijs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AjaxListPage } from './pages/ajaxList';
import { ButtonPage } from './pages/button';
import { TablePage } from './pages/table';
import { InputPage } from './pages/input';
import { ListPage } from './pages/list';
import { SelectPage } from './pages/select';
import "@fontsource/roboto";

const customTheme = {};

ReactDOM.render(
  <App>
    <ThemeProvider theme={theme(customTheme)}>
      <div style={{
        fontFamily: 'Roboto',
      }}>
        <div
          style={{
            backgroundColor: '#EEE',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <Link to="/">Home</Link> | <Link to="/button">Button</Link> | <Link to="/select">Select</Link> |{' '}
          <Link to="/list">List</Link> | <Link to="/ajaxList">Ajax List</Link> | <Link to="/table">Table</Link> |{' '}
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
          <Route path="/table">
            <TablePage />
          </Route>
          <Route path="/input">
            <InputPage />
          </Route>
          <Route>
            <div>This is the main page</div>
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  </App>,
  document.getElementById('root'),
);
