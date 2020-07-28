import { BaseRouter, toLocation } from 'onekijs-core';
import produce from 'immer';

export default class ReactRouter extends BaseRouter {
  constructor(history) {
    super();
    this._reactRouterHistory = history;
    this._pushLocation(history.location);
    history.listen((reactRouterLocation) => {
      this._pushLocation(reactRouterLocation);
    });
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
    return this._reactRouterHistory.push(url);
  }

  replace(url) {
    return this._reactRouterHistory.replace(url);
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
    const handler = (reactRouterLocation) => {
      callback(this._convertLocation(reactRouterLocation));
    };
    this._reactRouterHistory.listen(handler);

    return handler;
  }

  unlisten(handler) {
    this._reactRouterHistory.unlisten(handler);
  }

  _convertLocation(reactRouterLocation) {
    return toLocation(`${reactRouterLocation.pathname}${reactRouterLocation.search}${reactRouterLocation.hash}`);
  }

  _pushLocation(reactRouterLocation) {
    const location = this._convertLocation(reactRouterLocation);
    this.history = produce(this.history, (draft) => {
      draft.unshift(location);
      // keep max 20 items
      draft.splice(20, draft.length);
    });
  }
}
