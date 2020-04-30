import { toLocation, toUrl } from "../utils/url";
import Router from 'next/router'

export default class NextRouter {

  constructor(router) {
    this.router = router;
    if (typeof window !== 'undefined') {
      this._currentLocation = toLocation(router.asPath);
      this._previousLocation = null;
      this.listen((location) => {
        this._previousLocation = this._currentLocation;
        this._currentLocation = location;
      })
    }

  }

  get location() {
    return this._currentLocation;
  }

  get previousLocation() {
    return this._previousLocation;
  }

  get hash() {
    return this.location.hash;
  }

  get query() {
    return this.location.query;
  }

  get href() {
    return this.location.href;
  }

  get pathname() {
    return this.location.pathname;
  }

  get state() {
    return this.location.state;
  }

  get native() {
    return this.router;
  }

  sync(location, history, params) {
    
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
      const location = toLocation(url);
      location.route = this.router.route;
      callback(location);
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
      return this.router[type](url.route, routerUrl);
    } else {
      return this.router[type](routerUrl);
    }
  }
}