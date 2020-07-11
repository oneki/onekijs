import { useCallback, useEffect, useRef } from 'react';
import { call, cancel, delay, fork } from 'redux-saga/effects';
import { notificationService } from './notification';
import { reducer } from './reducer';
import { every } from './saga';
import { useLocalService } from './service';
import { useReduxSelector } from './store';
import { asyncHttp } from './xhr';

export const crudService = {
  delayLoading: function* (delay_ms) {
    yield delay(delay_ms);
    yield this.setLoading(true);
  },

  fetchSuccess: reducer((result, state) => {
    state.result = result;
    state.loading = false;
  }),

  fetch: every(function* (
    { url, method, body = null, options = {} },
    { router }
  ) {
    let loadingTask = null;
    try {
      loadingTask = yield fork(this.delayLoading, options.delayLoading || 200);
      const result = yield asyncHttp(url, method, body, options);
      yield cancel(loadingTask);
      yield this.fetchSuccess(result); // to update the store and trigger a re-render.
      const onSuccess = options.onSuccess;
      if (onSuccess) {
        if (typeof onSuccess === 'string') {
          // onSuccess is a URL -> redirect to this one
          yield call([router, router.push], onSuccess);
        } else {
          yield options.onSuccess(result);
        }
      }
    } catch (e) {
      if (loadingTask) {
        yield cancel(loadingTask);
      }
      yield this.setLoading(false);
      const onError = options.onError;
      if (onError) {
        if (typeof onError === 'string') {
          // onError is a URL -> redirect to this one
          yield call([router, router.push], onError);
        } else {
          yield onError(e);
        }
      } else {
        yield this.notificationService.error(e);
      }
    }
  }),

  setLoading: reducer((isLoading, state) => {
    state.loading = isLoading;
  }),

  inject: {
    notificationService,
  },
};

export const useGet = (url, options = {}) => {
  const optionsRef = useRef();
  optionsRef.current = options;

  const [state, service] = useLocalService(crudService, { loading: false });

  const refresh = useCallback(() => {
    if (url) {
      service.fetch({ url, method: 'GET', options: optionsRef.current });
    }
  }, [url, service]);

  useEffect(() => {
    refresh();
  }, [refresh]);
  return [state.result, state.loading, refresh];
};

export const useSecureGet = (url, options = {}) => {
  const authKey = useReduxSelector('settings.auth.key', 'auth');
  const auth = useReduxSelector(authKey);
  options.auth = auth;
  return useGet(url, options);
};

export const useDelete = (url, options = {}) => {
  const optionsRef = useRef();
  optionsRef.current = options;

  const [state, service] = useLocalService(crudService, { loading: false });

  const executor = useCallback(
    (extraOptions = {}) => {
      extraOptions = Object.assign({}, optionsRef.current, extraOptions);
      service.fetch({
        url: extraOptions.url || url,
        method: 'DELETE',
        options: extraOptions,
      });
    },
    [service, url]
  );

  return [executor, state.loading];
};

export const useSecureDelete = (url, options = {}) => {
  const authKey = useReduxSelector('settings.auth.key', 'auth');
  const auth = useReduxSelector(authKey);
  options.auth = auth;
  return useDelete(url, options);
};

export const usePostPutPatch = (url, method, options = {}) => {
  const optionsRef = useRef();
  optionsRef.current = options;

  const [state, service] = useLocalService(crudService, { loading: false });
  const executor = useCallback(
    (body, extraOptions = {}) => {
      extraOptions = Object.assign({}, optionsRef.current, extraOptions);
      service.fetch({
        url: extraOptions.url || url,
        method,
        body,
        options: extraOptions,
      });
    },
    [service, url, method]
  );

  return [executor, state.loading];
};

export const useSecurePostPutPatch = (url, method, options = {}) => {
  const authKey = useReduxSelector('settings.auth.key', 'auth');
  const auth = useReduxSelector(authKey);
  options.auth = auth;
  return usePostPutPatch(url, method, options);
};

export const usePost = (url, options = {}) => {
  return usePostPutPatch(url, 'POST', options);
};

export const useSecurePost = (url, options = {}) => {
  return useSecurePostPutPatch(url, 'POST', options);
};

export const usePut = (url, options = {}) => {
  return usePostPutPatch(url, 'PUT', options);
};

export const useSecurePut = (url, options = {}) => {
  return useSecurePostPutPatch(url, 'PUT', options);
};

export const usePatch = (url, options = {}) => {
  return usePostPutPatch(url, 'PATCH', options);
};

export const useSecurePatch = (url, options = {}) => {
  return useSecurePostPutPatch(url, 'PATCH', options);
};
