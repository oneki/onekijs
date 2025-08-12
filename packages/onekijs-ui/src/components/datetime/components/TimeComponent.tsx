import React from 'react';
import { addClassname } from '../../../utils/style';
import { TimeComponentProps } from '../typings';
import TimeRangeComponent from './TimeRangeComponent';
import TimeSelectorComponent from './TimeSelectorComponent';

const TimeComponent: React.FC<TimeComponentProps> = ({ from, to, type, className, onChange, displayHours, displayMinutes, displaySeconds }) => {
  if (type['range'] && type['date']) {
    return (
      <div className={addClassname('o-time-container-range', className)}>
        <TimeRangeComponent type={type} value={from} edge='from' onChange={onChange} displayHours={displayHours} displayMinutes={displayMinutes} displaySeconds={displaySeconds} />
        <TimeRangeComponent type={type} value={to} edge='to' onChange={onChange} displayHours={displayHours} displayMinutes={displayMinutes} displaySeconds={displaySeconds} />
      </div>
    );
  }

  return (
    <div className={addClassname('o-time-container', className)}>
      <TimeSelectorComponent value={from} onChange={onChange} size="large" edge="from" key="selector" displayHours={displayHours} displayMinutes={displayMinutes} displaySeconds={displaySeconds} />
    </div>
  );
};

export default TimeComponent;
