import { ParsedQuery } from 'query-string';
import { get } from '../core/utils/object';
import { I18n } from '../i18n/typings';
import { AppSettings, Location } from './typings';

export default abstract class AppRouter {
  settings: AppSettings = {};
  i18n: I18n = {};
  history: Location[];

  constructor() {
    this.history = [];
  }

  get location(): Location {
    return this.history[0];
  }

  get previousLocation(): Location {
    return this.history[1];
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

  get state(): string | null | undefined {
    return this.location ? this.location.state : null;
  }

  deleteOrigin(): void {
    localStorage.removeItem('onekijs.from');
  }

  getOrigin(): { from: string } {
    const from = localStorage.getItem('onekijs.from') || get<string>(this.settings, 'routes.home', '/');
    return { from };
  }

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
  abstract push(urlOrLocation: string | Location): void;

  abstract replace(urlOrLocation: string | Location): void;

  saveOrigin(force = true): void {
    const currentValue = localStorage.getItem('onekijs.from');
    if (!force && currentValue) return;

    let from = get(this.settings, 'routes.home', '/');
    const previous = this.previousLocation;
    if (previous && previous.relativeurl) {
      from = previous.relativeurl;
    }

    localStorage.setItem('onekijs.from', from);
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
  abstract listen(callback: (location: Location) => void): any;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  abstract unlisten(handler: any): void;
}
