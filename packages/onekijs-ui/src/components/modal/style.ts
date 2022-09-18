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
import { ComponentStyle, SizePropertyTheme, TLength } from '../../styles/typings';
import { color, fontSize, fontWeight, lineHeight } from '../../styles/typography';
import { ModalProps } from './typings';

export const modalStyle: ComponentStyle<ModalProps> = ({ width: w, height: h, size = 'medium', theme }) => {
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
    ${opacity(0)}

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
      transform: translateY(-40px);
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
      ${display('flex')}
      ${width('full')}
      ${flexDirection('column')}
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

    &.o-modal-enter-done,
    &.o-modal-exit {
      ${backgroundOpacity(t.maskOpacity)}
      ${opacity(1)}
      .o-modal-dialog {
        transform: translateY(0px);
      }
    }

    .o-form {
      ${flexGrow(1)}
    }

    .o-wizard {
      ${height('100%')}
    }
    .o-wizard-content-panel {
      ${height('100%')}
    }

    .o-wizard-step-panel,
    .o-wizard-content {
      ${overflow('auto')}
      ${height('100%')}
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
    }
  `;
};
