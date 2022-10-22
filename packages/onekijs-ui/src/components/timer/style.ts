import { css } from 'styled-components';
import { alignItems, justifyContent } from '../../styles/alignment';
import { display } from '../../styles/display';
import { position, top } from '../../styles/position';
import { height, width } from '../../styles/size';
import { marginTop } from '../../styles/spacing';
import { fill, stroke, strokeWidth } from '../../styles/svg';
import { transform, transformOrigin } from '../../styles/transform';
import { transition } from '../../styles/transition';
import { ComponentStyle } from '../../styles/typings';
import { fontSize, fontWeight } from '../../styles/typography';
import { TimerProps } from './typings';

export const timerStyle: ComponentStyle<TimerProps> = ({
  width: w = '28px',
  height: h = '28px',
  thickness = '14px',
}) => {
  return css`
    ${position('relative')}
    ${height(h)}
    ${width(w)}
    .o-timer-svg {
      ${transform('scaleX(-1)')}
    }
    .o-timer-svg-circle {
      ${fill('none')}
      ${stroke('none')}
    }
    .o-timer-svg-elapsed {
      ${strokeWidth(thickness)}
      ${stroke('light')}
    }
    .o-timer-label {
      ${position('absolute')}
      ${height(h)}
      ${width(w)}
      ${top(0)}
      ${display('flex')}
      ${alignItems('center')}
      ${justifyContent('center')}
      ${fontSize('sm')}
      ${marginTop('px')}
      ${fontWeight('bold')}
    }

    .o-timer-svg-remaining {
      ${strokeWidth(thickness)}
      stroke-linecap: round;
      ${transform('rotate(90deg)')}
      ${transformOrigin('center')}
      ${transition('100ms linear all')}
      ${stroke('currentColor')}
    }
  `;
};
