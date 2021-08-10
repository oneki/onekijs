import { AppContext, AppSettings, AppStore } from '../types/app';
import { I18n } from '../types/i18n';
import { Router } from '../types/router';
import { ID } from '../types/symbol';
import { CONTEXT_ID } from './typings';

export default class BasicAppContext implements AppContext {
  static [ID] = CONTEXT_ID;
  router: Router;
  settings: AppSettings;
  store: AppStore;
  i18n: I18n;
  constructor(router: Router, settings: AppSettings, store: AppStore, i18n: I18n) {
    this.router = router;
    this.settings = settings;
    this.store = store;
    this.i18n = i18n;
  }
}
