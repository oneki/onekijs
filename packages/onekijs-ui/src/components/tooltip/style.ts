import { css } from 'styled-components';
import { backgroundColor } from '../../styles/background';
import {
  borderBottomColor,
  borderColor,
  borderLeftColor,
  borderRadius,
  borderRightColor,
  borderStyle,
  borderTopColor,
  borderWidth,
  boxShadow
} from '../../styles/border';
import { display } from '../../styles/display';
import { cursor, pointerEvents } from '../../styles/interactivity';
import { bottom, left, position, right, top, zIndex } from '../../styles/position';
import { height, width } from '../../styles/size';
import { margin, marginBottom, marginLeft, marginRight, marginTop, padding } from '../../styles/spacing';
import { transition } from '../../styles/transition';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize } from '../../styles/typography';
import { TooltipProps } from './typings';

const tooltipStyle: ComponentStyle<TooltipProps> = ({ kind = 'secondary', theme }) => {
  const t = theme.tooltip[kind];
  const bgColor = t.bgColor;
  const fColor = t.color;
  const bColor = t.borderColor;
  return css`
    ${cursor('pointer')}
    ${display('inline-flex')}
    .o-tooltip-container {
      ${cursor('default')}
      ${backgroundColor(bgColor)}
      ${borderRadius(t.borderRadius)}
      ${borderWidth(t.borderWidth)}
      ${borderStyle(t.borderStyle)}
      ${borderColor(bColor)}
      ${boxShadow(t.boxShadow)}
      ${color(fColor)}
      ${transition('opacity 0.3s')}
      ${zIndex(9999)}
      ${padding(t.padding)}
      ${fontSize(t.fontSize)}
      a {
        ${color(t.linkColor)}
      }
      &[data-popper-interactive='false'] {
        ${pointerEvents('none')}
      }
      &[data-popper-placement*='bottom'] {
        .o-tooltip-arrow {
          ${left(0)}
          ${marginTop('-0.4rem')}
          ${top(0)}
          &::before {
            ${borderColor('transparent')}
            ${borderBottomColor(bColor)}
            ${borderWidth('0 0.5rem 0.4rem 0.5rem')}
            ${position('absolute')}
            ${top('-1px')}
          }
          &::after {
            ${borderColor('transparent')}
            ${borderBottomColor(bgColor)}
            ${borderWidth('0 0.5rem 0.4rem 0.5rem')}
          }
        }
      }
      &[data-popper-placement*='top'] {
        .o-tooltip-arrow {
          ${left(0)}
          ${marginBottom('-1rem')}
          ${bottom(0)}
          &::before {
            ${borderColor('transparent')}
            ${borderTopColor(bColor)}
            ${borderWidth('0.4rem 0.5rem 0 0.5rem')}
            ${position('absolute')}
            ${top('1px')}
          }
          &::after {
            ${borderColor('transparent')}
            ${borderTopColor(bgColor)}
            ${borderWidth('0.4rem 0.5rem 0 0.5rem')}
          }
        }
      }

      &[data-popper-placement*='right'] {
        .o-tooltip-arrow {
          ${left(0)}
          ${marginLeft('-0.7rem')}
          &::before {
            ${borderColor('transparent')}
            ${borderRightColor(bColor)}
            ${borderWidth('0.5rem 0.4rem 0.5rem 0')}
          }
          &::after {
            ${borderColor('transparent')}
            ${borderRightColor(bgColor)}
            ${borderWidth('0.5rem 0.4rem 0.5rem 0')}
            ${left('6px')}
            ${top(0)}
          }
        }
      }

      &[data-popper-placement*='left'] {
        .o-tooltip-arrow {
          ${right(0)}
          ${marginRight('-0.7rem')}
          &::before {
            ${borderColor('transparent')}
            ${borderLeftColor(bColor)}
            ${borderWidth('0.5rem 0 0.5rem 0.4em')}
          }
          &::after {
            ${borderColor('transparent')}
            ${borderLeftColor(bgColor)}
            ${borderWidth('0.5rem 0 0.5rem 0.4em')}
            ${left('3px')}
            ${top(0)}
          }
        }
      }
    }
    &.o-tooltip-arrow, .o-tooltip-arrow {
      ${height('1rem')}
      ${width('1rem')}
      ${position('absolute')}
      ${pointerEvents('none')}
      &::before {
        ${borderStyle('solid')}
        content: '';
        ${display('block')}
        ${height(0)}
        ${width(0)}
        ${margin('auto')}
      }
      &::after {
        ${borderStyle('solid')}
        content: '';
        ${display('block')}
        ${height(0)}
        ${width(0)}
        ${margin('auto')}
        ${position('absolute')}
      }
    }
  `;
};

export default tooltipStyle;
