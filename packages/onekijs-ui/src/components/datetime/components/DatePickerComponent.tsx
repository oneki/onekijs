import { AnonymousObject, eventLocks } from 'onekijs-framework';
import React, { FC, useCallback, useContext, useId, useMemo, useRef, useState } from 'react';
import { useClickOutside, useFocusOutside } from '../../../utils/event';
import { addClassname } from '../../../utils/style';
import useDropdown from '../../dropdown/hooks/useDropdown';
import SearchIcon from '../../icon/SearchIcon';
import Input from '../../input';
import { InputProps } from '../../input/typings';
import { DatePickerContext, DatePickerProps } from '../typings';
import CalendarComponent from './CalendarComponent';

const IconComponent: React.FC<InputProps> = () => {
  return <span className="o-datepicker-icon"><SearchIcon width="20px" height="20px" /></span>;
};

export const DefaultDatePickerContext = React.createContext<DatePickerContext>(null!);

export const useDatePickerContext = (): DatePickerContext => {
  return useContext(DefaultDatePickerContext);
};

const DatePickerComponent: FC<DatePickerProps> = ({
  animationMs = 200,
  attachDropdownToBody = true,
  autoFocus,
  className,
  disabled,
  dropdownWidthModifier = 'same',
  onBlur: forwardBlur,
  onChange: forwardChange,
  onFocus: forwardFocus,
  openOnFocus = false,
  placeholder,
  value: externalValue
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<AnonymousObject>({});
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [Dropdown, triggerRef] = useDropdown();
  const [internalValue, setValue] = useState<string | null>(null);
  const value = (externalValue !== undefined) ? externalValue : internalValue;
  const [date, time] = value ? value.split(' ') : [undefined, undefined];
  const [year, month, day] = date ? date.split('-') : [undefined, undefined, undefined]

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

  const onChange = useCallback((nextValue: string | null) => {
    if (forwardChange) {
      forwardChange(nextValue);
    } else {
      setValue(nextValue);
    }
  }, [forwardChange, setValue]);


  const onOpen = useCallback(() => {
    eventLocks.lock('escape', id);
  }, [id]);

  const onClosed = useCallback(() => {
    eventLocks.unlock('escape', id);
  }, [id]);

  useClickOutside(containerRef, onBlur);

  useFocusOutside(containerRef, onBlur);

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
            onClick={() => setOpen(!open) }
          />
        </span>
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
          <CalendarComponent year={year} month={month} day={day} onChange={onChange} />
        </Dropdown>
      </div>
    </DefaultDatePickerContext.Provider>
  );
};

export default DatePickerComponent;
