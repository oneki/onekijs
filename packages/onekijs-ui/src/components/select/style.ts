import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import {
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderColor,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderTopWidth,
  borderWidth,
  boxShadow,
} from '../../styles/border';
import { display, visibility } from '../../styles/display';
import { flexDirection, flexGrow, flexWrap } from '../../styles/flex';
import { appearance, cursor, outline, userSelect } from '../../styles/interactivity';
import { overflowY } from '../../styles/overflow';
import { bottom, left, position, right, top, zIndex } from '../../styles/position';
import { height, maxWidth, minHeight, minWidth, width } from '../../styles/size';
import {
  margin,
  marginRight,
  marginY,
  padding,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingX,
  paddingY,
} from '../../styles/spacing';
import { verticalAlign } from '../../styles/table';
import { transitionDuration, transitionProperty, transitionTimingFunction } from '../../styles/transition';
import { ComponentStyle } from '../../styles/typings';
import { color, fontFamily, fontSize, fontWeight, whiteSpace } from '../../styles/typography';
import { lighten } from '../../utils/color';
import { preflight } from '../../utils/style';
import { SelectProps } from './typings';

const selectStyle: ComponentStyle<SelectProps> = ({ theme, clickable = true, searchable = true }) => {
  return css`
    ${preflight()}
    ${flexGrow(1)}
    &.o-select-status-error {
      .o-select-input-container,
      .o-select-input-container.o-select-input-focus {
        ${borderColor('danger')}
      }
      .o-select-icon-container {
        .o-select-icon {
          ${color('danger')}
        }
      }
    }
    &.o-select-status-warning {
      .o-select-input-container,
      .o-select-input-container.o-select-input-focus {
        ${borderColor('warning')}
      }
      .o-select-icon-container {
        .o-select-icon {
          ${color('warning')}
        }
      }
    }
    &.o-select-status-success {
      .o-select-input-container,
      .o-select-input-container.o-select-input-focus {
        ${borderColor('success')}
      }
      .o-select-icon-container {
        .o-select-icon {
          ${color('success')}
        }
      }
    }
    &.o-select-size-xsmall {
      .o-select-input-wrapper {
        ${paddingY(0)}
      }
      .o-select-input {
        ${paddingY(0)}
        ${fontSize('xs')}
      }
      .o-select-token {
        ${paddingY(0)}
        ${marginY('px')}
      }
    }
    &.o-select-size-small {
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
    &.o-select-size-medium {
      .o-select-input-wrapper {
        ${paddingY('xs')}
      }
      .o-select-input {
        ${paddingY('xs')}
        ${fontSize('default')}
      }
      .o-select-token {
        ${paddingY('0')}
        ${marginY('xs')}
      }
    }
    &.o-select-size-large {
      .o-select-input-wrapper {
        ${paddingY('md')}
      }
      .o-select-input {
        ${paddingY('md')}
        ${fontSize('md')}
      }
      .o-select-token {
        ${paddingY('sm')}
        ${marginY('xs')}
      }
    }
    &.o-select-size-xlarge {
      .o-select-input-wrapper {
        ${paddingY('lg')}
      }
      .o-select-input {
        ${paddingY('lg')}
        ${fontSize('lg')}
      }
      .o-select-token {
        ${paddingY('md')}
        ${marginY('xs')}
      }
    }

    .o-select-input-container {
      ${backgroundColor('white')}
      ${display('flex')}
      ${alignItems('center')}
      ${borderWidth('1px')}
      ${borderColor('light')}
      ${borderRadius('md')}
      ${clickable ? cursor('pointer') : cursor('auto')}
      ${padding('1px')}
      ${position('relative')}
      input {
        ${backgroundColor('inherit')}
      }
      &.o-select-input-focus {
        ${borderColor('primary')}
        ${borderWidth('2px')}
        ${padding(0)}
      }
    }

    .o-select-remover {
      ${cursor('pointer')}
      ${color('light')}
      ${fontFamily('Arial')}
      ${paddingX('sm')}
    }

    &.o-select-disabled {
      .o-select-input-container {
        ${backgroundColor('lighter')}
        ${cursor('not-allowed')}
        input {
          ${cursor('not-allowed')}
        }
      }

      .o-select-icon-container {
        ${cursor('not-allowed')}
      }

      .o-select-icon {
        ${color('dark')}
        ${cursor('not-allowed')}
      }

      .o-select-token {
        ${cursor('not-allowed')}
        ${backgroundColor('dark')}
      }

      .o-select-token-remove {
        ${cursor('not-allowed')}
      }
      &.o-select-close {
        .o-select-input {
          ${cursor('not-allowed')}
        }
      }
    }

    input.o-select-input {
      ${!searchable ? width(0) : ''}
    }

    .o-select-input-text {
      ${userSelect('none')}
    }

    &.o-select-close {
      .o-select-input {
        ${cursor(clickable ? 'pointer' : 'auto')}
      }
    }
    &.o-select-open {
      .o-select-input-container {
        ${borderBottomRightRadius(0)}
        ${borderBottomLeftRadius(0)}
      }
      .o-select-input {
        ${cursor(searchable ? 'auto' : 'pointer')}
      }
    }

    .o-select-input-data {
      ${display('flex')}
      ${flexGrow(1)}
      ${flexWrap('wrap')}
      ${alignItems('center')}
      ${paddingLeft('sm')}
      ${paddingRight(searchable ? 'sm' : 0)}
      ${maxWidth('calc(100% - 32px)')}
    }

    .o-select-input-wrapper {
      ${flexGrow(1)}
      ${color('gray-800')}
      ${position('relative')}
      ${display('inline-block')}
      ${minWidth('50px')}
    }

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

    .o-select-token {
      ${cursor('default')}
      ${whiteSpace('pre')}
      ${backgroundColor('primary')}
      ${color('white')}
      ${marginRight('sm')}
      ${borderRadius('md')}
      ${fontSize('sm')}
      ${display('flex')}
    }

    .o-select-token-text {
      ${flexGrow(1)}
      ${paddingLeft('sm')}
    }

    .o-select-token-disabled {
      ${paddingRight('sm')}
      ${backgroundColor('dark')}
      ${color('lightest')}
    }

    .o-select-token-remove {
      ${cursor('pointer')}
      ${color('white', { hover: 'danger' })}
      ${fontFamily('Arial')}
      ${paddingX('sm')}
    }

    .o-select-icon-container {
      ${color('primary')}
      ${cursor('pointer')}
      ${width(8)}
      ${paddingY('xs')}
      ${paddingX('xs')}
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

    &.o-select-multiple {
      .o-select-options {
        .o-select-option {
          &.o-select-option-active {
            ${backgroundColor(lighten(theme.colors.primary, 300))}
            ${color('inherit')}
          }
          &.o-select-option-selected {
            ${backgroundColor('primary')}
            ${color('white')}
            .o-select-option-multiple-checkbox {
              ${color(lighten(theme.colors.primary, 400))}
            }
          }
        }
      }
    }

    .o-select-not-found {
      ${display('flex')}
      ${flexDirection('column')}
      ${alignItems('center')}
      ${padding('4xl')}
      ${color('primary')}
    }
    .o-select-options,
    .o-select-not-found {
      ${borderRadius('sm')}
      ${borderTopLeftRadius(0)}
      ${borderTopRightRadius(0)}
      ${boxShadow('lg')}
      ${zIndex(2000)}
      ${backgroundColor('white')}
      ${borderWidth(1)}
      ${borderColor('light')}
      ${borderTopWidth(0)}
    }

    .o-select-options {
      scrollbar-width: thin;
      scrollbar-color: ${(props) => props.theme.palette.colors[props.theme.colors.primary]}
        ${(props) => props.theme.colors[props.theme.colors.lighter]};
      &::-webkit-scrollbar {
        width: 12px;
      }
      &::-webkit-scrollbar-track {
        background: ${(props) => props.theme.palette.colors[props.theme.colors.lighter]};
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.palette.colors[props.theme.colors.primary]};
        border: 3px solid ${(props) => props.theme.palette.colors[props.theme.colors.lighter]};
      }
      ${overflowY('hidden')}

      .o-select-option-group {
        ${paddingX('md')}
        ${userSelect('none')}
        ${fontWeight('bold')}
        ${paddingTop('sm')}
      }
      .o-select-option-group-item {
        ${paddingLeft('sm')}
      }

      .o-select-option {
        ${width('full')}
        ${paddingX('lg')}
        ${paddingY('xs')}
        ${display('flex')}
        ${alignItems('center')}
        ${backgroundColor('transparent', { hover: 'gray-200' })}
        ${userSelect('none')}
        ${minHeight('32px')}
        &.o-select-option-clickable {
          ${cursor('pointer')}
        }
        &.o-select-option-highlighted {
          ${backgroundColor('gray-200')}
          ${color('inherit')}
        }
        &.o-select-option-active {
          ${backgroundColor(lighten(theme.colors.primary, 600))}
          ${color('primary')}
          ${fontWeight('bold')}
        }

        .o-select-option-icon {
          ${width(6)}
          ${fontSize('sm')}
          ${fontWeight('bold')}
        }

        .o-select-option-data {
          ${flexGrow(1)}
        }

        .o-select-option-multiple-checkbox {
          ${marginRight('sm')}
          ${color('primary')}
        }
      }
    }
  `;
};

export default selectStyle;
