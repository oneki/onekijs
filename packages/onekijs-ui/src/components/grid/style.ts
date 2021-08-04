import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderBottomColor, borderBottomStyle, borderBottomWidth, borderColor } from '../../styles/border';
import { display } from '../../styles/display';
import { flexDirection } from '../../styles/flex';
import { cursor, outline } from '../../styles/interactivity';
import { overflowX } from '../../styles/overflow';
import { height, width } from '../../styles/size';
import { margin, padding, paddingX, paddingY } from '../../styles/spacing';
import { verticalAlign } from '../../styles/table';
import { transitionDuration, transitionProperty, transitionTimingFunction } from '../../styles/transition';
import { ComponentStyle } from '../../styles/typings';
import { color, fontVariant } from '../../styles/typography';
import { preflight } from '../../utils/style';
import { GridProps } from './typings';

export const gridStyle: ComponentStyle<GridProps<any>> = () => {
  return css`
    ${preflight()}
    .o-grid-body {
      ${overflowX('auto')}
    }
    .o-grid-body-row {
      ${display('flex')}
      ${flexDirection('row')}
      .o-grid-body-cell {
        ${borderBottomColor('gray-200')}
        ${borderBottomWidth(1)}
        ${borderBottomStyle('solid')}
        ${paddingX(1)}
        ${paddingY(2)}
      }
    }
    .o-grid-header {
      ${display('flex')}
      ${flexDirection('row')}
      ${borderBottomWidth('1px')}
      ${borderBottomStyle('solid')}
      ${borderBottomColor('primary')}
      ${backgroundColor('#f6f6f6')}
      .o-grid-header-cell {
        ${display('flex')}
        ${flexDirection('column')}
        ${paddingX(1)}
        ${paddingY(2)}        
        .o-grid-header-cell-title {
          ${fontVariant('all-small-caps')}
          ${display('flex')}
          ${color('primary')}
          .o-grid-sort-container {
            ${color('primary')}
            ${cursor('pointer')}
            ${width(8)}
            ${paddingY(1)}
            ${paddingX(1)}
            ${display('flex')}
            ${alignItems('center')}
            ${borderColor('gray-200')}
            .o-grid-sort-icon {
              ${color('primary')}
              ${cursor('pointer')}
              ${width(4)}
              ${height(4)}
              ${outline('none', { focus: 'none' })}
              ${backgroundColor('transparent')}
              ${padding(0)}
            }
            .o-grid-sort-svg {
              ${display('block')}
              ${verticalAlign('middle')}
              ${margin('px')}
              ${transitionDuration('.5s')}
              ${transitionProperty('all')}
              ${transitionTimingFunction('ease-in-out')}
            }      
          } 
        }
         
      }


       
    } 
     
  `;
};
