import { get } from "../utils/object";

export default class BaseRouter {

  constructor() {
    this.history = [];
  }

  get location() {
    return this.history[0];
  }

  get previousLocation() {
    return this.history[1];
  }

  get hash() {
    return this.location ? this.location.hash : null;
  }

  get query() {
    return this.location ? this.location.query : null;
  }

  get href() {
    return this.location ? this.location.href : null;
  }

  get pathname() {
    return this.location ? this.location.pathname : null;
  }

  get state() {
    return this.location ? this.location.state : null;
  }

  deleteOrigin() {
    localStorage.removeItem("onekijs.from");
  }

  getOrigin() {
    const from =
    localStorage.getItem("onekijs.from") ||
      get(this.settings, "routes.home", "/");
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
  push(url_or_location) {
    throw Error(`method push of class ${this.constructor.name}  must be redefined`)
  }

  replace(url_or_location) {
    throw Error(`method replace of class ${this.constructor.name}  must be redefined`)
  }

  saveOrigin(force=true) {
    const currentValue = localStorage.getItem("onekijs.from");
    if (!force && currentValue) return;
    
    let from = get(this.settings, "routes.home", "/");
    const previous = this.previousLocation;
    if (previous) {
      from = previous.relativeurl;
    }
    
    localStorage.setItem("onekijs.from", from);
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
  listen(callback) {
    throw Error(`method listen of class ${this.constructor.name}  must be redefined`)
  }

  unlisten(handler) {
    throw Error(`method unlisten of class ${this.constructor.name}  must be redefined`)
  }
}