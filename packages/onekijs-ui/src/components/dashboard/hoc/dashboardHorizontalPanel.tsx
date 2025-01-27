import { FCC } from 'onekijs-framework';
import React, { CSSProperties, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
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
  DashboardSize,
} from '../typings';
import { isAreaInColumn } from '../utils/dashboardArea';
import { getDashboardPanelLength, getFloatingKey, getWorkspacePanelLength } from '../utils/dashboardLength';

// const getTranslateX = (size: DashboardSize, props: DashboardHorizontalPanelComponentProps): string | 0 => {
//   let translate: string | 0 = 0;

//   // if the panel is not in the first column, we have to translateX the width of the left panel
//   if (props.panel && !isAreaInColumn('first', props.area, props.areas)) {
//     translate = getWorkspacePanelLength('width', size, props.left);
//   }

//   // return translate;
//   console.log(props.area, "translateX", translate);
//   return 0;
// };

// const getTranslateY = (size: DashboardSize, props: DashboardHorizontalPanelComponentProps): string | 0 => {
//   let translate: string | 0 = 0;

//   if (props.panel && props.panel.area === 'footer') {
//     const height = props.panel[getFloatingKey(size)]
//       ? getDashboardPanelLength('height', size, props.panel) // actual size of the panel
//       : getWorkspacePanelLength('height', size, props.panel); // size of the panel on the workspace (if floating, the workspace panel size is 0)
//     if (height !== 0) {
//       translate = `-${height}`;
//     }
//   }
//   console.log(props.area, "translateY", translate);
//   // return translate;
//   return 0;
// };

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

  return (
    <div
      className={addClassname(props.area === 'header' ? 'o-dashboard-header' : 'o-dashboard-footer', props.className)}
      ref={ref}
      style={style}
    >
      {stepRef.current && props.children}
    </div>
  );
};

Component.displayName = 'DashboardHorizontalPanel';

const style: ComponentStyle<DashboardHorizontalPanelComponentProps> = (props) => {
  return css`
    height: ${getDashboardPanelLength('height', 'small', props.panel)};
    width: 100%;
    transition: height ${props.panel && props.panel.resizing ? '0.1s' : '0.3s'};
    ${props.panel && props.panel[getFloatingKey('small')] ? 'z-index: 1001;' : 'auto;'}
    @media only screen and (min-width: 768px) {
      height: ${getDashboardPanelLength('height', 'medium', props.panel)};
      ${props.panel && props.panel[getFloatingKey('medium')] ? 'z-index: 1001;' : 'z-index: auto'}
    }
    @media only screen and (min-width: 992px) {
      height: ${getDashboardPanelLength('height', 'large', props.panel)};
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
          <Resizer onResize={onResize} handles={[area === 'header' ? 's' : 'n']} gap={panel?.resizerGap}>
            {panel?.content ? <>{panel.content}</> : props.children}
          </Resizer>
        )}
        {!props.resizable && (panel?.content ? <>{panel.content}</> : props.children)}
      </StyledComponent>
    );
  };
  return Panel;
};

export default dashboardHorizontalPanel;
