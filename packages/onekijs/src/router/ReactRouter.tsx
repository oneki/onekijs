import { toI18nLocation } from '@oneki/i18n';
import { BaseRouter, toLocation, toRelativeUrl, toUrl } from '@oneki/router';
import {
  AppSettings,
  LinkProps,
  Location,
  LocationChangeCallback,
  RouterPushOptions,
  UnregisterCallback,
} from '@oneki/types';
import { History, Location as ReactRouterLocation, LocationListener, LocationState } from 'history';
import React, { MutableRefObject } from 'react';
import Link from '../components/Link';

export class ReactRouter extends BaseRouter {
  protected reactRouterHistory?: History<LocationState>;

  constructor(history?: History<LocationState>) {
    super();
    if (history) {
      this.reactRouterHistory = history;
      this.reactRouterHistory.listen((reactRouterLocation: any) => {
        this.pushLocation(reactRouterLocation);
      });
    }
  }

  back(delta = 1): void {
    if (this.reactRouterHistory) {
      this.reactRouterHistory.go(-delta);
    }
  }

  forward(delta = 1): void {
    if (this.reactRouterHistory) {
      this.reactRouterHistory.go(delta);
    }
  }

  getLinkComponent(
    props: LinkProps,
    ref: ((instance: HTMLAnchorElement | null) => void) | MutableRefObject<HTMLAnchorElement | null> | null,
  ): JSX.Element {
    return <Link {...props} ref={ref} />;
  }

  init(settings: AppSettings): void {
    super.init(settings);
    if (this.reactRouterHistory && this.history.length === 0) {
      this.pushLocation(this.reactRouterHistory.location);
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
    const handler: LocationListener = (reactRouterLocation) => {
      callback(this.convertLocation(reactRouterLocation), {
        settings: this.settings,
        i18n: this.i18n,
      });
    };
    if (this.reactRouterHistory) {
      return this.reactRouterHistory.listen(handler);
    }

    return () => {
      return;
    };
  }

  private convertLocation(reactRouterLocation: ReactRouterLocation<LocationState>): Location {
    return toLocation(
      `${reactRouterLocation.pathname}${reactRouterLocation.search}${reactRouterLocation.hash}`,
      this.settings,
    );
  }

  private pushLocation(reactRouterLocation: any): void {
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
    } else if (this.reactRouterHistory) {
      const nextUrl = toRelativeUrl(nextLocation);
      type === 'push' ? this.reactRouterHistory.push(nextUrl) : this.reactRouterHistory.replace(nextUrl);
    }
  }
}
