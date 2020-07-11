import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useReduxService, useLocalService } from './service';
import { set, get } from './utils/object';
import { reducer } from './reducer';

const globalService = {
  name: 'state',

  setState: reducer(function (payload) {
    set(this.state, payload.key, payload.value);
  }),
};

const defaultSelector = state => state;

export const useGlobalState = (selector, defaultValue) => {
  let state = useSelector(selector || defaultSelector);
  state = state === undefined ? defaultValue : state;
  const service = useReduxService(globalService);
  const setState = useCallback(
    (key, value) => {
      service.setState({ key, value });
    },
    [service]
  );
  return [state, setState];
};

export const useGlobalStateModifier = () => {
  const service = useReduxService(globalService);
  const setState = useCallback(
    (key, value) => {
      service.setState({ key, value });
    },
    [service]
  );
  return setState;
};

export const useGlobalProp = (key, defaultValue) => {
  let value = useSelector(state => get(state, key));
  value = value === undefined ? defaultValue : value;
  const service = useReduxService(globalService);
  const setValue = useCallback(
    value => {
      service.setState({ key, value });
    },
    [service, key]
  );
  return [value, setValue];
};

const localService = {
  setState: reducer(function (payload) {
    set(this.state, payload.key, payload.value);
  }),
};

export const useLocalState = initialState => {
  const [state, service] = useLocalService(localService, initialState);
  const setState = useCallback(
    (key, value) => {
      service.setState({ key, value });
    },
    [service]
  );
  return [state, setState];
};
