import React from 'react';
import { History, Location as ReactRouterLocation, LocationListener, LocationState } from 'history';
import {
  AppRouter,
  LinkProps,
  Location,
  LocationChangeCallback,
  toI18nLocation,
  toLocation,
  toUrl,
  UnregisterCallback,
} from 'onekijs-core';
import { MutableRefObject } from 'react';
import Link from '../components/Link';
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
    const href = toI18nLocation(
      props.href,
      {
        settings: this.settings,
        i18n: this.i18n,
      },
      props.locale,
    );

    return <Link {...props} href={href} ref={ref} />;
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
    }
  }

  replace(urlOrLocation: string | Location): void {
    if (this.reactRouterHistory) {
      const url: string = typeof urlOrLocation === 'string' ? urlOrLocation : toUrl(urlOrLocation);
      this.reactRouterHistory.replace(url);
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
  listen(callback: LocationChangeCallback): UnregisterCallback {
    const handler: LocationListener = (reactRouterLocation) => {
      callback(this.convertLocation(reactRouterLocation));
    };
    if (this.reactRouterHistory) {
      return this.reactRouterHistory.listen(handler);
    }

    return () => {
      return;
    };
  }

  private convertLocation(reactRouterLocation: ReactRouterLocation<LocationState>): Location {
    return toLocation(`${reactRouterLocation.pathname}${reactRouterLocation.search}${reactRouterLocation.hash}`);
  }

  private pushLocation(reactRouterLocation: any): void {
    const location = this.convertLocation(reactRouterLocation);
    this.history.unshift(location);
    this.history.splice(20, this.history.length);
  }
}
