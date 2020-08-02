import { ComponentStyle } from '../../styles/typings';
import { ListProps } from './typings';
import { css } from 'styled-components';
import { preflight } from '../../utils/style';

const listStyle: ComponentStyle<ListProps> = () => {
  return css`
    ${preflight()}
  `;
};

export default listStyle;
