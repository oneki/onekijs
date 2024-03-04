import Router, { NextRouter as NextRouterType } from 'next/router';
import {
  BaseRouter,
  LinkProps,
  Location,
  LocationChangeCallback,
  RouterPushOptions,
  toLocation,
  toRouteUrl,
  toUrl,
  UnregisterCallback,
} from 'onekijs-framework';
import React from 'react';
import Link from '../Link';

export default class NextRouter extends BaseRouter {
  listeners: LocationChangeCallback[];

  constructor(listeners: LocationChangeCallback[]) {
    super();
    this.listeners = listeners;
  }

  get native(): NextRouterType | null {
    return Router.router;
  }

  back(delta = 1): void {
    if (typeof window !== 'undefined') {
      window.history.go(-delta);
    }
  }

  forward(delta = 1): void {
    if (typeof window !== 'undefined') {
      window.history.go(delta);
    }
  }

  get location(): Location {
    return this.history[0];
  }

  getLinkComponent(props: LinkProps): JSX.Element {
    return <Link {...props} />;
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
  push(urlOrLocation: string | Location, options: RouterPushOptions = {}): void {
    this.goto('push', urlOrLocation, options);
  }

  replace(urlOrLocation: string | Location, options: RouterPushOptions = {}): void {
    this.goto('replace', urlOrLocation, options);
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
  listen(callback: LocationChangeCallback): UnregisterCallback {
    this.listeners.push(callback);
    return () => {
      this.listeners.splice(this.listeners.indexOf(callback), 1);
    };
  }

  onLocationChange(): void {
    this.listeners.forEach((listener) => {
      listener(this.location, {
        settings: this.settings,
        i18n: this.i18n,
      });
    });
  }

  // saveOrigin(force = true) {
  //   const currentValue = sesssionStorage.getItem('onekijs.from');
  //   if (!force && currentValue) return;

  //   let from = get(this.settings, 'routes.home', '/');
  //   let fromRoute = get(this.settings, 'routes.home_route', from);
  //   const previous = this.previousLocation;
  //   if (previous) {
  //     from = previous.relativeurl;
  //     fromRoute = previous.route || from;
  //   }
  //   sesssionStorage.setItem('onekijs.from', from);
  //   sesssionStorage.setItem('onekijs.from_route', fromRoute);
  // }

  sync(nextRouter: NextRouterType): void {
    const asPath = nextRouter.asPath;
    const location = toLocation(asPath, this.settings);
    this.route = nextRouter.route;
    this.params = nextRouter.query || {};
    this._pushLocation(location);
  }

  private goto(type: 'push' | 'replace', urlOrLocation: string | Location, options: RouterPushOptions): void {
    let nextLocation: Location;
    if (typeof urlOrLocation === 'string') {
      nextLocation = toLocation(urlOrLocation, this.settings);
    } else {
      nextLocation = urlOrLocation;
    }
    //const nextLocation = toLocation(urlOrLocation, this.settings);
    // check if hostname is different.
    // If it's the case, use window.location and not next router
    if (nextLocation && this.location && nextLocation.baseurl !== this.location.baseurl) {
      const nextUrl = toUrl(nextLocation);
      type === 'push' ? window.location.assign(nextUrl) : window.location.replace(nextUrl);
    } else if (Router.router) {
      const nextUrl = toRouteUrl(nextLocation);
      type === 'push'
        ? Router.router.push(nextUrl, undefined, { locale: options?.locale })
        : Router.router.replace(nextUrl, undefined, { locale: options?.locale });
    }
  }
}
