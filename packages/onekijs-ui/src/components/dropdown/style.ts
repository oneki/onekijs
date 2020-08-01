import { css } from 'styled-components';
import { ComponentStyle } from '../../styles/typings';
import { preflight } from '../../utils/style';
import { DropdownProps } from './typings';
import { width, height } from '../../styles/size';
import { borderRadius, borderColor, boxShadow } from '../../styles/border';
import { overflowY } from '../../styles/overflow';
import { backgroundColor } from '../../styles/background';
import { transitionDuration, transitionProperty, transitionTimingFunction } from '../../styles/transition';
import { opacity } from '../../styles/effects';

const dropdownStyle: ComponentStyle<DropdownProps> = () => {
  return css`
    ${preflight()}
    ${width(64)}
    ${borderRadius('default')}
    ${borderColor('gray-200')}
    ${boxShadow('default')}
    ${overflowY('auto')}
    ${height('200px')}
    ${backgroundColor('white')}
    &.o-dropdown-enter {
      ${opacity(0)}
    }
    &.o-dropdown-enter-active {
      ${transitionDuration('.5s')}
      ${transitionProperty('opacity')}
      ${transitionTimingFunction('ease-in-out')}    
      ${opacity(1)}
    } 
    &.o-dropdown-exit-active {
      ${transitionDuration('.5s')}
      ${transitionProperty('opacity')}
      ${transitionTimingFunction('ease-in-out')}    
      ${opacity(0)}
    } 
    
  `;
};

export default dropdownStyle;
