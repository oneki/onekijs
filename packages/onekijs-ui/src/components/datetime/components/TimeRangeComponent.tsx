import React from 'react';
import { TimeRangeComponentProps } from '../typings';
import { isValidDate } from '../../../utils/date';
import TimeSelectorComponent from './TimeSelectorComponent';
import { ucfirst } from 'onekijs-framework';

const TimeRangeComponent: React.FC<TimeRangeComponentProps> = ({ edge, onChange, value }) => {
  const valid = isValidDate(`${value.day}-${value.month}-${value.year}`);
  let d: Date | undefined;
  if (valid) {
    d = new Date(`${value.year}-${value.month}-${value.day}`)
  }
  const label = edge === 'to' ? 'an end' : 'a start'

  return (
    <div>
      <div className="o-time-edge-title" key="title">{ucfirst(edge)}</div>
      {!valid && (
        <div className="o-time-edge-empty" key="empty">Please select {label} date for the period</div>
      )}
      {valid && d && (
        <div className="o-time-edge-content" key="content">
          <span className="o-time-edge-date" key="date">{d.toUTCString().split(' ', 4).join(' ')}</span>
          <TimeSelectorComponent value={value} onChange={onChange} size="small" edge={edge} key="selector" />
        </div>
      )}
    </div>
  )
}

export default TimeRangeComponent;
