import { FCC } from 'onekijs-framework';
import React, { CSSProperties, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { backgroundColor } from '../../../styles/background';
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

  //return translate;
  console.log(props.area, "translateX", translate);
  return 0;
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

  // return translate;
  console.log(props.area, "translateY", translate);
  return 0;
};

const getHeight = (size: DashboardSize, props: DashboardVerticalPanelComponentProps): string | 0 => {
  // let height = '100vh';
  // console.log(props.panel);
  // if (props.panel) {
  //   // if the panel is not in the first row, we need to remove the size of the header panel
  //   if (!isAreaInRow('first', props.panel.area, props.areas)) {
  //     const headerHeight = getWorkspacePanelLength('height', size, props.header);
  //     if (headerHeight !== 0) {
  //       height = `${height} - ${headerHeight}`;
  //     }
  //   }

  //   // if the panel is not in the last row, we need to remove the size of the right panel
  //   if (!isAreaInRow('last', props.panel.area, props.areas)) {
  //     const footerHeight = getWorkspacePanelLength('height', size, props.footer);
  //     if (footerHeight !== 0) {
  //       height = `${height} - ${footerHeight}`;
  //     }
  //   }
  // }

  // return height === '100vh' ? height : `calc(${height})`;
  return 'auto';
};

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

  return (
    <div
      className={addClassname(props.area === 'left' ? 'o-dashboard-left' : 'o-dashboard-right', props.className)}
      ref={ref}
      style={style}
    >
      {stepRef.current && props.children}
    </div>
  );
};

const style: ComponentStyle<DashboardVerticalPanelComponentProps> = (props) => {
  const t = props.theme.dashboard[props.area];
  return css`
    ${backgroundColor(t.bgColor)}
    width: ${getDashboardPanelLength('width', 'small', props.panel)};
    height: ${getHeight('small', props)};
    transform: translate(${getTranslateX('small', props)}, ${getTranslateY('small', props)});
    transition: transform 0.3s;
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
        {props.resizable && (
          <Resizer onResize={onResize} handles={[area === 'left' ? 'e' : 'w']}>
            {panel?.content ? <>{panel.content}</> : props.children}
          </Resizer>
        )}
        {!props.resizable && (panel?.content ? <>{panel.content}</> : props.children)}
      </StyledComponent>
    );
  };
  Panel.defaultProps = {
    area
  };
  return Panel;
};

export default dashboardVerticalPanel;
