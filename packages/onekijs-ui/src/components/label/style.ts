import { css } from 'styled-components';
import { alignContent, justifyContent } from '../../styles/alignment';
import { display, visibility } from '../../styles/display';
import { width } from '../../styles/size';
import { marginLeft, marginRight, marginY, paddingY } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize, fontWeight, letterSpacing, textTransform } from '../../styles/typography';
import { LabelProps } from './typings';

const labelStyle: ComponentStyle<LabelProps> = ({ theme, width: labelWidth }) => {
  const t = theme.label;
  return css`
      ${display('flex')}
      .o-label-text {
        ${fontWeight(t.fontWeight)}
        ${t.fontCase === 'uppercase' ? textTransform('uppercase') : ''}
        ${color(t.fontColor)}
        ${fontSize(t.fontSize)}
        ${letterSpacing(t.letterSpacing)}
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
        ${color(t.requiredColor)}
        ${fontWeight(t.requiredWeight)}
        ${marginLeft(t.requiredMarginLeft)} 
      }
      .o-marker-optional {
        ${visibility(false)}
      }

      .o-helper-icon {
        ${fontSize('xl')}
        ${color(t.helperIconColor)}
        ${marginLeft(t.helperMarginLeft)}
      }   

    `;
};

export default labelStyle;
