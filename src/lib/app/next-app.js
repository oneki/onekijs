import React, { useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";
import { AppContext } from "../context";
import NextRouter from "../router/next-router";
import { createReduxService } from "../service";
import { createReduxStore } from "../store";
import { isPromise } from "../utils/type";
import { formatSettings, DefaultLoadingComponent } from "../utils/app";


let init = false;
export const NextApp = React.memo(({settings={}, store, initialState={}, services=[], theme={}, LoadingComponent=DefaultLoadingComponent, children}) => {

  const [loading, setLoading] = useState(isPromise(initialState) || isPromise(settings));
  const [appSettings, setAppSettings] = useState(isPromise(settings) ? null : settings);
  const [appInitialState, setAppInitialState] = useState(isPromise(initialState) ? null : initialState);

  const appStore = useMemo(() => {
    if (!loading) {
      return store ? store : createReduxStore(appInitialState);
    }
  }, [loading, store, appInitialState]);

  const router = useMemo(() => {
    return new NextRouter()
  }, []);

  const formattedSettings = useMemo(() => {
    return formatSettings(appSettings);
  }, [appSettings]);

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
        {children}
      </Provider>
    </AppContext.Provider>
  );
});