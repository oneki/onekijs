import React, { useCallback, useState } from 'react';
import { TimeSelectorComponentProps } from '../typings';
import TimeSelectorPartComponent from './TimeSelectorPartComponent';

const getValue = (candidate: string | number | undefined, max: number, defaultValue: number) => {
  if (typeof candidate === 'string') {
    candidate = parseInt(candidate);
  }
  if (candidate === undefined || isNaN(candidate) || candidate < 0 || candidate > max) {
    return defaultValue;
  }
  return candidate;
};

const TimeSelectorComponent: React.FC<TimeSelectorComponentProps> = ({ value, edge, onChange, size }) => {
  const d = new Date();
  const hourInt = getValue(value.hour, 23, d.getHours());
  const minuteInt = getValue(value.minute, 59, d.getMinutes());

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
    <div className="o-time-selector">
      <TimeSelectorPartComponent key="hour" type="hour" value={hour} onChange={onChangeHour} edge="from" size={size} />
      <span className="o-time-separator">:</span>
      <TimeSelectorPartComponent key="minute" type="minute" value={minute} onChange={onChangeMinute} edge="from" size={size} />
    </div>
  )
}

export default TimeSelectorComponent;
