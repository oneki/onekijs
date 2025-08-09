import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { days, months } from '../../../utils/date';
import { addClassname } from '../../../utils/style';
import TogglerIcon from '../../icon/TogglerIcon';
import Select from '../../select';
import { CalendarComponentProps, CalendarDay } from '../typings';

const isCurrent = (d: Date, year: number, month: number, day: number): boolean => {
  return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
};

const getMonth = (candidate: string | number | undefined, defaultValue: number) => {
  if (typeof candidate === 'string') {
    candidate = parseInt(candidate) - 1;
  }
  if (candidate === undefined || isNaN(candidate) || candidate < 0 || candidate > 11) {
    return defaultValue;
  }
  return candidate;
}

const getYear = (candidate: string | number | undefined, defaultValue: number, min: number, max: number) => {
  if (typeof candidate === 'string') {
    candidate = parseInt(candidate);
  }
  if (candidate === undefined || isNaN(candidate) || candidate < min || candidate > max) {
    return defaultValue;
  }
  return candidate;
}

const defaultMinYear = 1900;
const defaultMaxYear = 2100;



const CalendarComponent: FC<CalendarComponentProps> = ({
  day: externalDay,
  month: externalMonth,
  year: externalYear,
  minYear = defaultMinYear,
  maxYear = defaultMaxYear,
  className,
  onChange: forwardChange,
}) => {
  const years = useRef([...Array(maxYear).keys()].slice(minYear));
  const d = new Date();

  const lastExternalMonth = useRef(externalMonth);
  const lastExternalYear = useRef(externalYear);

  const [month, setMonth] = useState<number>(getMonth(externalMonth, d.getMonth()));
  const [year, setYear] = useState<number>(getYear(externalYear, d.getFullYear(), minYear, maxYear));
  const day = externalDay === undefined ? undefined : parseInt(`${externalDay}`)

  const firstDayOfExternalMonth = new Date(`${year}-${String(getMonth(externalMonth, d.getMonth()) + 1).padStart(2, '0')}-01`);
  const firstDayOfCurrentMonth = new Date(`${year}-${String(month + 1).padStart(2, '0')}-01`);

  const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth);
  lastDayOfPreviousMonth.setDate(lastDayOfPreviousMonth.getDate() - 1);

  const lastDayOfCurrentMonth = new Date(firstDayOfCurrentMonth);
  lastDayOfCurrentMonth.setMonth(lastDayOfCurrentMonth.getMonth() + 1);
  lastDayOfCurrentMonth.setDate(lastDayOfCurrentMonth.getDate() - 1);

  const firstDayOfNextMonth = new Date(firstDayOfCurrentMonth);
  firstDayOfNextMonth.setMonth(firstDayOfNextMonth.getMonth() + 1);

  let calendarDays: CalendarDay[] =
    firstDayOfCurrentMonth.getDate() === 0 || firstDayOfCurrentMonth.getDay() === 0
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
      active: day === n && lastDayOfCurrentMonth.getMonth() === firstDayOfExternalMonth.getMonth(),
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

  const onChange = useCallback((nextValue: string) => {
    if (forwardChange) {
      forwardChange(nextValue);
    }
    //setOpen(false);
  }, [forwardChange]);

  useEffect(() => {
    if (externalMonth !== lastExternalMonth.current) {
      lastExternalMonth.current = externalMonth;
      setMonth(getMonth(externalMonth, month));
    }
    if (externalYear !== lastExternalYear.current) {
      lastExternalYear.current = externalYear;
      setYear(getYear(externalYear, year, minYear, maxYear));
    }
  });

  return (

    <div className={addClassname('o-calendar-container', className)}>
      <div className="o-calendar-month">
        <TogglerIcon key="previous" width="20px" closeArrowPosition="w" onClick={() => {
          if (month === 0) {
            setMonth(11);
            setYear(year - 1);
          } else {
            setMonth(month - 1);
          }
        }} />
        <Select key="month" dataSource={months} nullable={false} value={months[month]}  className="o-calendar-select-month"  size="small" onChange={(value) => setMonth(months.indexOf(`${value}`))} />
        <Select key="year" dataSource={years.current} value={year} nullable={false} className="o-calendar-select-year" size="small"  onChange={(value) => setYear(parseInt(`${value}`))} />
        <TogglerIcon key="next" width="20px" closeArrowPosition="e"  onClick={() => {
          if (month === 11) {
            setMonth(0);
            setYear(year + 1);
          } else {
            setMonth(month + 1);
          }
        }} />
      </div>
      <div className="o-calendar-day-container">
        {days.map((day) => (
          <div className="o-calendar-day-title" key={`${day}`}>{day.substring(0, 2)}</div>
        ))}
        {calendarDays.map((calendarDay, index) => (
          <div
            key={`${day}-${index}`}
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
