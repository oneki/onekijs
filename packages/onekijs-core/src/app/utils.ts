import produce from 'immer';
import { AnyAction, applyMiddleware, createStore, Middleware, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import BasicError from '../core/BasicError';
import { inReducer } from '../core/Service';
import { AnonymousObject, ErrorCallback, ResultCallback, SuccessCallback } from '../core/typings';
import useLazyRef from '../core/useLazyRef';
import { clone, fromPayload, simpleMergeDeep } from '../core/utils/object';
import AppContext from './AppContext';
import AppRouter from './AppRouter';
import { defaultSettings } from './settings';
import {
  AppErrorCallback,
  AppResultCallback,
  AppSettings,
  AppStore,
  AppSuccessCallback,
  reducersSymbol,
  sagasSymbol,
} from './typings';
import useAppContext from './useAppContext';
import useOnekiRouter from './useOnekiRouter';

export const createReduxStore = (
  initialState: AnonymousObject = {},
  middlewares: Middleware<any, any, any>[] = [],
): AppStore => {
  let sagaMiddleware = middlewares.find((middleware) => middleware.name === 'sagaMiddleware');
  if (!sagaMiddleware) {
    sagaMiddleware = createSagaMiddleware();
    middlewares.push(sagaMiddleware);
  }

  const store = createStore(() => {
    return initialState;
  }, applyMiddleware(...middlewares)) as AppStore;

  const buildReducer = (store: Store) => {
    return (state = store.getState(), action: AnyAction) => {
      const reducers = (store as any)[reducersSymbol][action.type];
      if (reducers) {
        const nextState = produce(state, (draftState: any) => {
          Object.keys(reducers).forEach((k) => {
            try {
              reducers[k].bind[inReducer] = true;
              reducers[k].bind.state = draftState;
              reducers[k].func.apply(reducers[k].bind, fromPayload(action.payload));
            } finally {
              reducers[k].bind[inReducer] = false;
            }
          });
        });
        Object.keys(reducers).forEach((k) => {
          reducers[k].bind.state = nextState;
        });
        return nextState;
      }
      return state;
    };
  };

  store[reducersSymbol] = {};
  store[sagasSymbol] = {};

  store.runSaga = (namespace, saga, name = 'root') => {
    store[sagasSymbol][`${namespace}.${name}`] = (sagaMiddleware as SagaMiddleware).run(saga);
  };
  store.cancelSaga = (namespace, name = 'root') => {
    const task = store[sagasSymbol][`${namespace}.${name}`];
    if (task) {
      task.cancel();
    }
  };

  store.injectReducers = (bind, namespace, reducers) => {
    Object.keys(reducers).forEach((actionType) => {
      store[reducersSymbol][actionType] = store[reducersSymbol][actionType] || {};
      store[reducersSymbol][actionType][`${namespace}.${actionType}`] = {
        func: reducers[actionType],
        bind,
      };
    });

    store.replaceReducer(buildReducer(store));
  };

  store.removeReducers = (namespace, reducers = {}) => {
    Object.keys(reducers).forEach((actionType) => {
      store[reducersSymbol][actionType] = store[reducersSymbol][actionType] || {};
      delete store[reducersSymbol][actionType][`${namespace}.${actionType}`];
    });
    store.replaceReducer(buildReducer(store));
  };

  return store;
};

export const formatSettings = (settings: AppSettings): AppSettings => {
  let result = settings;
  if (Array.isArray(settings)) {
    result = Object.assign({}, settings[0]);
    for (let i = 1; i < settings.length; i++) {
      result = simpleMergeDeep(result, settings[i]);
    }
  }
  const cloneDefaultSettings = clone(defaultSettings);
  return simpleMergeDeep(cloneDefaultSettings, result);
};

export function asResultCallback<T = any>(
  callback: AppResultCallback<T> | undefined,
  router: AppRouter,
  appContext: AppContext,
): ResultCallback<T> | undefined {
  if (!callback) return undefined;
  if (typeof callback === 'string') {
    return () => {
      router.push(callback);
    };
  } else if (Array.isArray(callback)) {
    // TODO handle correctly Next Router
    return () => {
      console.log('TODO handle correctly Next Router');
    };
  } else {
    const originalCallback = callback;
    return (result) => {
      originalCallback(result, appContext);
    };
  }
}

function useResultCallback<T = any>(callback?: AppResultCallback<T>): ResultCallback<T> | undefined {
  const router = useOnekiRouter();
  const appContext = useAppContext();
  const callbackRef = useLazyRef(() => {
    return asResultCallback<T>(callback, router, appContext);
  });
  return callbackRef.current;
}

export function useErrorCallback<T extends BasicError = BasicError>(
  callback?: AppErrorCallback<T>,
  defaultCallback?: AppErrorCallback<T>,
): ErrorCallback<T> | undefined {
  const resultCallback = useResultCallback<T>(callback) as ErrorCallback<T> | undefined;
  const defaultResultCallback = useResultCallback<T>(defaultCallback) as ErrorCallback<T> | undefined;
  return resultCallback || defaultResultCallback;
}

export function useSuccessCallback<T = any>(
  callback?: AppSuccessCallback<T>,
  defaultCallback?: AppSuccessCallback<T>,
): SuccessCallback<T> | undefined {
  const resultCallback = useResultCallback<T>(callback) as SuccessCallback<T> | undefined;
  const defaultResultCallback = useResultCallback<T>(defaultCallback) as SuccessCallback<T> | undefined;
  return resultCallback || defaultResultCallback;
}