import { FCC } from 'onekijs-framework';
import React, { CSSProperties, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { ComponentStyle } from '../../../styles/typings';
import Resizer from '../../resizer';
import { ResizeStep } from '../../resizer/typings';
import useDashboardService from '../hooks/useDashboardService';
import useDashboardState from '../hooks/useDashboardState';
import {
  DashboardHorizontalArea,
  DashboardHorizontalPanelComponentProps,
  DashboardHorizontalPanelProps,
  DashboardSize,
} from '../typings';
import { isAreaInColumn } from '../utils/dashboardArea';
import { getDashboardPanelLength, getFloatingKey, getWorkspacePanelLength } from '../utils/dashboardLength';

const getTranslateX = (size: DashboardSize, props: DashboardHorizontalPanelComponentProps): string | 0 => {
  let translate: string | 0 = 0;

  // if the panel is not in the first column, we have to translateX the width of the left panel
  if (props.panel && !isAreaInColumn('first', props.area, props.areas)) {
    console.log('translateX', props.panel.area, size, getWorkspacePanelLength('width', size, props.left));
    translate = getWorkspacePanelLength('width', size, props.left);
  }

  return translate;
};

const getTranslateY = (size: DashboardSize, props: DashboardHorizontalPanelComponentProps): string | 0 => {
  let translate: string | 0 = 0;

  if (props.panel && props.panel.area === 'footer') {
    const height = props.panel[getFloatingKey(size)]
      ? getDashboardPanelLength('height', size, props.panel) // actual size of the panel
      : getWorkspacePanelLength('height', size, props.panel); // size of the panel on the workspace (if floating, the workspace panel size is 0)
    if (height !== 0) {
      translate = `-${height}`;
    }
  }

  return translate;
};

const getWidth = (size: DashboardSize, props: DashboardHorizontalPanelComponentProps): string | 0 => {
  let width = '100%';

  // if the panel is not in the first column, we need to remove the size of the left panel
  if (props.panel && !isAreaInColumn('first', props.area, props.areas)) {
    const leftWidth = getWorkspacePanelLength('width', size, props.left);
    if (leftWidth !== 0) {
      width = `${width} - ${leftWidth}`;
    }
  }

  // if the panel is not in the last column, we need to remove the size of the right panel
  if (props.panel && !isAreaInColumn('last', props.area, props.areas)) {
    const rightWidth = getWorkspacePanelLength('width', size, props.right);
    if (rightWidth !== 0) {
      width = `${width} - ${rightWidth}`;
    }
  }

  return width === '100%' ? width : `calc(${width})`;
};

const Component: React.FC<DashboardHorizontalPanelComponentProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const service = useDashboardService();
  const stepRef = useRef<'initializing' | 'initialized' | undefined>();
  const style: CSSProperties = {};
  if (stepRef.current !== 'initialized') {
    style.transition = 'none';
  }

  useEffect(() => {
    if (stepRef.current === undefined) {
      stepRef.current = 'initializing';
      service.initHorizontalPanel(props.area, props, ref);
    } else if (stepRef.current === 'initializing' && ref.current) {
      stepRef.current = 'initialized';
      ref.current.style.transition = '';
    }
  });

  return (
    <div className={props.className} ref={ref} style={style}>
      {stepRef.current && props.children}
    </div>
  );
};

Component.displayName = 'DashboardHorizontalPanel';

const style: ComponentStyle<DashboardHorizontalPanelComponentProps> = (props) => {
  return css`
    grid-area: ${props.area};
    height: ${getDashboardPanelLength('height', 'small', props.panel)};
    width: ${getWidth('small', props)};
    transform: translate(${getTranslateX('small', props)}, ${getTranslateY('small', props)});
    ${props.panel ? 'transition: transform 0.6s, width 0.6s, height 0.6s;' : 'transition: none'}
    ${props.panel && props.panel[getFloatingKey('small')]
      ? 'z-index: 1001;'
      : 'auto;'}
    @media only screen and (min-width: 768px) {
      height: ${getDashboardPanelLength('height', 'medium', props.panel)};
      width: ${getWidth('medium', props)};
      transform: translate(${getTranslateX('medium', props)}, ${getTranslateY('medium', props)});
      ${props.panel && props.panel[getFloatingKey('medium')] ? 'z-index: 1001;' : 'z-index: auto'}
    }
    @media only screen and (min-width: 992px) {
      height: ${getDashboardPanelLength('height', 'large', props.panel)};
      width: ${getWidth('large', props)};
      transform: translate(${getTranslateX('large', props)}, ${getTranslateY('large', props)});
      ${props.panel && props.panel[getFloatingKey('medium')] ? 'z-index: 1001;' : 'z-index: auto'}
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
        {props.resizable && (
          <Resizer onResize={onResize} handles={[area === 'header' ? 's' : 'n']}>
            {props.children}
          </Resizer>
        )}
        {!props.resizable && props.children}
      </StyledComponent>
    );
  };
  return Panel;
};

export default dashboardHorizontalPanel;
