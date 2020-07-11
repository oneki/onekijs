import { runSaga, stdChannel } from '@redux-saga/core';
import produce from 'immer';
import { useCallback, useContext, useEffect, useReducer, useRef } from 'react';
import { ReactReduxContext, useStore } from 'react-redux';
import { call, take } from 'redux-saga/effects';
import { AppContext } from './context';
import { every } from './saga';
import { useLazyRef } from './utils/hook';
import { set, useShallowEqual } from './utils/object';
import { isFunction } from './utils/type';
import { reducer } from './reducer';

const services = {};

class ReduxService {
  constructor(schema, context) {
    this.__reducers__ = {};
    this.__types__ = {};
    this.__sagas__ = {};
    this.__name__ = schema.name;
    this.__context__ = context;
    this.__initialized__ = false;

    Object.keys(schema).forEach(key => {
      const value = schema[key];
      if (key === 'inject') {
        Object.keys(value).forEach(serviceName => {
          this.__injectService__(serviceName, value[serviceName]);
        });
      } else if (value.reducer) {
        this.__createReducer__(key, value.reducer, context.store.dispatch);
      } else if (value.saga) {
        this.__createSaga__(key, value.effect, value.saga, value.delay);
      } else if (isFunction(value)) {
        this[key] = value.bind(this);
      } else {
        this[key] = value;
      }
    });
    if (this.init) {
      this.init(context);
    }
  }

  __createReducer__(type, reducer) {
    const actionType = this.__name__ ? `${this.__name__}.${type}` : type;
    if (reducer) {
      this.__reducers__[actionType] = reducer;
      this.__types__[type] = {
        type: 'reducer',
        actionType,
      };
    }
    this[type] = (payload, state, context) => {
      if (state) {
        // call from another reducer (the second argument is the state)
        if (!context) {
          context = this.__context__;
        }
        return reducer.call(this, payload, state, context);
      } else {
        // call from a saga -> dispatch
        return this.__dispatch__({
          type: actionType,
          payload,
        });
      }
    };
  }

  __createSaga__(type, effect, saga, delay) {
    const self = this;
    const context = this.__context__;
    const actionType = this.__name__ ? `${this.__name__}.${type}` : type;

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
        this.__sagas__[actionType] = function* () {
          yield effect(delay, actionType, wrapper);
        };
      } else {
        this.__sagas__[actionType] = function* () {
          yield effect(actionType, wrapper);
        };
      }
    } else {
      this.__sagas__[actionType] = function* () {
        while (true) {
          const action = yield take(actionType, wrapper);
          yield wrapper(action);
        }
      };
    }
    this.__types__[type] = {
      type: 'saga',
      actionType,
    };
    this[type] = saga;
    this[type] = function* () {
      if (arguments.length > 1) {
        return yield saga.apply(self, arguments);
      } else {
        return yield saga.call(self, arguments[0], self.__context__);
      }
    };
  }

  __injectService__(name, defaultSchema) {
    // create service with the default schema if not already present in the context
    const { store } = this.__context__;
    createReduxService(defaultSchema, this.__context__);
    this[name] = {};

    Object.keys(defaultSchema).forEach(key => {
      const value = defaultSchema[key];
      if (value) {
        if (value.reducer) {
          this[name][key] = function (payload) {
            return store.dispatch({
              type: `${defaultSchema.name}.${key}`,
              payload,
            });
          };
        } else if (value.saga) {
          this[name][key] = function (payload) {
            return new Promise((resolve, reject) => {
              store.dispatch({
                type: `${defaultSchema.name}.${key}`,
                payload,
                resolve,
                reject,
              });
            });
          };
        }
      }
    });
  }

  _run() {
    const { store } = this.__context__;
    this.__dispatch__ = store.dispatch;
    store.injectReducers(
      this,
      this.__name__,
      this.__reducers__,
      this.__context__
    );
    Object.keys(this.__sagas__).forEach(type => {
      store.runSaga(this.__name__, this.__sagas__[type], type);
    });
  }

  _stop() {
    const { store } = this.__context__;
    this.__dispatch__ = null;
    store.removeReducers(this.__name__, this.__reducers__);
    Object.keys(this.__sagas__).forEach(type => {
      store.cancelSaga(this.__name__, type);
    });
  }
}

class Service extends ReduxService {
  constructor(schema, context) {
    super(schema, context);

    this.__reducer__ = (state, action) => {
      const nextState = produce(state, draftState => {
        if (this.__reducers__[action.type]) {
          //debugger;
          const payload = action.payload === undefined ? {} : action.payload;
          this.__reducers__[action.type].call(
            this,
            payload,
            draftState,
            this.__context__
          );
        }
      });
      this._state = nextState;
      return nextState;
    };
  }
  _run() {}
  _stop() {}
}

const handler = {
  get: function (target, prop) {
    const alias = target.__types__[prop];
    if (alias) {
      if (alias.type === 'reducer') {
        return payload => {
          target.__dispatch__({
            type: alias.actionType,
            payload,
          });
        };
      } else if (alias.type === 'saga') {
        return payload => {
          return new Promise((resolve, reject) => {
            target.__dispatch__({
              type: alias.actionType,
              payload,
              resolve,
              reject,
            });
          });
        };
      }
    } else {
      return Reflect.get(...arguments);
    }
  },
};

// singleton
export const createReduxService = (schema, context) => {
  if (!services[schema.name]) {
    const service = new ReduxService(schema, context);
    service._run();
    // create proxy. Each method related to a reducer or a saga do a dispatch instead of calling directly the method

    const proxy = new Proxy(service, handler);
    services[schema.name] = proxy;
  }
  return services[schema.name];
};

export const useGlobalService = schema => {
  // definition and store should be immutable.
  const store = useStore();
  const appContext = useContext(AppContext);

  const contextRef = useRef({});
  Object.assign(contextRef.current, appContext, { store });

  const serviceRef = useLazyRef(() => {
    return createReduxService(schema, contextRef.current);
  });

  return serviceRef.current;
};

export const useReduxService = useGlobalService; // alias

export const useLocalService = (schema, initialState = {}) => {
  if (isFunction(initialState)) {
    initialState = initialState();
  }
  const reduxContext = useContext(ReactReduxContext) || {};
  const appContext = useContext(AppContext);
  const contextRef = useRef({});
  Object.assign(contextRef.current, appContext, { store: reduxContext.store });

  const serviceRef = useLazyRef(() => {
    return new Service(schema, contextRef.current);
  });
  const proxyRef = useLazyRef(() => {
    return new Proxy(serviceRef.current, handler);
  });
  const reducerRef = useRef(serviceRef.current.__reducer__);
  reducerRef.current = serviceRef.current.__reducer__;
  const [state, reactDispatch] = useReducer(
    serviceRef.current.__reducer__,
    initialState
  );
  const env = useRef(state);
  env.current = state;
  const channelRef = useRef(stdChannel());
  // const emitter = useMemo(() => {
  //   const emitter = new EventEmitter();
  //   emitter.on("action", channel.put)
  //   return emitter;
  // }, [channel.put]);
  const dispatch = useCallback(
    a => {
      if (
        serviceRef.current.__reducers__ &&
        serviceRef.current.__reducers__[a.type]
      ) {
        reactDispatch(a);
      } else {
        channelRef.current.put(a);
      }
      //setTimeout(channel.put, 0, a);
      //emitter.emit("action", a)
    },
    [serviceRef]
  );
  serviceRef.current.__dispatch__ = dispatch;

  const getState = useCallback(() => env.current, []);

  useEffect(() => {
    const tasks = [];
    Object.keys(serviceRef.current.__sagas__).forEach(type => {
      tasks.push(
        runSaga(
          { channel: channelRef.current, dispatch, getState },
          serviceRef.current.__sagas__[type]
        )
      );
    });
    return () => {
      for (let task of tasks) {
        task.cancel();
      }
    };
  }, [serviceRef, dispatch, getState]);

  return [state, proxyRef.current];
};

export const genericService = {
  name: 'generic',

  executeReducer: reducer(function (
    { reducer: r, key, payload, context },
    state
  ) {
    if (r) {
      r(context, state);
    } else {
      set(state, key, payload);
    }
  }),

  executeSaga: every(function* ({ saga }, context) {
    yield saga(context);
  }),
};

export const useGenericReducer = (reducer, payload) => {
  const service = useReduxService(genericService);
  payload = useShallowEqual(payload);

  useEffect(() => {
    if (typeof reducer === 'string') {
      service.executeReducer({
        key: reducer,
        payload,
      });
    } else {
      service.executeReducer({ reducer });
    }
  }, [reducer, payload, service]);
};

export const useGenericSaga = () => {};
