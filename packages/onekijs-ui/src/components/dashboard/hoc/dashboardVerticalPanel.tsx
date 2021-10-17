import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { backgroundColor } from '../../../styles/background';
import { width, height } from '../../../styles/size';
import { zIndex } from '../../../styles/position';
import { ComponentStyle } from '../../../styles/typings';
import Resizer from '../../resizer';
import useDashboardService from '../hooks/useDashboardService';
import useDashboardState from '../hooks/useDashboardState';
import {
  DashboardSize,
  DashboardVerticalArea,
  DashboardVerticalPanelComponentProps,
  DashboardVerticalPanelProps,
} from '../typings';
import { isAreaInRow } from '../utils/dashboardArea';
import { getDashboardPanelLength, getWorkspacePanelLength } from '../utils/dashboardLength';

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
  if (props.panel?.area === 'right') {
    const width = getWorkspacePanelLength('width', size, props.panel);
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

    // if the panel is not in the last column, we need to remove the size of the right panel
    if (!isAreaInRow('last', props.panel.area, props.areas)) {
      const footerHeight = getWorkspacePanelLength('height', size, props.footer);
      if (footerHeight !== 0) {
        height = `${height} - ${footerHeight}`;
      }
    }
  }

  return height;
};

const Component = React.forwardRef<HTMLDivElement, DashboardVerticalPanelComponentProps>((props, ref) => {
  return (
    <div className={props.className} ref={ref}>
      {props.children}
    </div>
  );
});

Component.displayName = 'VerticalPanel';

const style: ComponentStyle<DashboardVerticalPanelComponentProps> = (props) => {
  return css`
    grid-area: ${props.panel?.area};
    width: ${getDashboardPanelLength('width', 'small', props.panel)};
    height: ${getHeight('small', props)};
    transform: translate(${getTranslateX('small', props)}, ${getTranslateY('small', props)});
    ${props.panel ? 'transition: none 0.6s;' : ''}
    @media only screen and (min-width: 46.875em) {
      width: ${getDashboardPanelLength('width', 'large', props.panel)};
      height: ${getHeight('large', props)};
      transform: translate(${getTranslateX('large', props)}, ${getTranslateY('large', props)});
    }
    .o-resizer-vertical-splitter {
      ${width(1)};
      ${backgroundColor('transparent')}
      ${height('full')}
      cursor: e-resize;
      transition: background 0.1s ease-out;
      &.o-resizer-active {
        ${backgroundColor('primary')}
        ${zIndex(35)}
      }
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
    const ref: React.MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      service.initVerticalPanel(area, props, ref);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const panel = state[area];
    const onResize = (width: number) => {
      service.resizeWidth(area, width);
    };

    return (
      <StyledComponent {...state} panel={panel} className={props.className} ref={ref}>
        <Resizer onResize={onResize} handles={['e']}>
          {props.children}
        </Resizer>
      </StyledComponent>
    );
  };
  return Panel;
};

export default dashboardVerticalPanel;
