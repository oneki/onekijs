export default class ReactRouter {

  constructor(router) {
    this.router = router;
  }

  sync(location, history, params) {
    this.router.location = location;
    this.router.history = history;
    this.router.params = params;
  }


}