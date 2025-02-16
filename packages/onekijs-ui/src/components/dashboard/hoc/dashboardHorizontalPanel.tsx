import { FCC } from 'onekijs-framework';
import React, { CSSProperties, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { backgroundColor } from '../../../styles/background';
import { position } from '../../../styles/position';
import { margin, padding } from '../../../styles/spacing';
import { ComponentStyle } from '../../../styles/typings';
import { addClassname } from '../../../utils/style';
import Resizer from '../../resizer';
import { ResizeStep } from '../../resizer/typings';
import useDashboardService from '../hooks/useDashboardService';
import useDashboardState from '../hooks/useDashboardState';
import {
  DashboardHorizontalArea,
  DashboardHorizontalPanelComponentProps,
  DashboardHorizontalPanelProps,
  DashboardSize
} from '../typings';
import { getCollapseKey, getDashboardPanelContainerSize, getDashboardPanelSize, getFloatingKey } from '../utils/dashboardLength';


const Component: React.FC<DashboardHorizontalPanelComponentProps> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const service = useDashboardService();
  const stepRef = useRef<'initializing' | 'initialized' | undefined>();
  const style: CSSProperties = {};
  if (stepRef.current !== 'initialized') {
    style.transition = 'none';
  }

  useEffect(() => {
    service.setRef(props.area, ref);
    if (stepRef.current === undefined) {
      stepRef.current = 'initializing';
      service.initHorizontalPanel(props.area, props);
    } else if (stepRef.current === 'initializing' && ref.current) {
      stepRef.current = 'initialized';
      ref.current.style.transition = '';
    }
    return () => {
      service.destroyPanel(props.area);
    }
  });


  const classNames = props.className ? props.className.split(' ') : [];
  const styledClassNames = classNames.slice(0,2).join(' ')
  const customClassNames = addClassname(props.area === 'header' ? 'o-dashboard-horizontal-panel o-dashboard-header' : 'o-dashboard-horizontal-panel o-dashboard-footer', classNames.slice(2).join(' '))


  return (
    <div className={styledClassNames}>
      <div
        className={customClassNames}
        ref={ref}
        style={style}
      >
        {stepRef.current && props.children}
      </div>
    </div>
  );
};

const style: ComponentStyle<DashboardHorizontalPanelComponentProps> = (props) => {
  const t = props.theme.dashboard[props.area];
  let transition = 'none';
  let containerTransition = 'none';
  const sizes: DashboardSize[] = ['small', 'medium', 'large'];
  const containerHeights = {
    'small': '',
    'medium': '',
    'large': '',
  }

  const heights = {
    'small': '',
    'medium': '',
    'large': '',
  }
  const positions = {
    'small': '',
    'medium': '',
    'large': '',
  }

  const translates = {
    'small': '',
    'medium': '',
    'large': '',
  }

  let bgColor = t.bgColor;
  const panel = props.panel;
  if (panel) {
    transition =  panel.resizing ? 'height 0.1s' : 'height 0.3s';
    containerTransition =  panel.resizing ? 'height 0.1s' : 'height 0.3s';
    sizes.forEach((size) => {
      const containerHeight = getDashboardPanelContainerSize('height', size, props.panel);
      containerHeights[size] = containerHeight === null ? '' : `height: ${getDashboardPanelContainerSize('height', size, props.panel)};`;
      heights[size] =  `height: ${getDashboardPanelSize('height', size, props.panel)};`;
      if (panel[getFloatingKey(size)]) {
        positions[size] = 'position: absolute; top: 0; left: 0; z-index: 1001;';
      } else {
        positions[size] = 'position: static; z-index: auto;';
      }
      const isFloating = panel[getFloatingKey(size)];
      if(isFloating || parseInt(`${panel.collapseHeight}`) === 0) {
        if (!panel.resizing) {
          transition =  'transform 0.3s';
        }
        if (panel[getCollapseKey(size)]) {
          const fullHeight = getDashboardPanelSize('height', size, props.panel, true);
          translates[size] = `transform: translate(0, -${fullHeight});`;
        } else {
          translates[size] = `transform: translate(0, 0);`;
        }

        const fullHeight= getDashboardPanelSize('height', size, props.panel, true);
        if (panel[getCollapseKey(size)]) {
          translates[size] = `transform: translate(0,${panel.area === 'header' ? `-${fullHeight}` : '0'});`;
        } else {
          translates[size] = `transform: translate(0, ${panel.area === 'header' ? '0' : `${isFloating ? `-${fullHeight}` : '0'}`});`;
        }
      }
    })
    if (panel.backgroundColor !== 'inherits') {
      bgColor = panel.backgroundColor;
    }
  }


  return css`
    ${position('relative')}
    ${margin(0)}
    ${padding(0)}
    ${containerHeights.small}
    transition: ${containerTransition};
    @media only screen and (min-width: 768px) {
      ${containerHeights.medium}
    }
    @media only screen and (min-width: 992px) {
      ${containerHeights.large}
    }

    .o-dashboard-horizontal-panel {
      ${position('relative')}
      ${backgroundColor(bgColor)}
      ${margin(0)}
      ${padding(0)}
      ${heights.small}
      ${positions.small}
      ${translates.small}
      width: 100%;
      transition: ${transition};
      @media only screen and (min-width: 768px) {
        ${heights.medium}
        ${positions.medium}
        ${translates.medium}
      }
      @media only screen and (min-width: 992px) {
        ${heights.large}
        ${positions.large}
        ${translates.large}
      }
    }

  `;
};

const StyledComponent = styled(Component)`
  ${style}
`;

const dashboardHorizontalPanel = (area: DashboardHorizontalArea): FCC<DashboardHorizontalPanelProps> => {
  const Panel: FCC<DashboardHorizontalPanelProps> = (props) => {
    const service = useDashboardService();
    const state = useDashboardState();

    const panel = state[area];
    const onResize = (step: ResizeStep, _nextWidth: number, nextHeight: number) => {
      service.resizeHeight(area, nextHeight, step);
    };

    return (
      <StyledComponent {...state} {...props} area={area} panel={panel}>
        {props.resizable && !service.isCollapse(area) && (
          <Resizer onResize={onResize} handles={[area === 'header' ? 's' : 'n']} gap={panel?.resizerGap}>
            {panel?.content ? <>{panel.content}</> : props.children}
          </Resizer>
        )}
        {(!props.resizable  || service.isCollapse(area)) && (panel?.content ? <>{panel.content}</> : props.children)}
      </StyledComponent>
    );
  };
  Panel.defaultProps = {
    area
  };
  return Panel;
};

export default dashboardHorizontalPanel;
