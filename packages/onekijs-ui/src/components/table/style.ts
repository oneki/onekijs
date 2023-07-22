import { css } from 'styled-components';
import { alignItems, justifyContent } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import {
  borderBottomColor,
  borderBottomStyle,
  borderBottomWidth,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
} from '../../styles/border';
import { display, visibility } from '../../styles/display';
import { flexDirection } from '../../styles/flex';
import { boxSizing, cursor, outline, userSelect } from '../../styles/interactivity';
import { overflow, overflowX, overflowY } from '../../styles/overflow';
import { height, minWidth, width } from '../../styles/size';
import {
  marginBottom,
  marginLeft,
  marginTop,
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingX,
  paddingY,
} from '../../styles/spacing';
import { verticalAlign } from '../../styles/table';
import { transitionDuration, transitionProperty, transitionTimingFunction } from '../../styles/transition';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize, fontWeight, lineHeight, textTransform } from '../../styles/typography';
import { ListProps } from '../list/typings';
import { TableProps } from './typings';

export const filterListStyle: ComponentStyle<ListProps> = () => {
  return css`
    .o-filter-operator-list-item-content {
      ${display('flex')}
      ${alignItems('center')}
    }

    .o-filter-operator-list-item-icon {
      ${display('flex')}
      ${alignItems('center')}

      .o-icon-success-svg {
        ${color('primary')}
        ${marginBottom('2xs')}
      }
      ${width(6)}
    }
  `;
};

export const tableStyle: ComponentStyle<TableProps<any>> = ({ theme, fit = true }) => {
  const t = theme.table;
  return css`
    &.o-table {
      ${boxShadow(t.shadow)}
      ${boxSizing('border-box')}
      ${paddingRight('sm')}
      ${fontSize(t.tdFontSize)}
      scrollbar-width: thin;
      scrollbar-color: ${(props) => props.theme.palette.colors[props.theme.colors.light]}
        ${(props) => props.theme.palette.colors[props.theme.colors.lighter]};
      &::-webkit-scrollbar {
        width: 12px;
      }
      &::-webkit-scrollbar-track {
        background: ${(props) => props.theme.palette.colors[props.theme.colors.lighter]};
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.palette.colors[props.theme.colors.light]};
        border: 3px solid ${(props) => props.theme.palette.colors[props.theme.colors.lighter]};
      }
      ${() => (fit ? 'flex-grow: 1;' : '')}
    }


    .o-table-not-found {
      ${display('flex')}
      ${flexDirection('column')}
      ${alignItems('center')}
      ${padding('8xl')}
      ${color('primary')}
      ${fontSize('xl')}
      ${backgroundColor(t.bgColor)}
    }

    .o-table-body {
      ${overflowX('auto')}
    }

    .o-table-body-row-container {
      ${borderBottomColor(t.tdBorderBottomColor)}
      ${borderBottomWidth(t.tdBorderBottomWidth)}
      ${borderBottomStyle(t.tdBorderBottomStyle)}
    }
    .o-table-body-row-expanded {
      .o-table-body-row {
        ${backgroundColor(t.tdExpandedBgColor)}
      }
    }

    .o-table-body-row-expanded-content {
      ${backgroundColor(t.tdExpandedBgColor)}
      ${overflowY('hidden')}
    }

    .o-table-body-row:hover {
      ${backgroundColor(t.tdHoverBgColor)}
      ${color(t.tdHoverFontColor)}
      .o-checkbox label {
          ${color('currentColor')}
        }
      }
    }

    .o-table-body-row {
      ${display('flex')}
      ${flexDirection('row')}
      ${color(t.tdFontColor)}
      ${backgroundColor(t.bgColor)}
    }

    .o-table-body-cell {
      ${paddingX(t.tdPaddingX)}
      ${paddingY(t.tdPaddingY)}
      ${boxSizing('border-box')}
      ${overflow('hidden')}
      &.o-table-cell-expander {
        ${padding(0)}
        .o-table-cell-expander-content {
          ${paddingX(t.tdPaddingX)}
          ${paddingY(t.tdPaddingY)}
          ${cursor('pointer')}
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
    }

    .o-table-header-filterable {
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
      ${overflow('hidden')}
    }

    .o-table-header-title-container {
      ${paddingY(t.thPaddingY)}
      ${borderBottomWidth(t.thBorderBottomWidth)}
      ${borderBottomColor(t.thBorderBottomColor)}
    }

    .o-table-header-title {
      ${color(t.thFontColor)}
      ${fontWeight(t.thFontWeigth)}
      ${fontSize(t.thFontSize)}
      ${textTransform(t.thFontCase)}
    }

    .o-table-sort-container {
      ${color('primary')}
      ${cursor('pointer')}
      ${width(8)}
      ${display('flex')}
      ${alignItems('center')}
    }

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

    .o-table-header-filter {
      ${borderBottomWidth(t.thBorderBottomWidth)}
      ${borderBottomColor(t.thBorderBottomColor)}
      ${paddingBottom(t.thPaddingY)}
    }

    .o-table-filter-input-container, .o-table-filter-select-container {
      ${color(t.tdFontColor)}
      ${display('flex')}
      ${alignItems('center')}
      ${backgroundColor(t.thFilterInputBgColor)}
      ${borderRadius('sm')}
      ${marginTop('xs')}
      ${width('full')}
      ${height('full')}
      &:hover {
        .o-table-filter-operator-container {
          .o-toggler-icon {
            ${visibility(true)}
          }
        }
      }
    }

    .o-table-filter-select-container {
      .o-select-input-container {
        ${backgroundColor('transparent')}
        ${borderColor('transparent')}
      }
      .o-select-input-wrapper {
        ${minWidth(0)}
      }
      .o-select-token {
        ${fontSize('xs')}
      }
    }


    .o-table-filter-input {
      ${backgroundColor('transparent')}
      ${borderWidth(0)}
      .o-input-field {
        ${paddingY(t.thFilterInputPaddingY)}
        ${paddingX(t.thFilterInputPaddingX)}
        ${fontSize(t.thFilterInputFontSize)}
      }
    }

    .o-table-filter-operator-container {
      ${width('25px')}
      ${display('flex')}
      ${alignItems('center')}
      ${borderRadius('none')}
      ${justifyContent('center')}
      ${userSelect('none')}
      ${height('full')}
      .o-filter-operator-icon-container {
        ${display('flex')}
        ${flexDirection('row')}
        ${alignItems('center')}
        ${color('primary')}
        ${cursor('pointer')}
        ${paddingLeft('xs')}
        ${height('full')}
      }
      .o-toggler-icon {
        ${visibility(false)}
      }
      .o-filter-operator-toggler-open {
        .o-toggler-icon {
          ${visibility(true)}
        }
      }
      &.o-table-filter-active {
        .o-filter-operator-icon, .o-filter-operator-toggler {
          ${color('pink')}
        }
      }
    }





    &.o-form-table {
      ${boxShadow('none')}
      ${paddingRight('none')}
      .o-table-body-row:hover {
        ${backgroundColor(t.bgColor)}
        ${color(t.tdFontColor)}
        .o-checkbox label {
            ${color('currentColor')}
          }
        }
      }
      .o-table-header-title-container {
        ${paddingY('xs')}
        ${borderBottomWidth(t.thBorderBottomWidth)}
        ${borderBottomColor(t.thBorderBottomColor)}
      }
    }

    .o-form-table-add {
      ${marginTop('sm')}
      ${display('inline-flex')}
      ${alignItems('center')}
      ${fontWeight('bold')}
      ${textTransform('uppercase')}
      ${fontSize('xs')}
      ${cursor('pointer')}
      ${color('pink')}
      .o-toggler-icon-container {
        ${marginBottom('px')}
      }
    }
    .o-form-table-remove {
      ${display('inline-flex')}
      ${alignItems('center')}
      ${color('danger')}
      ${cursor('pointer')}
      ${paddingTop('sm')}
      &.o-form-table-remove-disabled {
        ${color('light')}
        ${cursor('not-allowed')}
      }
    }

    .o-form-table-remove-cell {
      ${display('flex')}
      ${alignItems('start')}
      ${justifyContent('center')}
    }

    .o-checkbox-cell {
      ${display('flex')}
      ${justifyContent('center')}
      .o-table-checkbox {
        ${paddingTop('xs')}
        ${display('flex')}
        ${alignItems('start')}
      }
    }

    .o-table-filter-select {
      .o-select-token {
        ${fontSize('2xs')}
        ${lineHeight('sm')}
      }
    }

    &.o-table-filter-select {
      ${marginLeft('-12px')}
    }
  `;
};
