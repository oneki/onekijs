import { useCallback, useEffect, useReducer, useRef } from 'react';
import { runSaga, stdChannel } from 'redux-saga';
import { combinedReducers, dispatch, reducers, sagas } from '../types/service';
import { State } from '../types/state';
import Service from './Service';

const useLocalReducer = <S extends State, T extends Service<S>>(service: T, initialState: S): [S, T] => {
  const reducer = (_state: S, action: { nextState: S }) => {
    return action.nextState;
  };

  const [state, reactDispatch] = useReducer(reducer, initialState);
  const env = useRef(state);
  env.current = state;
  const channelRef = useRef(stdChannel());
  const dispatcher = useCallback(
    (a: any) => {
      if (service[reducers][a.type]) {
        try {
          const state = service.state;
          const nextState = service[combinedReducers](state, a);
          // only dispatch to the actual reducer if the state has changed
          // this forces a refresh
          // we do this because it's possible that useReducer trigger a refresh even if the state has not changed
          // https://github.com/facebook/react/issues/14994
          if (nextState !== state) {
            reactDispatch({
              nextState,
            });
          }
          if (a.resolve) {
            a.resolve(nextState);
          }
        } catch (e) {
          if (a.reject) {
            a.reject(e);
          } else {
            throw e;
          }
        }
      } else {
        setTimeout(() => channelRef.current.put(a), 0);
        // channelRef.current.put(a);
      }
    },
    [service],
  );
  service[dispatch] = dispatcher;

  const getState = useCallback(() => env.current, []);

  useEffect(() => {
    const tasks: any[] = [];
    Object.keys(service[sagas]).forEach((type) => {
      tasks.push(
        runSaga(
          {
            channel: channelRef.current,
            dispatch: dispatcher,
            getState,
            onError: (e) => {
              throw e;
            },
          },
          service[sagas][type],
        ),
      );
    });
    return () => {
      for (const task of tasks) {
        task.cancel();
      }
    };
  }, [service, dispatcher, getState]);

  return [state, service];
};

export default useLocalReducer;
