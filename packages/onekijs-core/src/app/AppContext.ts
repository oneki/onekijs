import { ID } from '../core/typings';
import React from 'react';
import AppRouter from './AppRouter';
import { CONTEXT_ID, AppSettings, AppStore } from './typings';
import { I18n } from '../i18n/typings';

export default class AppContext {
  static [ID] = CONTEXT_ID;
  router: AppRouter;
  settings: AppSettings;
  store: AppStore;
  i18n: I18n;
  constructor(router: AppRouter, settings: AppSettings, store: AppStore, i18n: I18n) {
    this.router = router;
    this.settings = settings;
    this.store = store;
    this.i18n = i18n;
  }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const DefaultAppContext = React.createContext<AppContext>(null!);
