import { AnonymousObject, DefaultBasicError, FCC } from 'onekijs-framework';
import React, { Children, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { addClassname } from '../../../utils/style';
import { DashboardArea, DashboardContainerProps } from '../typings';
import DashboardBody from './DashboardBody';
import DashboardFooter from './DashboardFooter';
import DashboardHeader from './DashboardHeader';
import DashboardLeft from './DashboardLeft';
import DashboardRight from './DashboardRight';

export const getDashboardTemplate = (dashboardContainerProps: DashboardContainerProps): string => {
  const { areas, left, right, header, footer } = dashboardContainerProps;
  if (!areas) {
    return '';
  }
  const clone = (items: any) => items.map((item: any) => (Array.isArray(item) ? clone(item) : item));
  const rows: (0 | string)[] = [0, '1fr', 0];
  const cols: (0 | string)[] = [0, '1fr', 0];

  if (!right) {
    // drop last column
    cols.splice(2, 1);
  }

  if (!left) {
    // drop first column
    cols.splice(0, 1);
  }

  if (!footer) {
    rows.splice(2, 1);
  }

  if (!header) {
    rows.splice(0, 1);
  }

  return `
    grid-template-columns: ${cols.join(' ')};
    grid-template-rows: ${rows.join(' ')};
    grid-template-areas: "${areas.map((row) => row.join(' ')).join('" "')}";
  `;
};

class Matrix {
  private areas: DashboardArea[][] = [
    ['none', 'none', 'none'],
    ['none', 'none', 'none'],
    ['none', 'none', 'none'],
  ];
  private elements: AnonymousObject<
    React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
  > = {};

  fill(
    area: DashboardArea,
    element: React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>,
  ) {
    this.elements[area] = element;
    switch (area) {
      case 'header':
        for (let i = 0; i < 3; i++) {
          if (['none', 'body'].includes(this.areas[0][i])) {
            this.areas[0][i] = 'header';
          }
        }
        break;
      case 'footer':
        for (let i = 0; i < 3; i++) {
          if (['none', 'body'].includes(this.areas[2][i])) {
            this.areas[2][i] = 'footer';
          }
        }
        break;
      case 'left':
        for (let i = 0; i < 3; i++) {
          if (['none', 'body'].includes(this.areas[i][0])) {
            this.areas[i][0] = 'left';
          }
        }
        break;
      case 'right':
        for (let i = 0; i < 3; i++) {
          if (['none', 'body'].includes(this.areas[i][2])) {
            this.areas[i][2] = 'right';
          }
        }
        break;
      case 'body':
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (this.areas[i][j] === 'none') {
              this.areas[i][j] = 'body';
            }
          }
        }
        break;
    }
  }

  getAreas() {
    return this.areas;
  }

  getArea(line: number, col: number) {
    const type = this.areas[line][col];
    return {
      type,
      width: this._count(type, 'line', line, col),
      height: this._count(type, 'col', line, col),
      component: this._getComponent(type),
      element: this.elements[type],
    };
  }

  _count(area: DashboardArea, axis: 'line' | 'col', startLine: number, startCol: number) {
    let count = 0;
    if (axis === 'line') {
      for (let i = startCol; i < 3; i++) {
        if (this.areas[startLine][i] === area) {
          ++count;
        }
      }
    } else {
      for (let i = startLine; i < 3; i++) {
        if (this.areas[i][startCol] === area) {
          ++count;
        }
      }
    }

    return count;
  }

  _getComponent(area: DashboardArea) {
    switch (area) {
      case 'header':
        return HeaderArea;
      case 'footer':
        return FooterArea;
      case 'body':
        return BodyArea;
      case 'left':
        return LeftArea;
      case 'right':
        return RightArea;
    }

    throw new DefaultBasicError(`Cannot find a valid component for area ${area}`);
  }
}

const DashboardContainerComponent: FCC<DashboardContainerProps> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    props.onInit(ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      props.onDestroy();
    };
  }, []);

  const matrix = new Matrix();
  Children.toArray(props.children).forEach((child) => {
    if (React.isValidElement(child)) {
      switch (child.type) {
        case DashboardHeader:
          matrix.fill('header', child);
          break;
        case DashboardFooter:
          matrix.fill('footer', child);
          break;
        case DashboardLeft:
          matrix.fill('left', child);
          break;
        case DashboardRight:
          matrix.fill('right', child);
          break;
        case DashboardBody:
          matrix.fill('body', child);
          break;
      }
    }
  });

  const startArea = matrix.getArea(0, 0);

  return (
    <div className={addClassname('o-dashboard', props.className)} ref={ref}>
      <startArea.component matrix={matrix} line={0} col={0} />
    </div>
  );
  return null;
};

type DashboardPanelProps = {
  matrix: Matrix;
  line: number;
  col: number;
};

const HeaderArea: React.FC<DashboardPanelProps> = ({ matrix, line, col }) => {
  const area = matrix.getArea(line, col);

  if (area.width === 1) {
    const area11 = matrix.getArea(1, 1);
    const area02 = matrix.getArea(0, 2);
    const area20 = matrix.getArea(2, 0);
    const area22 = matrix.getArea(2, 2);
    const area21 = matrix.getArea(2, 1);

    if (area22.type != 'right' && area20.type != 'footer') {
      return (
        <div className="o-dashboard-vertical-layer" key="hvl">
          <div className="o-dashboard-horizontal-layer" key="hhl">
            <div className="o-dashboard-vertical-layer" key="hvl2">
              {area.element}
              <area11.component matrix={matrix} line={1} col={1} key="area11" />
            </div>
            <area02.component matrix={matrix} line={0} col={2} key="area02" />
          </div>
          <area21.component matrix={matrix} line={2} col={1} key="area21" />
        </div>
      );
    } else if (area22.type != 'right') {
      return (
        <div className="o-dashboard-horizontal-layer" key="hhl">
          <div className="o-dashboard-vertical-layer" key="hvl">
            {area.element}
            <area11.component matrix={matrix} line={1} col={1} key="area11" />
          </div>
          <area02.component matrix={matrix} line={0} col={2} key="area02" />
        </div>
      );
    } else {
      return (
        <div className="o-dashboard-vertical-layer" key="hvl">
          {area.element}
          <area11.component matrix={matrix} line={1} col={1} key="area11" />
        </div>
      );
    }
  } else if (area.width === 2) {
    if (line === 0 && col === 0) {
      const area22 = matrix.getArea(2, 2);
      const area10 = matrix.getArea(1, 0);
      const area02 = matrix.getArea(0, 2);
      if (area22.type === 'right') {
        return (
          <div className="o-dashboard-horizontal-layer" key="hhl">
            <div className="o-dashboard-vertical-layer" key="hvl">
              {area.element}
              <area10.component matrix={matrix} line={1} col={0} key="area10" />
            </div>
            <area02.component matrix={matrix} line={0} col={2} key="area02" />
          </div>
        );
      } else if (area22.type === 'footer') {
        const area20 = matrix.getArea(2, 0);
        return (
          <div className="o-dashboard-vertical-layer" key="hvl">
            <div className="o-dashboard-horizontal-layer" key="hhl">
              <div className="o-dashboard-vertical-layer" key="hvl2">
                {area.element}
                <area10.component matrix={matrix} line={1} col={0} key="area10" />
              </div>
              <area02.component matrix={matrix} line={0} col={2} key="area02" />
            </div>
            <area20.component matrix={matrix} line={2} col={0} key="area20" />
          </div>
        );
      }
    } else if (line === 0 && col === 1) {
      const area11 = matrix.getArea(1, 1);
      return (
        <div className="o-dashboard-vertical-layer" key="hvl">
          {area.element}
          <area11.component matrix={matrix} line={1} col={1} key="area11" />
        </div>
      );
    }
  } else if (area.width === 3) {
    const area10 = matrix.getArea(1, 0);
    const area20 = matrix.getArea(2, 0);
    const area22 = matrix.getArea(2, 2);
    return (
      <div className="o-dashboard-vertical-layer" key="hvl">
        {area.element}
        <area10.component matrix={matrix} line={1} col={0} key="area10" />
        {area20.type === 'footer' && area22.type === 'footer' && (
          <area20.component matrix={matrix} line={2} col={0} key="area20" />
        )}
      </div>
    );
  }
  return null;
};

const LeftArea: React.FC<DashboardPanelProps> = ({ matrix, line, col }) => {
  const area = matrix.getArea(line, col);

  if (area.height === 1) {
    const area11 = matrix.getArea(1, 1);
    const area12 = matrix.getArea(1, 2);
    const area22 = matrix.getArea(2, 2);
    const area20 = matrix.getArea(2, 0);
    const area02 = matrix.getArea(0, 2);

    if (area22.type != 'footer' && area02.type != 'right') {
      return (
        <div className="o-dashboard-horizontal-layer" key="lhl">
          <div className="o-dashboard-vertical-layer" key="lvl">
            <div className="o-dashboard-horizontal-layer" key="lhl2">
              {area.element}
              <area11.component matrix={matrix} line={1} col={1} key="area11" />
            </div>
            <area20.component matrix={matrix} line={2} col={0} key="area20" />
          </div>
          <area12.component matrix={matrix} line={1} col={2} key="area12" />
        </div>
      );
    } else if (area22.type != 'footer') {
      return (
        <div className="o-dashboard-vertical-layer" key="lvl">
          <div className="o-dashboard-horizontal-layer" key="lhl">
            {area.element}
            <area11.component matrix={matrix} line={1} col={1} key="area11" />
          </div>
          <area20.component matrix={matrix} line={2} col={0} key="area20" />
        </div>
      );
    } else {
      return (
        <div className="o-dashboard-horizontal-layer" key="lhl">
          {area.element}
          <area11.component matrix={matrix} line={1} col={1} key="area11" />
        </div>
      );
    }



  } else if (area.height === 2) {
    if (line === 0 && col === 0) {
      const area22 = matrix.getArea(2, 2);
      const area01 = matrix.getArea(0, 1);
      const area20 = matrix.getArea(2, 0);
      if (area22.type === 'footer') {
        return (
          <div className="o-dashboard-vertical-layer" key="lvl">
            <div className="o-dashboard-horizontal-layer" key="lhl">
              {area.element}
              <area01.component matrix={matrix} line={0} col={1} key="area01" />
            </div>
            <area20.component matrix={matrix} line={2} col={0} key="area20" />
          </div>
        );
      } else if (area22.type === 'right') {
        const area02 = matrix.getArea(0, 2);
        return (
          <div className="o-dashboard-horizontal-layer" key="lhl">
            <div className="o-dashboard-vertical-layer" key="lvl">
              <div className="o-dashboard-horizontal-layer" key="lhl2">
                {area.element}
                <area01.component matrix={matrix} line={0} col={1} key="area01" />
              </div>
              <area20.component matrix={matrix} line={2} col={0} key="area20" />
            </div>
            <area02.component matrix={matrix} line={0} col={2} key="area02" />
          </div>
        );
      }
    } else if (line === 1 && col === 0) {
      const area11 = matrix.getArea(1, 1);
      return (
        <div className="o-dashboard-horizontal-layer" key="lhl">
          {area.element}
          <area11.component matrix={matrix} line={1} col={1} key="area11" />
        </div>
      );
    }
  } else if (area.height === 3) {
    const area01 = matrix.getArea(0, 1);
    const area02 = matrix.getArea(0, 2);
    const area22 = matrix.getArea(2, 2);

    return (
      <div className="o-dashboard-horizontal-layer" key="lhl">
        {area.element}
        <area01.component matrix={matrix} line={0} col={1} key="area01" />
        {area02.type === 'right' && area22.type === 'right' && (
          <area02.component matrix={matrix} line={0} col={2} key="area02" />
        )}
      </div>
    );
  }
  return null;
};

const RightArea: React.FC<DashboardPanelProps> = ({ matrix, line, col }) => {
  const area = matrix.getArea(line, col);
  return area.element;
};

const FooterArea: React.FC<DashboardPanelProps> = ({ matrix, line, col } ) => {
  const area = matrix.getArea(line, col);
  return area.element;
};

const BodyArea: React.FC<DashboardPanelProps> = ({ matrix, line, col }) => {
  const area = matrix.getArea(line, col);

  if (area.width === 3) {
    if (area.height === 3) {
      return area.element;
    } else if (area.height === 2) {
      if (line === 1) {
        return area.element;
      } else if (line === 0) {
        const area20 = matrix.getArea(2, 0);
        return (
          <div className="o-dashboard-vertical-layer" key="bvl">
            {area.element}
            <area20.component matrix={matrix} line={2} col={0} key="area20" />
          </div>
        );
      }
    } else if (area.height === 1) {
      return area.element;
    }
  } else if (area.width === 2) {
    if (area.height === 3) {
      if (col === 1) {
        return area.element;
      } else if (col === 0) {
        const area02 = matrix.getArea(0, 2);
        return (
          <div className="o-dashboard-horizontal-layer" key="bhl">
            {area.element}
            <area02.component matrix={matrix} line={0} col={2} key="area02" />
          </div>
        );
      }
    } else if (area.height === 2) {
      if (line === 0 && col === 0) {
        const area22 = matrix.getArea(2, 2);
        const area02 = matrix.getArea(0, 2);
        const area20 = matrix.getArea(2, 0);
        if (area22.type === 'right') {
          return (
            <div className="o-dashboard-horizontal-layer" key="bhl">
              <div className="o-dashboard-vertical-layer" key="bvl">
                {area.element}
                <area20.component matrix={matrix} line={2} col={0} key="area20" />
              </div>
              <area02.component matrix={matrix} line={0} col={2} key="area02" />
            </div>
          );
        } else if (area22.type === 'footer') {
          return (
            <div className="o-dashboard-vertical-layer" key="bvl">
              <div className="o-dashboard-horizontal-layer" key="bhl">
                {area.element}
                <area02.component matrix={matrix} line={0} col={2} key="area02" />
              </div>
              <area20.component matrix={matrix} line={2} col={0} key="area20" />
            </div>
          );
        }
      } else if (line === 0 && col === 1) {
        const area21 = matrix.getArea(2, 1);
        return (
          <div className="o-dashboard-vertical-layer" key="bvl">
            {area.element}
            <area21.component matrix={matrix} line={2} col={1} key="area21" />
          </div>
        );
      } else if (line === 1 && col === 0) {
        const area12 = matrix.getArea(1, 2);
        const area02 = matrix.getArea(0, 2);

        if (area02.type !== 'right') {
          return (
            <div className="o-dashboard-horizontal-layer" key="bhl">
              {area.element}
              <area12.component matrix={matrix} line={1} col={2} key="area12" />
            </div>
          );
        } else {
          return area.element;
        }

      } else if (line === 1 && col === 1) {
        return area.element;
      }
    } else if (area.height === 1) {
      if (line === 1 && col === 0) {
        const area12 = matrix.getArea(1, 2);
        return (
          <div className="o-dashboard-horizontal-layer" key="bhl">
            {area.element}
            <area12.component matrix={matrix} line={1} col={2} key="area12" />
          </div>
        );
      } else if (line === 1 && col === 1) {
        const area20 = matrix.getArea(2, 0);
        const area21 = matrix.getArea(2, 1);
        if (area20.type === 'left') {
          return (
            <div className="o-dashboard-vertical-layer" key="bvl">
              {area.element}
              <area21.component matrix={matrix} line={2} col={1} key="area21" />
            </div>
          );
        } else {
          area.element;
        }
      }
    }
  } else if (area.width === 1) {
    if (area.height === 3) {
      return area.element;
    } else if (area.height === 2) {
      if (line === 0 && col === 1) {
        const area02 = matrix.getArea(0, 2);
        const area22 = matrix.getArea(2, 2);
        const area21 = matrix.getArea(2, 1);
        const area20 = matrix.getArea(2, 0);
        if (area22.type === 'right') {
          if (area20.type === 'left') {
            return (
              <div className="o-dashboard-vertical-layer" key="bvl">
                {area.element}
                <area21.component matrix={matrix} line={2} col={1} key="area21" />
              </div>
            );
          } else {
            return area.element;
          }

        } else {
          if (area20.type === 'left') {
            return (
              <div className="o-dashboard-vertical-layer" key="bvl">
                <div className="o-dashboard-horizontal-layer" key="bhl">
                  {area.element}
                  <area02.component matrix={matrix} line={0} col={2} key="area02" />
                </div>
                <area21.component matrix={matrix} line={2} col={1} key="area21" />
              </div>
            );
          } else {
            return (
              <div className="o-dashboard-horizontal-layer" key="bhl">
                {area.element}
                <area02.component matrix={matrix} line={0} col={2} key="area02" />
              </div>
            );
          }

        }

      } else if (line === 1 && col === 1) {
        return area.element;
      }
    } else if (area.height === 1) {
      const area02 = matrix.getArea(0, 2);
      const area20 = matrix.getArea(2, 0);
      const area22 = matrix.getArea(2, 2);
      const area21 = matrix.getArea(2, 1);
      const area12 = matrix.getArea(1, 2);
      if (area02.type !== 'right' && area22.type === 'right' && area20.type === 'left') {
        return (
          <div className="o-dashboard-horizontal-layer" key="bhl">
            <div className="o-dashboard-vertical-layer" key="bvl">
              {area.element}
              <area21.component matrix={matrix} line={2} col={1} key="area21" />
            </div>
            <area12.component matrix={matrix} line={1} col={2} key="area12" />
          </div>
        );
      } else if (area02.type !== 'right' && area22.type === 'footer' && area20.type === 'left') {
        return (
          <div className="o-dashboard-vertical-layer" key="bvl">
            <div className="o-dashboard-horizontal-layer" key="bhl">
              {area.element}
              <area21.component matrix={matrix} line={2} col={1} key="area21" />
            </div>
            <area12.component matrix={matrix} line={1} col={2} key="area12" />
          </div>
        );
      } else if (area02.type != 'right' && area22.type != 'right') {
        return (
          <div className="o-dashboard-horizontal-layer" key="bhl">
            {area.element}
            <area12.component matrix={matrix} line={1} col={2} key="area012" />
          </div>
        );
      } else if (area20.type != 'footer' && area22.type != 'footer') {
        return (
          <div className="o-dashboard-vertical-layer" key="bhvl">
            {area.element}
            <area21.component matrix={matrix} line={2} col={1} key="area012" />
          </div>
        );
      } else {
        return area.element;
      }
    }
  }

  return null;
};

const DashboardContainer = styled(DashboardContainerComponent)`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  color: white;
  display: flex;

  .o-dashboard-horizontal-layer {
    display: flex;
    flex-direction: row;
  }

  .o-dashboard-vertical-layer {
    display: flex;
    flex-direction: column;
  }

  .o-dashboard-header {
    background-color: darkred;
  }

  .o-dashboard-footer {
    background-color: darkblue;
  }

  .o-dashboard-right {
    background-color: darkorange;
  }

  .o-dashboard-body {
    background-color: darkgray;
    flex-grow: 1;
  }

  .o-dashboard-horizontal-layer:has(.o-dashboard-body) {
    flex-grow: 1;
  }

  .o-dashboard-vertical-layer:has(.o-dashboard-body) {
    flex-grow: 1;
  }
`;

export default DashboardContainer;
