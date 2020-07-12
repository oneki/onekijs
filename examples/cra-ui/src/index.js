import { App } from 'onekijs-cra';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Link } from 'react-router-dom';
import { ButtonPage } from './pages/button';
import { ThemeProvider } from 'styled-components';
import { theme } from 'onekijs-ui';

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
        <Link to="/">Home</Link> | <Link to="/button">Button</Link>
      </div>
      <Switch>
        <Route path="/button">
          <ButtonPage />
        </Route>
        <Route>
          <div>This is the main page</div>
        </Route>
      </Switch>
    </ThemeProvider>
  </App>,
  document.getElementById('root')
);
