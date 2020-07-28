import { theme } from 'onekijs-ui';
import ReactDOM from 'react-dom';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { App } from 'onekijs';
import { ButtonPage } from './pages/button';

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
  document.getElementById('root'),
);
