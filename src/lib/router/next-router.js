import Router from 'next/router';
import { toLocation, toUrl } from "../utils/url";
import produce from 'immer';
import BaseRouter from './base';

export default class NextRouter extends BaseRouter {

  constructor() {
    super();
    if (typeof window !== 'undefined') {
      const pathname = Router.router.pathname;
      if (!pathname.includes('[')) {
        this._pushLocation(this._toLocation(Router.router.asPath));
      }
      this.listen((location) => {
        this._pushLocation(location);
      })
    }
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
  push(url) {
    return this._goto(url, 'push');
  }

  replace(url) {
    return this._goto(url, 'replace');
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
  listen(callback) {
    const handler = (url) => {
      callback(this._toLocation(url));
    };
    Router.events.on('routeChangeStart', handler);
    Router.events.on('hashChangeStart', handler);

    return handler;
  }

  unlisten(handler) {
    Router.events.off('routeChangeStart', handler);
    Router.events.off('hashChangeStart', handler);
  }

  _goto(url, type) {
    if (!url) throw new Error("URL is undefined in router.push");
    
    let routerUrl = toUrl(url);
    
    if (url.route) {
      return Router.router[type](url.route, routerUrl);
    } else {
      return Router.router[type](routerUrl);
    }
  }

  _toLocation(url) {
    const location = toLocation(url);
    location.route = Router.router.route;
    location.params = Router.router.query;
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