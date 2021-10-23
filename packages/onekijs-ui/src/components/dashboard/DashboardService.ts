import { DefaultService, get, isFalse, isMobile, isTrue, reducer, service, set } from 'onekijs';
import React from 'react';
import { getTranslateXY } from '../../utils/dom';
import { ResizeStep } from '../resizer/typings';
import {
  DashboardArea,
  DashboardBodyPanel,
  DashboardBodyPanelProps,
  DashboardHorizontalArea,
  DashboardHorizontalPanel,
  DashboardHorizontalPanelProps,
  DashboardState,
  DashboardVerticalArea,
  DashboardVerticalPanel,
  DashboardVerticalPanelProps,
} from './typings';
import { isAreaInColumn, isAreaInRow } from './utils/dashboardArea';

@service
export class DashboardService extends DefaultService<DashboardState> {
  protected areas: DashboardArea[][] = [
    ['none', 'none', 'none'],
    ['none', 'none', 'none'],
    ['none', 'none', 'none'],
  ];

  @reducer
  collapse(area: DashboardArea | 'all'): void {
    if (area === 'all') {
      ['left', 'right', 'header', 'footer'].forEach((area) => {
        set(this.state, `${area}.collapse`, true);
      });
    } else {
      set(this.state, `${area}.collapse`, true);
    }
  }

  @reducer
  expand(area: DashboardArea): void {
    set(this.state, `${area}.collapse`, false);
  }

  getBodyPanel(): DashboardBodyPanel | undefined {
    return this.state.body;
  }

  getHorizontalPanel(area: 'footer' | 'header'): DashboardHorizontalPanel | undefined {
    return this.state[area];
  }

  getVerticalPanel(area: 'left' | 'right'): DashboardVerticalPanel | undefined {
    return this.state[area];
  }

  @reducer
  initBodyPanel(_props: DashboardBodyPanelProps, ref: React.RefObject<HTMLDivElement>): void {
    this.areas[1][1] = 'body';
    this.state.body = { ref };
    this._compileAreas();
  }

  @reducer
  initHorizontalPanel(
    area: 'footer' | 'header',
    props: DashboardHorizontalPanelProps,
    ref: React.RefObject<HTMLDivElement>,
  ): void {
    const dashboardPanel: DashboardHorizontalPanel = {
      area,
      collapse: props.initialCollapse ?? isMobile(),
      collapseHeight: props.initialCollapseHeight ?? '50px',
      floating: props.initialFloating || isMobile(),
      height: props.initialHeight ?? '200px',
      ref,
    };
    this.state[area] = dashboardPanel;
    this._fillRow(area === 'header' ? 0 : 2, area);
  }

  @reducer
  initVerticalPanel(
    area: 'left' | 'right',
    props: DashboardVerticalPanelProps,
    ref: React.RefObject<HTMLDivElement>,
  ): void {
    const dashboardPanel: DashboardVerticalPanel = {
      area,
      collapse: props.initialCollapse ?? isMobile(),
      collapseWidth: props.initialCollapseWidth ?? '50px',
      floating: props.initialFloating || isMobile(),
      width: props.initialWidth ?? '200px',
      ref,
    };
    this.state[area] = dashboardPanel;
    this._fillColumn(area === 'left' ? 0 : 2, area);
  }

  @reducer
  resizeHeight(area: DashboardHorizontalArea, nextHeight: number, step: ResizeStep): void {
    const panel = this.state[area];
    const left = this.state.left;
    const right = this.state.right;
    const body = this.state.body;
    const panelElement = panel !== undefined && panel.ref.current !== null ? panel.ref.current : undefined;
    const bodyElement = body !== undefined && body.ref.current !== null ? body.ref.current : undefined;
    // only touch the left panel if it's under the header panel or above the footer panel
    const leftElement =
      isAreaInColumn('first', area, this.state.areas) && left !== undefined && left.ref.current !== null
        ? left.ref.current
        : undefined;
    // only touch the right panel if it's under the header panel or above the footer panel
    const rightElement =
      isAreaInColumn('last', area, this.state.areas) && right !== undefined && right.ref.current !== null
        ? right.ref.current
        : undefined;

    switch (step) {
      case 'start':
        // deactivate transition animation during the resize
        [panelElement, bodyElement, leftElement, rightElement].forEach((el) => {
          if (el) el.style.transition = 'none';
        });
        break;
      case 'stop':
        // set the new height in the panel object. Will be used by styled to set the correct height via CSS
        if (panel) panel.height = `${nextHeight}px`;
        // remove any style added during the resize and let styled managed height and height via CSS
        [panelElement, bodyElement, leftElement, rightElement].forEach((el) => {
          if (el) {
            ['transition', 'height', 'transform'].forEach((k) => {
              el.style[k as any] = '';
            });
          }
        });
        break;
      case 'run':
        if (panelElement) {
          // calculate the difference between the next height and the current height
          const incrementHeight = nextHeight - panelElement.offsetHeight;
          // force the new height via the style
          panelElement.style.height = `${nextHeight}px`;
          // if the resized panel is the footer one, we must translateY the panel in addition of changing the size
          if (area === 'footer') {
            const translate = getTranslateXY(panelElement);
            panelElement.style.transform = `translate(${translate.x}px,${translate.y - incrementHeight}px)`;
          }

          [bodyElement, leftElement, rightElement].forEach((el) => {
            if (el) {
              // We must adapt the size of non horizontal panels if they are impacted by the resize
              el.style.height = `${el.offsetHeight - incrementHeight}px`;
              // If the resized panel is the header one, we must translateY non horizontal panels in addition of changing the size
              if (area === 'header') {
                const translate = getTranslateXY(el);
                el.style.transform = `translate(${translate.x}px,${translate.y + incrementHeight}px)`;
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
    const header = this.state.header;
    const footer = this.state.footer;
    const body = this.state.body;
    const panelElement = panel !== undefined && panel.ref.current !== null ? panel.ref.current : undefined;
    const bodyElement = body !== undefined && body.ref.current !== null ? body.ref.current : undefined;
    // only touch the header panel if it's at the right of the left panel or at the left of the right panel
    const headerElement =
      isAreaInRow('first', area, this.state.areas) && header !== undefined && header.ref.current !== null
        ? header.ref.current
        : undefined;
    // only touch the footer panel if it's at the right of the left panel or at the left of the right panel
    const footerElement =
      isAreaInRow('last', area, this.state.areas) && footer !== undefined && footer.ref.current !== null
        ? footer.ref.current
        : undefined;

    switch (step) {
      case 'start':
        // deactivate transition animation during the resize
        [panelElement, bodyElement, headerElement, footerElement].forEach((el) => {
          if (el) el.style.transition = 'none';
        });
        break;
      case 'stop':
        // set the new width in the panel object. Will be used by styled to set the correct width via CSS
        if (panel) panel.width = `${nextWidth}px`;
        // remove any style added during the resize and let styled managed width and height via CSS
        [panelElement, bodyElement, headerElement, footerElement].forEach((el) => {
          if (el) {
            ['transition', 'width', 'transform'].forEach((k) => {
              el.style[k as any] = '';
            });
          }
        });
        break;
      case 'run':
        if (panelElement) {
          // calculate the difference between the next width and the current width
          const incrementWidth = nextWidth - panelElement.offsetWidth;
          // force the new width via the style
          panelElement.style.width = `${nextWidth}px`;
          // if the resized panel is the right one, we must translateX the panel in addition of changing the size
          if (area === 'right') {
            const translate = getTranslateXY(panelElement);
            panelElement.style.transform = `translate(${translate.x - incrementWidth}px,${translate.y}px)`;
          }

          [bodyElement, headerElement, footerElement].forEach((el) => {
            if (el) {
              // We must adapt the size of non vertical panels if they are impacted by the resize
              el.style.width = `${el.offsetWidth - incrementWidth}px`;
              // If the resized panel is the left one, we must translateX non vertical panels in addition of changing the size
              if (area === 'left') {
                const translate = getTranslateXY(el);
                el.style.transform = `translate(${translate.x + incrementWidth}px,${translate.y}px)`;
              }
            }
          });
        }
        break;
    }
  }

  showOverlay(): boolean {
    let result = false;
    const areas: ('right' | 'left' | 'header' | 'footer')[] = ['right', 'left', 'header', 'footer'];
    areas.forEach((area) => {
      if (isTrue(this.state[area]?.floating) && isFalse(this.state[area]?.collapse)) {
        result = true;
      }
    });
    return result;
  }

  @reducer
  toggle(area: DashboardArea): void {
    let collapse = get<boolean | 'auto'>(this.state, `${area}.collapse`, 'auto');
    let floating = get<boolean | 'auto'>(this.data, `${area}.floating`, 'auto');
    if (floating === 'auto') {
      floating = isMobile();
    }
    if (collapse === 'auto') {
      collapse = floating ? true : false;
    }
    set(this.state, `${area}.collapse`, !collapse);
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
