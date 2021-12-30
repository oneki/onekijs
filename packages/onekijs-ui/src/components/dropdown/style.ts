import { css } from 'styled-components';
import { width } from '../../styles/size';
import { ComponentStyle } from '../../styles/typings';
import { preflight } from '../../utils/style';
import { DropdownProps } from './typings';

const dropdownStyle: ComponentStyle<DropdownProps> = () => {
  return css`
    ${preflight()}
    ${width(64)}
  `;
};

export default dropdownStyle;
