import React from 'react';
import { isValidHour, isValidMinuteOrSecond } from '../../../utils/date';
import TogglerIcon from '../../icon/TogglerIcon';
import { TimeSelectorPartComponentProps } from '../typings';
import Input from '../../input';

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

const TimeSelectorPartComponent: React.FC<TimeSelectorPartComponentProps> = ({ onChange, type, value, size = 'large' }) => {
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (type === 'minute' && (value === '' || isValidMinuteOrSecond(value))) {
      onChange(value);
    } else if (type === 'hour' && (value === '' || isValidHour(value))) {
      onChange(value);
    }
  };

  return (
    <div className={`o-time-selector-part o-time-selector-part-${size} o-time-${type}`}>
      <TogglerIcon
        key="previous"
        width="20px"
        closeArrowPosition="n"
        onClick={() => {
          onChange(getNextValue(value, type === 'hour' ? 23 : 59, 'previous'));
        }}
      />
      <Input
        key="value"
        className="o-time-input"
        value={value}
        size={size}
        selectOnFocus={true}
        onChange={onValueChange}
      />
      <TogglerIcon
        key="next"
        width="20px"
        closeArrowPosition="s"
        onClick={() => {
          onChange(getNextValue(value, type === 'hour' ? 23 : 59, 'next'));
        }}
      />
    </div>
  );
};

export default TimeSelectorPartComponent;
