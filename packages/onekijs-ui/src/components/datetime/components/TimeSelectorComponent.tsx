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

const TimeSelectorComponent: React.FC<TimeSelectorComponentProps> = ({ value, onChange, size, edge, displayHours, displayMinutes, displaySeconds  }) => {
  const d = new Date();
  const hourInt = getValue(value.hour, 23, displayHours ? d.getHours() : 0);
  const minuteInt = getValue(value.minute, 59, displayMinutes ? d.getMinutes() : 0);
  const secondInt = getValue(value.second, 59, displaySeconds ? d.getSeconds() : 0);

  const [internalHour, setInternalHour] = useState(String(hourInt).padStart(2, '0'));
  const [internalMinute, setInternalMinute] = useState(String(minuteInt).padStart(2, '0'));
  const [internalSecond, setInternalSecond] = useState(String(secondInt).padStart(2, '0'));

  const hour = internalHour === '' ? '' : parseInt(internalHour) === hourInt ? internalHour : hourInt;
  const minute = internalMinute === '' ? '' : parseInt(internalMinute) === minuteInt ? internalMinute : minuteInt;
  const second = internalSecond === '' ? '' : parseInt(internalSecond) === secondInt ? internalSecond : secondInt;

  const onChangeHour = useCallback(
    (value: string) => {
      setInternalHour(value);
      if (value !== '') {
        onChange(`${String(value || 0).padStart(2, '0')}:${String(minute || 0).padStart(2, '0')}:${String(second || 0).padStart(2, '0')}`, edge);
      }
    },
    [minute, second, onChange],
  );

  const onChangeMinute = useCallback(
    (value: string) => {
      setInternalMinute(value);
      if (value !== '') {
        onChange(`${String(hour || 0).padStart(2, '0')}:${String(value || 0).padStart(2, '0')}:${String(second || 0).padStart(2, '0')}`, edge);
      }
    },
    [hour, second, onChange],
  );

  const onChangeSecond = useCallback(
    (value: string) => {
      setInternalSecond(value);
      if (value !== '') {
        onChange(`${String(hour || 0).padStart(2, '0')}:${String(minute || 0).padStart(2, '0')}:${String(value || 0).padStart(2, '0')}`, edge);
      }
    },
    [hour, minute, onChange],
  );

  return (
    <div className="o-time-selector">
      {displayHours && (
        <TimeSelectorPartComponent key="hour" type="hour" value={hour} onChange={onChangeHour} size={size} />
      )}
      {displayHours && (displayMinutes || displaySeconds) && (
        <span key="sep1" className="o-time-separator">:</span>
      )}
      {displayMinutes && (
        <TimeSelectorPartComponent key="minute" type="minute" value={minute} onChange={onChangeMinute} size={size} />
      )}
      {displaySeconds && (displayHours || displayMinutes) && (
        <span key="sep2" className="o-time-separator">:</span>
      )}
      {displaySeconds && (
        <TimeSelectorPartComponent key="second" type="second" value={second} onChange={onChangeSecond} size={size} />
      )}
    </div>
  )
}

export default TimeSelectorComponent;
