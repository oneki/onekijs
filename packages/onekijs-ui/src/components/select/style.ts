import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderWidth } from '../../styles/border';
import { display, visibility } from '../../styles/display';
import { opacity } from '../../styles/effects';
import { flexGrow, flexWrap } from '../../styles/flex';
import { appearance, cursor, outline, userSelect } from '../../styles/interactivity';
import { bottom, left, position, right, top } from '../../styles/position';
import { height, maxWidth, minWidth, width } from '../../styles/size';
import { margin, marginRight, marginY, padding, paddingLeft, paddingX, paddingY } from '../../styles/spacing';
import { verticalAlign } from '../../styles/table';
import { transitionDuration, transitionProperty, transitionTimingFunction } from '../../styles/transition';
import { ComponentStyle } from '../../styles/typings';
import { color, fontFamily, fontSize, fontWeight, whiteSpace } from '../../styles/typography';
import { deriveColor } from '../../utils/color';
import { preflight } from '../../utils/style';
import { SelectProps } from './typings';

const selectStyle: ComponentStyle<SelectProps> = ({multiple, theme}) => {
  return css`
    ${preflight()}
    ${width('100%')}
    &.o-select-status-error {
      .o-select-input-container {
        ${borderColor('danger')}   
      }
      .o-select-icon-container {
        .o-select-icon {   
          ${color('danger')}
        }  
      } 
    }
    &.o-select-size-xsmall {
      .o-select-input-wrapper {
        ${paddingY(0)}
      }    
      .o-select-input {
        ${paddingY(0)}
        ${fontSize('sm')}     
      }  
      .o-select-token {
        ${paddingY(0)}
        ${marginY('px')}
      }        
    }      
    &.o-select-size-small {
      .o-select-input-wrapper {
        ${paddingY(1)}
      }
      .o-select-input {
        ${paddingY(1)} 
        ${fontSize('sm')}
      }   
      .o-select-token {
        ${paddingY(0)}
        ${marginY(1)}
      }              
    }       
    &.o-select-size-medium {
      .o-select-input-wrapper {
        ${paddingY(2)}
      }     
      .o-select-input {
        ${paddingY(2)}  
        ${fontSize('base')} 
      }  
      .o-select-token {
        ${paddingY(1)}
        ${marginY(1)}
      }               
    }
    &.o-select-size-large {
      .o-select-input-wrapper {
        ${paddingY(3)}
      }   
      .o-select-input {
        ${paddingY(3)}  
        ${fontSize('base')}    
      }
      .o-select-token {
        ${paddingY(2)}
        ${marginY(1)}
      }                  
    }
    &.o-select-size-xlarge {
      .o-select-input-wrapper {
        ${paddingY(4)}
      }  
      .o-select-input {
        ${paddingY(4)}   
        ${fontSize('lg')}     
      }    
      .o-select-token {
        ${paddingY(3)}
        ${marginY(1)}
      }        
    }    
    .o-select-input-container {
      ${backgroundColor('white')}
      ${display('flex')}
      ${alignItems('stretch')}
      ${borderWidth(1)}
      ${borderColor('gray-300')}
      ${borderRadius('default')}
      ${cursor('pointer')}
      ${padding('1px')}
      &.o-select-input-focus {
        ${borderColor('primary')}
        ${borderWidth(2)}
        ${padding(0)}
      }
    }
    &.o-select-close {
      .o-select-input{
        ${cursor('pointer')}
      }
    }
    .o-select-input-data {
      ${display('flex')}
      ${flexGrow(1)}
      ${flexWrap('wrap')}
      ${alignItems('center')}
      ${paddingX(2)}
      .o-select-input-wrapper {
        ${flexGrow(1)}
        ${color('gray-800')}
        ${position('relative')}
        ${display('inline-block')}
        ${minWidth('50px')}         
        .o-select-input-auto-sizer {
          ${visibility(false)}
          ${display('inline-block')}
          ${whiteSpace('pre')}
        }
        .o-select-input {
          ${position('absolute')}
          ${top(0)}
          ${left(0)}
          ${right(0)}
          ${bottom(0)}       
          ${appearance('none')}
          ${outline('none')}
          ${width('full')}
          ${color('gray-800', { placeholder: 'gray-400' })}
        }      
      }   

      .o-select-token-animation-enter {
        ${opacity(0)}
        ${maxWidth(0)}
      }

      .o-select-token-animation-enter-active {
        ${transitionDuration('0.3s')}
        ${transitionProperty('max-width opacity')}
        ${transitionTimingFunction('ease-in-out')}
        ${opacity(1)}
        ${maxWidth('100%')}
      }  

      .o-select-token-animation-exit {
        ${maxWidth('100%')}
      } 

      .o-select-token-animation-exit-active {
        ${transitionDuration('0.3s')}
        ${transitionProperty('max-width opacity')}
        ${transitionTimingFunction('ease-in-out')}
        ${opacity(0)}
        ${maxWidth(0)}
      }       
      
      .o-select-token {
        ${cursor('default')}
        ${whiteSpace('pre')}
        ${backgroundColor('primary')}
        ${color('white')}
        ${marginRight(2)}
        ${borderRadius('default')}
        ${fontSize('sm')}
        ${display('flex')}
        .o-select-token-text {
          ${flexGrow(1)}
          ${paddingLeft(2)}
        }
        .o-select-token-remove {
          ${cursor('pointer')}
          ${color('white', {'hover': 'danger'})}
          ${fontFamily('Arial')}
          ${paddingX(2)}
        }
      }
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
      ${backgroundColor('white')}     
      .o-select-option {
        ${width('full')}
        ${paddingX(4)}
        ${paddingY(2)}
        ${display('flex')}
        ${alignItems('center')}
        ${backgroundColor('transparent', {'hover': 'gray-200'})}
        ${userSelect('none')}
        &.o-select-option-clickable {
          ${cursor('pointer')}
        }
        &.o-select-option-selected {
          ${backgroundColor(multiple ? deriveColor(theme.kind.primary, -300, false): 'primary', {'hover': multiple ? deriveColor(theme.kind.primary, -300, false): 'primary'})}
          ${color(multiple ? 'inherits': 'white', {'hover': multiple ? 'inherits': 'white'})}
        }         
        &.o-select-option-highlighted {
          ${backgroundColor(multiple ? 'primary' : 'gray-200', {'hover': multiple ? 'primary' : 'gray-200'})}
          ${color(multiple ? 'white': 'inherits')}
        }         
           

        .o-select-option-icon {
          ${width(6)}
          ${fontSize('sm')}
          ${fontWeight('bold')}
        }

        .o-select-option-data {
          ${flexGrow(1)}
        }        
      }
    }

  `;
};

export default selectStyle;
