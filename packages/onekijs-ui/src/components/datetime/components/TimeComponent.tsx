import React from 'react';
import { addClassname } from '../../../utils/style';
import { TimeComponentProps } from '../typings';
import TimeRangeComponent from './TimeRangeComponent';
import TimeSelectorComponent from './TimeSelectorComponent';

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
