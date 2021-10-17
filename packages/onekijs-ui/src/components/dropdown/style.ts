import { css } from 'styled-components';
import { borderRadius, boxShadow } from '../../styles/border';
import { opacity } from '../../styles/effects';
import { overflowY } from '../../styles/overflow';
import { transitionDuration, transitionProperty, transitionTimingFunction } from '../../styles/transition';
import { ComponentStyle } from '../../styles/typings';
import { preflight } from '../../utils/style';
import { DropdownProps } from './typings';
import { width } from '../../styles/size';
import { zIndex } from '../../styles/position';

const dropdownStyle: ComponentStyle<DropdownProps> = () => {
  return css`
    ${preflight()}
    ${width(64)}
    ${borderRadius('md')}
    ${boxShadow('lg')}
    ${overflowY('auto')}
    ${zIndex(1000)}

    &.o-dropdown-enter {
      ${opacity(0)}
    }
    &.o-dropdown-enter-active {
      ${transitionDuration('.3s')}
      ${transitionProperty('opacity')}
      ${transitionTimingFunction('ease-in-out')}    
      ${opacity(1)}
    } 
    &.o-dropdown-exit-active {
      ${transitionDuration('.3s')}
      ${transitionProperty('opacity')}
      ${transitionTimingFunction('ease-in-out')}    
      ${opacity(0)}
    } 
    
  `;
};

export default dropdownStyle;
