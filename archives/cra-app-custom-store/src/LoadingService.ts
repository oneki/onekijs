/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// Example of a very simple service that can set a loading state

import { call, delay } from '@redux-saga/core/effects';
import { AnyState, DefaultGlobalService, reducer, saga, SagaEffect, service, useGlobalService } from 'onekijs';
import { Settings } from './settings';

export interface LoadingState extends AnyState {
  loading: boolean;
}

// This service is a global service, it means that it's instantied only once
@service
export class LoadingService extends DefaultGlobalService<LoadingState> {
  @reducer
  setLoading(loading: boolean): void {
    this.state.loading = loading;
  }

  @saga(SagaEffect.Latest)
  *load() {
    const settings = this.context.settings as Settings;
    yield call(this.setLoading, true);
    yield delay(settings.loadingDelay);
    yield call(this.setLoading, false);
  }
}

export const useLoadingService = (): LoadingService => {
  return useGlobalService(LoadingService);
};
