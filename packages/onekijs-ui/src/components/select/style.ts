import { SelectProps } from 'onekijs';
import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderLeftWidth, borderRadius, borderWidth, borderBottomWidth } from '../../styles/border';
import { display } from '../../styles/display';
import { appearance, cursor, outline } from '../../styles/interactivity';
import { height, width } from '../../styles/size';
import { margin, marginY, padding, paddingLeft, paddingRight, paddingX, paddingY } from '../../styles/spacing';
import { verticalAlign } from '../../styles/table';
import { transitionDuration, transitionProperty, transitionTimingFunction } from '../../styles/transition';
import { ComponentStyle } from '../../styles/typings';
import { color } from '../../styles/typography';
import { preflight } from '../../utils/style';

const selectStyle: ComponentStyle<SelectProps> = () => {
  return css`
    ${preflight()}
    ${width('100%')}
    .o-select-input-container {
      ${marginY(2)}
      ${padding(1)}
      ${backgroundColor('white')}
      ${display('flex')}
      ${borderWidth(1)}
      ${borderColor('gray-200')}
      ${borderRadius('default')}
    }
    .o-select-input {
      ${paddingY(1)}
      ${paddingX(2)}
      ${appearance('none')}
      ${outline('none')}
      ${width('full')}
      ${color('gray-800', { placeholder: 'gray-400' })}
    }
    .o-select-arrow-container {
      ${color('gray-300')}
      ${width(8)}
      ${paddingY(1)}
      ${paddingLeft(2)}
      ${paddingRight(1)}
      ${borderLeftWidth(1)}
      ${display('flex')}
      ${alignItems('center')}
      ${borderColor('gray-200')}
    }
    .o-select-arrow-button {
      ${cursor('pointer')}
      ${width(6)}
      ${height(6)}
      ${color('gray-600')}
      ${outline('none', { focus: 'none' })}
      ${backgroundColor('transparent')}
      ${padding(0)}
    }
    .o-select-arrow-svg {
      ${width(4)}
      ${height(4)}
      ${display('block')}
      ${verticalAlign('middle')}
      ${margin('px')}
      ${transitionDuration('.5s')}
      ${transitionProperty('all')}
      ${transitionTimingFunction('ease-in-out')}
    }
    .o-select-option-container {
      ${cursor('pointer')}
      ${width('full')}
      ${borderColor('gray-100')}
      ${borderBottomWidth(1)}
      ${backgroundColor('transparent', { hover: 'teal-100' })}
    }
  `;
};

export default selectStyle;
