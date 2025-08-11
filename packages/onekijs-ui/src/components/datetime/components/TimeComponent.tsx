import React, { useCallback, useState } from 'react';
import { TimeComponentProps, TimeRangeComponentProps, TimeSelectorComponentProps, TimeSelectorPartComponentProps } from '../typings';
import { addClassname } from '../../../utils/style';
import Input from '../../input';
import TogglerIcon from '../../icon/TogglerIcon';
import { isValidDate, isValidHour, isValidMinuteOrSecond } from '../../../utils/date';
import TimeRangeComponent from './TimeRangeComponent';
import TimeSelectorComponent from './TimeSelectorComponent';



const getValue = (candidate: string | number | undefined, max: number, defaultValue: number) => {
  if (typeof candidate === 'string') {
    candidate = parseInt(candidate);
  }
  if (candidate === undefined || isNaN(candidate) || candidate < 0 || candidate > max) {
    return defaultValue;
  }
  return candidate;
};


const TimeComponent: React.FC<TimeComponentProps> = ({ from, to, type, className, onChange }) => {
  if (type['range'] && type['date']) {
    return (
      <div className={addClassname('o-time-container-range', className)}>
        <TimeRangeComponent type={type} value={from} edge='from' onChange={onChange} />
        <TimeRangeComponent type={type} value={to} edge='to' onChange={onChange} />
      </div>
    );
  }

  return (
    <div className={addClassname('o-time-container', className)}>
      <TimeSelectorComponent value={from} onChange={onChange} size="large" edge="from" key="selector" />
    </div>
  );
};

export default TimeComponent;
