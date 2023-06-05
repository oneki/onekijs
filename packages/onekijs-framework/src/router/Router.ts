import produce from 'immer';
import { MutableRefObject } from 'react';
import { AppSettings } from '../types/app';
import { I18n } from '../types/i18n';
import { AnonymousObject } from '../types/object';
import {
  LinkProps,
  Location,
  LocationChangeCallback,
  ParsedQuery,
  Router,
  RouterPushOptions,
  UnregisterCallback,
} from '../types/router';
import { get } from '../utils/object';
import { toLocation } from './utils';

export default abstract class BaseRouter implements Router {
  settings: AppSettings = {};
  i18n: I18n = {};
  history: Location[];
  params: AnonymousObject = {};
  route?: string;

  constructor() {
    this.history = [];
  }

  get location(): Location {
    return toLocation(window.location.href, this.settings);
  }

  get previousLocation(): Location {
    return this.history[this.history.length - 2];
  }

  get hash(): ParsedQuery<string> | null | undefined {
    return this.location ? this.location.hash : null;
  }

  get query(): ParsedQuery<string> | null | undefined {
    return this.location ? this.location.query : null;
  }

  get href(): string | null | undefined {
    return this.location ? this.location.href : null;
  }

  get pathname(): string | null {
    return this.location ? this.location.pathname : null;
  }

  get state(): AnonymousObject | null | undefined {
    return this.location ? this.location.state : null;
  }

  abstract back(delta?: number): void;

  deleteOrigin(): void {
    localStorage.removeItem('onekijs.from');
  }

  abstract forward(delta?: number): void;

  abstract getLinkComponent(
    props: LinkProps,
    ref: ((instance: HTMLAnchorElement | null) => void) | MutableRefObject<HTMLAnchorElement | null> | null,
  ): JSX.Element;

  getOrigin(): { from: string } {
    const from = localStorage.getItem('onekijs.from') || get(this.settings, 'routes.home', '/');
    return { from };
  }

  init(settings: AppSettings): void {
    this.settings = settings;
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
  abstract listen(callback: LocationChangeCallback): UnregisterCallback;

  /**
   * url can be a string or a location.
   * If location, the format is the following
   * {
   *   url: string, // example: /users/1?test=1&test2#h=3&h2
   *   route: string, // example: /users/[id]
   *   pathname: string, // example: /users/1
   *   query: obj, // example: {test:1,test2:null}
   *   hash: obj // example: {h:3, h2:null}
   *   state: obj // example: {key1: 'value1'}
   * }
   */
  abstract push(urlOrLocation: string | Location, options?: RouterPushOptions): void;

  abstract replace(urlOrLocation: string | Location, options?: RouterPushOptions): void;

  saveOrigin(force = true): void {
    const currentValue = localStorage.getItem('onekijs.from');
    if (!force && currentValue) return;

    let from = get(this.settings, 'routes.home', '/');

    const previous = this.history.find((location) => {
      return location.relativeurl && location.relativeurl !== this.history[0].relativeurl;
    });

    if (previous && previous.relativeurl) {
      from = previous.relativeurl;
    }

    localStorage.setItem('onekijs.from', from);
  }

  _pushLocation(location: Location, replace = false): void {
    this.history = produce(this.history, (draft) => {
      if (replace) {
        draft[0] = location;
      } else {
        draft.unshift(location);
        // keep max 20 items
        draft.splice(20, draft.length);
      }
    });
  }
}
