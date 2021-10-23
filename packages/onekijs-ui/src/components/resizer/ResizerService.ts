import { cancel, delay, fork } from '@redux-saga/core/effects';
import { Task } from '@redux-saga/types';
import { DefaultService, reducer, saga, SagaEffect, service, useService } from 'onekijs';
import { clearSelection, markBodyAsSelectable, markBodyAsUnselectable } from '../../utils/dom';
import { ResizerHandle, ResizerHandler, ResizerState } from './typings';

@service
export class ResizerService extends DefaultService<ResizerState> {
  protected hoverTask: Task | null = null;
  protected currentHandle?: ResizerHandle;

  @reducer
  setSize(width: number, height: number, lastX: number, lastY: number): void {
    this.state.width = width;
    this.state.height = height;
    this.state.lastX = lastX;
    this.state.lastY = lastY;
    this.state.handler('run', width, height);
  }

  @reducer
  setHover(hover: boolean): void {
    console.log('setHover', hover);
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

  @saga(SagaEffect.Latest)
  *onResize(e: MouseEvent) {
    if (
      this.state.lastX !== undefined &&
      this.state.lastY !== undefined &&
      this.state.width !== undefined &&
      this.state.height !== undefined &&
      this.currentHandle !== undefined
    ) {
      const diffX = e.screenX - this.state.lastX;
      const diffY = e.screenY - this.state.lastY;
      const isEast = ['e', 'ne', 'se'].includes(this.currentHandle);
      const isNorth = ['n', 'ne', 'nw'].includes(this.currentHandle);
      const nextWidth = this.state.width + (isEast ? diffX : -diffX);
      const nextHeight = this.state.height + (isNorth ? -diffY : diffY);
      yield this.setSize(nextWidth, nextHeight, e.screenX, e.screenY);
    }
  }

  @reducer
  startResize(handle: ResizerHandle, target: React.RefObject<HTMLDivElement>, x: number, y: number): void {
    this.currentHandle = handle;
    this.state.active = true;
    this.state.lastX = x;
    this.state.lastY = y;
    if (target.current !== null) {
      this.state.width = target.current.offsetWidth;
      this.state.height = target.current.offsetHeight;
      this.state.handler('start', this.state.width, this.state.height);
    }
    clearSelection();
    markBodyAsUnselectable();
    document.addEventListener('mouseup', this.stopResize);
  }

  @reducer
  stopResize(): void {
    this.currentHandle = undefined;
    console.log('onStop');
    document.removeEventListener('mouseup', this.stopResize);
    markBodyAsSelectable();
    // ensure that the resize is active
    this.state.active = false;
    this.state.lastX = undefined;
    this.state.lastY = undefined;
    if (this.state.width !== undefined && this.state.height !== undefined) {
      this.state.handler('stop', this.state.width, this.state.height);
    }
  }
}

export const useResizerService = (handler: ResizerHandler): [ResizerState, ResizerService] => {
  return useService(ResizerService, { handler } as ResizerState);
};
