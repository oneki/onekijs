import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderBottomColor, borderBottomStyle, borderBottomWidth, borderWidth, boxShadow } from '../../styles/border';
import { display } from '../../styles/display';
import { flexDirection } from '../../styles/flex';
import { boxSizing, cursor, outline } from '../../styles/interactivity';
import { overflowX } from '../../styles/overflow';
import { height, width } from '../../styles/size';
import { marginLeft, marginTop, padding, paddingBottom, paddingX, paddingY } from '../../styles/spacing';
import { verticalAlign } from '../../styles/table';
import { transitionDuration, transitionProperty, transitionTimingFunction } from '../../styles/transition';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize, fontWeight, textTransform } from '../../styles/typography';
import { TableProps } from './typings';

export const tableStyle: ComponentStyle<TableProps<any>> = ({ theme }) => {
  const t = theme.table;
  return css`
    ${backgroundColor(t.bgColor)}
    ${boxShadow(t.shadow)}
    ${boxSizing('border-box')}
    .o-table-body {
      ${overflowX('auto')}
    }
    .o-table-body-row {
      ${display('flex')}
      ${flexDirection('row')}
      ${color(t.tdFontColor)}
      .o-table-body-cell {
        ${paddingX(t.tdPaddingX)}
        ${paddingY(t.tdPaddingY)}
        ${boxSizing('border-box')}
        ${borderBottomColor(t.tdBorderBottomColor)}
        ${borderBottomWidth(t.tdBorderBottomWidth)}
        ${borderBottomStyle(t.tdBorderBottomStyle)}

        
      }
      &.o-table-body-row-hover {
        ${backgroundColor(t.tdHoverBgColor)}
        ${color(t.tdHoverFontColor)}
        .o-checkbox label {
            ${color('currentColor')}
          }
        }
      }
    }
    .o-table-body-row-even {
      ${backgroundColor(t.tdStripBgColor)}
    }
    
    .o-table-header {
      ${display('flex')}
      ${flexDirection('column')}
      .o-table-header-sortable {
        cursor: pointer;
      }

      &.o-table-header-filterable {
        .o-table-header-title-container {
          ${borderBottomWidth(0)} 
          ${paddingBottom(0)} 
        }
      }

      .o-table-header-row-title, .o-table-header-row-filter {
        ${boxSizing('border-box')}
        ${display('flex')}
        ${flexDirection('row')}
        ${backgroundColor(t.thBgColor)}
      }

      .o-table-header-title-container, .o-table-header-filter {
        ${boxSizing('border-box')}      
        ${display('flex')}
        ${flexDirection('row')}
        ${alignItems('center')}
        ${paddingX(t.thPaddingX)}        
      }

      .o-table-header-title-container {
        ${paddingY(t.thPaddingY)}  
        ${borderBottomWidth(t.thBorderBottomWidth)} 
        ${borderBottomColor(t.thBorderBottomColor)}

        .o-table-header-title {
          ${color(t.thFontColor)}
          ${fontWeight(t.thFontWeigth)}
          ${fontSize(t.thFontSize)}
          ${textTransform(t.thFontCase)} 
        }        
      }

      .o-table-sort-container {
        ${color('primary')}
        ${cursor('pointer')}
        ${width(8)}
        ${display('flex')}
        ${alignItems('center')}
        .o-table-sort-icon {
          ${color('primary')}
          ${cursor('pointer')}
          ${width(4)}
          ${height(4)}
          ${outline('none', { focus: 'none' })}
          ${backgroundColor('transparent')}
          ${marginLeft('px')}
          ${padding(0)}
          ${borderWidth(0)}
        }
        .o-table-sort-svg {
          ${display('block')}
          ${verticalAlign('middle')}
          ${transitionDuration('.5s')}
          ${transitionProperty('all')}
          ${transitionTimingFunction('ease-in-out')}
        }        
      }

      .o-table-header-filter {
        ${borderBottomWidth(t.thBorderBottomWidth)} 
        ${borderBottomColor(t.thBorderBottomColor)}  
        ${paddingBottom(t.thPaddingY)}          
        .o-table-filter-input {
          ${marginTop('xs')}
          ${backgroundColor(t.thFilterInputBgColor)}
          ${borderWidth(0)}
          .o-input-field {
            ${paddingY(t.thFilterInputPaddingY)}
            ${paddingX(t.thFilterInputPaddingX)}
            ${fontSize(t.thFilterInputFontSize)}
          }            
        }
      }      
    } 

  `;
};
