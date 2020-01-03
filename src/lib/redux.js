import { useMemo } from "react";
import { useStore } from "react-redux";
import { call } from "redux-saga/effects";
import { useSettings, useRouter } from "./context";

const services = {};


class ReduxService {
  constructor(store, router, settings, schema) {
    this._reducers = {};
    this._sagas = {};
    this._name = schema.name;
    this._context = Object.freeze({
      get store() { return store },
      get router() { return router },
      get settings() { return settings },
    });

    Object.keys(schema.inject || {}).forEach(serviceName => {
      this._injectService(serviceName, schema.inject[serviceName]);
    });

    Object.keys(schema.reducers || {}).forEach(type => {
      this._createReducer(
        schema.name,
        type,
        schema.reducers[type]
      );
    });

    Object.keys(schema.sagas || {}).forEach(type => {
      this._createSaga(
        schema.name,
        type,
        schema.sagas[type]["effect"],
        schema.sagas[type]["saga"]
      );
    });

    const self = this;
    this._rootSaga = function*() {
      for (const type in self._sagas) {
        yield self._sagas[type]["effect"](type, self._sagas[type]["saga"]);
      }
    };

    if (schema.init) {
      schema.init.call(this, this._context);
    }
  }

  _createReducer(name, type, reducer) {
    const { store } = this._context;
    let [actionType, alias] = type.split(" as ");
    alias = alias ? alias : actionType;
    actionType = actionType.includes(".")
      ? actionType
      : `${name}.${actionType}`;
    if (reducer) {
      this._reducers[actionType] = reducer;
    }
    this[alias] = payload => {
      store.dispatch({
        type: actionType,
        payload
      });
    };
  }

  _createSaga(name, type, effect, saga) {
    const self = this;
    const context = this._context;
    let [actionType, alias] = type.split(" as ");
    alias = alias ? alias : actionType;
    actionType = actionType.includes(".")
      ? actionType
      : `${name}.${actionType}`;

    const wrapper = function* wrapper(action) {
      try {
        const result = yield call([self, saga], action.payload, context);
        if (action.resolve) {
          action.resolve(result);
        }
        return result;
      } catch (error) {
        if (action.reject) {
          action.reject(error);
        } else {
          throw error;
        }
      }
    };

    this._sagas[actionType] = {
      effect,
      saga: wrapper
    };

    this[alias] = payload => {
      return new Promise((resolve, reject) => {
        context.store.dispatch({
          type: actionType,
          payload,
          resolve,
          reject
        });
      });
    };
  }

  _injectService(name, defaultSchema) {
    // create service with the default schema if not already present in the context
    const { store, router, settings } = this._context;
    createReduxService(store, router, settings, defaultSchema); 
    this[name] = {};
    Object.keys(defaultSchema.reducers || {}).forEach(type => {
      this[name][type] = payload => {
        return store.dispatch({
          type: `${defaultSchema.name}.${type}`,
          payload
        });
      };
    });
    Object.keys(defaultSchema.sagas || {}).forEach(type => {
      this[name][type] = payload => {
        return new Promise((resolve, reject) => {
          store.dispatch({
            type: `${defaultSchema.name}.${type}`,
            payload,
            resolve,
            reject
          });
        });
      };
    });
  }

  _run() {
    const { store } = this._context
    store.injectReducers(this, this._name, this._reducers, this._context);
    store.runSaga(this._name, this._rootSaga);
  }

  // _stop() {
  //   this.$store.removeReducers(this._name, this._reducers);
  //   this.$store.cancelSaga(this._name);
  // }
}

// singleton
export const createReduxService = (store, router, settings, schema) => {
  if (!services[schema.name]) {
    const service = new ReduxService(store, router, settings, schema);
    service._run();
    services[schema.name] = service;
  }
  return services[schema.name];
};

export const useReduxService = schema => {
  // definition and store should be immutable.
  const store = useStore();
  const router = useRouter();
  const settings = useSettings();

  const service = useMemo(() => {
    return createReduxService(store, router, settings, schema);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);
  

  return service;
};
