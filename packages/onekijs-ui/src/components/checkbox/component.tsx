import React, { ChangeEvent, FC, useRef } from 'react';
import { generateUniqueId } from 'onekijs-framework';
import { CheckboxProps } from './typings';
import { addClassname } from '../../utils/style';

const CheckboxComponent: FC<CheckboxProps> = ({ label, className = '', onChange, value = false, ...checkboxProps }) => {
  const id = useRef(generateUniqueId());
  const onChecked = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.checked);
  };

  return (
    <div className={addClassname('o-checkbox', className)}>
      <input
        {...checkboxProps}
        onChange={onChecked}
        checked={value}
        id={id.current}
        type="checkbox"
        className="o-checkbox-input"
      />
      <label htmlFor={id.current} onClick={(e) => e.stopPropagation()}>
        <svg viewBox="0 0 24 24">
          <path
            style={{ strokeLinecap: 'round' }}
            strokeMiterlimit="10"
            fill="none"
            d="M22.9 3.7l-15.2 16.6-6.6-7.1"
          ></path>
        </svg>
        {label}
      </label>
    </div>
  );
};

export default CheckboxComponent;
