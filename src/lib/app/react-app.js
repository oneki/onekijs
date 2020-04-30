import { createBrowserHistory, createHashHistory, createMemoryHistory } from "history";
import React, { useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import ReactRouter from "../router/react-router";
import { DefaultLoadingComponent, formatSettings } from "../utils/app";
import { get } from "../utils/object";
import { isPromise } from "../utils/type";
import { AppContext } from "./context";
import { createReduxService } from "./service";
import { createReduxStore } from "./store";

let init = false;
export const App = React.memo(
  ({
    settings = {},
    store,
    initialState = {},
    services = [],
    theme = {},
    LoadingComponent = DefaultLoadingComponent,
    history,
    children,
  }) => {
    const [loading, setLoading] = useState(
      isPromise(initialState) || isPromise(settings)
    );
    const [appSettings, setAppSettings] = useState(
      isPromise(settings) ? null : settings
    );
    const [appInitialState, setAppInitialState] = useState(
      isPromise(initialState) ? null : initialState
    );

    const appStore = useMemo(() => {
      if (!loading) {
        return store ? store : createReduxStore(appInitialState);
      }
    }, [loading, store, appInitialState]);

    const formattedSettings = useMemo(() => {
      return formatSettings(appSettings);
    }, [appSettings]);

    if (!loading) {
      if (!history) {
        const routerType = get(formattedSettings, 'router.type')
        switch (routerType) {
          case "browser":
            history = createBrowserHistory(formattedSettings.router);
            break;
          case "hash":
            history = createHashHistory(formattedSettings.router);
            break;
          case "memory":
            history = createMemoryHistory(formattedSettings.router);
            break;
          default:
            throw Error(`Unknown router type ${routerType}`);
        }
      }
    }

    const router = useMemo(() => {
      if (!loading) {
        return new ReactRouter(history);
      }
    }, [loading, history]);

    if (!loading) {
      services.forEach((service) => {
        createReduxService(store, router, formattedSettings, service);
      });
    }    

    useEffect(() => {
      if (!init) {
        init = true;
        // TODO call initialState and/or settings
        const promises = [{
          set: setAppSettings,
          promise: settings
        }, {
          set: setAppInitialState,
          promise: initialState
        }].filter(entry => isPromise(entry.promise))
        if (promises.length > 0) {
          Promise.all(promises.map(entry => entry.promise)).then(function(values) {
            values.forEach((v, i) => promises[i].set(v));
            setLoading(false);
          });
        }
      }
    }, [settings, initialState])
  
    if (loading) {
      return <LoadingComponent />
    }

    init = true;

    return (
      <AppContext.Provider value={{ router, settings: formattedSettings }}>
        <Provider store={appStore}>
          <Router history={history}>
            {children}
          </Router>
        </Provider>
      </AppContext.Provider>
    );
  }
);
