import {
  AnonymousObject,
  DefaultService,
  get,
  isFalse,
  isMobile,
  isTrue,
  reducer,
  service,
  set,
} from 'onekijs-framework';
import React, { MutableRefObject } from 'react';
import { clearSelection, forceCursor, getTranslateXY } from '../../utils/dom';
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
import { isAreaInColumn, isAreaInRow } from './utils/dashboardArea';
import { getCollapseKey, getFloatingKey } from './utils/dashboardLength';

@service
export class DashboardService extends DefaultService<DashboardState> {
  protected areas: DashboardArea[][] = [
    ['none', 'none', 'none'],
    ['none', 'none', 'none'],
    ['none', 'none', 'none'],
  ];

  public refs: AnonymousObject<MutableRefObject<HTMLDivElement | null> | null | undefined> = {}

  @reducer
  collapse(area: DashboardArea | 'all', collapse = true): void {
    if (area === 'all') {
      ['left', 'right', 'header', 'footer'].forEach((area) => {
        set<any>(this.state, `${area}.${this._getCollapseKey()}`, collapse);
      });
    } else {
      set<any>(this.state, `${area}.${this._getCollapseKey()}`, collapse);
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

  getRef(area: 'left' | 'right' | 'header' | 'footer' | 'body' | 'container'): React.MutableRefObject<HTMLDivElement | null> | null | undefined {
    return this.refs[area];
  }

  getVerticalPanel(area: 'left' | 'right'): DashboardVerticalPanel | undefined {
    return this.state[area];
  }

  @reducer
  initBodyPanel(_props: DashboardBodyPanelProps): void {
    this.areas[1][1] = 'body';
    this.state.body = { };
    this._compileAreas();
  }

  @reducer
  initContainer(ref: React.MutableRefObject<HTMLDivElement | null>): void {
    this.state.container = { ref };
  }

  @reducer
  initHorizontalPanel(
    area: 'footer' | 'header',
    props: DashboardHorizontalPanelProps,
  ): void {
    const dashboardPanel: DashboardHorizontalPanel = {
      area,
      className: props.className || '',
      collapseHeight: props.collapseHeight ?? '50px',
      collapseLarge: props.collapseLarge ?? props.collapse ?? false,
      collapseMedium: props.collapseMedium ?? props.collapse ?? true,
      collapseSmall: props.collapseSmall ?? props.collapse ?? true,
      floatingLarge: props.floatingLarge ?? props.floating ?? false,
      floatingMedium: props.floatingMedium ?? props.floating ?? false,
      floatingSmall: props.floatingSmall ?? props.floating ?? true,
      minHeight: props.minHeight ?? 0,
      height: props.height ?? '70px',
      maxHeight: props.maxHeight ?? 0,
      resizable: props.resizable || false,
      resizerGap: props.resizerGap || 0,
    };
    this.state[area] = dashboardPanel;
    this._fillRow(area === 'header' ? 0 : 2, area);
  }

  @reducer
  initVerticalPanel(
    area: 'left' | 'right',
    props: DashboardVerticalPanelProps,
  ): void {
    const dashboardPanel: DashboardVerticalPanel = {
      area,
      className: props.className || '',
      collapseLarge: props.collapseLarge ?? props.collapse ?? false,
      collapseMedium: props.collapseMedium ?? props.collapse ?? true,
      collapseSmall: props.collapseSmall ?? props.collapse ?? true,
      collapseWidth: props.collapseWidth ?? '50px',
      floatingLarge: props.floatingLarge ?? props.floating ?? false,
      floatingMedium: props.floatingMedium ?? props.floating ?? false,
      floatingSmall: props.floatingSmall ?? props.floating ?? true,
      minWidth: props.minWidth ?? 0,
      maxWidth: props.maxWidth ?? 0,
      width: props.width ?? '200px',
      resizable: props.resizable || false,
      resizerGap: props.resizerGap || 0,
    };
    this.state[area] = dashboardPanel;
    this._fillColumn(area === 'left' ? 0 : 2, area);
  }

  @reducer
  resizeHeight(area: DashboardHorizontalArea, nextHeight: number, step: ResizeStep): void {
    const panel = this.state[area];
    const panelRef = this.refs[area];
    if (panel) {
      const maxHeight = parseInt(`${panel.maxHeight}`);
      const minHeight = parseInt(`${panel.minHeight}`);
      if (maxHeight > 0 && nextHeight > maxHeight) return;
      if (minHeight > 0 && nextHeight < minHeight) return;
    }
    const left = this.state.left;
    const right = this.state.right;
    const body = this.state.body;
    const header = this.state.header;
    const footer = this.state.footer;
    const elements: AnonymousObject<HTMLDivElement | undefined> = {};
    elements['panel'] = panel !== undefined && panelRef && panelRef.current !== null ? panelRef.current : undefined;
    elements['body'] = body !== undefined && this.refs.body && this.refs.body.current !== null ? this.refs.body.current : undefined;
    // only touch the left panel if it's at the footer of the header panel or at the header of the footer panel
    elements['left'] =
      isAreaInColumn('first', area, this.state.areas) && left !== undefined && this.refs.left && this.refs.left.current !== null
        ? this.refs.left.current
        : undefined;
    // only touch the right panel if it's at the footer of the header panel or at the header of the footer panel
    elements['right'] =
      isAreaInColumn('last', area, this.state.areas) && right !== undefined && this.refs.right && this.refs.right.current !== null
        ? this.refs.right.current
        : undefined;

    elements['header'] = header !== undefined && this.refs.header && this.refs.header.current !== null ? this.refs.header.current : undefined;
    elements['footer'] = footer !== undefined && this.refs.footer && this.refs.footer.current !== null ? this.refs.footer.current : undefined;

    switch (step) {
      case 'start':
        // deactivate transition animation during the resize
        clearSelection();
        forceCursor('n-resize');
        ['panel', 'body', 'left', 'right'].forEach((_area) => {
          const el = elements[_area];
          if (el) el.style.transition = 'none';
        });
        break;
      case 'stop':
        forceCursor(undefined);
        // set the new height in the panel object. Will be used by styled to set the correct height via CSS
        if (panel) panel.height = `${nextHeight}px`;
        // remove any style added during the resize and let styled managed height and height via CSS
        ['panel', 'body', 'left', 'right'].forEach((_area) => {
          const el = elements[_area];
          if (el) {
            ['transition', 'height', 'transform'].forEach((k) => {
              el.style[k as any] = '';
            });
          }
        });
        break;
      case 'run':
        if (elements['panel']) {
          // force the new height via the style
          elements['panel'].style.height = `${nextHeight}px`;
          // if the resized panel is the footer one, we must translateX the panel in addition of changing the size
          if (area === 'footer') {
            const translate = getTranslateXY(elements['panel']);
            elements['panel'].style.transform = `translate(${translate.x}px,-${nextHeight}px)`;
          }

          (['left', 'right', 'body'] as DashboardArea[]).forEach((_area) => {
            let height = '100%';
            const el = elements[_area];
            if (el) {
              if (!isAreaInColumn('first', _area, this.state.areas) && header && elements['header']) {
                // remove the header height
                height = `${height} - ${header[this._getFloatingKey()] ? 0 : elements['header'].offsetHeight}px`;
              }

              if (!isAreaInColumn('last', _area, this.state.areas) && footer && elements['footer']) {
                // remove the header height
                height = `${height} - ${footer[this._getFloatingKey()] ? 0 : elements['footer'].offsetHeight}px`;
              }

              el.style.height = height === '100%' ? height : `calc(${height})`;
              // If the resized panel is the header one, we must translateX non vertical panels in addition of changing the size
              if (area === 'header') {
                const translate = getTranslateXY(el);
                el.style.transform = `translate(${translate.x}px,${nextHeight}px)`;
              }
            }
          });
        }
        break;
    }
  }

  @reducer
  resizeWidth(area: DashboardVerticalArea, nextWidth: number, step: ResizeStep): void {
    const panel = this.state[area];
    const panelRef = this.refs[area];
    if (panel) {
      const maxWidth = parseInt(`${panel.maxWidth}`);
      const minWidth = parseInt(`${panel.minWidth}`);
      if (maxWidth > 0 && nextWidth > maxWidth) return;
      if (minWidth > 0 && nextWidth < minWidth) return;
    }
    const header = this.state.header;
    const footer = this.state.footer;
    const body = this.state.body;
    const left = this.state.left;
    const right = this.state.right;
    const elements: AnonymousObject<HTMLDivElement | undefined> = {};
    elements['panel'] = panel !== undefined && panelRef && panelRef.current !== null ? panelRef.current : undefined;
    elements['body'] = body !== undefined && this.refs.body && this.refs.body.current !== null ? this.refs.body.current : undefined;
    // only touch the header panel if it's at the right of the left panel or at the left of the right panel
    elements['header'] =
      isAreaInRow('first', area, this.state.areas) && header !== undefined && this.refs.header && this.refs.header.current !== null
        ? this.refs.header.current
        : undefined;
    // only touch the footer panel if it's at the right of the left panel or at the left of the right panel
    elements['footer'] =
      isAreaInRow('last', area, this.state.areas) && footer !== undefined && this.refs.footer && this.refs.footer.current !== null
        ? this.refs.footer.current
        : undefined;

    elements['left'] = left !== undefined && this.refs.left && this.refs.left.current !== null ? this.refs.left.current : undefined;
    elements['right'] = right !== undefined && this.refs.right && this.refs.right.current !== null ? this.refs.right.current : undefined;

    switch (step) {
      case 'start':
        clearSelection();
        forceCursor('e-resize');
        // deactivate transition animation during the resize
        ['panel', 'body', 'header', 'footer'].forEach((_area) => {
          const el = elements[_area];
          if (el) el.style.transition = 'none';
        });
        break;
      case 'stop':
        forceCursor(undefined);
        // set the new width in the panel object. Will be used by styled to set the correct width via CSS
        if (panel) panel.width = `${nextWidth}px`;
        // remove any style added during the resize and let styled managed width and height via CSS
        ['panel', 'body', 'header', 'footer'].forEach((_area) => {
          const el = elements[_area];
          if (el) {
            ['transition', 'width', 'transform'].forEach((k) => {
              el.style[k as any] = '';
            });
          }
        });
        break;
      case 'run':
        if (elements['panel']) {
          // force the new width via the style
          elements['panel'].style.width = `${nextWidth}px`;
          // if the resized panel is the right one, we must translateX the panel in addition of changing the size
          if (area === 'right') {
            const translate = getTranslateXY(elements['panel']);
            elements['panel'].style.transform = `translate(-${nextWidth}px,${translate.y}px)`;
          }

          (['header', 'footer', 'body'] as DashboardArea[]).forEach((_area) => {
            let width = '100%';
            const el = elements[_area];
            if (el) {
              if (!isAreaInColumn('first', _area, this.state.areas) && left && elements['left']) {
                // remove the left width
                width = `${width} - ${left[this._getFloatingKey()] ? 0 : elements['left'].offsetWidth}px`;
              }

              if (!isAreaInColumn('last', _area, this.state.areas) && right && elements['right']) {
                // remove the left width
                width = `${width} - ${right[this._getFloatingKey()] ? 0 : elements['right'].offsetWidth}px`;
              }

              el.style.width = width === '100%' ? width : `calc(${width})`;
              // If the resized panel is the left one, we must translateX non vertical panels in addition of changing the size
              if (area === 'left') {
                const translate = getTranslateXY(el);
                el.style.transform = `translate(${nextWidth}px,${translate.y}px)`;
              }
            }
          });
        }
        break;
    }
  }

  setRef(area: 'left' | 'right' | 'header' | 'footer' | 'body' | 'container', ref: React.MutableRefObject<HTMLDivElement | null> | null | undefined): void  {
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
  _compileAreas(): void {
    const clone = (items: any) => items.map((item: any) => (Array.isArray(item) ? clone(item) : item));
    const dashboardAreas: DashboardArea[][] = clone(this.areas);

    if (!this.state.right) {
      // drop last column
      [0, 1, 2].forEach((i) => dashboardAreas[i].splice(2, 1));
    }

    if (!this.state.left) {
      // drop first column
      [0, 1, 2].forEach((i) => dashboardAreas[i].splice(0, 1));
    }

    if (!this.state.footer) {
      dashboardAreas.splice(2, 1);
    }

    if (!this.state.header) {
      dashboardAreas.splice(0, 1);
    }
    this.state.areas = dashboardAreas;
  }

  // When a "column" area component is found as a child of the dashboard component, it tries to take the maximum of space
  // If the left component is found first, it will take the thre areas of the first column
  // If the left component if found after the header component, it will only take the second and third cell of the first column
  @reducer
  _fillColumn(colIndex: number, area: DashboardVerticalArea): void {
    const areas = this.areas;
    areas.forEach((row, rowIndex) => {
      if (row[colIndex] === 'none') {
        areas[rowIndex][colIndex] = area;
      }
    });
    this._compileAreas();
  }

  _getCollapseKey(): 'collapseSmall' | 'collapseMedium' | 'collapseLarge' {
    return getCollapseKey(this._getSize());
  }

  _getFloatingKey(): 'floatingSmall' | 'floatingMedium' | 'floatingLarge' {
    return getFloatingKey(this._getSize());
  }

  _getSize(): DashboardSize {
    if (!this.state.container || !this.refs.container?.current) {
      return isMobile() ? 'small' : 'large';
    }
    const dashboardWidth = this.refs.container.current.offsetWidth;
    if (dashboardWidth < 768) return 'small';
    if (dashboardWidth < 992) return 'medium';
    return 'large';
  }

  // When a "row" area component is found as a child of the dashboard component, it tries to take the maximum of space
  // If the header component is found first, it will take the thre areas of the first row
  // If the header component if found after the left component, it will only take the second and third cell of the first row
  @reducer
  _fillRow(rowIndex: number, area: DashboardHorizontalArea): void {
    const areas = this.areas;
    areas[rowIndex].forEach((cell, colIndex) => {
      if (cell === 'none') {
        areas[rowIndex][colIndex] = area;
      }
    });
    this._compileAreas();
  }
}
