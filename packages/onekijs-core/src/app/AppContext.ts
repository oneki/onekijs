import React from 'react';
import { AppContext, AppSettings, AppStore } from '../typings/app';
import { I18n } from '../typings/i18n';
import { Router } from '../typings/router';
import { ID } from '../typings/symbol';
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

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const DefaultAppContext = React.createContext<BasicAppContext>(null!);
