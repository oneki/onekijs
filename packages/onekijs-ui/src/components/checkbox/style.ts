import { css, keyframes } from 'styled-components';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderStyle, borderWidth } from '../../styles/border';
import { overflow } from '../../styles/overflow';
import { left, position, top } from '../../styles/position';
import { height, width } from '../../styles/size';
import { margin, padding } from '../../styles/spacing';
import { stroke } from '../../styles/svg';
import { ComponentStyle } from '../../styles/typings';
import { color } from '../../styles/typography';
import { lighten } from '../../utils/color';
import { calcSize } from '../../utils/size';
import { CheckboxProps } from './typings';

const checkedKeyframes = keyframes`
  0% {
    stroke-dashoffset: 33;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const checkboxStyle: ComponentStyle<CheckboxProps> = ({
  height: cssHeight = '16px',
  width: cssWidth = '16px',
  theme,
  color: cssColor,
}) => {
  const checkboxCheckedColor = cssColor ?? theme.palette.colors[theme.colors.primary];
  const checkboxColor = cssColor ?? lighten(theme.colors.primary, 200);
  const checkboxHeight = isNaN(cssHeight as any) ? `${cssHeight}` : `${cssHeight}px`;
  const checkboxWidth = isNaN(cssHeight as any) ? `${cssWidth}` : `${cssWidth}px`;
  const svgWidth = calcSize(checkboxWidth, () => 10);
  const svgHeigth = calcSize(checkboxHeight, () => 10);
  const svgTop = calcSize(checkboxHeight, () => 5);
  const svgLeft = calcSize(checkboxWidth, () => 5);

  return css`
  input {
    ${borderWidth(0)}
    clip: rect(0 0 0 0); 
    ${height('1px')}
    ${margin('-1px')};
    ${overflow('hidden')};
    ${padding(0)} 
    ${position('absolute')}
    ${width('1px')}
  }

  input:checked + label > svg {
    ${height(svgHeigth)};
    animation: ${checkedKeyframes} ease-in-out 0.2s forwards;
    ${stroke(checkboxCheckedColor)}
  }
    
  label:active::after {
    ${backgroundColor('gray-200')}
  }
    
  label {
    ${color(checkboxColor)}
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    &:after {
      order: -1;
      content: "";
      ${height(checkboxHeight)};
      ${width(checkboxWidth)};
      float: left;
      ${borderWidth('2px')}
      ${borderStyle('solid')}
      ${borderColor(checkboxColor)}
      ${borderRadius('md')}
      margin-right: 1rem;
      transition: 0.15s all ease-out;      
    }
  }
  input:checked + label:after {
    ${borderColor(checkboxCheckedColor)}
  }
  svg {
    ${stroke(checkboxColor)}
    stroke-width: 6px;
    height: 0; //Firefox fix
    ${width(svgWidth)};
    position: absolute;
    ${left(svgLeft)}
    ${top(svgTop)}
    stroke-dasharray: 33; //Firefox fix
  }
  `;
};

export default checkboxStyle;
