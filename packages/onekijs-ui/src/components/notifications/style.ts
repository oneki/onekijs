import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderWidth, boxShadow } from '../../styles/border';
import { display } from '../../styles/display';
import { opacity } from '../../styles/effects';
import { cursor } from '../../styles/interactivity';
import { bottom, left, position, right, top, zIndex } from '../../styles/position';
import { maxWidth, minHeight, minWidth } from '../../styles/size';
import { marginBottom, marginRight, padding } from '../../styles/spacing';
import { transform } from '../../styles/transform';
import { ComponentStyle } from '../../styles/typings';
import { color } from '../../styles/typography';
import { NotificationsProps } from './typings';

export const notifcationsStyle: ComponentStyle<NotificationsProps> = ({ position: pos = 'bottom-right' }) => {
  const translate =
    pos === 'bottom-left' || pos === 'bottom-right'
      ? 'translateY(250px)'
      : pos === 'top-left'
      ? 'translateX(-250px)'
      : 'translateX(250px)';
  return css`
    ${position('absolute')}
    ${pos === 'top-right' || pos === 'top-left' ? top(0) : bottom(0)}
    ${pos === 'top-right' || pos === 'bottom-right' ? right(0) : left(0)}
    ${padding('2xl')}
    ${zIndex(2000)}
    .o-notification-container {
      ${transform(translate)}
      ${opacity(0)}
      ${display('flex')}
    }
    .o-notification {
      ${minWidth('450px')}
      ${maxWidth('450px')}
      ${minHeight(24)}
      ${backgroundColor('white')}
      ${borderRadius('sm')}
      ${boxShadow('lg')}
      ${borderWidth(1)}
      ${borderColor('lighter')}
      ${padding('lg')}
      ${display('flex')}
      ${alignItems('center')}
      ${position('relative')}
      ${marginBottom('xl')}

      &.o-notification-error {
        ${backgroundColor('red-100')}
        ${borderColor('red-200')}
        .o-notification-timer {
          ${color('danger')}
        }
      }
      &.o-notification-success {
        ${backgroundColor('green-0')}
        ${borderColor('green-100')}
        .o-notification-timer {
          ${color('green-500')}
        }
      }
      &.o-notification-info {
        ${backgroundColor('blue-0')}
        ${borderColor('blue-200')}
        .o-notification-timer {
          ${color('blue-500')}
        }
      }
      &.o-notification-warning {
        ${backgroundColor('yellow-100')}
        ${borderColor('yellow-200')}
        .o-notification-timer {
          ${color('warning')}
        }
      }
    }
    .o-notification-icon {
      ${marginRight('md')}
    }
    .o-notification-close {
      ${position('absolute')}
      ${top(0)}
      ${right(0)}
      ${padding('sm')}
      ${cursor('pointer')}
    }

    .o-notification-timer {
      ${position('absolute')}
      ${bottom(0)}
      ${right(0)}
      ${padding('sm')}
    }
  `;
};
