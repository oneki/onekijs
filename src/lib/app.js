import { StylesProvider } from "@material-ui/core/styles";
import Router from 'next/router';
import React, { useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { AppContext } from "./context";
import { createReduxService } from "./service";
import { createReduxStore } from "./store";
import { simpleMergeDeep } from "./utils/object";
import { isPromise } from "./utils/type";

const router = {};

// const RouterSync = React.memo(() => {
//   router.location = useLocation();
//   router.history = useHistory();
//   router.params = useParams();
// });

const formatSettings = (settings) => {
  let result = settings;
  if (Array.isArray(settings)) {
    result = Object.assign({}, settings[0]);
    for (let i = 1; i < settings.length; i++) {
      result = simpleMergeDeep(result, settings[i]);
    }
  }
  // return deepFreeze(settings || {});
  return result;
}

let init = false;

export const App = React.memo(({settings={}, store, initialState={}, services=[], theme={}, children}) => {

  const [loading, setLoading] = useState(isPromise(initialState) || isPromise(settings));
  const [appSettings, setAppSettings] = useState(isPromise(settings) ? null : settings);
  const [appInitialState, setAppInitialState] = useState(isPromise(initialState) ? null : initialState);

  const appStore = useMemo(() => {
    if (!loading) {
      return store ? store : createReduxStore(appInitialState);
    }
  }, [loading, store, appInitialState]);

  let formattedSettings;
  if (!loading) {
    formattedSettings = formatSettings(appSettings);
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
      Promise.all(promises.map(entry => entry.promise)).then(function(values) {

        values.forEach((v, i) => promises[i].set(v));
        setLoading(false);
      });
    }
  }, [settings, initialState])

  if (loading) {
    return (
      <div>
        LOADING ...
      </div>
    )
  }

  init = true;

  return (
    <AppContext.Provider value={{ router: Router, settings: formattedSettings }}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Provider store={appStore}>
            {/* <RouterSync /> */}
            {children}
          </Provider>
        </ThemeProvider>
      </StylesProvider>
    </AppContext.Provider>
  );
});
