import { DefaultGlobalService, inject, NotificationService, reducer, saga, SagaEffect, service } from 'onekijs-next';
import { delay } from 'redux-saga/effects';

export interface LoadingyState {
  // a flag to indicate if a request is in flight
  loading: boolean;
}

@service
export default class LoadingService extends DefaultGlobalService<LoadingyState> {
  notificationService = inject(NotificationService);

  @reducer
  setLoading(loading: boolean): void {
    // the state is immutable
    // however, the @reducer annotation allows updating the state
    // like any other object (thanks to immer)
    this.state.loading = loading;
  }

  @saga(SagaEffect.Latest)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *load(delayInMs: number) {
    try {
      yield this.setLoading(true);
      yield delay(delayInMs);
      yield this.setLoading(false);
    } catch (error) {
      yield this.setLoading(false);
      this.notificationService.error(error);
    }
  }
}
