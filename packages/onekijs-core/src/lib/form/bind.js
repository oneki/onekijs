import { get } from '../utils/object';
import { useFormContext } from './context';
import { useState, useMemo, useEffect } from 'react';
import { useIsomorphicLayoutEffect } from '../utils/hook';
import { fork, call } from 'redux-saga/effects';
import { latest } from '../saga';
import { useLocalService } from '../service';

// useFormBind does not interact with valueChange via a listener as it should be defined at the same level as useForm
export const useFormBind = function (rule, watchers = []) {
  return rule.apply(
    this,
    watchers.map(w => get(this.state.values, w))
  );
};

export const useBind = (rule, watchers = []) => {
  // initial call
  const { values, onValueChange, offValueChange } = useFormContext();

  const initialValue = useMemo(() => {
    return rule.apply(
      this,
      watchers.map(w => get(values, w))
    );
    // eslint-disable-next-line
  }, []);
  const [value, setValue] = useState(initialValue);

  useIsomorphicLayoutEffect(() => {
    const listener = function () {
      setValue(rule.apply(this, arguments));
    };
    onValueChange(listener, watchers);
    return () => {
      offValueChange(listener, watchers);
    };
    // eslint-disable-next-line
  }, []);

  return value;
};

const forkAsyncBind = function* (asyncMethod, watchers) {
  const task = yield fork(asyncMethod, ...watchers);
  const async = task.isRunning();
  if (async) {
    yield call(this.setLoading, true);
  }
  return task;
};

export const asyncBindService = {
  reducers: {
    setLoading: (state, isLoading) => {
      state.loading = isLoading;
    },
    success: (state, { result }) => {
      state.result = result;
      state.loading = false;
      state.error = null;
    },
    error: (state, error) => {
      state.loading = false;
      state.error = error;
    },
  },
  sagas: {
    execute: latest(function* ({ asyncMethod, watchers }) {
      try {
        const task = yield call([this, forkAsyncBind], asyncMethod, watchers);
        const error = task.error();
        if (error) {
          yield call(this.error, error);
        } else {
          yield call(this.success, { result: task.result() });
        }
      } catch (e) {
        yield call(this.error, e);
      }
    }),
  },
};

export const useAsyncBind = (rule, watchers = []) => {
  const { values, onValueChange, offValueChange } = useFormContext();
  const [state, service] = useLocalService(asyncBindService, {
    loading: true,
    result: undefined,
    error: null,
  });

  useIsomorphicLayoutEffect(() => {
    const listener = function () {
      service.execute({
        asyncMethod: rule,
        watchers: arguments,
      });
    };
    onValueChange(listener, watchers);
    return () => {
      offValueChange(listener, watchers);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    service.execute({
      asyncMethod: rule,
      watchers: watchers.map(w => get(values, w)),
    });
    // eslint-disable-next-line
  }, []);

  return [state.result, state.loading, state.error];
};

export const useFormAsyncBind = function (rule, watchers = [], options = {}) {
  const [state, service] = useLocalService(asyncBindService, {
    loading: true,
    result: options.defaultValue,
    error: null,
  });
  watchers = watchers.map(w => get(this.state.values, w));
  useEffect(() => {
    service.execute({
      asyncMethod: rule,
      watchers,
    });
    // eslint-disable-next-line
  }, watchers);

  return [state.result, state.loading, state.error];
};
