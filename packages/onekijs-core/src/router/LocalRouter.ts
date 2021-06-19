import { toLocation } from './utils';
import Router from './Router';
import { Location, LocationChangeCallback, UnregisterCallback } from '../typings/router';

let uid = 0;
export default class LocalRouter extends Router {
  listeners: {
    [x: string]: LocationChangeCallback;
  };
  constructor() {
    super();
    this.listeners = {};
    this.replace({ pathname: '' });
  }

  back(): void {
    throw new Error('Method not implemented.');
  }
  forward(): void {
    throw new Error('Method not implemented.');
  }

  getLinkComponent(): JSX.Element {
    throw new Error('Method not implemented.');
  }

  push(urlOrLocation: string | Location): void {
    this._pushOrReplace(urlOrLocation, false);
  }

  replace(urlOrLocation: string | Location): void {
    this._pushOrReplace(urlOrLocation, true);
  }

  listen(callback: LocationChangeCallback): UnregisterCallback {
    const id = `listener-${++uid}`;
    this.listeners[id] = callback;
    return () => delete this.listeners[id];
  }

  _pushOrReplace(urlOrLocation: string | Location, replace: boolean): void {
    let location: Location;
    if (typeof urlOrLocation === 'string') {
      location = toLocation(urlOrLocation, this.settings);
    } else {
      location = urlOrLocation;
    }
    this._pushLocation(location, replace);
    Object.values(this.listeners).forEach((listener) => {
      listener(location, {
        settings: this.settings,
        i18n: this.i18n,
      });
    });
  }
}
