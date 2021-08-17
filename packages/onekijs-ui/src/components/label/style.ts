import { css } from 'styled-components';
import { alignContent, justifyContent } from '../../styles/alignment';
import { display, visibility } from '../../styles/display';
import { width } from '../../styles/size';
import { marginLeft, marginRight, marginY, paddingY } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize, fontVariant, fontWeight } from '../../styles/typography';
import { preflight } from '../../utils/style';
import { LabelProps } from './typings';

const labelStyle: ComponentStyle<LabelProps> = ({ width: labelWidth }) => {
  return css`
      ${preflight()}
      ${display('flex')}
      .o-label-text {
        ${fontWeight('medium')}
        ${fontVariant('small-caps')}
        ${color('blue-700')}
      }      
      &.o-label-vertical {
        ${alignContent('center')}
      }
      &.o-label-horizontal {
        ${justifyContent('flex-end')}
        ${alignContent('center')}
        ${width(`${(100 / 12) * (labelWidth || 12)}%`)}
        ${marginY('2px')}
        &.o-label-xsmall {
          ${paddingY(0)}
        }
        &.o-label-small {
          ${paddingY('xs')}
        }                   
        &.o-label-medium {
          ${paddingY('sm')}
        }
        &.o-label-large {
          ${paddingY('md')}
        }  
        &.o-label-xlarge {
          ${paddingY('lg')}
        }  
        .o-marker-required, .o-marker-optional {
          ${marginRight('lg')}
        }                 
      }      
      .o-marker-required, .o-marker-optional {
        ${color('danger')}
        ${fontWeight('bold')}
        ${marginLeft('xs')} 
      }
      .o-marker-optional {
        ${visibility(false)}
      }

      .o-helper-icon {
        ${fontSize('xl')}
        ${color('primary')}
        ${marginLeft('sm')}
      }   

    `;
};

export default labelStyle;
