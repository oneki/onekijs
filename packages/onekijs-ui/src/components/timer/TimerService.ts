import { DefaultService, reducer, saga, SagaEffect, service } from 'onekijs-framework';
import { delay, spawn } from 'redux-saga/effects';
import { TimerState } from './typings';

@service
export class TimerService extends DefaultService<TimerState> {
  protected initialState: TimerState | undefined;

  init(): void {
    this.initialState = this.state;
  }

  @reducer
  reset(): void {
    if (this.initialState) {
      this.state = this.initialState;
    }
  }

  @reducer
  setTTL(ttlMs: number): void {
    this.state.ttlMs = ttlMs;
  }

  @saga(SagaEffect.Leading)
  *start() {
    if (this.state.status !== 'started') {
      yield this._setStatus('started');
      yield spawn([this, this._run]);
    }
  }

  @reducer
  stop(): void {
    this._setStatus('stopped');
  }

  @reducer
  protected _setStatus(status: 'started' | 'stopped') {
    this.state.status = status;
  }

  @saga(SagaEffect.Leading)
  protected *_run() {
    while (this.state.ttlMs >= 0 && this.state.status === 'started') {
      yield delay(100);
      const nextTTL = Math.max(0, this.state.ttlMs - 100);
      yield this.setTTL(nextTTL);
      if (nextTTL === 0) {
        yield this.stop();
        break;
      }
    }
  }
}
