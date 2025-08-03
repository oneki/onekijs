import { css } from 'styled-components';
import { alignItems, columnGap, justifyContent, rowGap } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderTopLeftRadius, borderTopRightRadius, borderTopWidth, borderWidth, boxShadow } from '../../styles/border';
import { display } from '../../styles/display';
import { gridTemplateColumns } from '../../styles/grid';
import { cursor } from '../../styles/interactivity';
import { ComponentStyle } from '../../styles/typings';
import { color, fontWeight } from '../../styles/typography';
import { DatePickerProps } from './typings';
import { zIndex } from '../../styles/position';
import { padding } from '../../styles/spacing';

export const datePickerStyle: ComponentStyle<DatePickerProps> = () => {
  return css`
    .o-calendar-container {
      ${borderRadius('sm')}
      ${borderTopLeftRadius(0)}
      ${borderTopRightRadius(0)}
      ${boxShadow('lg')}
      ${zIndex(2000)}
      ${backgroundColor('white')}
      ${borderWidth(1)}
      ${borderColor('light')}
      ${borderTopWidth(0)}
      ${padding('lg')}
    }
    .o-calendar-day-container {
      ${display('grid')}
      ${color('light')}
      ${gridTemplateColumns('repeat(7, 1fr)')}
      grid-template-rows: repeat(7, min(30px));
      ${rowGap('5px')}
      ${columnGap('5px')}
    }
    .o-calendar-day-title {
      ${display('flex')}
      ${alignItems('center')}
      ${justifyContent('center')}
      ${color('dark')}
    }
    .o-calendar-day {
      ${display('flex')}
      ${alignItems('center')}
      ${justifyContent('center')}
      ${cursor('pointer')}
      ${borderRadius('md')}
    }
    .o-calendar-day-in-month {
      ${color('darkest')}
      ${backgroundColor('lighter')}
    }
    .o-calendar-day-current {
      ${color('white')}
      ${backgroundColor('darker')}
      ${fontWeight('medium')}
    }
    .o-calendar-day-active {
      ${color('white')}
      ${backgroundColor('primary')}
      ${fontWeight('medium')}
    }

    .o-datepicker-icon {
      ${cursor('pointer')}
    }
  `;
};
