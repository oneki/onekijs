import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from "history";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { Router, useHistory, useLocation, useParams } from "react-router-dom";
import { AppContext } from "./context";
import { createReduxService } from "./service";
import { createReduxStore } from "./store";
import { deepFreeze, simpleMergeDeep } from "./utils/object";
import { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";

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

  let settings = props.settings;
  if (Array.isArray(props.settings)) {
    settings = Object.assign({}, props.settings[0]);
    for (let i = 1; i < props.settings.length; i++) {
      settings = simpleMergeDeep(settings, props.settings[i]);
    }
  }

  settings = deepFreeze(settings || {});

  const services = props.services || [];
  services.forEach(service => {
    createReduxService(store, router, settings, service);
  });

  let history = props.history;
  if (!history) {
    const routerSettings = settings.router || {};
    const routerType = routerSettings.type || "browser";
    switch (routerType) {
      case "browser":
        history = createBrowserHistory(routerSettings);
        break;
      case "hash":
        history = createHashHistory(routerSettings);
        break;
      case "memory":
        history = createMemoryHistory(routerSettings);
        break;
      default:
        throw Error(`Unknown router type ${routerType}`);
    }
  }

  let fallback = props.fallback || <div>Loading...</div>;

  return (
    <AppContext.Provider value={{ router, settings }}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={props.theme || {}}>
          <Provider store={store}>
            <Router history={history}>
              <RouterSync />
              <Suspense fallback={fallback}>{props.children}</Suspense>
            </Router>
          </Provider>
        </ThemeProvider>
      </StylesProvider>
    </AppContext.Provider>
  );
});
