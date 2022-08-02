import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import {
  borderBottomColor,
  borderBottomStyle,
  borderBottomWidth,
  borderColor,
  borderRadius,
  borderStyle,
  borderWidth,
  boxShadow,
} from '../../styles/border';
import { display } from '../../styles/display';
import { cursor, userSelect } from '../../styles/interactivity';
import { overflowY } from '../../styles/overflow';
import { marginLeft, paddingX, paddingY } from '../../styles/spacing';
import { transitionDuration, transitionProperty, transitionTimingFunction } from '../../styles/transition';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize, fontWeight, letterSpacing, textTransform } from '../../styles/typography';
import { CardProps } from './typings';

export const cardStyle: ComponentStyle<CardProps> = ({ theme, collapsable = true, animate = 150, bordered = true }) => {
  const t = theme.card;
  return css`
    ${backgroundColor(t.bgColor)}
    ${borderWidth(bordered ? t.borderWidth : 0)}
    ${borderColor(t.borderColor)}
    ${borderStyle(t.borderStyle)}
    ${borderRadius(t.borderRadius)}
    ${boxShadow(t.shadow)}
    .o-card-animate-enter-active, .o-card-animate-exit-active {
      ${overflowY('hidden')}
      ${transitionDuration(`${animate}ms`)}
      ${transitionProperty('height,opacity')}
      ${transitionTimingFunction('linear')}
    }
    .o-card-title-container {
      ${display('flex')}
      ${alignItems('center')}
      ${cursor(collapsable ? 'pointer' : 'default')}
      ${color(t.fontColor)}
      ${textTransform(t.fontCase)}
      ${fontWeight(t.fontWeight)}
      ${fontSize(t.fontSize)}
      ${borderBottomWidth(t.titleBorderBottomWidth)}
      ${borderBottomColor(t.borderColor)}
      ${borderBottomStyle(t.borderStyle)}
      ${paddingX(t.paddingX)}
      ${paddingY(t.paddingY)}
      ${letterSpacing(t.letterSpacing)}
      .o-card-title {
        ${marginLeft('sm')}
      }
      ${userSelect('none')}
    }
    .o-card-content {
      ${paddingX(t.paddingX)}
      ${paddingY(t.paddingY)}
    }

  `;
};
