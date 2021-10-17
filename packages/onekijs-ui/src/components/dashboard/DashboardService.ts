import { DefaultService, get, isFalse, isMobile, isTrue, reducer, service, set } from 'onekijs';
import React from 'react';
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
  initBodyPanel(_props: DashboardBodyPanelProps): void {
    this.areas[1][1] = 'body';
    this.state.body = {};
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

    this._fillRow(area === 'header' ? 0 : 2, area);

    this.state[area] = dashboardPanel;
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

    this._fillColumn(area === 'left' ? 0 : 2, area);

    this.state[area] = dashboardPanel;
  }

  @reducer
  resizeHeight(area: DashboardHorizontalArea, nextHeight: string | 0): void {
    const panel = this.state[area];
    if (panel !== undefined) {
      panel.height = nextHeight;
    }
  }

  @reducer
  resizeWidth(area: DashboardVerticalArea, nextWidth: number): void {
    const panel = this.state[area];
    if (panel !== undefined && panel.ref.current !== null) {
      console.log(panel.ref.current);
      panel.ref.current.style.width = `${nextWidth}px`;
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
