import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import {
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderBottomWidth,
  borderColor,
  borderStyle,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderWidth,
} from '../../styles/border';
import { display } from '../../styles/display';
import { iconHeight, iconWidth } from '../../styles/icon';
import { cursor } from '../../styles/interactivity';
import { overflowY } from '../../styles/overflow';
import { marginTop, paddingX, paddingY } from '../../styles/spacing';
import { transitionDuration, transitionProperty, transitionTimingFunction } from '../../styles/transition';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize, fontWeight } from '../../styles/typography';
import { AccordionProps } from './typings';

export const accordionStyle: ComponentStyle<AccordionProps> = ({ border = false, animate = 150, theme }) => {
  const t = theme.accordion;
  const bWidth = border ? t.borderWidth : 0;
  return css`
    .o-accordion-animate-enter-active,
    .o-accordion-animate-exit-active {
      ${overflowY('hidden')}
      ${transitionDuration(`${animate}ms`)}
      ${transitionProperty('height,opacity')}
      ${transitionTimingFunction('ease-in-out')}
    }
    .o-accordion-panel {
      ${borderWidth(bWidth)}
      ${borderTopLeftRadius(0, { 'first-child': t.borderRadius })}
      ${borderTopRightRadius(0, { 'first-child': t.borderRadius })}
      ${borderBottomLeftRadius(0, { 'last-child': t.borderRadius })}
      ${borderBottomRightRadius(0, { 'last-child': t.borderRadius })}
      ${borderBottomWidth(0, { 'last-child': bWidth })}
      ${borderStyle(t.borderStyle)}
      ${borderColor(t.borderColor)}
    }

    .o-accordion-panel-active {
      .o-accordion-panel-title {
        ${backgroundColor(t.activeBgColor, { hover: t.hoverBgColor })}
        ${color(t.activeFontColor, { hover: t.activeFontColor })}
      }
      .o-accordion-content {
        ${backgroundColor(t.activeBgColor, { hover: t.activeBgColor })}
      }
    }

    .o-accordion-panel-title {
      ${display('flex')}
      ${alignItems('center')}
      ${fontWeight(t.fontWeight)}
      ${color(t.fontColor, { hover: t.hoverFontColor })}
      ${fontSize(t.fontSize)}
      ${cursor('pointer')}
      ${paddingX(t.paddingX)}
      ${paddingY(t.paddingY)}
      ${backgroundColor(t.bgColor, { hover: t.hoverBgColor })}
      .o-toggler-icon-container {
        ${iconHeight(t.togglerIconHeight)};
        ${iconWidth(t.togglerIconWidth)};
        ${marginTop('-2px')}
      }
    }
  `;
};
