import produce from 'immer';
import Link from 'next/link';
import Router from 'next/router';
import {
  BaseRouter,
  get,
  toI18nLocation,
  toLocation,
  toRelativeUrl,
} from 'onekijs-core';
import React from 'react';

export default class NextRouter extends BaseRouter {
  constructor() {
    super();
    this._listeners = [];
  }

  get native() {
    return Router.router;
  }

  deleteOrigin() {
    localStorage.removeItem('onekijs.from');
    localStorage.removeItem('onekijs.from_route');
  }

  getOrigin() {
    const from =
      localStorage.getItem('onekijs.from') ||
      get(this.settings, 'routes.home', '/');
    const fromRoute =
      localStorage.getItem('onekijs.from_route') ||
      get(this.settings, 'routes.home_route', from);
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
  push(urlOrLocation, route, options) {
    return this._goto('push', urlOrLocation, route, options);
  }

  replace(urlOrLocation, route, options) {
    return this._goto('replace', urlOrLocation, route, options);
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

  listen(callback) {
    this._listeners.push(callback);
  }

  onLocationChange() {
    this._listeners.forEach(listener => {
      listener(this.location);
    });
  }

  saveOrigin(force = true) {
    const currentValue = localStorage.getItem('onekijs.from');
    if (!force && currentValue) return;

    let from = get(this.settings, 'routes.home', '/');
    let fromRoute = get(this.settings, 'routes.home_route', from);
    const previous = this.previousLocation;
    if (previous) {
      from = previous.relativeurl;
      fromRoute = previous.route || from;
    }
    localStorage.setItem('onekijs.from', from);
    localStorage.setItem('onekijs.from_route', fromRoute);
  }

  sync(nextRouter) {
    const pathname = nextRouter.pathname;
    const asPath = nextRouter.asPath;

    if (!pathname.includes('[') || pathname !== asPath) {
      const location = toLocation(asPath);
      location.route = Router.router.route;
      location.params = Router.router.query;
      this._pushLocation(location);
    }
  }

  unlisten(callback) {
    this._listeners.splice(this._listeners.indexOf(callback), 1);
  }

  i18nLink(props, i18n, settings) {
    const { href, as } = props;
    let location;
    if (as) {
      location = toI18nLocation(as, { i18n, settings }, href);
    } else {
      location = toI18nLocation(href, { i18n, settings });
    }
    const i18nAs = toRelativeUrl(location);
    const i18nHref = location.route || toRelativeUrl(location);

    return <Link {...props} as={i18nAs} href={i18nHref} />;
  }

  _goto(type, urlOrLocation, route, options) {
    if (!urlOrLocation) throw new Error('URL is undefined in router.push');
    const location = toI18nLocation(
      urlOrLocation,
      {
        settings: this.settings,
        i18n: this.i18n,
      },
      route
    );

    const relativeUrl = toRelativeUrl(location);
    if (location.route) {
      return Router.router[type](location.route, relativeUrl, options);
    } else {
      return Router.router[type](relativeUrl, relativeUrl, options);
    }
  }

  _toLocation(url) {
    const location = toLocation(url);
    location.route = Router.router.route;
    location.params = Router.router.query;
    return location;
  }

  _pushLocation(location) {
    this._location = location;
    this.history = produce(this.history, draft => {
      draft.unshift(location);
      // keep max 20 items
      draft.splice(20, draft.length);
    });
  }
}
