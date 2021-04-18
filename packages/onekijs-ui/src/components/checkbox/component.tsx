import { generateUniqueId } from 'onekijs-core';
import React, { FC, useRef } from 'react';
import { CheckboxProps } from './typings';

const CheckboxComponent: FC<CheckboxProps> = ({
  label,
  className = '',
  ...checkboxProps
}) => {
  const id = useRef(generateUniqueId())
  return (
    <div className={className}>
      <input {...checkboxProps} id={id.current} type="checkbox" className="o-checkbox-input"/>
      <label htmlFor={id.current} onClick={(e) => e.stopPropagation()}>
        <svg viewBox="0 0 24 24">
          <path style={{ strokeLinecap:'round'} } strokeMiterlimit="10" fill="none"  d="M22.9 3.7l-15.2 16.6-6.6-7.1">
          </path>
        </svg>  
        {label}
      </label>
    </div>
  )
};

export default CheckboxComponent;
