import {
  AnonymousObject,
  DefaultService,
  get,
  isFalse,
  isMobile,
  isTrue,
  reducer,
  saga,
  SagaEffect,
  service,
  set,
} from 'onekijs-framework';
import React, { MutableRefObject, ReactNode } from 'react';
import { ResizeStep } from '../resizer/typings';
import {
  DashboardArea,
  DashboardBodyPanel,
  DashboardBodyPanelProps,
  DashboardHorizontalArea,
  DashboardHorizontalPanel,
  DashboardHorizontalPanelProps,
  DashboardSize,
  DashboardState,
  DashboardVerticalArea,
  DashboardVerticalPanel,
  DashboardVerticalPanelProps,
} from './typings';
import { getCollapseKey, getFloatingKey } from './utils/dashboardLength';
import { delay } from 'redux-saga/effects';

export const isHorizontalPanel = (panel: any): panel is DashboardHorizontalPanel => {
  return get(panel, 'height') !== undefined;
}

export const isVerticalPanel = (panel: any): panel is DashboardVerticalPanel => {
  return get(panel, 'width') !== undefined;
}

@service
export class DashboardService extends DefaultService<DashboardState> {
  protected areas: DashboardArea[][] = [
    ['none', 'none', 'none'],
    ['none', 'none', 'none'],
    ['none', 'none', 'none'],
  ];

  public refs: AnonymousObject<MutableRefObject<HTMLDivElement | null> | null | undefined> = {};

  @reducer
  clearContent(area: DashboardHorizontalArea | DashboardVerticalArea): void {
    set<any>(this.state, `${area}.content`, undefined);
  }

  @saga(SagaEffect.Latest)
  *collapse(area: DashboardHorizontalArea | DashboardVerticalArea | 'all', collapse = true) {
    let areas: (DashboardHorizontalArea|DashboardVerticalArea)[] = area === 'all' ? ['left', 'right', 'header', 'footer'] : [area];

    for (const area of areas) {
      const panel = get(this.state, area);
      // if the size is auto, we first need to set the hardcode the size in the html (to activate the animation)
      let fixed = false;
      if (panel?.animation) {
        fixed = yield this._fixPanelSize(area);
        yield delay(1);
      }

      yield this._setCollapse(area, collapse);

      if (panel?.animation) {
        yield this._setExpanding(area, !collapse);
        yield this._setCollapsing(area, collapse);
        yield delay(panel.animation);
        if (collapse && this.state[area]?.collapsing) {
          yield this._setCollapsing(area, false);
        } else if (!collapse && this.state[area]?.expanding) {
          yield this._setExpanding(area, false);
          if (fixed) {
            yield this._unfixPanelSize(area);
          }
        }

      }
    }
  }

  @reducer
  collapseFloating(): void {
    ['left', 'right', 'header', 'footer'].forEach((area) => {
      const panel = this.state[area as 'left' | 'right' | 'header' | 'footer'];
      if (panel && panel[this._getFloatingKey()]) {
        panel[this._getCollapseKey()] = true;
      }
    });
  }

  @reducer
  destroyPanel(area: 'left' | 'right' | 'header' | 'footer' | 'body' | 'container'): void {
    this.refs[area] = null;
  }

  @reducer
  float(area: DashboardArea | 'all', float = true): void {
    if (area === 'all') {
      ['left', 'right', 'header', 'footer'].forEach((area) => {
        set<any>(this.state, `${area}.${this._getFloatingKey()}`, float);
      });
    } else {
      set<any>(this.state, `${area}.${this._getFloatingKey()}`, float);
    }
  }

  getBodyPanel(): DashboardBodyPanel | undefined {
    return this.state.body;
  }

  getHorizontalPanel(area: 'footer' | 'header'): DashboardHorizontalPanel | undefined {
    return this.state[area];
  }

  getRef(
    area: 'left' | 'right' | 'header' | 'footer' | 'body' | 'container',
  ): React.MutableRefObject<HTMLDivElement | null> | null | undefined {
    return this.refs[area];
  }

  getVerticalPanel(area: 'left' | 'right'): DashboardVerticalPanel | undefined {
    return this.state[area];
  }

  @reducer
  initBodyPanel(_props: DashboardBodyPanelProps): void {
    this.state.body = {};
  }

  @reducer
  initContainer(ref: React.MutableRefObject<HTMLDivElement | null>): void {
    this.state.container = { };
    this.refs.container = ref;
  }

  @reducer
  initHorizontalPanel(area: 'footer' | 'header', props: DashboardHorizontalPanelProps): void {
    const dashboardPanel: DashboardHorizontalPanel = {
      animation: props.animation ?? 300,
      area,
      autoHeight: props.height === undefined || props.height === 'auto',
      backgroundColor: 'inherits',
      collapseHeight: props.collapseHeight ?? 0,
      collapseLarge: props.collapseLarge ?? props.collapse ?? false,
      collapseMedium: props.collapseMedium ?? props.collapse ?? true,
      collapseSmall: props.collapseSmall ?? props.collapse ?? true,
      collapsing: false,
      expanding: false,
      floatingLarge: props.floatingLarge ?? props.floating ?? false,
      floatingMedium: props.floatingMedium ?? props.floating ?? false,
      floatingSmall: props.floatingSmall ?? props.floating ?? true,
      minHeight: props.minHeight ?? 'none',
      height: props.height ?? 'auto',
      maxHeight: props.maxHeight ?? 'none',
      resizable: props.resizable || false,
      resizerGap: props.resizerGap || 0,
      resizing: false,
    };
    this.state[area] = dashboardPanel;
  }

  @reducer
  initVerticalPanel(area: 'left' | 'right', props: DashboardVerticalPanelProps): void {
    const dashboardPanel: DashboardVerticalPanel = {
      animation: props.animation ?? 300,
      area,
      autoWidth: props.width === undefined || props.width === 'auto',
      backgroundColor: 'inherits',
      collapseLarge: props.collapseLarge ?? props.collapse ?? false,
      collapseMedium: props.collapseMedium ?? props.collapse ?? true,
      collapseSmall: props.collapseSmall ?? props.collapse ?? true,
      collapseWidth: props.collapseWidth ?? 0,
      collapsing: false,
      expanding: false,
      floatingLarge: props.floatingLarge ?? props.floating ?? false,
      floatingMedium: props.floatingMedium ?? props.floating ?? false,
      floatingSmall: props.floatingSmall ?? props.floating ?? true,
      minWidth: props.minWidth ?? 0,
      maxWidth: props.maxWidth ?? 0,
      width: props.width ?? 'auto',
      resizable: props.resizable || false,
      resizerGap: props.resizerGap || 0,
      resizing: false,
    };
    this.state[area] = dashboardPanel;
  }

  isCollapse(area: 'left' | 'right' | 'header' | 'footer'): boolean {
    return get(this.state, `${area}.${this._getCollapseKey()}`, false);
  }

  isFloating(area: 'left' | 'right' | 'header' | 'footer'): boolean {
    return get(this.state, `${area}.${this._getFloatingKey()}`, false);
  }

  @saga(SagaEffect.Throttle, 100)
  *resizeHeight(area: DashboardHorizontalArea, nextHeight: number, step: ResizeStep) {
    if (step === 'start') {
      yield this.setPanelResizing(area, true);
    } else if (step === 'stop') {
      yield this.setPanelResizing(area, false);
    }
    yield this.setPanelHeight(area, nextHeight);
  }

  @saga(SagaEffect.Throttle, 50)
  *resizeWidth(area: DashboardVerticalArea, nextWidth: number, step: ResizeStep) {
    if (step === 'start') {
      yield this.setPanelResizing(area, true);
    } else if (step === 'stop') {
      yield this.setPanelResizing(area, false);
    }
    yield this.setPanelWidth(area, nextWidth);
  }

  @reducer
  setPanelHeight(area: DashboardHorizontalArea, height: number): void {
    const panel = this.state[area];
    if (panel) {
      panel.height = `${height}px`;
    }
  }

  @reducer
  setPanelResizing(area: DashboardVerticalArea | DashboardHorizontalArea, resizing: boolean): void {
    const panel = this.state[area];
    if (panel) {
      panel.resizing = resizing;
    }
  }

  @reducer
  setPanelWidth(area: DashboardVerticalArea, width: number): void {
    const panel = this.state[area];
    if (panel) {
      panel.width = `${width}px`;
    }
  }

  @reducer
  setContent(area: DashboardHorizontalArea | DashboardVerticalArea, content: ReactNode): void {
    set<any>(this.state, `${area}.content`, content);
  }

  setRef(
    area: 'left' | 'right' | 'header' | 'footer' | 'body' | 'container',
    ref: React.MutableRefObject<HTMLDivElement | null> | null | undefined,
  ): void {
    this.refs[area] = ref;
  }

  showOverlay(): boolean {
    let result = false;
    const areas: ('right' | 'left' | 'header' | 'footer')[] = ['right', 'left', 'header', 'footer'];
    areas.forEach((area) => {
      if (
        isTrue(get(this.state[area], this._getFloatingKey())) &&
        isFalse(get(this.state[area], this._getCollapseKey()))
      ) {
        result = true;
      }
    });
    return result;
  }

  @reducer
  toggle(area: DashboardArea | 'all'): void {
    const areas: DashboardArea[] = area === 'all' ? ['left', 'right', 'header', 'footer'] : [area];
    areas.forEach((area) => {
      const collapse: boolean = get<any>(this.state, `${area}.${this._getCollapseKey()}`, false);
      set<any>(this.state, `${area}.${this._getCollapseKey()}`, !collapse);
    });
  }

  @reducer
  _fixPanelSize(area: DashboardHorizontalArea | DashboardVerticalArea):  boolean {
    const panel = this.state[area];
    const ref = this.refs[area];
    if (ref && ref.current) {
      if (isHorizontalPanel(panel) && panel.height === 'auto') {
        panel.height = `${ref.current.offsetHeight}px`;
        return true;
      } else if(isVerticalPanel(panel) && panel.width === 'auto') {
        panel.width = `${ref.current.offsetWidth}px`;
        return true;
      }
    }

    return false;
  }

  @reducer
  _unfixPanelSize(area: DashboardHorizontalArea | DashboardVerticalArea):  void {
    const panel = this.state[area];
    if (isHorizontalPanel(panel) && panel.autoHeight) {
      panel.height = 'auto';
    } else if(isVerticalPanel(panel) && panel.autoWidth) {
      panel.width = 'auto';
    }
  }

  _getCollapseKey(): 'collapseSmall' | 'collapseMedium' | 'collapseLarge' {
    return getCollapseKey(this._getSize());
  }

  _getFloatingKey(): 'floatingSmall' | 'floatingMedium' | 'floatingLarge' {
    return getFloatingKey(this._getSize());
  }

  _getSize(): DashboardSize {
    if (!this.refs.container?.current) {
      return isMobile() ? 'small' : 'large';
    }
    const dashboardWidth = this.refs.container.current.offsetWidth;

    if (dashboardWidth < 768) return 'small';
    if (dashboardWidth < 992) return 'medium';
    return 'large';
  }

  @reducer
  _setCollapse(area: DashboardArea, collapse: boolean): void {
    set<any>(this.state, `${area}.${this._getCollapseKey()}`, collapse);
  }

  @reducer
  _setCollapsing(area: DashboardArea, collapsing: boolean): void {
    set<any>(this.state, `${area}.collapsing`, collapsing);
  }

  @reducer
  _setExpanding(area: DashboardArea, expanding: boolean): void {
    set<any>(this.state, `${area}.expanding`, expanding);
  }

}
