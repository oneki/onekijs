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
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: ${(props) => props.theme.palette.colors[props.theme.colors.light]}
      ${(props) => props.theme.palette.colors[props.theme.colors.lighter]};
    &::-webkit-scrollbar {
      width: 12px;
    }
    &::-webkit-scrollbar-track {
      background: ${(props) => props.theme.palette.colors[props.theme.colors.lighter]};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.palette.colors[props.theme.colors.light]};
      border: 3px solid ${(props) => props.theme.palette.colors[props.theme.colors.lighter]};
    }
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
