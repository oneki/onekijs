import { PaddingProperty } from 'csstype';
import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderRadius } from '../../styles/border';
import { display } from '../../styles/display';
import { cursor } from '../../styles/interactivity';
import { marginBottom, marginLeft, marginRight, marginTop, paddingTop, paddingX } from '../../styles/spacing';
import { ComponentStyle, SpacingPropertyTheme, TLength } from '../../styles/typings';
import { color, fontSize, lineHeight } from '../../styles/typography';
import { TagProps } from './typings';

export const tagStyle: ComponentStyle<TagProps> = ({
  theme,
  kind,
  bgColor = 'primary',
  fontColor = 'white',
  size = 'small',
  onClick,
  marginBottom: mb = 0,
  marginLeft: ml = 0,
  marginRight: mr = 0,
  marginTop: mt = 0,
}) => {
  let fSize = 'sm';
  let lHeight = 'md';
  let pX = 'md';
  let radius = 'sm';
  const pt: SpacingPropertyTheme | PaddingProperty<TLength> = '2xs';
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
    ${marginLeft(ml)}
    ${marginRight(mr)}
    ${marginBottom(mb)}
    ${marginTop(mt)}
    ${lineHeight(lHeight)}
    ${paddingX(pX)}
    ${paddingTop(pt)}
    ${color(kind ? theme.buttons[kind].color : fontColor)}
    ${fontSize(fSize)}
    ${cursor(onClick ? 'pointer' : 'inherit')}
    ${borderRadius(radius)}
    .o-tag-icon {
      ${marginRight('xs')}
      ${display('inline-flex')}
      ${alignItems('center')}
    }
  `;
};
