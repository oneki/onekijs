import { useCallback, useEffect, useReducer, useRef } from 'react';
import { runSaga, stdChannel } from 'redux-saga';
import Service, { combinedReducers, dispatch, reducers, sagas } from './Service';
import { State } from './typings';

const useLocalReducer = <S extends State, T extends Service<S>>(
  service: T,
  initialStateRef: React.MutableRefObject<S|undefined>,
): [S, T] => {
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

export default useLocalReducer;
