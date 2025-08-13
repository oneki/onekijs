import { css } from 'styled-components';
import { alignItems, columnGap, gap, justifyContent, rowGap } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderBottomColor, borderBottomLeftRadius, borderBottomRightRadius, borderBottomStyle, borderBottomWidth, borderColor, borderRadius, borderStyle, borderTopLeftRadius, borderTopRightRadius, borderWidth, boxShadow } from '../../styles/border';
import { display } from '../../styles/display';
import { flexDirection } from '../../styles/flex';
import { gridTemplateColumns } from '../../styles/grid';
import { cursor, userSelect } from '../../styles/interactivity';
import { zIndex } from '../../styles/position';
import { width } from '../../styles/size';
import { marginBottom, marginLeft, marginRight, marginTop, marginX, marginY, padding, paddingRight, paddingX } from '../../styles/spacing';
import { ComponentStyle, StylableProps } from '../../styles/typings';
import { color, fontFamily, fontStyle, fontWeight, textAlign, textTransform, whiteSpace } from '../../styles/typography';

export const datePickerStyle: ComponentStyle<StylableProps> = () => {
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

      &:hover {
        ${backgroundColor('darkest')}
        ${color('white')}
      }
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
      ${userSelect('none')}
      ${display('flex')}
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
      ${display('flex')}
      ${alignItems('center')}
    }


    .o-datepicker-remover {
      ${cursor('pointer')}
      ${color('light')}
      ${fontFamily('Arial')}
      ${paddingX('sm')}
      ${userSelect('none')}
    }

    .o-toggler-icon {
      ${cursor('pointer')}
      ${color('primary')}
    }

    .o-time-selector-part-icon-disabled {
      .o-toggler-icon {
        ${cursor('not-allowed')}
        ${color('light')}
      }
    }

    .o-time-container {
      ${marginLeft('xl')}
      .o-time-separator {
        ${marginX('lg')}
      }
    }

    .o-time-selector {
      ${display('flex')}
      ${alignItems('center')}
    }

    .o-time-edge-title {
      ${fontWeight('bold')}
      ${marginBottom('xs')}
      ${borderBottomWidth('1px')}
      ${borderBottomColor('lighter')}
      ${borderBottomStyle('solid')}
      ${textTransform('uppercase')}
      ${color('primary')}
    }

    .o-time-edge-empty {
      ${color('dark')}
      ${fontStyle('italic')}
      ${marginTop('md')}
    }

    .o-time-edge-date-container {
      ${width('150px')}
    }

    .o-time-edge-date {
      ${fontWeight('medium')}
      ${backgroundColor('lightest')}
      ${paddingX('sm')}
      ${marginRight('md')}
      ${whiteSpace('nowrap')}
    }

    .o-time-container-range {
      ${marginLeft('3xl')}
      ${marginTop('2xl')}
      ${display('flex')}
      ${flexDirection('column')}
      ${gap('xl')}
      .o-time-separator {
        ${marginX('sm')}
      }
    }


    .o-time-edge-content {
      ${display('flex')}
      ${alignItems('center')}
    }

    .o-time-separator {
       ${fontWeight('bold')}
    }

    .o-time-input {
      ${width(10)}
      .o-input-field {
        ${textAlign('center')}
      }
    }

    .o-time-selector-part {
      ${display('flex')}
      ${flexDirection('column')}
      ${alignItems('center')}
    }

    .o-time-selector-part-large.o-toggler-icon-container {
      ${marginY('md')}
    }

    .o-quick-time-range-container {
      ${paddingRight('2xl')}
      ${marginTop('2xl')}
      ${marginX('md')}
    }

    .o-quick-time-range-title {
      ${fontWeight('bold')}
    }

    .o-quick-time-range {
      ${cursor('pointer')}
      ${fontWeight('medium')}
      ${color('primary')}
      &.o-quick-time-range-selected {
        ${cursor('auto')}
        ${fontWeight('bold')}
        ${color('pink')}
      }
    }
  `;
};
