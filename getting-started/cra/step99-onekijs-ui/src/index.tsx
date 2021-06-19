import { App } from 'onekijs';
import { theme } from 'onekijs-ui';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'onekijs';
import { ThemeProvider } from 'styled-components';
import AppLayout from './components/layout/AppLayout';
import Product from './pages/product';

const customTheme = {
  kind: {
    primary: '#1976d2',
  },
};

ReactDOM.render(
  <App>
    <ThemeProvider theme={theme(customTheme)}>
      <AppLayout>
        <Switch>
          <Route path="/users">
            <div>This is the user page</div>
          </Route>
          <Route>
            <Product />
          </Route>
        </Switch>
      </AppLayout>
    </ThemeProvider>
  </App>,
  document.getElementById('root'),
);
