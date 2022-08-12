import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import {
  borderBottomColor,
  borderBottomStyle,
  borderBottomWidth,
  borderLeftColor,
  borderLeftStyle,
  borderLeftWidth,
  borderRightColor,
  borderRightStyle,
  borderRightWidth,
} from '../../styles/border';
import { display } from '../../styles/display';
import { flexDirection } from '../../styles/flex';
import { cursor } from '../../styles/interactivity';
import { padding, paddingBottom, paddingLeft, paddingRight, paddingTop } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize, fontWeight, lineHeight } from '../../styles/typography';
import { WizardProps } from './typings';

export const wizardStyle: ComponentStyle<WizardProps> = ({ layout = 'vertical', theme }) => {
  const t = theme.wizard;
  const stepBorderWidthFn = layout === 'horizontal' ? borderBottomWidth : borderLeftWidth;
  const stepBorderStyleFn = layout === 'horizontal' ? borderBottomStyle : borderLeftStyle;
  const stepBorderColorFn = layout === 'horizontal' ? borderBottomColor : borderLeftColor;
  const wizardBorderWidthFn = layout === 'horizontal' ? borderBottomWidth : borderRightWidth;
  const wizardBorderStyleFn = layout === 'horizontal' ? borderBottomStyle : borderRightStyle;
  const wizardBorderColorFn = layout === 'horizontal' ? borderBottomColor : borderRightColor;
  return css`
    ${display('flex')}
    ${flexDirection(layout === 'horizontal' ? 'column' : 'row')}
    .o-wizard-steps {
      ${display('flex')}
      ${flexDirection(layout === 'horizontal' ? 'row' : 'column')}
      ${alignItems(layout === 'horizontal' ? 'flex-end' : 'stretch')}
      ${wizardBorderStyleFn(t.stepsBorderStyle)}
      ${wizardBorderWidthFn(t.stepsBorderWidth)}
      ${wizardBorderColorFn(t.stepsBorderColor)}
      ${paddingRight(t.stepsPaddingRight)}
      ${paddingTop(t.stepsPaddingTop)}
      ${paddingLeft(t.stepsPaddingLeft)}
      ${paddingBottom(t.stepsPaddingBottom)}
      ${backgroundColor(t.stepsBgColor)}
    }

    .o-step {
      ${paddingRight(t.paddingRight)}
      ${paddingTop(t.paddingTop)}
      ${paddingLeft(t.paddingLeft)}
      ${paddingBottom(t.paddingBottom)}
      ${stepBorderStyleFn(t.borderStyle)}
      ${stepBorderWidthFn(t.borderWidth)}
      ${stepBorderColorFn(t.borderColor)}
    }

    .o-step-active {
      ${stepBorderColorFn(t.activeBorderColor)}
      ${color(t.activeFontColor)}
      ${fontWeight(t.activeFontWeight)}
      ${fontSize(t.activeFontSize)}
      ${backgroundColor(t.activeBgColor)}
      &.o-step-enabled {
        ${cursor('default')}
      }
    }

    .o-step-enabled {
      ${cursor(t.cursor)}
    }

    .o-step-disabled {
      ${cursor('not-allowed')}
      ${stepBorderColorFn(t.disabledBorderColor)}
      ${color(t.disabledFontColor)}
      ${fontWeight(t.disabledFontWeight)}
      ${fontSize(t.disabledFontSize)}
      ${backgroundColor(t.disabledBgColor)}
    }

    .o-step-success {
      ${stepBorderColorFn(t.successBorderColor)}
      ${color(t.successFontColor)}
      ${fontWeight(t.successFontWeight)}
      ${fontSize(t.successFontSize)}
      ${backgroundColor(t.successBgColor)}
    }

    .o-step-error {
      ${stepBorderColorFn(t.errorBorderColor)}
      ${color(t.errorFontColor)}
      ${fontWeight(t.errorFontWeight)}
      ${fontSize(t.errorFontSize)}
      ${backgroundColor(t.errorBgColor)}
    }

    .o-wizard-content {
      ${padding('lg')}
    }

    .o-wizard-title {
      ${fontSize('2xl')}
      ${fontWeight('light')}
      ${color('black')}
      ${lineHeight('4xl')}
      ${paddingBottom('md')}
    }

  `;
};
