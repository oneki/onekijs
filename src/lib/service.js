import { runSaga, stdChannel } from "@redux-saga/core";
import { EventEmitter } from 'events';
import produce from "immer";
import { useCallback, useContext, useEffect, useMemo, useReducer, useRef } from "react";
import { ReactReduxContext, useStore } from "react-redux";
import { call, take } from "redux-saga/effects";
import { AppContext } from "./context";
import { every } from "./saga";
import { set, useShallowEqual } from "./utils/object";

const services = {};

class ReduxService {
  constructor(store, router, settings, i18n, schema) {
    this._reducers = {};
    this._sagas = {};
    this._name = schema.name;
    this._context = Object.freeze({
      get store() {
        return store;
      },
      get router() {
        return router;
      },
      get settings() {
        return settings;
      },
      get i18n() {
        return i18n;
      }
    });

    Object.keys(schema.inject || {}).forEach(serviceName => {
      this._injectService(serviceName, schema.inject[serviceName]);
    });

    Object.keys(schema.reducers || {}).forEach(type => {
      this._createReducer(type, schema.reducers[type], store.dispatch);
    });

    Object.keys(schema.sagas || {}).forEach(type => {
      const effect = (typeof schema.sagas[type] === 'function') ? null : schema.sagas[type]["effect"];
      const fn = (typeof schema.sagas[type] === 'function') ? schema.sagas[type] : schema.sagas[type]["saga"];
      this._createSaga(type, effect, fn, schema.sagas.delay);
    });


    if (schema.init) {
      schema.init.call(this, this._context);
    }
  }

  _createReducer(type, reducer, dispatch) {
    let [actionType, alias] = type.split(" as ");
    alias = alias ? alias : actionType;
    actionType = (actionType.includes(".") || !this._name)
      ? actionType
      : `${this._name}.${actionType}`;
    if (reducer) {
      this._reducers[actionType] = reducer;
    }
    this[alias] = payload => {
      this._dispatch({
        type: actionType,
        payload
      });
    };
  }

  _createSaga(type, effect, saga, delay) {
    const self = this;
    const context = this._context;
    let [actionType, alias] = type.split(" as ");
    alias = alias ? alias : actionType;
    actionType = (actionType.includes(".") || !this._name)
      ? actionType
      : `${this._name}.${actionType}`;

    const wrapper = function* wrapper(action) {
      try {
        const payload = action.payload === undefined ? {} : action.payload;
        const result = yield call([self, saga], payload, context);
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

    if (effect) {
      if (delay) {
        this._sagas[actionType] = function*() {
          yield effect(delay, actionType, wrapper);
        };
      } else {
        this._sagas[actionType] = function*() {
          yield effect(actionType, wrapper);
        };
      }

    } else {
      this._sagas[actionType] = function*() {
        while(true) {
          const action = yield take(actionType, wrapper);
          yield call(wrapper, action);
        }
        
      };
    }


    this[alias] = payload => {
      return new Promise((resolve, reject) => {
        this._dispatch({
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
    const { store, router, settings, i18n } = this._context;
    createReduxService(store, router, settings, i18n, defaultSchema);
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
    const { store } = this._context;
    this._dispatch = store.dispatch;
    store.injectReducers(this, this._name, this._reducers, this._context);
    Object.keys(this._sagas).forEach(type => {
      store.runSaga(this._name, this._sagas[type], type);
    })
  }

  _stop() {
    const { store } = this._context;
    this._dispatch = null;
    store.removeReducers(this._name, this._reducers);
    Object.keys(this._sagas).forEach(type => {
      store.cancelSaga(this._name, type);
    })    
  }
}

class Service extends ReduxService {
  constructor(store, router, settings, i18n, schema) {
    super(store, router, settings, i18n, schema);
    
    this._reducer = (state, action) => {
      const nextState = produce(state, draftState => {
        if (this._reducers[action.type]) {
          const payload = action.payload === undefined ? {} : action.payload;
          this._reducers[action.type].call(
            this,
            draftState,
            payload,
            this._context
          );
        }
      });
      console.log('nextState', action.type, nextState);
      this._state = nextState;
      return nextState;
    };
  }
  _run() {}
  _stop() {}
}

// singleton
export const createReduxService = (store, router, settings, i18n, schema) => {
  if (!services[schema.name]) {
    const service = new ReduxService(store, router, settings, i18n, schema);
    service._run();
    services[schema.name] = service;
  }
  return services[schema.name];
};

export const useGlobalService = schema => {
  // definition and store should be immutable.
  const store = useStore();
  const { router, settings, i18n } = useContext(AppContext);

  const service = useMemo(() => {
    return createReduxService(store, router, settings, i18n, schema);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  return service;
};

export const useReduxService = useGlobalService;  // alias

export const useLocalService = (schema, initialState={}) => {
  const reduxContext = useContext(ReactReduxContext) || {};
  const { router, settings, i18n } = useContext(AppContext);

  const service = useMemo(() => {
    return new Service(reduxContext.store, router, settings, i18n, schema);
  }, [reduxContext.store, router, settings, i18n, schema]);

  const [state, reactDispatch] = useReducer(service._reducer, initialState);
  const env = useRef(state);
  env.current = state;
  const channel = useMemo(() => stdChannel(), []);
  const emitter = useMemo(() => {
    const emitter = new EventEmitter();
    emitter.on("action", channel.put)
    return emitter;
  }, [channel.put]);
  const dispatch = useCallback(
    a => {
      //setTimeout(channel.put, 0, a);
      emitter.emit("action", a)
      reactDispatch(a);
    },
    [emitter]
  );
  service._dispatch = dispatch;

  const getState = useCallback(() => env.current, []);

  useEffect(() => {
    const tasks = [];
    Object.keys(service._sagas).forEach(type => {
      tasks.push(runSaga({ channel, dispatch, getState }, service._sagas[type]));
    })    
    return () => {
      for (let task of tasks) {
        task.cancel();
      }
    };
  }, [channel, service._sagas, dispatch, getState]);

  return [state, service];
};

export const genericService = {
  name: "generic",
  reducers: {
    executeReducer: function(state, { reducer, key, payload, context }) {
      if (reducer) {
        reducer(state, context);
      } else {
        set(state, key, payload);
      }
    }
  },
  sagas: {
    executeSaga: every(function*({saga}, context) {
      yield call(saga, context)
    })
  }
}

export const useGenericReducer = (reducer, payload) => {
  const service = useReduxService(genericService);
  payload = useShallowEqual(payload);

  useEffect(() => {
    if (typeof reducer === 'string') {
      service.executeReducer({
        key: reducer,
        payload
      });
    } else {
      service.executeReducer({ reducer });
    }
    
  }, [reducer, payload, service])
};

export const useGenericSaga = () => {}
