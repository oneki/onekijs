import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderBottomWidth, borderColor, borderRadius, borderWidth } from '../../styles/border';
import { display } from '../../styles/display';
import { appearance, cursor, outline } from '../../styles/interactivity';
import { height, width } from '../../styles/size';
import { margin, marginY, padding, paddingX, paddingY } from '../../styles/spacing';
import { verticalAlign } from '../../styles/table';
import { transitionDuration, transitionProperty, transitionTimingFunction } from '../../styles/transition';
import { ComponentStyle } from '../../styles/typings';
import { color } from '../../styles/typography';
import { preflight } from '../../utils/style';
import { SelectProps } from './typings';

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
      &.o-select-input-focus {
        ${borderColor('primary')}
        ${borderWidth(2)}
      }
    }
    .o-select-input {
      ${paddingY(1)}
      ${paddingX(2)}
      ${appearance('none')}
      ${outline('none')}
      ${width('full')}
      ${color('gray-800', { placeholder: 'gray-400' })}
    }
    .o-select-icon-container {
      ${color('primary')}
      ${cursor('pointer')}
      ${width(8)}
      ${paddingY(1)}
      ${paddingX(1)}
      ${display('flex')}
      ${alignItems('center')}
      ${borderColor('gray-200')}
    }
    .o-select-icon {
      ${color('primary')}
      ${cursor('pointer')}
      ${width(4)}
      ${height(4)}
      ${outline('none', { focus: 'none' })}
      ${backgroundColor('transparent')}
      ${padding(0)}
    }
    .o-select-arrow-svg {
      ${display('block')}
      ${verticalAlign('middle')}
      ${margin('px')}
      ${transitionDuration('.5s')}
      ${transitionProperty('all')}
      ${transitionTimingFunction('ease-in-out')}
    }
    .o-select-option {
      ${width('full')}
      ${borderColor('gray-100')}
      ${borderBottomWidth(1)}
      &.o-select-option-clickable {
        ${cursor('pointer')}
      }
      &.o-select-option-hoverable {
        ${backgroundColor('transparent', { hover: 'teal-100' })}
      }      
    }
  `;
};

export default selectStyle;
