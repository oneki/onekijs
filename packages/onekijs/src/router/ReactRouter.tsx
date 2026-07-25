import { Location as ReactRouterLocation } from 'history';
import {
  AppSettings,
  BaseRouter,
  I18n,
  LinkProps,
  Location,
  LocationChangeCallback,
  RouterPushOptions,
  toI18nLocation,
  toLocation,
  toRelativeUrl,
  toUrl,
  UnregisterCallback,
} from 'onekijs-framework';
import React, { MutableRefObject } from 'react';
import { DataRouter, NavigateFunction, To } from 'react-router';
import Link from '../Link';

export class ReactRouter extends BaseRouter {
  listeners: LocationChangeCallback[] = [];
  navigate?: NavigateFunction;
  private dataRouter?: DataRouter;
  private currentLocation?: Location;

  override get location(): Location {
    return this.currentLocation || super.location;
  }

  back(delta = 1): void {
    if (this.dataRouter) {
      void this.dataRouter.navigate(-delta);
    } else if (this.navigate) {
      this.navigate(-delta);
    }
  }

  forward(delta = 1): void {
    if (this.dataRouter) {
      void this.dataRouter.navigate(delta);
    } else if (this.navigate) {
      this.navigate(delta);
    }
  }

  getLinkComponent(
    props: LinkProps,
    ref: ((instance: HTMLAnchorElement | null) => void) | MutableRefObject<HTMLAnchorElement | null> | null,
  ): React.JSX.Element {
    return <Link {...props} ref={ref} />;
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
  push(urlOrLocation: string | Location, options?: RouterPushOptions): void {
    this.goTo(urlOrLocation, 'push', options);
  }

  replace(urlOrLocation: string | Location, options?: RouterPushOptions): void {
    this.goTo(urlOrLocation, 'replace', options);
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

  sync(location: ReactRouterLocation, navigate: NavigateFunction, i18n: I18n, settings: AppSettings): void {
    this.dataRouter = undefined;
    this.navigate = navigate;
    this.i18n = i18n;
    this.settings = settings;
    this.pushLocation(location);
  }

  /** Connects Oneki navigation to a React Router data router. */
  syncDataRouter(dataRouter: DataRouter, location: ReactRouterLocation, i18n: I18n, settings: AppSettings): boolean {
    this.dataRouter = dataRouter;
    this.navigate = undefined;
    this.i18n = i18n;
    this.settings = settings;
    return this.pushLocation(location);
  }

  private convertLocation(reactRouterLocation: ReactRouterLocation): Location {
    const location = toLocation(
      `${reactRouterLocation.pathname}${reactRouterLocation.search}${reactRouterLocation.hash}`,
      this.settings,
    );
    if (typeof reactRouterLocation.state === 'object' && reactRouterLocation.state !== null) {
      location.state = reactRouterLocation.state as Location['state'];
    }
    return location;
  }

  private pushLocation(reactRouterLocation: ReactRouterLocation): boolean {
    const location = this.convertLocation(reactRouterLocation);
    if (this.currentLocation && this.currentLocation.relativeurl === location.relativeurl) {
      this.currentLocation = location;
      return false;
    }
    this.currentLocation = location;
    this._pushLocation(location);
    return true;
  }

  private goTo(urlOrLocation: string | Location, type: 'push' | 'replace', options?: RouterPushOptions): void {
    const nextLocation = toI18nLocation(urlOrLocation, this.settings, this.i18n, options?.locale);
    if (options && options.state) {
      nextLocation.state = options.state;
    }
    // check if hostname is different.
    // If it's the case, use window.location and not react router
    if (nextLocation && this.location && nextLocation.baseurl !== this.location.baseurl) {
      const nextUrl = toUrl(nextLocation);
      type === 'push' ? window.location.assign(nextUrl) : window.location.replace(nextUrl);
    } else if (this.dataRouter) {
      const nextUrl = toRelativeUrl(nextLocation);
      void this.dataRouter.navigate(nextUrl as To, { replace: type === 'replace' });
    } else if (this.navigate) {
      const nextUrl = toRelativeUrl(nextLocation);
      this.navigate(nextUrl, { replace: type === 'replace' });
    }
  }
}
