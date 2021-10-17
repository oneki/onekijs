// import { isFalse, isMobile, isTrue } from 'onekijs';
// import React from 'react';
// import styled from 'styled-components';
// import CrossIcon from '../../icon/CrossIcon';
// import useDashboardService from '../hooks/useDashboardService';
// import useDashboardVerticalPanel from '../hooks/useDashboardVerticalPanel';
// import { DashboardArea, DashboardSize, DashboardVerticalArea, DashboardVerticalPanelProps } from '../typings';

// const isFloating = (floating?: boolean | 'auto') => {
//   if (isMobile()) {
//     return floating === 'auto' || isTrue(floating);
//   }
//   return isTrue(floating);
// };

// const isCollapsed = (size: DashboardSize, collapse?: 'auto' | boolean, floating?: 'auto' | boolean): boolean => {
//   if (isFloating(floating)) {
//     return isFalse(collapse) ? false : true;
//   } else if (collapse === 'auto') {
//     return size === 'small';
//   }
//   return isTrue(collapse);
// };

// const getTranslateX = (area: DashboardArea, size: DashboardSize, panel: DashboardPanel): string => {
//   const { collapse, floating, collapseWidth = 0, width = 0 } = panel;
//   const widthStr = `${width}`;
//   const collapseWidthStr = `${collapseWidth}`;
//   let value: string | 0 | undefined = undefined;
//   if (area === 'left') {
//     value = isFloating(floating) && isCollapsed(size, collapse, floating) ? `-${widthStr}` : 0;
//   } else if (area === 'right') {
//     if (isFloating(floating)) {
//       value = isCollapsed(size, collapse, floating) ? '100%' : 0;
//     } else {
//       value = isCollapsed(size, collapse, floating)
//         ? 0
//         : `${parseInt(widthStr) - parseInt(collapseWidthStr)}${widthStr.replace(`${parseInt(widthStr)}`, '')}`;
//     }
//   }
//   return `${value || 0}`;
// };

// const getMarginLeft = (area: DashboardArea, size: DashboardSize, panel: DashboardPanel): string => {
//   const { collapse, floating, collapseWidth = 0, width = 0 } = panel;
//   const widthStr = `${width}`;
//   if (area === 'left' || isFloating(floating)) {
//     return '0';
//   }
//   return isCollapsed(size, collapse, floating)
//     ? '0'
//     : `-${parseInt(widthStr) - parseInt(`${collapseWidth}`)}${widthStr.replace(`${parseInt(widthStr)}`, '')}`;
// };

// const getWidth = (area: DashboardArea, size: DashboardSize, panel: DashboardPanel): string => {
//   const { collapse, floating, collapseWidth = 0, width = 0 } = panel;
//   const widthStr = `${width}`;
//   const collapseWidthStr = `${collapseWidth}`;

//   if (isFloating(floating) || area === 'right') {
//     return widthStr;
//   }
//   if (collapse === 'auto') {
//     return size === 'small' ? collapseWidthStr : widthStr;
//   }
//   return isTrue(collapse) ? collapseWidthStr : widthStr;
// };

// const CloseComponent: React.FC<React.InputHTMLAttributes<HTMLDivElement>> = (props) => {
//   return (
//     <div>
//       <CrossIcon {...props} />
//     </div>
//   );
// };

// export const Closer = styled(CloseComponent)`
//   position: absolute;
//   right: 0;
//   top: 0;
//   padding: 10px;
//   cursor: pointer;
//   &:hover {
//     zoom: 1.1;
//   }
// `;

// export const DashboardSidebarComponent: React.FC<DashboardVerticalPanelProps> = ({
//   area,
//   panel,
//   children,
//   ...divProps
// }) => {
//   const service = useDashboardService();
//   return (
//     <div {...divProps}>
//       {isFloating(panel.floating) && <Closer onClick={() => service.collapse(area)} />}
//       {children}
//     </div>
//   );
// };

// export const DashboardSidebar = styled(DashboardSidebarComponent)`
//   grid-area: ${(props) => props.area};
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   width: 100%;
//   position: ${(props) => (isFloating(props.panel.floating) ? 'fixed' : 'relative')};
//   overflow-y: auto;
//   transform: translateX(${(props) => getTranslateX(props.area, 'small', props.panel)});
//   margin-left: ${(props) => getMarginLeft(props.area, 'small', props.panel)};
//   ${(props) => (props.area === 'right' ? 'right: 0;' : '')}
//   transition: ${(props) =>
//     props.area === 'left' ? 'transform' : isFloating(props.panel.floating) ? 'transform' : 'margin'} .6s ease-in-out;
//   transition: width .6s ease-in-out;
//   box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
//   z-index: ${(props) => (isFloating(props.panel.floating) ? '2000' : '0')};
//   @media only screen and (min-width: 46.875em) {
//     width: ${(props) => getWidth(props.area, 'large', props.panel)};
//     transform: translateX(${(props) => getTranslateX(props.area, 'large', props.panel)});
//     margin-left: ${(props) => getMarginLeft(props.area, 'large', props.panel)};
//   }
// `;

// const sidebar = (area: DashboardVerticalArea): React.FC<DashboardVerticalPanelProps> => {
//   const Component: React.FC<DashboardVerticalPanelProps> = (props) => {
//     const panel = useDashboardVerticalPanel(area, props);
//     if (!panel) {
//       return null;
//     }
//     return (
//       <DashboardSidebar panel={panel} area={area}>
//         {props.children}
//       </DashboardSidebar>
//     );
//   };

//   return Component;
// };

// export const DashboardLeft = sidebar('left');
// DashboardLeft.displayName = 'DashboardLeft';

// export const DashboardRight = sidebar('right');
// DashboardRight.displayName = 'DashboardRight';
