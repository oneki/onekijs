import produce from 'immer';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { AppContext } from '..';
import AppRouter from '../lib/app/AppRouter';
import { AppSettings, Location, LocationChangeCallback } from '../lib/app/typings';
import { get } from '../lib/core/utils/object';
import { toLocation, toRelativeUrl } from '../lib/core/utils/url';
import { I18n } from '../lib/i18n/typings';
import { toI18nLocation } from '../lib/i18n/utils';

export default class NextRouter extends AppRouter {
  protected listeners: LocationChangeCallback[];
  constructor() {
    super();
    this.listeners = [];
  }

  get native(): typeof Router.router | null {
    return Router.router;
  }

  deleteOrigin(): void {
    localStorage.removeItem('onekijs.from');
    localStorage.removeItem('onekijs.from_route');
  }

  getOrigin(): { from: string; fromRoute: string } {
    const from = localStorage.getItem('onekijs.from') || get(this.settings, 'routes.home', '/');
    const fromRoute = localStorage.getItem('onekijs.from_route') || get(this.settings, 'routes.home_route', from);
    return { from, fromRoute };
  }

  /**
   * url can be a string or an object.
   * If object, the format is the following
   * {
   *   url: string, // example: /users/1?test=1&test2#h=3&h2
   *   route: string, // example: /users/[id]
   *   pathname: string, // example: /users/1
   *   query: obj, // example: {test:1,test2:null}
   *   hash: obj // example: {h:3, h2:null}
   *   state: obj // example: {key1: 'value1'}
   * }
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  push(urlOrLocation: string | Location, options?: {}): void {
    return this._goto('push', urlOrLocation, options);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  replace(urlOrLocation: string | Location, options?: {}): void {
    return this._goto('replace', urlOrLocation, options);
  }

  /**
   * callback(url) where url is:
   * {
   *   url: string, // example: /users/1?test=1&test2#h=3&h2
   *   route: string, // example: /users/[id]
   *   pathname: string, // example: /users/1
   *   query: obj, // example: {test:1,test2:null}
   *   hash: obj // example: {h:3, h2:null}
   *   state: obj // example: {key1: 'value1'}
   * }
   */
  // listen(callback) {
  //   const handler = (url) => {
  //     callback(this._toLocation(url));
  //   };
  //   Router.events.on('routeChangeComplete', handler);
  //   Router.events.on('hashChangeComplete', handler);

  //   return handler;
  // }

  listen(callback: LocationChangeCallback): void {
    this.listeners.push(callback);
  }

  onLocationChange(): void {
    this.listeners.forEach((listener) => {
      listener(this.location);
    });
  }

  saveOrigin(force = true): void {
    const currentValue = localStorage.getItem('onekijs.from');
    if (!force && currentValue) return;

    let from = get(this.settings, 'routes.home', '/');
    let fromRoute = get(this.settings, 'routes.home_route', from);
    const previous = this.previousLocation;
    if (previous) {
      if (previous.relativeurl) {
        from = previous.relativeurl;
      }
      fromRoute = previous.route || from;
    }
    localStorage.setItem('onekijs.from', from);
    localStorage.setItem('onekijs.from_route', fromRoute);
  }

  sync(nextRouter: typeof Router): void {
    const pathname = nextRouter.pathname;
    const asPath = nextRouter.asPath;

    if (!pathname.includes('[') || pathname !== asPath) {
      const location = toLocation(asPath);
      if (Router.router) {
        location.route = Router.router.route;
        location.params = Router.router.query;
      }

      this._pushLocation(location);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  unlisten(handler: any): void {
    this.listeners.splice(this.listeners.indexOf(handler), 1);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  i18nLink(props: any, i18n: I18n, settings: AppSettings): JSX.Element {
    const { href, as } = props;
    let location;
    if (as) {
      location = toI18nLocation(as, { i18n, settings } as AppContext);
    } else {
      location = toI18nLocation(href, { i18n, settings } as AppContext);
    }
    const i18nAs = toRelativeUrl(location);
    const i18nHref = location.route || toRelativeUrl(location);

    return <Link {...props} as={i18nAs} href={i18nHref} />;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  _goto(type: string, urlOrLocation: string | Location, options?: {}): void {
    if (!urlOrLocation) throw new Error('URL is undefined in router.push');
    const location = toI18nLocation(urlOrLocation, {
      settings: this.settings,
      i18n: this.i18n,
    } as AppContext);

    const relativeUrl = toRelativeUrl(location);
    if (location.route) {
      (Router.router as any)[type](location.route, relativeUrl, options);
    } else {
      (Router.router as any)(relativeUrl, relativeUrl, options);
    }
  }

  // _toLocation(url) {
  //   const location = toLocation(url);
  //   location.route = Router.router.route;
  //   location.params = Router.router.query;
  //   return location;
  // }

  _pushLocation(location: Location): void {
    this.history = produce(this.history, (draft) => {
      draft.unshift(location);
      // keep max 20 items
      draft.splice(20, draft.length);
    });
  }
}
