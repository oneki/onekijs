import { css } from 'styled-components';
import { opacity } from '../../styles/effects';
import { zIndex as cssZIndex } from '../../styles/position';
import { ComponentStyle } from '../../styles/typings';
import { preflight } from '../../utils/style';
import { DropdownProps } from './typings';

const dropdownStyle: ComponentStyle<DropdownProps> = ({ zIndex = 1 }) => {
  return css`
    ${preflight()}
    ${cssZIndex(zIndex)}
    .o-dropdown {
      transform: translateY(-40px);
      ${opacity(0)}
      &.o-dropdown-enter-done {
        ${opacity(1)}
        transform: translateY(0);
      }
    }
  `;
};

export default dropdownStyle;
