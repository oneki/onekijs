import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import {
  borderBottomColor,
  borderBottomStyle,
  borderBottomWidth,
  borderRightColor,
  borderRightStyle,
  borderRightWidth,
} from '../../styles/border';
import { display } from '../../styles/display';
import { flexDirection } from '../../styles/flex';
import { cursor } from '../../styles/interactivity';
import { marginBottom, marginLeft, marginRight, marginTop, paddingTop, paddingX, paddingY } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize, fontWeight } from '../../styles/typography';
import { TabsProps } from './typings';

export const tabsStyle: ComponentStyle<TabsProps> = ({ layout = 'horizontal', theme }) => {
  const t = theme.tab;
  const borderWidthFn = layout === 'horizontal' ? borderBottomWidth : borderRightWidth;
  const borderStyleFn = layout === 'horizontal' ? borderBottomStyle : borderRightStyle;
  const borderColorFn = layout === 'horizontal' ? borderBottomColor : borderRightColor;
  const marginBeforeFn = layout === 'horizontal' ? marginLeft : marginTop;
  const marginAfterFn = layout === 'horizontal' ? marginRight : marginBottom;
  const marginSideFn = layout === 'horizontal' ? marginBottom : marginRight;
  return css`
    ${display('flex')}
    ${flexDirection(layout === 'horizontal' ? 'column' : 'row')}
    .o-tabs-title {
      ${display('flex')}
      ${flexDirection(layout === 'horizontal' ? 'row' : 'column')}
      ${alignItems('flex-end')}
      ${borderStyleFn(t.borderStyle)}
      ${borderWidthFn(t.borderWidth)}
      ${borderColorFn(t.borderColor)}
    }

    .o-tab {
      ${paddingX(t.paddingX)}
      ${paddingY(t.paddingY)}
      ${marginBeforeFn(t.marginBefore)}
      ${marginAfterFn(t.marginAfter)}
      ${marginSideFn(`-${t.borderWidth}`)}
      &.o-tab-active {
        ${borderWidthFn(t.activeBorderWidth)}
        ${borderStyleFn(t.activeBorderStyle)}
        ${borderColorFn(t.activeBorderColor)}
        ${color(t.activeFontColor)}
        ${fontWeight(t.activeFontWeight)}
        ${fontSize(t.activeFontSize)}
        &.o-tab-enabled {
          ${cursor('default')}
        }
      }
      &.o-tab-inactive {
        ${borderWidthFn(t.activeBorderWidth)}
        ${borderStyleFn(t.activeBorderStyle)}
        ${borderColorFn('transparent', { hover: t.hoverBorderColor })}
        ${color(t.fontColor)}
        ${fontWeight(t.fontWeight)}
        ${fontSize(t.fontSize)}
        ${backgroundColor(t.bgColor, { hover: t.hoverBgColor })}
      }
      &.o-tab-enabled {
        ${cursor(t.cursor)}
      }
    }

    .o-tabs-content {
      ${paddingTop('lg')}
    }



  `;
};
