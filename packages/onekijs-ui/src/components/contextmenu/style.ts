import { css } from 'styled-components';
import { zIndex as cssZIndex } from '../../styles/position';
import { ComponentStyle } from '../../styles/typings';
import { preflight } from '../../utils/style';
import { ContextMenuProps } from './typings';

const contextMenuStyle: ComponentStyle<ContextMenuProps> = () => {
  return css`
    ${preflight()}
    ${cssZIndex(9999)}
  `;
};

export default contextMenuStyle;
