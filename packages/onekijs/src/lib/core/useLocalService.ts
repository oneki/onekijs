import { useCallback, useEffect, useReducer, useRef } from 'react';
import { runSaga, stdChannel } from 'redux-saga';
import Service, { combinedReducers, dispatch, reducers, sagas } from './Service';
import { Class, ServiceTypeEnum, State } from './typings';
import useLazyRef from './useLazyRef';
import useService from './useService';

const useLocalService = <S extends State, T extends Service<S>>(
  ctor: Class<T>,
  initialState?: S | (() => S),
): [S, T] => {
  const initialStateRef = useLazyRef(initialState);
  const service = useService(ServiceTypeEnum.Local, ctor, initialStateRef.current);
  const [state, reactDispatch] = useReducer(service[combinedReducers], initialStateRef.current || {});
  const env = useRef(state);
  env.current = state;
  const channelRef = useRef(stdChannel());
  const dispatcher = useCallback(
    (a) => {
      if (service[reducers][a.type]) {
        (reactDispatch as any)(a);
      } else {
        channelRef.current.put(a);
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

export default useLocalService;
