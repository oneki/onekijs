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
import { NavigateFunction } from 'react-router';
import Link from '../Link';

export class ReactRouter extends BaseRouter {
  listeners: LocationChangeCallback[] = [];
  navigate?: NavigateFunction;

  back(delta = 1): void {
    if (this.navigate) {
      this.navigate(-delta);
    }
  }

  forward(delta = 1): void {
    if (this.navigate) {
      this.navigate(delta);
    }
  }

  getLinkComponent(
    props: LinkProps,
    ref: ((instance: HTMLAnchorElement | null) => void) | MutableRefObject<HTMLAnchorElement | null> | null,
  ): JSX.Element {
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
    this.navigate = navigate;
    this.pushLocation(location);
    this.i18n = i18n;
    this.settings = settings;
  }

  private convertLocation(reactRouterLocation: ReactRouterLocation): Location {
    return toLocation(
      `${reactRouterLocation.pathname}${reactRouterLocation.search}${reactRouterLocation.hash}`,
      this.settings,
    );
  }

  private pushLocation(reactRouterLocation: ReactRouterLocation): void {
    const location = this.convertLocation(reactRouterLocation);
    this.history.unshift(location);
    this.history.splice(20, this.history.length);
  }

  private goTo(urlOrLocation: string | Location, type: 'push' | 'replace', options?: RouterPushOptions): void {
    const nextLocation = toI18nLocation(urlOrLocation, this.settings, this.i18n, options?.locale);
    // check if hostname is different.
    // If it's the case, use window.location and not react router
    if (nextLocation && this.location && nextLocation.baseurl !== this.location.baseurl) {
      const nextUrl = toUrl(nextLocation);
      type === 'push' ? window.location.assign(nextUrl) : window.location.replace(nextUrl);
    } else if (this.navigate) {
      const nextUrl = toRelativeUrl(nextLocation);
      this.navigate(nextUrl, { replace: type === 'replace' });
    }
  }
}
