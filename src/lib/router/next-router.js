import Router from 'next/router';
import { toLocation, toUrl, toRelativeUrl } from "../utils/url";
import produce from 'immer';
import BaseRouter from './base';

export default class NextRouter extends BaseRouter {

  constructor() {
    super();
    this._listeners = [];
    // if (typeof window !== 'undefined') {
    //   const pathname = Router.router.pathname;
    //   const asPath = Router.router.asPath;
    //   if (!pathname.includes('[') || pathname !== asPath) {
    //     this._pushLocation(this._toLocation(Router.router.asPath));
    //   }

    //   const handler = (url) => {
    //     const location = this._toLocation(url);
    //     this._pushLocation(location);
    //     this._listeners.forEach(listener => {
    //       listener(location);
    //     })
    //   };
    //   Router.events.on('routeChangeComplete', handler);
    //   Router.events.on('hashChangeComplete', handler);
    // }
  }

  get native() {
    return Router.router;
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
  push(urlOrLocation, route) {
    return this._goto('push', urlOrLocation, route);
  }

  replace(urlOrLocation, route) {
    return this._goto('replace', urlOrLocation, route);
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
    this._listeners.splice(this._listeners.indexOf(callback),1);
  }

  _goto(type, urlOrLocation, route) {
    if (!urlOrLocation) throw new Error("URL is undefined in router.push");
    let location = urlOrLocation;
    if (typeof urlOrLocation === 'string') {
      location = toLocation(urlOrLocation);
      location.route = route;
    }
    if (this.settings && this.i18n.locale) {
      location = this.settings.i18n.addLocaleToLocation(this.i18n.locale, location, this.settings);
    }
    if (location.route) {
      return Router.router[type](location.route, toRelativeUrl(location));
    } else {
      return Router.router[type]( toRelativeUrl(location));
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