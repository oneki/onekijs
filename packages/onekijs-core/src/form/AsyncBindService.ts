import { Task } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { reducer, saga, service } from '../core/annotations';
import DefaultService from '../core/Service';
import { AnyFunction } from '../typings/core';
import { SagaEffect } from '../typings/saga';
import { AsyncBindState } from './typings';

@service
export default class AsyncBindService<T> extends DefaultService<AsyncBindState> {
  @reducer
  setLoading(isLoading: boolean): void {
    this.state.loading = isLoading;
  }

  @reducer
  success(result: T): void {
    this.state.result = result;
    this.state.loading = false;
    this.state.error = undefined;
  }

  @reducer
  error(error: Error): void {
    this.state.loading = false;
    this.state.error = error;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *execute(asyncMethod: AnyFunction<T>, dependencies: any[]) {
    try {
      const task: Task = yield this.forkAsyncBind(asyncMethod, dependencies);
      const error = task.error();
      if (error) {
        yield this.error(error);
      } else {
        yield this.success(task.result() as T);
      }
    } catch (e) {
      yield this.error(e);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *forkAsyncBind(asyncMethod: AnyFunction<T>, dependencies: any[]) {
    const task: Task = yield fork(asyncMethod, ...dependencies);
    const async = task.isRunning();
    if (async) {
      yield this.setLoading(true);
    }
    return task;
  }
}
