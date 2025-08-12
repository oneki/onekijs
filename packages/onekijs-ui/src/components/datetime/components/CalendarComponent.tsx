import React, { FC, useEffect, useRef, useState } from 'react';
import { days, months } from '../../../utils/date';
import { addClassname } from '../../../utils/style';
import TogglerIcon from '../../icon/TogglerIcon';
import Select from '../../select';
import { CalendarComponentProps, CalendarDay, DatePickerDate } from '../typings';

const isCurrent = (d: Date, year: number, month: number, day: number): boolean => {
  return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
};

const isActive = (date: DatePickerDate): boolean => {
  return date.year !== undefined && date.month !== undefined && date.year !== undefined;
};

const inRange = (year: number, month: number, day: number, from: DatePickerDate, to: DatePickerDate) => {
  let fromDate: Date | undefined;
  if (from.year !== undefined && from.month !== undefined && from.day !== undefined) {
    fromDate = new Date(`${from.year}-${from.month.padStart(2, '0')}-${String(from.day).padStart(2, '0')}`);
  } else {
    return false;
  }

  let toDate: Date | undefined;
  if (to.year !== undefined && to.month !== undefined && to.day !== undefined) {
    toDate = new Date(`${to.year}-${to.month.padStart(2, '0')}-${String(to.day).padStart(2, '0')}`);
  } else {
    return false;
  }

  let currentDate = new Date(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);

  return (currentDate > fromDate && currentDate < toDate) || (currentDate < fromDate && currentDate > toDate);
};

const isInversedDate = (from: DatePickerDate, to: DatePickerDate) => {
  if (!isActive(from) || !isActive(to)) {
    return false;
  }
  const fromDate = new Date(
    `${from.year}-${String(from.month ?? 0 + 1).padStart(2, '0')}-${String(from.day).padStart(2, '0')}`,
  );
  const toDate = new Date(
    `${to.year}-${String(to.month ?? 0 + 1).padStart(2, '0')}-${String(to.day).padStart(2, '0')}`,
  );
  return fromDate > toDate;
};

function getMonth(candidate: string | number | undefined, defaultValue: number): number;
function getMonth(candidate: string | number | undefined, defaultValue?: number): number | undefined;
function getMonth(candidate: string | number | undefined, defaultValue: any) {
  if (typeof candidate === 'string') {
    candidate = parseInt(candidate) - 1;
  }
  if (candidate === undefined || isNaN(candidate) || candidate < 0 || candidate > 11) {
    return defaultValue;
  }
  return candidate;
}

function getYear<T>(candidate: string | number | undefined, min: number, max: number, defaultValue: number): number;
function getYear(
  candidate: string | number | undefined,
  min: number,
  max: number,
  defaultValue?: number,
): number | undefined;
function getYear(candidate: string | number | undefined, min: number, max: number, defaultValue: any): any {
  if (typeof candidate === 'string') {
    candidate = parseInt(candidate);
  }
  if (candidate === undefined || isNaN(candidate) || candidate < min || candidate > max) {
    return defaultValue;
  }
  return candidate;
}

const defaultMinDate = new Date();
defaultMinDate.setFullYear(1900);
const defaultMaxDate = new Date();
defaultMaxDate.setFullYear(2100);

const CalendarComponent: FC<CalendarComponentProps> = ({
  from,
  to,
  type,
  minDate = defaultMinDate,
  maxDate = defaultMaxDate,
  className,
  onChange,
}) => {
  const maxYear = maxDate.getFullYear();
  const minYear = minDate.getFullYear();
  const years = useRef([...Array(maxYear).keys()].slice(minYear));
  const d = new Date();

  const lastExternalFromMonth = useRef(from['month']);
  const lastExternalFromYear = useRef(from['year']);

  const lastExternalToMonth = useRef(to['month']);
  const lastExternalToYear = useRef(to['year']);

  const fromMonth = getMonth(from['month']);
  const fromYear = getYear(from['year'], minYear, maxYear);
  const fromDay = from['day'] === undefined ? undefined : parseInt(`${from['day']}`);

  const [internalTo, setInternalTo] = useState<DatePickerDate>({});
  let transientTo = false;

  let toMonth: number | undefined, toYear: number | undefined, toDay: number | undefined;
  let isInversed = false;

  if (to.year !== undefined && to.month !== undefined && to.day !== undefined) {
    toMonth = getMonth(to.month);
    toYear = getYear(to.year, minYear, maxYear);
    toDay = parseInt(`${to.day}`);
  } else {
    toMonth = getMonth(internalTo.month);
    toYear = getYear(internalTo.year, minYear, maxYear);
    toDay = parseInt(`${internalTo.day}`);
    transientTo = true;
    isInversed = isInversedDate(from, internalTo);
  }

  const [currentMonth, setCurrentMonth] = useState<number>(getMonth(from['month'], d.getMonth()));
  const [currentYear, setCurrentYear] = useState<number>(getYear(from['year'], minYear, maxYear, d.getFullYear()));

  const firstDayOfExternalFromMonth =
    fromMonth && fromYear ? new Date(`${fromYear}-${String(getMonth(fromMonth + 1)).padStart(2, '0')}-01`) : undefined;

  const firstDayOfExternalToMonth =
    toMonth && toYear ? new Date(`${toYear}-${String(toMonth + 1).padStart(2, '0')}-01`) : undefined;

  const firstDayOfCurrentMonth = new Date(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`);

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
      : [...Array(lastDayOfPreviousMonth.getDate() + 1).keys()].slice(-firstDayOfCurrentMonth.getDay()).map((n) => {
          const startRange =
            fromDay === n && lastDayOfPreviousMonth.getMonth() === firstDayOfExternalFromMonth?.getMonth() && lastDayOfPreviousMonth.getFullYear() === firstDayOfExternalFromMonth?.getFullYear();
          const endRange = toDay === n && lastDayOfPreviousMonth.getMonth() === firstDayOfExternalToMonth?.getMonth() && lastDayOfPreviousMonth.getFullYear() === firstDayOfExternalToMonth?.getFullYear();
          return {
            day: n,
            active: startRange || endRange,
            current: isCurrent(d, lastDayOfPreviousMonth.getFullYear(), lastDayOfPreviousMonth.getMonth(), n),
            month: lastDayOfPreviousMonth.getMonth(),
            year: lastDayOfPreviousMonth.getFullYear(),
            startRange: startRange && type.range,
            endRange: isActive(from) && endRange && type.range,
            inRange:
              type.range &&
              inRange(
                lastDayOfPreviousMonth.getFullYear(),
                lastDayOfPreviousMonth.getMonth(),
                n,
                from,
                transientTo ? internalTo : to,
              ),
          };
        });

  calendarDays = calendarDays.concat(
    [...Array(lastDayOfCurrentMonth.getDate() + 1).keys()].slice(1).map((n) => {
      const startRange = fromDay === n && lastDayOfCurrentMonth.getMonth() === firstDayOfExternalFromMonth?.getMonth() && lastDayOfCurrentMonth.getFullYear() === firstDayOfExternalFromMonth?.getFullYear();
      const endRange = toDay === n && lastDayOfCurrentMonth.getMonth() === firstDayOfExternalToMonth?.getMonth() && lastDayOfCurrentMonth.getFullYear() === firstDayOfExternalToMonth?.getFullYear();
      return {
        day: n,
        active: startRange || endRange,
        current: isCurrent(d, lastDayOfCurrentMonth.getFullYear(), lastDayOfCurrentMonth.getMonth(), n),
        month: lastDayOfCurrentMonth.getMonth(),
        year: lastDayOfCurrentMonth.getFullYear(),
        startRange: startRange && type.range,
        endRange: isActive(from) && endRange && type.range,
        inRange:
          type.range &&
          inRange(
            lastDayOfCurrentMonth.getFullYear(),
            lastDayOfCurrentMonth.getMonth(),
            n,
            from,
            transientTo ? internalTo : to,
          ),
      };
    }),
  );

  calendarDays = calendarDays.concat(
    lastDayOfCurrentMonth.getDay() === 6
      ? []
      : [...Array(6 - lastDayOfCurrentMonth.getDay() + 1).keys()].slice(1).map((n) => {
          const startRange =
            fromDay === n && firstDayOfNextMonth.getMonth() === firstDayOfExternalFromMonth?.getMonth() && firstDayOfNextMonth.getFullYear() === firstDayOfExternalFromMonth?.getFullYear();
          const endRange = toDay === n && firstDayOfNextMonth.getMonth() === firstDayOfExternalToMonth?.getMonth() && firstDayOfNextMonth.getFullYear() === firstDayOfExternalToMonth?.getFullYear();
          return {
            day: n,
            active: startRange || endRange,
            current: isCurrent(d, firstDayOfNextMonth.getFullYear(), firstDayOfNextMonth.getMonth(), n),
            month: firstDayOfNextMonth.getMonth(),
            year: firstDayOfNextMonth.getFullYear(),
            startRange: startRange && type.range,
            endRange: isActive(from) && endRange && type.range,
            inRange:
              type.range &&
              inRange(
                firstDayOfNextMonth.getFullYear(),
                firstDayOfNextMonth.getMonth(),
                n,
                from,
                transientTo ? internalTo : to,
              ),
          };
        }),
  );

  useEffect(() => {
    if (type.range && to['month'] !== lastExternalToMonth.current) {
      // the user has changed the toMonth from the input field
      // we move the calendar to this month if it's a valid month
      lastExternalToMonth.current = to['month'];
      setCurrentMonth(getMonth(to['month'], currentMonth));
    }
    if (type.range && to['year'] !== lastExternalToYear.current) {
      // the user has changed the toYear from the input field
      // we move the calendar to this year if it's a valid year
      lastExternalToYear.current = to['year'];
      setCurrentYear(getYear(to['year'], minYear, maxYear, currentYear));
    }
    if (from['month'] !== lastExternalFromMonth.current) {
      // the user has changed the fromMonth from the input field
      // we move the calendar to this month if it's a valid month
      lastExternalFromMonth.current = from['month'];
      setCurrentMonth(getMonth(from['month'], currentMonth));
    }
    if (from['year'] !== lastExternalFromYear.current) {
      // the user has changed the fromYear from the input field
      // we move the calendar to this year if it's a valid year
      lastExternalFromYear.current = from['year'];
      setCurrentYear(getYear(from['year'], minYear, maxYear, currentYear));
    }
  });

  return (
    <div className={addClassname('o-calendar-container', className)}>
      <div className="o-calendar-month">
        <TogglerIcon
          key="previous"
          width="20px"
          closeArrowPosition="w"
          onClick={() => {
            if (fromMonth === 0) {
              setCurrentMonth(11);
              setCurrentYear(currentYear - 1);
            } else {
              setCurrentMonth(currentMonth - 1);
            }
          }}
        />
        <Select
          key="month"
          dataSource={months}
          nullable={false}
          value={months[currentMonth]}
          className="o-calendar-select-month"
          size="small"
          onChange={(value) => setCurrentMonth(months.indexOf(`${value}`))}
        />
        <Select
          key="year"
          dataSource={years.current}
          value={currentYear}
          nullable={false}
          className="o-calendar-select-year"
          size="small"
          onChange={(value) => setCurrentYear(parseInt(`${value}`))}
        />
        <TogglerIcon
          key="next"
          width="20px"
          closeArrowPosition="e"
          onClick={() => {
            if (fromMonth === 11) {
              setCurrentMonth(0);
              setCurrentYear(currentYear + 1);
            } else {
              setCurrentMonth(currentMonth + 1);
            }
          }}
        />
      </div>
      <div className="o-calendar-day-container">
        {days.map((day) => (
          <div className="o-calendar-day-title" key={`${day}`}>
            {day.substring(0, 2)}
          </div>
        ))}
        {calendarDays.map((calendarDay, index) => (
          <div
            key={`${fromDay}-${index}`}
            className={`o-calendar-day${
              calendarDay.endRange
                ? ` o-calendar-day-${isInversed ? 'start' : 'end'}-range${transientTo ? '-transient' : ''}`
                : ''
            }${calendarDay.startRange ? ` o-calendar-day-${isInversed ? 'end' : 'start'}-range` : ''}${
              calendarDay.active ? ' o-calendar-day-active' : ''
            }${calendarDay.inRange ? ` o-calendar-day-in-range${transientTo ? '-transient' : ''}` : ''}${
              calendarDay.month === currentMonth ? ' o-calendar-day-in-month' : ''
            }${calendarDay.current ? ' o-calendar-day-current' : ''}`}
            onClick={() => {
              const currentDateString = `${calendarDay.year}-${String(calendarDay.month + 1).padStart(2, '0')}-${String(
                calendarDay.day,
              ).padStart(2, '0')}`;
              if (type.range && from.year !== undefined && from.month !== undefined && from.day !== undefined) {
                // we assume we change the "to" date
                // if the new "to" date is before the "from" date, we need to switch
                const fromDateString = `${from.year}-${from.month.padStart(2, '0')}-${String(from.day).padStart(
                  2,
                  '0',
                )}`;
                const fromDate = new Date(fromDateString);
                const endDate = new Date(currentDateString);
                if (fromDate <= endDate) {
                  onChange(undefined, currentDateString);
                } else {
                  onChange(currentDateString, fromDateString);
                }
              } else {
                // we assume that it's not a range or the first selection of the range
                onChange(currentDateString);
              }
            }}
            onMouseEnter={() => {
              if (transientTo) {
                setInternalTo({
                  year: `${calendarDay.year}`,
                  month: String(calendarDay.month + 1).padStart(2, '0'),
                  day: String(calendarDay.day).padStart(2, '0'),
                });
              }
            }}
          >
            {calendarDay.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
