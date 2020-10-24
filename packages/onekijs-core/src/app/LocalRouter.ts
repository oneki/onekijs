import { toLocation } from '../core/utils/url';
import Router from './Router';
import { Location, LocationChangeCallback } from './typings';

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

  push(urlOrLocation: string | Location): void {
    this._pushOrReplace(urlOrLocation, false);
  }

  replace(urlOrLocation: string | Location): void {
    this._pushOrReplace(urlOrLocation, true);
  }

  listen(callback: LocationChangeCallback): string {
    const id = `listener-${++uid}`;
    this.listeners[id] = callback;
    return id;
  }

  unlisten(id: string): void {
    delete this.listeners[id];
  }

  _pushOrReplace(urlOrLocation: string | Location, replace: boolean): void {
    let location: Location;
    if (typeof urlOrLocation === 'string') {
      location = toLocation(urlOrLocation);
    } else {
      location = urlOrLocation;
    }
    console.log("push", location, this.listeners);
    this._pushLocation(location, replace);
    Object.values(this.listeners).forEach((listener) => {
      console.log("lister location", listener);
      listener(location);
    });
  }
}
