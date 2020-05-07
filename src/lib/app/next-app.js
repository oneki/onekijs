import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Provider } from "react-redux";
import { AppContext, useOnekiRouter } from "../context";
import NextRouter from "../router/next-router";
import { createReduxService } from "../service";
import { createReduxStore } from "../store";
import { DefaultLoadingComponent, formatSettings } from "../utils/app";
import { isPromise } from "../utils/type";
import { useRouter } from "next/router";

const useNextRouter = useRouter || (() => null);
console.log("useNextrouter", useNextRouter);

const RouterSync = () => {
  const nextRouter = useNextRouter();
  console.log("nextRouter", nextRouter);
  const onekiRouter = useOnekiRouter();
  if (typeof window !== 'undefined') {
    onekiRouter.sync(nextRouter);
  }

  useEffect(() => {
    onekiRouter.onLocationChange();
  }, [nextRouter, onekiRouter])


  return null;
}

let init = false;
export const NextApp = React.memo(
  ({
    settings = {},
    store,
    initialState = {},
    services = [],
    theme = {},
    LoadingComponent = DefaultLoadingComponent,
    children,
    Component, 
    pageProps
  }) => {
    const router = useMemo(() => new NextRouter(), []);
    // const [, setInitialLocation] = useState(router.location);

    // const listener = useCallback((location) => {
    //     setInitialLocation(location);
    //     router.unlisten(listener);
    //   },[router]
    // )

    // if (!router.location) {
    //   router.listen(listener);
    // }

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
      services.forEach((service) => {
        createReduxService(store, router, formattedSettings, service);
      });
    }

    useEffect(() => {
      if (!init) {
        init = true;
        // TODO call initialState and/or settings
        const promises = [
          {
            set: setAppSettings,
            promise: settings,
          },
          {
            set: setAppInitialState,
            promise: initialState,
          },
        ].filter((entry) => isPromise(entry.promise));
        if (promises.length > 0) {
          Promise.all(promises.map((entry) => entry.promise)).then(function (
            values
          ) {
            values.forEach((v, i) => promises[i].set(v));
            setLoading(false);
          });
        }
      }
    }, [settings, initialState]);

    if (loading) {
      return <LoadingComponent />;
    }

    init = true;

    const getLayout = (Component && Component.getLayout) || (page => page)

    return (
      <AppContext.Provider value={{ router, settings: formattedSettings }}>
        <Provider store={appStore}>
          <>
            <RouterSync />
            {getLayout(<Component {...pageProps}></Component>)}
          </>
        </Provider>
      </AppContext.Provider>
    );
  }
);
