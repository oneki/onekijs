export default class BaseRouter {

  constructor() {
    this._history = [];
  }

  get location() {
    return this._history[0];
  }

  get previousLocation() {
    return this._history[1];
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