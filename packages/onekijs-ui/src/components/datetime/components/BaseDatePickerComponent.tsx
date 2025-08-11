import { AnonymousObject, eventLocks } from 'onekijs-framework';
import React, { FC, useCallback, useId, useMemo, useRef, useState } from 'react';
import { useClickOutside, useFocusOutside } from '../../../utils/event';
import { addClassname } from '../../../utils/style';
import useDropdown from '../../dropdown/hooks/useDropdown';
import CalendarIcon from '../../icon/CalendarIcon';
import Input from '../../input';
import { InputProps } from '../../input/typings';
import { DefaultDatePickerContext, useDatePickerContext } from '../hooks/useDatePickerContext';
import { BaseDatePickerComponentProps, DatePickerDate, DatePickerType } from '../typings';
import CalendarComponent from './CalendarComponent';
import TimeComponent from './TimeComponent';
import { isValidDate, isValidTime } from '../../../utils/date';

const IconComponent: React.FC<InputProps> = () => {
  const context = useDatePickerContext();
  return (
    <span className="o-datepicker-icon">
      <CalendarIcon
        width="20px"
        height="20px"
        color="primary"
        marginRight="sm"
        onClick={() => context.setOpen(!context.open)}
      />
    </span>
  );
};

const parseDate = (value: string | null | undefined): DatePickerDate => {
  let date, time, year, month, day, hour, minute, second = undefined;
  if (value) {
    [date, time] = value.trim().split(' ');
    [year, month, day] = date ? date.split('-') : [undefined, undefined, undefined];
    [hour, minute, second] = time ? time.split(':') : [undefined, undefined, undefined];
  }
  return {date, time, year, month, day, hour, minute, second};
}

const formatDate = (type: DatePickerType, fromDate: string | undefined, fromTime: string | undefined, toDate: string | undefined, toTime: string | undefined ) => {
  const format = (date: string | undefined, time: string | undefined): string => {
    let result = '';
    if (type.date) {
      result += `${date || ''}`
    }
    if (type.time) {
      if (type.date && date) {
        result += ` ${time || '00:00'}`;
      } else if (type.date && time) {
        result += ` ${time}`;
      } else if (time) {
        result += time
      }
    }
    return result;
  }

  let result = format(fromDate, fromTime);
  if (type.range) {
    result += ` to ${format(toDate, toTime)}`
  }
  return result;

}

const BaseDatePickerComponent: FC<BaseDatePickerComponentProps> = ({
  animationMs = 200,
  attachDropdownToBody = true,
  autoFocus,
  className,
  disabled,
  dropdownWidthModifier = 'min',
  onBlur: forwardBlur,
  onChange: forwardChange,
  onFocus: forwardFocus,
  openOnFocus = false,
  placeholder,
  type,
  value: externalValue,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<AnonymousObject>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [Dropdown, triggerRef] = useDropdown();
  const [internalValue, setInternalValue] = useState<string|null>(null);
  const value = internalValue ? internalValue : externalValue;
  const tokens = value ? value.split(/ to\s*/) : [];

  const validFromRef = useRef<string | undefined>();
  const validToRef = useRef<string | undefined>();


  const from = parseDate(tokens[0]?.trim());
  const previousFrom = parseDate(validFromRef.current);
  if (!type['date'] || !isValidDate(`${from['day']}-${from['month']}-${from['year']}`)) {
    from.year = previousFrom.year;
    from.month = previousFrom.month;
    from.day = previousFrom.day;
    from.date = previousFrom.date;
  }
  if (type['date'] && isValidDate(`${from['day']}-${from['month']}-${from['year']}`)) {
    validFromRef.current = `${from['year']}-${from['month']}-${from['day']}`
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
    validFromRef.current += `${from['time']}`
  }

  const to = parseDate(tokens[1]?.trim());
  const previousTo = parseDate(validToRef.current);
  if (!type['date'] || !isValidDate(`${to['day']}-${to['month']}-${to['year']}`)) {
    to.year = previousTo.year;
    to.month = previousTo.month;
    to.day = previousTo.day;
    to.date = previousTo.date;
  }
  if (type['date'] && isValidDate(`${to['day']}-${to['month']}-${to['year']}`)) {
    validToRef.current = `${to['year']}-${to['month']}-${to['day']}`
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
    validToRef.current += `${to['time']}`
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
      if (forwardChange) {
        forwardChange(nextValue);
      } else {
        setInternalValue(nextValue);
      }
    },
    [forwardChange, setInternalValue],
  );

  const onChangeDate = (fromDate: string | undefined, toDate?: string) => {
    if (fromDate === undefined) {
      fromDate = from['date']
    }
    if (toDate === undefined) {
      toDate = to['date']
    }
    onChange(formatDate(type, fromDate, from['time'], toDate, to['time']));
  }

  const onChangeTime = (nextTime: string, edge: 'from' | 'to') => {
    if (edge === 'from') {
      onChange(formatDate(type, from['date'], nextTime, to['date'], to['time']));
    } else {
      onChange(formatDate(type, from['date'], from['time'], to['date'], nextTime));
    }
  }

  const onOpen = useCallback(() => {
    eventLocks.lock('escape', id);
  }, [id]);

  const onClosed = useCallback(() => {
    eventLocks.unlock('escape', id);
  }, [id]);

  useClickOutside([containerRef, dropdownRef], onBlur);

  useFocusOutside([containerRef, dropdownRef], onBlur);

  const context = useMemo(() => {
    return {
      open,
      setOpen,
      triggerRef,
    };
  }, [open, setOpen, triggerRef]);

  console.log({from, to})
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
          placement="bottom-start"
          widthModifier={dropdownWidthModifier}
          className={className}
          zIndex={attachDropdownToBody ? 2000 : undefined}
        >
          <div ref={dropdownRef} className={`o-datepicker-dropdown-content${type['range'] ? ' o-datepicker-range' : ''}${validFromRef.current !== undefined ? ' o-datepicker-active' : ''}`}>
            {type['date'] && (
              <div className="o-calendar">
                <CalendarComponent from={from} to={to} type={type} onChange={onChangeDate} />
              </div>
            )}
            {type['time'] && (
              <div className="o-time">
                <TimeComponent from={from} to={to} type={type} onChange={onChangeTime} />
              </div>
            )}
          </div>

        </Dropdown>
        <span ref={triggerRef}>
          <Input
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            value={!value ? '' : value}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={autoFocus}
            disabled={disabled}
            SuffixComponent={IconComponent}
            onClick={() => !open && setOpen(true)}
          />
        </span>
      </div>
    </DefaultDatePickerContext.Provider>
  );
};

export default BaseDatePickerComponent;
