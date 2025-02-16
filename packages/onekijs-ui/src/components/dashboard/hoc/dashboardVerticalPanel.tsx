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
  DashboardSize,
  DashboardVerticalArea,
  DashboardVerticalPanelComponentProps,
  DashboardVerticalPanelProps
} from '../typings';
import { getCollapseKey, getDashboardPanelContainerSize, getDashboardPanelSize, getFloatingKey } from '../utils/dashboardLength';


const Component: React.FC<DashboardVerticalPanelComponentProps> = (props) => {
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
      service.initVerticalPanel(props.area, props);
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
  const customClassNames = addClassname(props.area === 'left' ? 'o-dashboard-vertical-panel o-dashboard-left' : 'o-dashboard-vertical-panel o-dashboard-right', classNames.slice(2).join(' '))

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

const style: ComponentStyle<DashboardVerticalPanelComponentProps> = (props) => {
  const t = props.theme.dashboard[props.area];
  let transition = 'none';
  let containerTransition = 'none';
  const sizes: DashboardSize[] = ['small', 'medium', 'large'];
  const containerWidths = {
    'small': '',
    'medium': '',
    'large': '',
  }

  const widths = {
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
    transition =  panel.resizing ? 'width 0.1s' : 'width 0.3s';
    containerTransition =  panel.resizing ? 'width 0.1s' : 'width 0.3s';
    sizes.forEach((size) => {
      const containerWidth = getDashboardPanelContainerSize('width', size, props.panel);
      containerWidths[size] = containerWidth === null ? '' : `width: ${getDashboardPanelContainerSize('width', size, props.panel)};`;
      widths[size] =  `width: ${getDashboardPanelSize('width', size, props.panel)};`;
      if (panel[getFloatingKey(size)]) {
        positions[size] = 'position: absolute; top: 0; left: 0; z-index: 1001;';
      } else {
        positions[size] = 'position: static; z-index: auto;';
      }
      const isFloating = panel[getFloatingKey(size)];
      if(isFloating || parseInt(`${panel.collapseWidth}`) === 0) {
        if (!panel.resizing) {
          transition =  'transform 0.3s';
        }
        const fullWidth = getDashboardPanelSize('width', size, props.panel, true);
        if (panel[getCollapseKey(size)]) {
          translates[size] = `transform: translate(${panel.area === 'left' ? `-${fullWidth}` : '0'}, 0);`;
        } else {
          translates[size] = `transform: translate(${panel.area === 'left' ? '0' : `${isFloating ? `-${fullWidth}` : '0'}`}, 0);`;
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
    ${containerWidths.small}
    transition: ${containerTransition};
    @media only screen and (min-width: 768px) {
      ${containerWidths.medium}
    }
    @media only screen and (min-width: 992px) {
      ${containerWidths.large}
    }

    .o-dashboard-vertical-panel {
      ${position('relative')}
      ${backgroundColor(bgColor)}
      ${margin(0)}
      ${padding(0)}
      ${widths.small}
      ${positions.small}
      ${translates.small}
      height: 100%;
      transition: ${transition};
      @media only screen and (min-width: 768px) {
        ${widths.medium}
        ${positions.medium}
        ${translates.medium}
      }
      @media only screen and (min-width: 992px) {
        ${widths.large}
        ${positions.large}
        ${translates.large}
      }
    }

  `;
};

const StyledComponent = styled(Component)`
  ${style}
`;

const dashboardVerticalPanel = (area: DashboardVerticalArea): FCC<DashboardVerticalPanelProps> => {
  const Panel: FCC<DashboardVerticalPanelProps> = (props) => {
    const service = useDashboardService();
    const state = useDashboardState();

    const panel = state[area];
    const onResize = (step: ResizeStep, nextWidth: number) => {
      service.resizeWidth(area, nextWidth, step);
    };


    return (
      <StyledComponent {...state} {...props} area={area} panel={panel}>
        {props.resizable && !service.isCollapse(area) && (
          <Resizer onResize={onResize} handles={[area === 'left' ? 'e' : 'w']} gap={panel?.resizerGap}>
            {panel?.content ? <>{panel.content}</> : props.children}
          </Resizer>
        )}
        {(!props.resizable || service.isCollapse(area)) && (panel?.content ? <>{panel.content}</> : props.children)}
      </StyledComponent>
    );
  };
  Panel.defaultProps = {
    area
  };
  return Panel;
};

export default dashboardVerticalPanel;
