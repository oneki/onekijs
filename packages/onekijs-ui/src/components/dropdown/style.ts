import { css } from 'styled-components';
import { opacity } from '../../styles/effects';
import { zIndex as cssZIndex } from '../../styles/position';
import { width } from '../../styles/size';
import { transitionDuration, transitionProperty, transitionTimingFunction } from '../../styles/transition';
import { ComponentStyle } from '../../styles/typings';
import { preflight } from '../../utils/style';
import { DropdownProps } from './typings';

const dropdownStyle: ComponentStyle<DropdownProps> = ({ animationTimeout, zIndex }) => {
  return css`
    ${preflight()}
    ${width(64)}
    &.o-dropdown-open {
      ${transitionDuration(`${animationTimeout}ms`)}
      ${transitionProperty('transform')}
      ${transitionTimingFunction('ease-in-out')}
      ${() => (zIndex !== undefined ? cssZIndex(zIndex) : '')}
    }
    .o-dropdown {
      transform: translateY(-40px);
      ${opacity(0)}
      &.o-dropdown-enter-active {
        ${opacity(1)}
        transform: translateY(0);
        ${transitionDuration(`${animationTimeout}ms`)}
        ${transitionProperty('opacity,transform')}
        ${transitionTimingFunction('linear')}
      }

      &.o-dropdown-enter-done {
        ${opacity(1)}
        transform: translateY(0);
      }

      &.o-dropdown-exit-active {
        ${opacity(0)}
        transform: translateY(-40px);
        ${transitionDuration(`${animationTimeout}ms`)}
        ${transitionProperty('opacity,transform')}
        ${transitionTimingFunction('linear')}
      }
    }
  `;
};

export default dropdownStyle;
