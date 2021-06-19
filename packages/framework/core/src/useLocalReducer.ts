import { combinedReducers, dispatch, reducers, sagas, Service, State } from '@oneki/types';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import { runSaga, stdChannel } from 'redux-saga';

const useLocalReducer = <S extends State, T extends Service<S>>(service: T, initialState: S): [S, T] => {
  const [state, reactDispatch] = useReducer(service[combinedReducers], initialState);
  const env = useRef(state);
  env.current = state;
  const channelRef = useRef(stdChannel());
  const dispatcher = useCallback(
    (a) => {
      if (service[reducers][a.type]) {
        (reactDispatch as any)(a);
      } else {
        setTimeout(() => channelRef.current.put(a), 0);
      }
    },
    [service],
  );
  service[dispatch] = dispatcher;

  const getState = useCallback(() => env.current, []);

  useEffect(() => {
    const tasks: any[] = [];
    Object.keys(service[sagas]).forEach((type) => {
      tasks.push(runSaga({ channel: channelRef.current, dispatch: dispatcher, getState }, service[sagas][type]));
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
