import { createBrowserHistory, createHashHistory, createMemoryHistory } from 'history';
import React, { Suspense } from 'react';
import { Provider } from "react-redux";
import { Router, useHistory, useLocation, useParams } from "react-router-dom";
import { AppContext } from './context';
import { createReduxService } from './redux';
import { createReduxStore } from './store';
import { deepFreeze } from './utils/object';

const router = {};

const RouterSync = React.memo(() => {
  router.location = useLocation();
  router.history = useHistory();
  router.params = useParams();
});

export const App = React.memo(props => {
  let store = props.store;
  if (!store) {
    store = createReduxStore(props.initialState || {});
  }

  const settings = deepFreeze(props.settings || {});

  const services = props.services || [];
  services.forEach(service => {
    createReduxService(store, router, settings, service);
  })

  let history = props.history;
  if (!history) {
    const routerSettings = settings.router || {};
    const routerType = routerSettings.type || 'browser' ;
    switch(routerType) {
      case 'browser':
        history = createBrowserHistory(routerSettings);
        break;
      case 'hash':
        history = createHashHistory(routerSettings);
        break;
      case 'memory':
        history = createMemoryHistory(routerSettings);    
        break;
      default:
        throw Error(`Unknown router type ${routerType}`)
    }
  }

  let fallback = props.fallback || (<div>Loading...</div>)


  return (
    <AppContext.Provider value={{router, settings}}>
      <Provider store={store}>
        <Router history={history}>
          <RouterSync />
          <Suspense fallback={fallback}>
            {props.children}
          </Suspense>
        </Router>
      </Provider>
    </AppContext.Provider>
  );
});
