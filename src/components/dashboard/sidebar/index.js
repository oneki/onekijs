import React from 'react'
import styled from 'styled-components';
import { isMobile } from '../../../lib/utils/browser';
import { isTrue, isFalse } from '../../../lib/utils/type';
import { useDashboard } from '../service';
import { Icon, InlineIcon } from '@iconify/react';
import crossIcon from '@iconify/icons-entypo/cross';

const isFloating = (floating) => {
  if (isMobile()) {
    return floating === 'auto' || isTrue(floating);
  }
  return isTrue(floating);
}

const isCollapsed = (size, collapse, floating) => {
  if (isFloating(floating)) {
    return isFalse(collapse) ? false : true;
  } else if (collapse === 'auto') {
    return size === 'small';
  }
  return isTrue(collapse);
}

const getTranslateX = (area, size, width, floating, collapse, collapseWidth) => {
  let value = null;
  if (area === 'left') {
    value = isFloating(floating) && isCollapsed(size, collapse, floating) ? '-' + width : '0';
  } else if (area === 'right') {
    if (isFloating(floating)) {
      value = isCollapsed(size, collapse, floating) ? '100%' : '0';
    } else {
      value = isCollapsed(size, collapse, floating) ? '0' : `${parseInt(width) - parseInt(collapseWidth)}${width.replace(parseInt(width),'')}`
    }
  }
  return value;
}

const getMarginLeft = (area, size, width, floating, collapse, collapseWidth) => {

  if (area === 'left' || isFloating(floating)) {
    return '0'
  } 
  return isCollapsed(size, collapse, floating) ? '0' : `-${parseInt(width) - parseInt(collapseWidth)}${width.replace(parseInt(width),'')}`
}



const getWidth = (area, size, width, collapseWidth, floating, collapse) => {
  if (isFloating(floating) || area === 'right') {
    return width;
  }
  if (collapse === 'auto') {
    return size === 'small' ? collapseWidth : width;
  }  
  return (isTrue(collapse)) ?  collapseWidth : width;

}

export const Component = styled.div`
  grid-area: ${props => props.area};
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${props => getWidth(props.area, 'small', props.width, props.collapseWidth, props.floating, props.collapse)};
  position: ${props => isFloating(props.floating) ? 'fixed' : 'relative'};
  overflow-y: auto;
  transform: translateX(${props => getTranslateX(props.area, 'small', props.width, props.floating, props.collapse, props.collapseWidth)});
  margin-left: ${props => getMarginLeft(props.area, 'small', props.width, props.floating, props.collapse, props.collapseWidth)};
  ${props => props.area === 'right' ? 'right: 0;' : ''}
  transition: ${props => props.area === 'left' ? 'transform' : isFloating(props.floating) ? 'transform' : 'margin'} .6s ease-in-out;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  z-index: ${props => isFloating(props.floating) ? '2000' : '0'};
  @media only screen and (min-width: 46.875em) {
    width: ${props => getWidth(props.area, 'large',props.width, props.collapseWidth, props.floating, props.collapse)};
    transform: translateX(${props => getTranslateX(props.area, 'large', props.width, props.floating, props.collapse, props.collapseWidth)});
    margin-left: ${props => getMarginLeft(props.area, 'large', props.width, props.floating, props.collapse, props.collapseWidth)};    
  }
`;

export const Closer = styled(Icon).attrs(props => ({
  width: props.width || '24px',
  height: props.height || '24px',
  icon: props.icon || crossIcon,
}))`
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
  cursor: pointer;
  &:hover {
    zoom: 1.1;
  }
`

export const Sidebar = React.memo((props) => {
  const [dashboard, service] = useDashboard();
  const data = dashboard[props.area];
  
  return (
    <Component 
      {...props}
      area={props.area}
      floating={data.floating}
      collapse={data.collapse}
      width={data.width}
      collapseWidth={data.collapseWidth}
    >
      {isFloating(data.floating) && <Closer onClick={() => service.collapse(props.area)} />}
      {props.children}
    </Component>
  )

});


export const Left = React.memo(props => <Sidebar {...props} area="left">{props.children}</Sidebar>);
Left.$dashboardType = 'left';

export const Right = React.memo(props => <Sidebar {...props} area="right">{props.children}</Sidebar>);
Right.$dashboardType = 'right';

