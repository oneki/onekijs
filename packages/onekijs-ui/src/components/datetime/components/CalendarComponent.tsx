import { days } from '../../../utils/date';
import { addClassname } from '../../../utils/style';
import { CalendarComponentProps, CalendarDay } from '../typings';
import React, { FC, useCallback } from 'react';
import { useDatePickerContext } from './DatePickerComponent';

const isCurrent = (d: Date, year: number, month: number, day: number): boolean => {
  return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
};

const CalendarComponent: FC<CalendarComponentProps> = ({
  day: externalDay,
  month: externalMonth,
  year: externalYear,
  className,
  onChange: forwardChange,
}) => {
  const { setOpen } = useDatePickerContext();
  const d = new Date();
  const month = externalMonth === undefined ? d.getMonth() : parseInt(`${externalMonth}`) - 1;
  const year = externalYear === undefined ? d.getFullYear() : parseInt(`${externalYear}`);
  const day = externalDay === undefined ? undefined : parseInt(`${externalDay}`)

  const firstDayOfCurrentMonth = new Date(`${year}-${String(month + 1).padStart(2, '0')}-01`);

  const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth);
  lastDayOfPreviousMonth.setDate(lastDayOfPreviousMonth.getDate() - 1);

  const lastDayOfCurrentMonth = new Date(firstDayOfCurrentMonth);
  lastDayOfCurrentMonth.setMonth(lastDayOfCurrentMonth.getMonth() + 1);
  lastDayOfCurrentMonth.setDate(lastDayOfCurrentMonth.getDate() - 1);

  const firstDayOfNextMonth = new Date(firstDayOfCurrentMonth);
  firstDayOfNextMonth.setMonth(firstDayOfNextMonth.getMonth() + 1);

  let calendarDays: CalendarDay[] =
    firstDayOfCurrentMonth.getDate() === 0
      ? []
      : [...Array(lastDayOfPreviousMonth.getDate() + 1).keys()].slice(-firstDayOfCurrentMonth.getDay()).map((n) => ({
          day: n,
          active: false,
          current: isCurrent(d, lastDayOfPreviousMonth.getFullYear(), lastDayOfPreviousMonth.getMonth(), n),
          month: lastDayOfPreviousMonth.getMonth(),
          year: lastDayOfPreviousMonth.getFullYear()
        }));
  calendarDays = calendarDays.concat(
    [...Array(lastDayOfCurrentMonth.getDate() + 1).keys()].slice(1).map((n) => ({
      day: n,
      active: day === n,
      current: isCurrent(d, lastDayOfCurrentMonth.getFullYear(), lastDayOfCurrentMonth.getMonth(), n),
      month: lastDayOfCurrentMonth.getMonth(),
      year: lastDayOfCurrentMonth.getFullYear()
    })),
  );
  calendarDays = calendarDays.concat(
    lastDayOfCurrentMonth.getDay() === 6
      ? []
      : [...Array(6 - lastDayOfCurrentMonth.getDay() + 1).keys()].slice(1).map((n) => ({
          day: n,
          active: false,
          current: isCurrent(d, firstDayOfNextMonth.getFullYear(), firstDayOfNextMonth.getMonth(), n),
          month: firstDayOfNextMonth.getMonth(),
          year: firstDayOfNextMonth.getFullYear()
        })),
  );

  const onChange = useCallback((nextValue: string | null) => {
    if (forwardChange) {
      forwardChange(nextValue);
    }
    setOpen(false);
  }, [forwardChange, setOpen]);

  return (
    <div className={addClassname('o-calendar-container', className)}>
      <div className="o-calendar-month"></div>
      <div className="o-calendar-day-container">
        {days.map((day) => (
          <div className="o-calendar-day-title">{day.substring(0, 2)}</div>
        ))}
        {calendarDays.map((calendarDay) => (
          <div
            className={`o-calendar-day${calendarDay.active ? ' o-calendar-day-active' : ''}${
              calendarDay.month === month ? ' o-calendar-day-in-month' : ''
            }${calendarDay.current ? ' o-calendar-day-current' : ''}`}
            onClick={() => onChange(`${calendarDay.year}-${String(calendarDay.month + 1).padStart(2, '0')}-${String(calendarDay.day).padStart(2, '0')}`)}
          >
            {calendarDay.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
