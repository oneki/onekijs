import { AnonymousObject, eventLocks } from 'onekijs-framework';
import React, { FC, useCallback, useId, useMemo, useRef, useState } from 'react';
import { useClickOutside, useFocusOutside } from '../../../utils/event';
import { addClassname } from '../../../utils/style';
import useDropdown from '../../dropdown/hooks/useDropdown';
import CalendarIcon from '../../icon/CalendarIcon';
import Input from '../../input';
import { InputProps } from '../../input/typings';
import { DefaultDatePickerContext, useDatePickerContext } from '../hooks/useDatePickerContext';
import { BaseDatePickerComponentProps } from '../typings';
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


const BaseDatePickerComponent: FC<BaseDatePickerComponentProps> = ({
  animationMs = 200,
  attachDropdownToBody = true,
  autoFocus,
  className,
  date: showDate,
  disabled,
  dropdownWidthModifier = 'min',
  onBlur: forwardBlur,
  onChange: forwardChange,
  onFocus: forwardFocus,
  openOnFocus = false,
  placeholder,
  range: isRange,
  time: showTime,
  value: externalValue,
}) => {
  const d = new Date();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<AnonymousObject>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [Dropdown, triggerRef] = useDropdown();
  const [internalValue, setInternalValue] = useState<string|null>(null);
  const value = externalValue ? externalValue : internalValue;
  const [from, to] = value ? value.split(' ~ ') : [undefined, undefined];

  const [fromCandidateDate, fromCandidateTime] = from ? from.split(' ') : [undefined, undefined];
  const [fromCandidateYear, fromCandidateMonth, fromCandidateDay] = fromCandidateDate ? fromCandidateDate.split('-') : [undefined, undefined, undefined];

  const [toCandidateDate, toCandidateTime] = to ? to.split(' ') : [undefined, undefined];
  const [toCandidateYear, toCandidateMonth, toCandidateDay] = toCandidateDate ? toCandidateDate.split('-') : [undefined, undefined, undefined];

  const validValueRef = useRef(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
  const lastValueRef = useRef<string | undefined>();

  if (isValidDate(`${fromCandidateDay}-${fromCandidateMonth}-${fromCandidateYear}`) && isValidTime(fromCandidateTime)) {
    validValueRef.current = `${fromCandidateYear}-${fromCandidateMonth}-${fromCandidateDay} ${fromCandidateTime}`
    lastValueRef.current = validValueRef.current;
  }

  const [date, time] = validValueRef.current.split(' ');
  const [year, month, day] = date.split('-');
  const [hour, minute] = time.split(':');

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

  const onChangeDate = useCallback((nextDate: string) => {
    onChange(`${nextDate} ${time}`);
  }, [time, onChange])

  const onChangeTime = useCallback((nextTime: string) => {
    onChange(`${date} ${nextTime}`);
  }, [date, onChange])

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
          <div ref={dropdownRef} className={`o-datepicker-dropdown-content${lastValueRef.current !== undefined ? ' o-datepicker-active' : ''}`}>
            <div className="o-calendar">
              <CalendarComponent year={year} month={month} day={day} onChange={onChangeDate} />
            </div>
            <div className="o-time">
              <TimeComponent hour={hour} minute={minute} onChange={onChangeTime} />
            </div>
          </div>

        </Dropdown>
        <span ref={triggerRef}>
          <Input
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            value={value === null ? '' : value}
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
