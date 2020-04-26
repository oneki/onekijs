import React from 'react'
import { useDashboard } from '../service';
import { Icon } from '@iconify/react';
import menuSharp from '@iconify/icons-ion/menu-sharp';
import styled from 'styled-components';


export const TogglerIcon = styled(Icon).attrs(props => ({
  width: props.width || '24px',
  height: props.height || '24px',
  icon: props.icon || menuSharp,
}))`
  cursor: pointer;
`

const Toggler = React.memo(props => {
  const [, service] = useDashboard();
  
  return (
    <TogglerIcon onClick={() => service.toggle(props.area)}/>
  )
});

export default Toggler;

