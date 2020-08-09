import { theme } from 'onekijs-ui';
import ReactDOM from 'react-dom';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { App } from 'onekijs-cra';
import { ButtonPage } from './pages/button';
import { SelectPage } from './pages/select';
import { ListPage } from './pages/list';
import { AjaxListPage } from './pages/ajaxList';

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
        <Link to="/">Home</Link> | <Link to="/button">Button</Link> | <Link to="/select">Select</Link> | <Link to="/list">List</Link>| <Link to="/ajaxList">Ajax List</Link>
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
        <Route>
          <div>This is the main page</div>
        </Route>
      </Switch>
    </ThemeProvider>
  </App>,
  document.getElementById('root'),
);
