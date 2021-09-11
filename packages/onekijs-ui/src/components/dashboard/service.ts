import { DefaultService, get, isFalse, isMobile, isTrue, lcfirst, reducer, set, useService } from 'onekijs';
import React, { useContext } from 'react';
import { DashboardArea, DashboardPanel, DashboardPanelProps, DashboardState } from './typings';

class DashboardService extends DefaultService<DashboardState> {
  get areas(): (DashboardArea | 'none')[][] {
    if (this.state.areas) {
      return this.state.areas;
    }
    return [
      ['none', 'none', 'none'],
      ['none', 'none', 'none'],
      ['none', 'none', 'none'],
    ];
  }

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

  getPanel(area: DashboardArea): DashboardPanel | undefined {
    return this.state[area];
  }

  @reducer
  initPanels(panels: { area: DashboardArea; props: DashboardPanelProps }[]) {
    panels.forEach((panel) => {
      let defaultProps: DashboardPanelProps = {};

      switch (panel.area) {
        case 'left': {
          this._fillColumn(0, panel.area);
          defaultProps = {
            initialWidth: '200px',
            initialFloating: isMobile(),
            initialCollapse: 'auto',
            initialCollapseWidth: '50px',
          };
          break;
        }
        case 'right': {
          this._fillColumn(2, panel.area);
          defaultProps = {
            initialWidth: '200px',
            initialFloating: isMobile(),
            initialCollapse: 'auto',
            initialCollapseWidth: '50px',
          };
          break;
        }
        case 'header': {
          this._fillRow(0, panel.area);
          defaultProps = {
            initialFloating: isMobile(),
            initialCollapse: 'auto',
            initialCollapseHeight: 0,
            initialHeight: '50px',
          };
          break;
        }
        case 'footer': {
          this._fillRow(2, panel.area);
          defaultProps = {
            initialFloating: isMobile(),
            initialCollapse: 'auto',
            initialCollapseHeight: 0,
            initialHeight: '64px',
          };
          break;
        }
        case 'body': {
          this.areas[1][1] = 'body';
          break;
        }
        default:
          throw Error(
            'Unknown child for component Dashboard. Only DashboardHeader, DashboardFooter, DashboardLeft, DashboardRight and DashboardBody are supported as direct children of Dashboard',
          );
      }

      const dashboardPanel: DashboardPanel = {
        present: true,
      };

      const panelProps = Object.assign(defaultProps, panel.props);
      Object.keys(panelProps).forEach((k) => {
        if (k.startsWith('initial')) {
          (dashboardPanel as any)[lcfirst(k.substr(7))] = (panelProps as any)[k];
        }
      });

      this.state[panel.area] = dashboardPanel;
    });

    this.state.initialized = true;
  }

  showOverlay(): boolean {
    let result = false;
    const areas: DashboardArea[] = ['right', 'left', 'header', 'footer'];
    areas.forEach((area) => {
      if (isTrue(this.state[area]?.floating) && isFalse(this.state[area]?.collapse)) {
        result = true;
      }
    });
    return result;
  }

  @reducer
  toggle(area: DashboardArea) {
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

  // When a "column" area component is found as a child of the dashboard component, it tries to take the maximum of space
  // If the left component is found first, it will take the thre areas of the first column
  // If the left component if found after the header component, it will only take the second and third cell of the first column
  @reducer
  _fillColumn = (colIndex: number, area: DashboardArea) => {
    const areas = this.areas;
    areas.forEach((row, rowIndex) => {
      if (row[colIndex] === undefined) {
        this.area[rowIndex][colIndex] = area;
      }
    });
    this.state.areas = areas;
  };

  // When a "row" area component is found as a child of the dashboard component, it tries to take the maximum of space
  // If the header component is found first, it will take the thre areas of the first row
  // If the header component if found after the left component, it will only take the second and third cell of the first row
  @reducer
  _fillRow(rowIndex: number, area: DashboardArea): void {
    const areas = this.areas;
    areas[rowIndex].forEach((cell, colIndex) => {
      if (cell === undefined) {
        this.areas[rowIndex][colIndex] = area;
      }
    });
    this.state.areas = areas;
  }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const DashboardContext = React.createContext<DashboardService>(null!);

export const useDashboardService = (initialState: DashboardState = {}): [DashboardState, DashboardService] => {
  return useService(DashboardService, initialState);
};

export const useDashboardContext = (): DashboardService => {
  return useContext(DashboardContext);
};
