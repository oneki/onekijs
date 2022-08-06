import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderRadius } from '../../styles/border';
import { display } from '../../styles/display';
import { cursor } from '../../styles/interactivity';
import { marginLeft, marginX, paddingX } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize, lineHeight } from '../../styles/typography';
import { TagProps } from './typings';

export const tagStyle: ComponentStyle<TagProps> = ({
  theme,
  kind,
  bgColor = 'primary',
  fontColor = 'white',
  size = 'small',
  onClick,
}) => {
  let fSize = 'sm';
  let lHeight = 'md';
  let pX = 'md';
  let radius = 'sm';
  if (size === 'small') {
    fSize = 'xs';
    lHeight = 'xs';
    radius = 'xs';
    pX = 'sm';
  }
  if (size === 'large') {
    fSize = 'md';
    lHeight = 'lg';
  }

  return css`
    ${display('inline-flex')}
    ${alignItems('center')}
    ${backgroundColor(kind ? theme.buttons[kind].bgColor : bgColor)}
    ${marginLeft('md')}
    ${lineHeight(lHeight)}
    ${paddingX(pX)}
    ${color(kind ? theme.buttons[kind].color : fontColor)}
    ${fontSize(fSize)}
    ${cursor(onClick ? 'pointer' : 'inherit')}
    ${borderRadius(radius)}
    ${marginX('sm')}
  `;
};
