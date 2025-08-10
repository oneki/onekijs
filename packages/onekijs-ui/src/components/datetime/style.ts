import { css } from 'styled-components';
import { alignItems, columnGap, justifyContent, rowGap } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderBottomLeftRadius, borderBottomRightRadius, borderColor, borderRadius, borderStyle, borderTopLeftRadius, borderTopRightRadius, borderWidth, boxShadow } from '../../styles/border';
import { display } from '../../styles/display';
import { gridTemplateColumns } from '../../styles/grid';
import { cursor } from '../../styles/interactivity';
import { zIndex } from '../../styles/position';
import { width } from '../../styles/size';
import { marginBottom, marginLeft, marginTop, marginX, marginY, padding } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontWeight, textAlign } from '../../styles/typography';
import { flexDirection } from '../../styles/flex';
import { DatePickerProps } from './typings';

export const datePickerStyle: ComponentStyle<DatePickerProps> = () => {
  return css`
    .o-calendar {
      ${width('300px')}
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

    .o-calendar-day-in-range {
      ${backgroundColor('lightblue')}
      ${borderRadius('none')}
      ${color('white')}
    }

    .o-calendar-day-in-range-transient {
      ${backgroundColor('dark')}
      ${borderRadius('none')}
      ${color('white')}
    }

    .o-calendar-day-start-range, .o-calendar-day-start-range-transient {
      ${borderTopRightRadius('none')}
      ${borderBottomRightRadius('none')}
    }

    .o-calendar-day-end-range, .o-calendar-day-end-range-transient {
      ${borderTopLeftRadius('none')}
      ${borderBottomLeftRadius('none')}
    }

    .o-datepicker-dropdown-content {
      ${borderRadius('sm')}
      ${borderTopLeftRadius(0)}
      ${borderTopRightRadius(0)}
      ${boxShadow('lg')}
      ${zIndex(2000)}
      ${backgroundColor('white')}
      ${borderWidth(1)}
      ${borderColor('light')}
      ${marginTop('-1px')}
      ${padding('lg')}
    }

    .o-datepicker-active {
      .o-calendar-day-active {
        ${color('white')}
        ${backgroundColor('primary')}
        ${fontWeight('medium')}
        &.o-calendar-day-end-range-transient {
          ${backgroundColor('darkest')}
          &.o-calendar-day-start-range {
            ${backgroundColor('primary')}
          }
        }
        &.o-calendar-day-start-range-transient {
          ${backgroundColor('darkest')}
        }
      }
    }


    .o-datepicker-icon {
      ${cursor('pointer')}
    }

    .o-datepicker-dropdown-content {
      ${display('flex')}
      ${alignItems('center')}
    }

    .o-toggler-icon {
      ${cursor('pointer')}
    }

    .o-time-container {
      ${display('flex')}
      ${marginLeft('xl')}
      ${alignItems('center')}
      ${fontWeight('bold')}
    }

    .o-time-input {
      ${width(10)}
      ${marginX('lg')}
      .o-input-field {
        ${textAlign('center')}
      }
    }

    .o-time-part {
      ${display('flex')}
      ${flexDirection('column')}
      ${alignItems('center')}
      .o-toggler-icon-container {
        ${marginY('md')}
      }
    }
  `;
};
