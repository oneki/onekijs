import React, { useCallback, useState } from 'react';
import { TimeComponentProps, TimePartComponentProps } from '../typings';
import { addClassname } from '../../../utils/style';
import Input from '../../input';
import TogglerIcon from '../../icon/TogglerIcon';
import { isValidHour, isValidMinuteOrSecond } from '../../../utils/date';

const getNextValue = (value: string | number, max: number, type: 'next' | 'previous') => {
  const valueInt = parseInt(`${value}`);
  let result: number = 0;
  if (type === 'next') {
    if (isNaN(valueInt) || valueInt === max) {
      result = 0;
    } else {
      result = valueInt + 1;
    }
  } else if (type === 'previous') {
    if (isNaN(valueInt)) {
      result = 0;
    } else if (valueInt === 0) {
      result = max;
    } else {
      result = valueInt - 1;
    }
  }

  return String(result).padStart(2, '0');
};

const getValue = (candidate: string | number | undefined, max: number, defaultValue: number) => {
  if (typeof candidate === 'string') {
    candidate = parseInt(candidate);
  }
  if (candidate === undefined || isNaN(candidate) || candidate < 0 || candidate > max) {
    return defaultValue;
  }
  return candidate;
};

export const TimePartComponent: React.FC<TimePartComponentProps> = ({ onChange, type, value, dir }) => {
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (type === 'minute' && (value === '' || isValidMinuteOrSecond(value))) {
      onChange(value, dir);
    } else if (type === 'hour' && (value === '' || isValidHour(value))) {
      onChange(value, dir);
    }
  };

  return (
    <div className={`o-time-part o-time-${type}`}>
      <TogglerIcon
        key="previous"
        width="20px"
        closeArrowPosition="n"
        onClick={() => {
          onChange(getNextValue(value, type === 'hour' ? 23 : 59, 'previous'), dir);
        }}
      />
      <Input
        key="value"
        className="o-time-input"
        value={value}
        size="large"
        selectOnFocus={true}
        onChange={onValueChange}
      />
      <TogglerIcon
        key="next"
        width="20px"
        closeArrowPosition="s"
        onClick={() => {
          onChange(getNextValue(value, type === 'hour' ? 23 : 59, 'next'), dir);
        }}
      />
    </div>
  );
};

const TimeComponent: React.FC<TimeComponentProps> = ({
  from,
  to,
  type,
  className,
  onChange,
}) => {
  const d = new Date();
  const hourInt = getValue(from['hour'], 23, d.getHours());
  const minuteInt = getValue(from['minute'], 59, d.getMinutes());

  const [internalHour, setInternalHour] = useState(String(hourInt).padStart(2, '0'));
  const [internalMinute, setInternalMinute] = useState(String(minuteInt).padStart(2, '0'));

  const hour = internalHour === '' ? '' : parseInt(internalHour) === hourInt ? internalHour : hourInt;
  const minute = parseInt(internalMinute) === minuteInt ? internalMinute : minuteInt;

  const onChangeHour = useCallback(
    (value: string) => {
      setInternalHour(value);
      if (value !== '') {
        onChange(`${String(value).padStart(2, '0')}:${String(minute).padStart(2, '0')}`, 'from');
      }

    },
    [minute, onChange],
  );

  const onChangeMinute = useCallback(
    (value: string) => {
      setInternalMinute(value);
      onChange(`${String(hour).padStart(2, '0')}:${String(value).padStart(2, '0')}`, 'from');
    },
    [hour, onChange],
  );

  return (
    <div className={addClassname('o-time-container', className)}>
      <TimePartComponent key="hour" type="hour" value={hour} onChange={onChangeHour} dir='from' />
      <span className="o-time-separator">:</span>
      <TimePartComponent key="minute" type="minute" value={minute} onChange={onChangeMinute} dir='from' />
    </div>
  );
};

export default TimeComponent;
