import React from 'react';
import { QuickTimeRangeComponentProps } from '../typings';


const QuickTimeRangeComponent: React.FC<QuickTimeRangeComponentProps> = ({ quickRanges, onChange }) => {
  return (
    <div className="o-quick-time-range-container">
      <div className="o-quick-time-range-title">Quick select</div>
      {Object.keys(quickRanges).map((quickRangeLabel, index) => {
        return <div key={`qr-${index}`} className="o-quick-time-range" onClick={() => onChange(quickRangeLabel)}>{quickRangeLabel}</div>
      })}

    </div>
  )
}

export default QuickTimeRangeComponent;
