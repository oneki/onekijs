import { css } from 'styled-components';
import { alignItems, columnGap, justifyContent, rowGap } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderStyle, borderTopLeftRadius, borderTopRightRadius, borderTopWidth, borderWidth, boxShadow } from '../../styles/border';
import { display } from '../../styles/display';
import { gridTemplateColumns } from '../../styles/grid';
import { cursor } from '../../styles/interactivity';
import { ComponentStyle } from '../../styles/typings';
import { color, fontWeight } from '../../styles/typography';
import { DatePickerProps } from './typings';
import { zIndex } from '../../styles/position';
import { marginBottom, marginLeft, marginRight, padding } from '../../styles/spacing';
import { width } from '../../styles/size';

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
    .o-calendar-month {
      ${display('flex')}
      ${alignItems('center')}
      ${marginBottom('md')}
      ${columnGap('sm')}
    }

    .o-calendar-select-month {
      ${width(24)}
    }

    .o-calendar-select-year {
      ${width(12)}
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
      ${borderColor('darker')}
      ${borderWidth('2px')}
      ${borderStyle('solid')}
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
