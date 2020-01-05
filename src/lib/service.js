import { call } from "redux-saga/effects";
import produce from "immer";
import {
  useMemo,
  useReducer,
  useRef,
  useCallback,
  useEffect,
  useContext
} from "react";
import { stdChannel, runSaga } from "@redux-saga/core";
import { ReactReduxContext } from "react-redux";
import { createReduxService } from "./redux";
import { useSettings, useRouter } from "./context";

class Service {
  constructor(store, router, settings, schema) {
    this._reducers = {};
    this._sagas = {};
    this._context = Object.freeze({
      get store() { return store },
      get router() { return router },
      get settings() { return settings },
    });

    Object.keys(schema.inject || {}).forEach(serviceName => {
      this._injectService(serviceName, schema.inject[serviceName]);
    });

    Object.keys(schema.reducers || {}).forEach(type => {
      this._createReducer(type, schema.reducers[type]);
    });

    Object.keys(schema.sagas || {}).forEach(type => {
      this._createSaga(
        type,
        schema.sagas[type]["effect"],
        schema.sagas[type]["saga"]
      );
    });

    this._reducer = (state, action) => {
      const nextState = produce(state, draftState => {
        if (this._reducers[action.type]) {
          const payload = action.payload === undefined ? {} : action.payload;
          this._reducers[action.type].call(this, draftState, payload, this._context);
        }
      });
      return nextState;
    };

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

  _createReducer(type, reducer) {
    if (reducer) {
      this._reducers[type] = reducer;
    }
    this[type] = payload => {
      return this._dispatch({
        type,
        payload
      });
    };
  }

  _createSaga(type, effect, saga) {
    const self = this;
    const context = this._context;

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

    this._sagas[type] = {
      effect,
      saga: wrapper
    };

    this[type] = payload => {
      return new Promise((resolve, reject) => {
        this._dispatch({
          type,
          payload,
          resolve,
          reject
        });
      });
    };
  }

  _injectService(name, defaultSchema) {
    const { store, settings, router } = this._context;
    // create service with the default schema if not already present in the context
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
}

export const useLocalService = (schema, initialState) => {
  const reduxContext = useContext(ReactReduxContext) || {};
  const router = useRouter();
  const settings = useSettings();

  const service = useMemo(() => {
    return new Service(reduxContext.store, router, settings, schema);
  }, [reduxContext.store, router, settings, schema]);

  const [state, reactDispatch] = useReducer(service._reducer, initialState);
  const env = useRef(state);
  env.current = state;
  const channel = useMemo(() => stdChannel(), []);
  const dispatch = useCallback(
    a => {
      setTimeout(channel.put, 0, a);
      reactDispatch(a);
    },
    [channel.put]
  );
  service._dispatch = dispatch;

  const getState = useCallback(() => env.current, []);

  useEffect(() => {
    const task = runSaga({ channel, dispatch, getState }, service._rootSaga);
    return () => task.cancel();
  }, [channel, service._rootSaga, dispatch, getState]);

  return [state, service];
};
