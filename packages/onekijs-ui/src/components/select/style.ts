import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderWidth } from '../../styles/border';
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
      ${cursor('pointer')}
      &.o-select-input-focus {
        ${borderColor('primary')}
        ${borderWidth(2)}
      }
    }
    &.o-select-close {
      .o-select-input{
        ${cursor('pointer')}
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
    .o-select-options {
      scrollbar-width: thin;
      scrollbar-color: ${(props) => props.theme.colors[props.theme.kind.primary]} ${(props) => props.theme.colors['gray-200']};
      &::-webkit-scrollbar {
        width: 12px;
      }
      &::-webkit-scrollbar-track {
        background: ${(props) => props.theme.colors['gray-200']};
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.colors[props.theme.kind.primary]};
        border: 3px solid ${(props) => props.theme.colors['gray-200']};
      }        
      .o-select-option {
        ${width('full')}
        ${paddingX(4)}
        ${paddingY(2)}
        &.o-select-option-clickable {
          ${cursor('pointer')}
        }
        &.o-select-option-hoverable {
          ${backgroundColor('transparent', { hover: 'gray-200' })}
        } 
        &.o-select-option-selected {
          ${backgroundColor('primary')}
          ${color('white')}
        }              
      }
    }

  `;
};

export default selectStyle;
