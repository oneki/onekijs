import { call, cancel, delay, fork } from 'redux-saga/effects';
import NotificationService from '../notification/NotificationService';
import LocalService from '../core/LocalService';
import { CrudState, FetchOptions } from './typings';
import { asyncHttp } from './utils';
import { reducer, saga } from '../core/annotations';
import { SagaEffect } from '../core/typings';

export default class CrudService<T = any> extends LocalService<CrudState> {
  protected notificationService: NotificationService;

  constructor(notificationService: NotificationService) {
    super();
    this.notificationService = notificationService;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *delayLoading(delay_ms: number) {
    yield delay(delay_ms);
    yield this.setLoading(true);
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  fetchSuccess(result: any): void {
    this.state.result = result;
    this.state.loading = false;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *fetch(url: string, method: string, body?: T, options: FetchOptions<T> = {}) {
    const { router } = this.context;
    let loadingTask = null;
    try {
      loadingTask = yield fork([this, this.delayLoading], options.delayLoading || 200);
      const result = yield asyncHttp(url, method, body, options);
      yield cancel(loadingTask);
      yield this.fetchSuccess(result); // to update the store and trigger a re-render.
      const onSuccess = options.onSuccess;
      if (onSuccess) {
        if (typeof onSuccess === 'string') {
          // onSuccess is a URL -> redirect to this one
          yield call([router, router.push], onSuccess);
        } else {
          yield onSuccess(result, this.context);
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
          yield onError(e, this.context);
        }
      } else {
        yield this.notificationService.error(e);
      }
    }
  }

  @reducer
  setLoading(isLoading: boolean): void {
    this.state.loading = isLoading;
  }
}
