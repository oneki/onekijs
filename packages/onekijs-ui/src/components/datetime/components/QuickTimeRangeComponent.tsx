import React from 'react';
import { DateQuickRange, QuickTimeRangeComponentProps } from '../typings';
import { DefaultBasicError } from 'onekijs-framework';

const getQuickRange = (quickRange: string | DateQuickRange): DateQuickRange => {
  if (typeof quickRange === 'string') {
    const from = new Date();
    const to = new Date();
    switch(quickRange) {
      case 'Last hour': from.setHours(from.getHours() - 1); break;
      case 'Last day': from.setDate(from.getDate() - 1); break;
      case 'Last week': from.setDate(from.getDate() - 7); break;
      case 'Last month': from.setMonth(from.getMonth() - 1); break;
      case 'Last year': from.setFullYear(from.getFullYear() - 1); break;
      default:
        throw new DefaultBasicError(`Unknown quick date range named ${quickRange}`);
    }
    return {
      label: quickRange,
      from,
      to
    };
  }
  return quickRange;
}


const QuickTimeRangeComponent: React.FC<QuickTimeRangeComponentProps> = ({ quickRanges, onChange }) => {
  console.log(onChange);
  return (
    <div className="o-quick-time-range-container">
      <div className="o-quick-time-range-title">Quick select</div>
      {quickRanges.map((qr, index) => {
        const quickRange = getQuickRange(qr);
        return <div key={`qr-${index}`} className="o-quick-time-range" onClick={() => onChange(quickRange)}>{quickRange.label}</div>
      })}

    </div>
  )
}

export default QuickTimeRangeComponent;
