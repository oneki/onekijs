import { ComponentStyle } from '../../styles/typings';
import { ResizerProps } from './typings';
import { css } from 'styled-components';
import { width, height } from '../../styles/size';
import { backgroundColor } from '../../styles/background';
import { zIndex } from '../../styles/position';

const resizerStyle: ComponentStyle<ResizerProps> = () => {
  return css`
    width: 100%;
    height: 100%;
    .o-resizer-vertical-splitter {
      ${width('6px')};
      ${backgroundColor('transparent')}
      ${height('full')}
      cursor: e-resize;
      transition: background 0.1s ease-out;
      &.o-resizer-active {
        ${backgroundColor('primary')}
        ${zIndex(35)}
      }
    }
    .o-resizer-horizontal-splitter {
      ${height('6px')};
      ${backgroundColor('transparent')}
      ${width('full')}
      cursor: n-resize;
      transition: background 0.1s ease-out;
      &.o-resizer-active {
        ${backgroundColor('primary')}
        ${zIndex(35)}
      }
    }
  `;
};

export default resizerStyle;
