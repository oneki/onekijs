import { css } from 'styled-components';
import { alignItems, justifyContent } from '../../styles/alignment';
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
import { flexDirection, flexGrow } from '../../styles/flex';
import { cursor } from '../../styles/interactivity';
import { marginLeft, padding, paddingBottom, paddingLeft, paddingRight, paddingTop } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize, fontWeight, lineHeight, textDecoration } from '../../styles/typography';
import { WizardModalProps, WizardProps } from './typings';

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
    .o-wizard-step-panel {
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
      ${fontWeight(t.fontWeight)}
      ${fontSize(t.fontSize)}
      ${color(t.fontColor)}
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

      &.o-step-warning {
        ${stepBorderColorFn(t.warningBorderColor)}
        ${color(t.warningFontColor)}
        ${backgroundColor(t.warningBgColor)}
      }
      &.o-step-error {
        ${stepBorderColorFn(t.errorBorderColor)}
        ${color(t.errorFontColor)}
        ${backgroundColor(t.errorBgColor)}
      }
    }

    .o-step-inactive {
      &.o-step-success,
      &.o-step-touched {
        ${stepBorderColorFn(t.successBorderColor)}
        ${color(t.successFontColor)}
      }
      &.o-step-warning {
        ${stepBorderColorFn(t.warningBorderColor)}
        ${color(t.warningFontColor)}
      }
      &.o-step-error {
        ${stepBorderColorFn(t.errorBorderColor)}
        ${color(t.errorFontColor)}
      }
    }

    .o-step-enabled {
      ${cursor(t.cursor)}
    }

    .o-step-disabled,
    .o-step-untouched {
      ${cursor('default')}
      ${stepBorderColorFn(t.disabledBorderColor)}
      ${color(t.disabledFontColor)}
      ${fontWeight(t.disabledFontWeight)}
      ${fontSize(t.disabledFontSize)}
      ${backgroundColor(t.disabledBgColor)}
    }

    .o-step-disabled {
      ${cursor('not-allowed')}
      ${textDecoration('line-through')}
    }

    .o-wizard-content-panel {
      ${display('flex')}
      ${flexDirection('column')}
    }

    .o-wizard-content {
      ${flexGrow(1)}
      ${padding('lg')}
    }

    .o-wizard-control {
      ${display('flex')}
      ${justifyContent('flex-end')}
      ${padding('lg')}
    }

    .o-wizard-control-button {
      ${marginLeft('sm')}
    }

    .o-wizard-title {
      ${fontSize('2xl')}
      ${fontWeight('light')}
      ${color('black')}
      ${lineHeight('4xl')}
      ${paddingBottom('md')}
    }

    .o-step-content-title {
      ${fontSize('2xl')}
      ${fontWeight('light')}
      ${color('black')}
      ${lineHeight('4xl')}
      ${paddingBottom('md')}
    }
  `;
};

export const wizardModalStyle: ComponentStyle<WizardModalProps> = () => {
  return css``;
};
