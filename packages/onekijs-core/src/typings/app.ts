import { Action, AnyAction, Store } from 'redux';
import { I18n } from './i18n';
import { AnonymousObject } from './object';
import { Router } from './router';
import { Saga } from './saga';
import { Service } from './service';

export interface AppSettings {
  [propName: string]: any;
}
export const reducersSymbol = Symbol('onekijs.store.reducers');
export const sagasSymbol = Symbol('onekijs.store.sagas');

export interface AppStore<S = any, A extends Action = AnyAction> extends Store<S, A> {
  [reducersSymbol]: AnonymousObject;
  [sagasSymbol]: AnonymousObject;
  runSaga: (namespace: string, saga: Saga<any[]>, name: string) => void;
  cancelSaga: (namespace: string, name: string) => void;
  injectReducers: (bind: Service, namespace: string, reducers: AnonymousObject) => void;
  removeReducers: (namespace: string, reducers: AnonymousObject) => void;
}

export interface AppContext {
  router: Router;
  settings: AppSettings;
  store: AppStore;
  i18n: I18n;
}
