import { get } from '../utils/object';
import { useFormContext } from './context';
import { useState, useMemo, useEffect } from 'react';
import { useIsomorphicLayoutEffect } from '../utils/hook';
import { fork, call } from 'redux-saga/effects';
import { latest } from '../saga';
import { useLocalService } from '../service';

// useFormBind does not interact with valueChange via a listener as it should be defined at the same level as useForm
export const useFormBind = function (rule, watch = []) {
  return rule.apply(
    this,
    watch.map(w => get(this.state.values, w))
  );
};

export const useBind = (rule, watch = []) => {
  // initial call
  const { valuesRef, onValueChange, offValueChange } = useFormContext();

  const [value, setValue] = useState(() => {
    return rule(...watch.map(w => get(valuesRef.current, w)));
  });

  useIsomorphicLayoutEffect(() => {
    const listener = function () {
      setValue(rule(...arguments));
    };
    onValueChange(listener, watch);
    return () => {
      offValueChange(listener, watch);
    };
    // eslint-disable-next-line
  }, []);

  return value;
};

const forkAsyncBind = function* (asyncMethod, watch) {
  const task = yield fork(asyncMethod, ...watch);
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
    execute: latest(function* ({ asyncMethod, watch }) {
      try {
        const task = yield call([this, forkAsyncBind], asyncMethod, watch);
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

export const useAsyncBind = (rule, watch = []) => {
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
        watch: arguments,
      });
    };
    onValueChange(listener, watch);
    return () => {
      offValueChange(listener, watch);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    service.execute({
      asyncMethod: rule,
      watch: watch.map(w => get(values, w)),
    });
    // eslint-disable-next-line
  }, []);

  return [state.result, state.loading, state.error];
};

export const useFormAsyncBind = function (rule, watch = [], options = {}) {
  const [state, service] = useLocalService(asyncBindService, {
    loading: true,
    result: options.defaultValue,
    error: null,
  });
  watch = watch.map(w => get(this.state.values, w));
  useEffect(() => {
    service.execute({
      asyncMethod: rule,
      watch,
    });
    // eslint-disable-next-line
  }, watch);

  return [state.result, state.loading, state.error];
};
