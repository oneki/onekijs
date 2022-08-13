import { HeightProperty } from 'csstype';
import { get } from 'onekijs-framework';
import { css } from 'styled-components';
import { alignItems, justifyContent } from '../../styles/alignment';
import { backgroundColor, backgroundOpacity } from '../../styles/background';
import { borderRadius, boxShadow } from '../../styles/border';
import { display } from '../../styles/display';
import { opacity } from '../../styles/effects';
import { flexDirection, flexGrow } from '../../styles/flex';
import { cursor } from '../../styles/interactivity';
import { overflow } from '../../styles/overflow';
import { bottom, left, position, right, top, zIndex } from '../../styles/position';
import { height, maxHeight, maxWidth, width } from '../../styles/size';
import { marginLeft, padding } from '../../styles/spacing';
import { transitionDuration, transitionProperty, transitionTimingFunction } from '../../styles/transition';
import { ComponentStyle, SizePropertyTheme, TLength } from '../../styles/typings';
import { color, fontSize, fontWeight, lineHeight } from '../../styles/typography';
import { ModalProps } from './typings';

export const modalStyle: ComponentStyle<ModalProps> = ({
  width: w,
  height: h,
  size = 'medium',
  theme,
  animationDuration = 150,
}) => {
  const t = theme.modal;
  w = w ?? size;
  h = h ?? size;

  const themeWidth: SizePropertyTheme | HeightProperty<TLength> = get(t, `${w}Size`) ?? w;
  const themeHeight: SizePropertyTheme | HeightProperty<TLength> = get(t, `${h}Size`) ?? h;
  const themeFontColor = theme.palette.colors[theme.colors.primary];

  return css`
    ${position('fixed')}
    ${top(0)}
    ${bottom(0)}
    ${right(0)}
    ${left(0)}
    ${zIndex(t.zIndex)}
    ${display('flex')}
    ${flexDirection('column')}
    ${justifyContent('center')}
    ${alignItems('center')}
    ${padding('5xl')}
    ${backgroundColor(t.maskColor)}
    ${backgroundOpacity(t.maskOpacity)}

    .o-modal-dialog {
      ${backgroundColor(t.bgColor)}
      ${position('relative')}
      ${zIndex(t.zIndex)}
      ${boxShadow(t.boxShadow)}
      ${maxHeight('full')}
      ${maxWidth('full')}
      ${width(themeWidth)}
      ${height(themeHeight)}
      ${borderRadius(t.borderRadius)}
      ${display('flex')}
      ${flexDirection('column')}
      transform: translateY(0);
      ${opacity(1)}
    }

    .o-modal-close-icon {
      ${padding('lg')}
      ${position('absolute')}
      ${top(0)}
      ${right(0)}
      ${color('transparent')}
      text-shadow: 0 0 0 ${themeFontColor};
      ${cursor('pointer')}
    }
    .o-modal-header {
      ${fontSize('4xl')}
      ${fontWeight('light')}
      ${color('black')}
      ${lineHeight('4xl')}
      ${padding('2xl')}
    }

    .o-modal-content {
      ${flexGrow(1)}
      ${overflow('auto')}
    }
    .o-modal-footer {
      ${display('flex')}
      ${flexDirection('row')}
      ${justifyContent('flex-end')}
      ${padding('2xl')}
    }

    .o-modal-button {
      ${marginLeft('sm')}
    }

    &.o-modal-exit-active {
      ${opacity(0)}
      ${transitionDuration(`${animationDuration}ms`)}
      ${transitionProperty('opacity,transform')}
      ${transitionTimingFunction('ease-in')}
      .o-modal-dialog {
        transform: translateY(-40px);
        ${transitionDuration(`${animationDuration}ms`)}
        ${transitionProperty('transform')}
        ${transitionTimingFunction('ease-in')}
      }
    }
  `;
};
