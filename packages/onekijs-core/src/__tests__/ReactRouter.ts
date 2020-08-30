import { History, Location as ReactRouterLocation, LocationListener, LocationState } from 'history';
import produce from 'immer';
import AppRouter from '../app/AppRouter';
import { Location, LocationChangeCallback } from '../app/typings';
import { toUrl, toLocation } from '../core/utils/url';

// import AppRouter from '../lib/app/AppRouter';
// import { Location, LocationChangeCallback } from '../lib/app/typings';
// import { toLocation, toUrl } from '../lib/core/utils/url';

export class ReactRouter extends AppRouter {
  protected reactRouterHistory?: History<LocationState>;

  constructor(history?: History<LocationState>) {
    super();
    if (history) {
      this.reactRouterHistory = history;
      this.pushLocation(history.location);
      history.listen((reactRouterLocation: any) => {
        this.pushLocation(reactRouterLocation);
      });
    }
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
  push(urlOrLocation: string | Location): void {
    if (this.reactRouterHistory) {
      const url: string = typeof urlOrLocation === 'string' ? urlOrLocation : toUrl(urlOrLocation);
      this.reactRouterHistory.push(url);
      window.location.href = url;
    }
  }

  replace(urlOrLocation: string | Location): void {
    if (this.reactRouterHistory) {
      const url: string = typeof urlOrLocation === 'string' ? urlOrLocation : toUrl(urlOrLocation);
      this.reactRouterHistory.replace(url);
      window.location.href = url;
    }
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
  listen(callback: LocationChangeCallback): LocationListener {
    const handler: LocationListener = (reactRouterLocation) => {
      callback(this.convertLocation(reactRouterLocation));
    };
    if (this.reactRouterHistory) {
      this.reactRouterHistory.listen(handler);
    }

    return handler;
  }

  unlisten(handler: LocationListener): void {
    if (this.reactRouterHistory) {
      // this.reactRouterHistory.unlisten(handler);
      console.log('TODO unlisten handler', handler);
    }
  }

  private convertLocation(reactRouterLocation: ReactRouterLocation<LocationState>): Location {
    return toLocation(`${reactRouterLocation.pathname}${reactRouterLocation.search}${reactRouterLocation.hash}`);
  }

  private pushLocation(reactRouterLocation: any): void {
    const location = this.convertLocation(reactRouterLocation);
    this.history = produce(this.history, (draft: any[]) => {
      draft.unshift(location);
      // keep max 20 items
      draft.splice(20, draft.length);
    });
  }
}
