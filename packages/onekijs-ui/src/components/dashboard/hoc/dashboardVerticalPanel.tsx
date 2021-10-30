import React, { useEffect, useRef, CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import { ComponentStyle } from '../../../styles/typings';
import Resizer from '../../resizer';
import { ResizeStep } from '../../resizer/typings';
import useDashboardService from '../hooks/useDashboardService';
import useDashboardState from '../hooks/useDashboardState';
import {
  DashboardSize,
  DashboardVerticalArea,
  DashboardVerticalPanelComponentProps,
  DashboardVerticalPanelProps,
} from '../typings';
import { isAreaInRow } from '../utils/dashboardArea';
import { getDashboardPanelLength, getFloatingKey, getWorkspacePanelLength } from '../utils/dashboardLength';

const getTranslateY = (size: DashboardSize, props: DashboardVerticalPanelComponentProps): string | 0 => {
  let translate: string | 0 = 0;

  // if the panel is not in the first row, we have to translateY the height of the header panel
  if (props.panel && !isAreaInRow('first', props.panel.area, props.areas)) {
    translate = getWorkspacePanelLength('height', size, props.header);
  }

  return translate;
};

const getTranslateX = (size: DashboardSize, props: DashboardVerticalPanelComponentProps): string | 0 => {
  let translate: string | 0 = 0;

  // for the right panel, we have to translate backwards, otherwise it will not be visible
  if (props.panel && props.panel.area === 'right') {
    const width = props.panel[getFloatingKey(size)]
      ? getDashboardPanelLength('width', size, props.panel) // actual size of the panel
      : getWorkspacePanelLength('width', size, props.panel); // size of the panel on the workspace (if floating, the workspace panel size is 0)
    if (width !== 0) {
      translate = `-${width}`;
    }
  }

  return translate;
};

const getHeight = (size: DashboardSize, props: DashboardVerticalPanelComponentProps): string | 0 => {
  let height = '100%';
  if (props.panel) {
    // if the panel is not in the first row, we need to remove the size of the header panel
    if (!isAreaInRow('first', props.panel.area, props.areas)) {
      const headerHeight = getWorkspacePanelLength('height', size, props.header);
      if (headerHeight !== 0) {
        height = `${height} - ${headerHeight}`;
      }
    }

    // if the panel is not in the last row, we need to remove the size of the right panel
    if (!isAreaInRow('last', props.panel.area, props.areas)) {
      const footerHeight = getWorkspacePanelLength('height', size, props.footer);
      if (footerHeight !== 0) {
        height = `${height} - ${footerHeight}`;
      }
    }
  }

  return height === '100%' ? height : `calc(${height})`;
};

const Component: React.FC<DashboardVerticalPanelComponentProps> = (props) => {
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
      service.initVerticalPanel(props.area, props, ref);
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

const style: ComponentStyle<DashboardVerticalPanelComponentProps> = (props) => {
  return css`
    grid-area: ${props.area};
    width: ${getDashboardPanelLength('width', 'small', props.panel)};
    height: ${getHeight('small', props)};
    transform: translate(${getTranslateX('small', props)}, ${getTranslateY('small', props)});
    transition: transform 0.6s, width 0.6s, height 0.6s;
    ${props.panel && props.panel[getFloatingKey('small')] ? 'z-index: 1001;' : 'auto;'}
    @media only screen and (min-width: 768px) {
      width: ${getDashboardPanelLength('width', 'medium', props.panel)};
      height: ${getHeight('medium', props)};
      transform: translate(${getTranslateX('medium', props)}, ${getTranslateY('medium', props)});
      ${props.panel && props.panel[getFloatingKey('medium')] ? 'z-index: 1001;' : 'z-index: auto'}
    }
    @media only screen and (min-width: 992px) {
      width: ${getDashboardPanelLength('width', 'large', props.panel)};
      height: ${getHeight('large', props)};
      transform: translate(${getTranslateX('large', props)}, ${getTranslateY('large', props)});
      ${props.panel && props.panel[getFloatingKey('medium')] ? 'z-index: 1001;' : 'z-index: auto'}
    }
  `;
};

const StyledComponent = styled(Component)`
  ${style}
`;

const dashboardVerticalPanel = (area: DashboardVerticalArea): React.FC<DashboardVerticalPanelProps> => {
  const Panel: React.FC<DashboardVerticalPanelProps> = (props) => {
    const service = useDashboardService();
    const state = useDashboardState();

    const panel = state[area];
    const onResize = (step: ResizeStep, nextWidth: number) => {
      service.resizeWidth(area, nextWidth, step);
    };

    return (
      <StyledComponent {...state} {...props} area={area} panel={panel}>
        {props.resizable && (
          <Resizer onResize={onResize} handles={[area === 'left' ? 'e' : 'w']}>
            {props.children}
          </Resizer>
        )}
        {!props.resizable && props.children}
      </StyledComponent>
    );
  };
  return Panel;
};

export default dashboardVerticalPanel;
