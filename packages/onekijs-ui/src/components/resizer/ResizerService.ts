import { cancel, delay, fork } from '@redux-saga/core/effects';
import { Task } from '@redux-saga/types';
import { DefaultService, reducer, saga, SagaEffect, service, useService } from 'onekijs';
import { ResizerState } from './typings';

@service
export class ResizerService extends DefaultService<ResizerState> {
  protected hoverTask: Task | null = null;

  @reducer
  setSize(width: number, height: number): void {
    this.state.width = width;
    this.state.height = height;
  }

  @reducer
  setHover(hover: boolean): void {
    this.state.hover = hover;
  }

  *delayEnter(delay_ms: number) {
    yield delay(delay_ms);
    yield this.setHover(true);
  }

  @saga(SagaEffect.Every)
  *onEnter() {
    console.log('onEnter');
    this.hoverTask = yield fork([this, this.delayEnter], 250);
  }

  @saga(SagaEffect.Every)
  *onLeave() {
    console.log('onLeave');
    if (this.hoverTask !== null) {
      yield cancel(this.hoverTask);
    }
    this.setHover(false);
  }

  @saga(SagaEffect.Throttle, 100)
  *onResize(x: number, y: number) {
    if (
      this.state.lastX !== undefined &&
      this.state.lastY !== undefined &&
      this.state.width !== undefined &&
      this.state.height !== undefined
    ) {
      const nextWidth = this.state.width + (x - this.state.lastX);
      const nextHeight = this.state.height + (y - this.state.lastY);
      yield this.setSize(nextWidth, nextHeight);
    }
  }

  @reducer
  startResize(target: React.RefObject<HTMLDivElement>, x: number, y: number): void {
    console.log('onStart');
    // register the onMouseUp on the document
    document.addEventListener('mouseup', this.stopResize);
    this.state.active = true;
    if (target.current !== null) {
      this.state.width = target.current.offsetWidth;
      this.state.height = target.current.offsetHeight;
    }
    this.state.lastX = x;
    this.state.lastY = y;
  }

  @reducer
  stopResize(): void {
    console.log('onStop');
    document.removeEventListener('mouseup', this.stopResize);
    // ensure that the resize is active
    this.state.active = false;
    this.state.lastX = undefined;
    this.state.lastY = undefined;
  }
}

export const useResizerService = (): [ResizerState, ResizerService] => {
  return useService(ResizerService, {} as ResizerState);
};
