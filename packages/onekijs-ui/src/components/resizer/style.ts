import { ComponentStyle } from '../../styles/typings';
import { ResizerProps } from './typings';
import { css } from 'styled-components';

const resizerStyle: ComponentStyle<ResizerProps> = () => {
  return css`
    width: 100%;
    height: 100%;
  `;
};

export default resizerStyle;
