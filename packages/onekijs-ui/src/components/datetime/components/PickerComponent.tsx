import { AnonymousObject, eventLocks } from 'onekijs-framework';
import React, { FC, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { isValidDate, isValidTime } from '../../../utils/date';
import { useClickOutside, useFocusOutside } from '../../../utils/event';
import { addClassname } from '../../../utils/style';
import useDropdown from '../../dropdown/hooks/useDropdown';
import CalendarIcon from '../../icon/CalendarIcon';
import Input from '../../input';
import { InputProps } from '../../input/typings';
import { DefaultDatePickerContext, useDatePickerContext } from '../hooks/useDatePickerContext';
import { DatePickerDate, DatePickerType, PickerComponentProps } from '../typings';
import { findQuickRangeLabel } from '../util';
import CalendarComponent from './CalendarComponent';
import QuickTimeRangeComponent from './QuickTimeRangeComponent';
import TimeComponent from './TimeComponent';

const IconComponent: React.FC<InputProps> = () => {
  const { nullable, setOpen, onChange, open } = useDatePickerContext();
  return (
    <span className="o-datepicker-icon">
      {nullable && (
        <div
          className="o-datepicker-remover"
          onClick={() => {
            onChange(null);
            setOpen(false);
          }}
        >
          &#10006;
        </div>
      )}
      <CalendarIcon width="20px" height="20px" color="primary" marginRight="sm" onClick={() => setOpen(!open)} />
    </span>
  );
};

const parseDate = (value: string | null | undefined): DatePickerDate => {
  let date,
    time,
    year,
    month,
    day,
    hour,
    minute,
    second = undefined;
  if (value) {
    [date, time] = value.trim().split(' ');
    [year, month, day] = date ? date.split('-') : [undefined, undefined, undefined];
    [hour, minute, second] = time ? time.split(':') : [undefined, undefined, undefined];
  }
  return { date, time, year, month, day, hour, minute, second };
};

const isValidValue = (value: string | null, type: DatePickerType): boolean => {
  const isValidDate = (value: string): boolean =>  {
    const d = new Date(value);
    return !isNaN(d as any);
  }

  if (!value) return true;
  if (type.range) {
    const [from, to] = value.split(' to ');
    if (!from || !to) return false;
    return isValidDate(from) && isValidDate(to);
  } else {
    return isValidDate(value);
  }
}

const isSameDate = (d1: string | null | undefined, d2: string | null | undefined, type: DatePickerType) => {
  const isSameDate = (d1: string | undefined, d2: string | undefined) => {
    if (!d1 && !d2) return true;
    if (!d1 || !d2) return false;
    const date1 = new Date(`${d1}`);
    const date2 = new Date(`${d2}`);
    if (isNaN(date1 as any) || isNaN(date2 as any)) {
      return false;
    }
    return date1.toString() === date2.toString();
  }

  if (d1 === null && d2 === null) return true;
  if (!d1 || !d2) return false;

  if (type.range) {
    const [from1, to1] = d1.split(' to ');
    const [from2, to2] = d2.split(' to ');
    return isSameDate(from1, from2) && isSameDate(to1, to2);
  } else {
    return isSameDate(d1, d2);
  }
}


const formatDate = (
  type: DatePickerType,
  fromDate: string | undefined,
  fromTime: string | undefined,
  toDate: string | undefined,
  toTime: string | undefined,
) => {
  const format = (date: string | undefined, time: string | undefined): string => {
    let result = '';
    if (type.date) {
      result += `${date || ''}`;
    }
    if (type.time) {
      if (type.date && date) {
        result += ` ${time || '00:00:00'}`;
      } else if (type.date && time) {
        result += ` ${time}`;
      } else if (time) {
        result += time;
      }
    }
    return result;
  };

  let result = format(fromDate, fromTime);
  if (type.range) {
    result += ` to ${format(toDate, toTime)}`;
  }
  return result;
};

const PickerComponent: FC<PickerComponentProps> = ({
  animationMs = 200,
  attachDropdownToBody = true,
  autoFocus,
  className,
  closeOnQuickSelect = true,
  combo = true,
  disabled,
  dropdownWidthModifier = 'min',
  nullable = false,
  onBlur: forwardBlur,
  onChange: forwardChange,
  onFocus: forwardFocus,
  openOnFocus = false,
  placeholder,
  placement = 'bottom-start',
  quickRanges,
  type,
  displayHours = true,
  displayMinutes = true,
  displaySeconds = true,
  value: externalValue,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<AnonymousObject>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const quickRangesRef = useRef(quickRanges);
  const lastExternalValueRef = useRef<string | null | undefined>();
  const currentValueRef = useRef<string | null>(null);
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [Dropdown, triggerRef] = useDropdown();
  const [internalValue, setInternalValue] = useState<string | null>(null);
  let value = internalValue ? internalValue : externalValue;
  if (currentValueRef.current !== value && isSameDate(currentValueRef.current, value, type)) {
    value = currentValueRef.current;
  }

  const [fromString, toString] = value ? value.split(/ to\s*/) : [];
  const [label, setLabel] = useState<string | undefined>(() => {
    if (type.range) {
      return findQuickRangeLabel(quickRangesRef.current, value);
    }
    return;
  });

  const validFromRef = useRef<string | undefined>();
  const validToRef = useRef<string | undefined>();

  if (!fromString || /\s*/.test(fromString)) {
    validFromRef.current = undefined;
  }

  if (!toString || /\s*/.test(toString)) {
    validToRef.current = undefined;
  }

  // this setting is used to detect if the user changes the from or the to
  const nextSelectEdgeRef = useRef<'from' | 'to'>('to');

  const from = parseDate(fromString?.trim());
  const previousFrom = parseDate(validFromRef.current);
  if (!type['date'] || !isValidDate(`${from['day']}-${from['month']}-${from['year']}`)) {
    from.year = previousFrom.year;
    from.month = previousFrom.month;
    from.day = previousFrom.day;
    from.date = previousFrom.date;
  }
  if (type['date'] && isValidDate(`${from['day']}-${from['month']}-${from['year']}`)) {
    validFromRef.current = `${from['year']}-${from['month']}-${from['day']}`;
  }
  if (!type['time'] || !isValidTime(from['time'])) {
    from.hour = previousFrom.hour;
    from.minute = previousFrom.minute;
    from.second = previousFrom.second;
    from.time = previousFrom.time;
  }
  if (type['time'] && isValidTime(`${from['time']}`)) {
    if (validFromRef.current === undefined) {
      validFromRef.current = '';
    }
    if (type['date']) {
      validFromRef.current += ' ';
    }
    validFromRef.current += `${from['time']}`;
  }

  const to = parseDate(toString?.trim());
  const previousTo = parseDate(validToRef.current);
  if (!type['date'] || !isValidDate(`${to['day']}-${to['month']}-${to['year']}`)) {
    to.year = previousTo.year;
    to.month = previousTo.month;
    to.day = previousTo.day;
    to.date = previousTo.date;
  }
  if (type['date'] && isValidDate(`${to['day']}-${to['month']}-${to['year']}`)) {
    validToRef.current = `${to['year']}-${to['month']}-${to['day']}`;
  }
  if (!type['time'] || !isValidTime(to['time'])) {
    to.hour = previousTo.hour;
    to.minute = previousTo.minute;
    to.second = previousTo.second;
    to.time = previousTo.time;
  }
  if (type['time'] && isValidTime(`${to['time']}`)) {
    if (validToRef.current === undefined) {
      validToRef.current = '';
    }
    if (type['date']) {
      validToRef.current += ' ';
    }
    validToRef.current += `${to['time']}`;
  }

  const id = useId();

  const onFocus = useCallback(() => {
    if (!focus) {
      setFocus(true);
      if (openOnFocus && !open) {
        setOpen(true);
      }
      if (forwardFocus) {
        forwardFocus();
      }
    }
  }, [focus, forwardFocus, openOnFocus, open]);

  const onBlur = useCallback(() => {
    if (!stateRef.current.keepFocus) {
      if (open) {
        setOpen(false);
      }
      if (focus) {
        setFocus(false);
        if (forwardBlur) {
          forwardBlur();
        }
      }
    }
  }, [open, forwardBlur, setOpen, focus]);

  const onChange = useCallback(
    (nextValue: string | null) => {
      currentValueRef.current = nextValue;
      setLabel(undefined);
      // check if the nextValue is a valid value
      // if it's not a valid value, we keep it internally
      if (forwardChange && isValidValue(nextValue, type)) {
        setInternalValue(null);
        forwardChange(nextValue);
      } else {
        setInternalValue(nextValue);
      }
    },
    [forwardChange, setInternalValue, type],
  );

  const onChangeDate = (fromDate: string | undefined, toDate?: string) => {
    if (fromDate === undefined) {
      fromDate = from['date'];
    }
    if (toDate === undefined) {
      toDate = to['date'];
    }
    if (fromDate !== from['date']) {
      nextSelectEdgeRef.current = 'to';
    } else {
      nextSelectEdgeRef.current = 'from';
    }
    onChange(formatDate(type, fromDate, from['time'], toDate, to['time']));
  };

  const onChangeTime = (nextTime: string, edge: 'from' | 'to') => {
    if (edge === 'from') {
      onChange(formatDate(type, from['date'], nextTime, to['date'], to['time']));
    } else {
      onChange(formatDate(type, from['date'], from['time'], to['date'], nextTime));
    }
  };

  const onChangeQuickRange = (quickRangeLabel: string) => {
    if (quickRangesRef.current) {
      const quickRange = quickRangesRef.current[quickRangeLabel];
      if (quickRange) {
        onChange(`${quickRange.from} to ${quickRange.to}`);
        setLabel(quickRangeLabel);
      }
      if (closeOnQuickSelect) {
       setOpen(false);
      }
    }
  };

  const onOpen = useCallback(() => {
    eventLocks.lock('escape', id);
  }, [id]);

  const onClosed = useCallback(() => {
    eventLocks.unlock('escape', id);
    if (lastExternalValueRef.current !== undefined) {
      setInternalValue(null);
    }
  }, [id]);

  useClickOutside([containerRef, dropdownRef], onBlur);

  useFocusOutside([containerRef, dropdownRef], onBlur);

  const context = useMemo(() => {
    return {
      open,
      setOpen,
      triggerRef,
      nullable,
      onChange,
    };
  }, [open, setOpen, triggerRef, nullable, onChange]);

  useEffect(() => {
    if (type.range && !label) {
      const quickRangeLabel = findQuickRangeLabel(quickRangesRef.current, value);
      if (quickRangeLabel) {
        setLabel(quickRangeLabel);
      }
    }
  }, [value]);

  useEffect(() => {
    if (forwardChange && lastExternalValueRef.current !== undefined && externalValue !== undefined && externalValue !== lastExternalValueRef.current) {
      // case when we block the onChange due to a wrong internal value
      // and the value is changed from the exterior (not due to change done internally)
      setInternalValue(null);
    }
    lastExternalValueRef.current = externalValue;
  });

  return (
    <DefaultDatePickerContext.Provider value={context}>
      <div
        className={addClassname('o-datepicker', className)}
        ref={containerRef}
        onMouseDown={() => (stateRef.current.keepFocus = true)}
        onMouseUp={() => (stateRef.current.keepFocus = false)}
      >
        <Dropdown
          attachToBody={attachDropdownToBody}
          open={open}
          distance={0}
          animationTimeout={animationMs}
          onDropStart={onOpen}
          onCollapseDone={onClosed}
          placement={placement}
          widthModifier={dropdownWidthModifier}
          className={className}
          zIndex={attachDropdownToBody ? 2000 : undefined}
        >
          <div
            ref={dropdownRef}
            className={`o-datepicker-dropdown-content${type['range'] ? ' o-datepicker-range' : ''}${
              validFromRef.current !== undefined ? ' o-datepicker-active' : ''
            }`}
          >
            {type['range'] && quickRangesRef.current && Object.keys(quickRangesRef.current).length > 0 && (
              <QuickTimeRangeComponent
                key="quick_range"
                quickRanges={quickRangesRef.current}
                onChange={onChangeQuickRange}
                currentQuickRangeLabel={label}
              />
            )}
            {type['date'] && (
              <div className="o-calendar" key="calendar">
                <CalendarComponent from={from} to={to} type={type} onChange={onChangeDate} nextSelectEdge={nextSelectEdgeRef.current} />
              </div>
            )}
            {type['time'] && (
              <div className="o-time" key="time">
                <TimeComponent
                  from={from}
                  to={to}
                  type={type}
                  onChange={onChangeTime}
                  displayHours={displayHours}
                  displayMinutes={displayMinutes}
                  displaySeconds={displaySeconds}
                />
              </div>
            )}
          </div>
        </Dropdown>
        <span ref={triggerRef} key="input">
          <Input
            className="o-datepicker-input"
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            value={label ? label : !value ? '' : value}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={autoFocus}
            disabled={disabled}
            SuffixComponent={IconComponent}
            readOnly={combo}
            onClick={() => {
              if (!open) {
                setOpen(true);
              } else if (!combo) {
                setLabel(undefined);
              } else {
                setOpen(false);
              }
            }}
          />
        </span>
      </div>
    </DefaultDatePickerContext.Provider>
  );
};

export default PickerComponent;
