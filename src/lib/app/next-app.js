import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Provider } from "react-redux";
import { AppContext, useOnekiRouter } from "../context";
import NextRouter from "../router/next-router";
import { createReduxService } from "../service";
import { createReduxStore } from "../store";
import { DefaultLoadingComponent, formatSettings } from "../utils/app";
import { isPromise } from "../utils/type";
import Router, { useRouter } from "next/router";
import { get } from "../utils/object";
import { url2locale, flattenTranslations } from "../i18n";
import { isBrowser } from "../utils/browser";
import produce from "immer";
import { getRouteMatcher } from 'next/dist/next-server/lib/router/utils/route-matcher'
import { getRouteRegex } from 'next/dist/next-server/lib/router/utils/route-regex'
import Error from 'next/error'
import { toUrl, toRelativeUrl } from "../utils/url";

const useNextRouter = useRouter || (() => null);

const useRouterSync = (onekiRouter) => {
  const nextRouter = useNextRouter();
  if (typeof window !== 'undefined') {
    onekiRouter.sync(nextRouter);
  }

  useEffect(() => {
    onekiRouter.onLocationChange();
  }, [nextRouter, onekiRouter])
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
    pageProps,
    router: nextRouter
  }) => {
    const router = useMemo(() => new NextRouter(), []);
    useRouterSync(router);

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

    const locale = useMemo(() => {
      console.log("MEMO LOCALE");
      if (!loading) {
        let locale = pageProps.locale;
        
        if (!locale && router.location) {
          console.log("localeFromLocation");
          locale = formattedSettings.i18n.localeFromLocation(router.location, formattedSettings);
        }
        if (!locale) {
          locale = get(appStore.getState(), 'i18n.locale');
          
        }
        if (!locale && isBrowser()) {
          locale = localStorage.getItem('onekijs.locale')
        }
        return locale || get(formattedSettings, 'i18n.defaultLocale');
      }
      
    }, [loading, pageProps.locale, router.location, appStore, formattedSettings]);

    const route = useMemo(() => {
      if (pageProps.routes && nextRouter.route === '/404') {

        return pageProps.routes.find(route => {
          const routeRegex = getRouteRegex(route);
          return getRouteMatcher(routeRegex)(nextRouter.asPath);
        });
      }
    }, [pageProps.routes, nextRouter.route, nextRouter.asPath])
    
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

    useEffect(() => {
      if (route) {
        Router.replace(route, toRelativeUrl(router.location, { hash: false }), { shallow: true });
      }
      
    }, [router, route])

   
    const i18n = useMemo(() => {
      console.log("build i18n", locale);
      return {
        locale,
        ns: Object.keys(pageProps.translations || {}),
        translations: flattenTranslations(pageProps.translations || {})
      }
    }, [locale, pageProps.translations])

    useMemo(() => {
      if (!loading) {
        services.forEach((service) => {
          createReduxService(store, router, formattedSettings, i18n, service);
        });
      }

    }, [loading, services, store, router, i18n, formattedSettings])

    if (loading) {
      return <LoadingComponent />;
    }

    if (nextRouter.route === '/404') {
      if (route || !router.location) return null;
      return <Error statusCode={404} />
    }

    init = true;

    const getLayout = (Component && Component.getLayout) || (page => page)



    

         

    // i18n = produce(i18n, draft => {
    //   draft.locale = locale;
    //   draft.ns = Object.keys(pageProps.translations || {});
    //   draft.translations = flattenTranslations(pageProps.translations || {});
    // });

    return (
      <AppContext.Provider value={{ router, settings: formattedSettings, i18n }}>
        <Provider store={appStore}>
          {getLayout(<Component {...pageProps}></Component>)}
        </Provider>
      </AppContext.Provider>
    );
  }
);
