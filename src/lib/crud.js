import { useEffect, useRef, useCallback } from "react";
import { notificationService } from "./notification";
import { every } from "./saga";
import { useLocalService } from "./service";
import { useReduxSelector } from "./store";
import { shallowEqual } from "./utils/object";
import { asyncHttp } from "./xhr";
import { call, delay, fork, cancel } from "redux-saga/effects";

function* delayLoading(delay_ms) {
  try {
    yield delay(delay_ms);
    yield call(this.setLoading, true);
  } finally {
  }
}

const Service = {
  reducers: {
    setLoading: (state, isLoading) => {
      console.log('set loading to', isLoading);
      state.loading = isLoading;
    },
    fetchSuccess: (state, result) => {
      console.log('set loading to', false);
      state.result = result;
      state.loading = false;
    }
  },
  sagas: {
    fetch: every(function*({url, method, body=null, options={}}, { router }) {
      try {
        //yield call(this.setLoading, true); // to update the store and trigger a re-render with a loading indicator
        const loadingTask = yield fork([this,delayLoading], options.delayLoading || 200);
        const result = yield call(
          asyncHttp,
          url,
          method,
          body,
          options
        );
        yield cancel(loadingTask);
        yield call(this.fetchSuccess, result); // to update the store and trigger a re-render.
        const onSuccess = options.onSuccess;
        if (onSuccess) {
          if (typeof onSuccess === "string") {
            // onSuccess is a URL -> redirect to this one
            yield call([router, router.push], onSuccess);
          } else {
            yield call(options.onSuccess, result);
          }
        }
      } catch (e) {
        yield call(this.setLoading, false);
        const onError = options.onError;
        if (onError) {
          if (typeof onError === "string") {
            // onError is a URL -> redirect to this one
            yield call([router, router.push], onError);
          } else {
            yield call(onError, e);
          }
        } else {
          yield call(this.notificationService.error, e);
        }
      }
    })
  },
  inject: {
    notificationService
  }
};

export const useGet = (url, options = {}) => {
  const ref = useRef(options);
  if (shallowEqual(ref.current, options)) {
    options = ref.current;
  } else {
    ref.current = options;
  }

  const [state, service] = useLocalService(Service, { loading: false });
  
  const refresh = useCallback(() => {
    if (url) {
      service.fetch({ url, method: "GET", options });
    }
    
  }, [url, service, options]);

  useEffect(() => {
    refresh();
  }, [refresh]);
  return [state.result, state.loading, refresh];
};

export const useSecureGet = (url, options = {}) => {
  const authKey = useReduxSelector("settings.auth.key", "auth");
  const auth = useReduxSelector(authKey);
  options.auth = auth;
  return useGet(url, options);
};

export const useDelete = (url, options = {}) => {
  const ref = useRef(options);
  if (shallowEqual(ref.current, options)) {
    options = ref.current;
  } else {
    ref.current = options;
  }

  const [state, service] = useLocalService(Service, { loading: false });

  const executor = useCallback(
    (extraOptions = {}) => {
      extraOptions = Object.assign({}, options, extraOptions);
      service.fetch({
        url: extraOptions.url || url,
        method: "DELETE",
        options: extraOptions
      });
    },
    [service, url, options]
  );

  return [executor, state.loading];
};

export const useSecureDelete = (url, options = {}) => {
  const authKey = useReduxSelector("settings.auth.key", "auth");
  const auth = useReduxSelector(authKey);
  options.auth = auth;
  return useDelete(url, options);
};

export const usePostPutPatch = (url, method, options = {}) => {
  const ref = useRef(options);
  if (shallowEqual(ref.current, options)) {
    options = ref.current;
  } else {
    ref.current = options;
  }
  const [state, service] = useLocalService(Service, { loading: false });
  const executor = useCallback(
    (body, extraOptions = {}) => {
      extraOptions = Object.assign({}, options, extraOptions);
      service.fetch({
        url: extraOptions.url || url,
        method,
        body,
        options: extraOptions
      });
    },
    [service, url, method, options]
  );

  return [executor, state.loading];
};

export const useSecurePostPutPatch = (url, method, options = {}) => {
  const authKey = useReduxSelector("settings.auth.key", "auth");
  const auth = useReduxSelector(authKey);
  options.auth = auth;
  return usePostPutPatch(url, method, options);
};

export const usePost = (url, options = {}) => {
  return usePostPutPatch(url, "POST", options);
};

export const useSecurePost = (url, options = {}) => {
  return useSecurePostPutPatch(url, "POST", options);
};

export const usePut = (url, options = {}) => {
  return usePostPutPatch(url, "PUT", options);
};

export const useSecurePut = (url, options = {}) => {
  return useSecurePostPutPatch(url, "PUT", options);
};

export const usePatch = (url, options = {}) => {
  return usePostPutPatch(url, "PATCH", options);
};

export const useSecurePatch = (url, options = {}) => {
  return useSecurePostPutPatch(url, "PATCH", options);
};
