import React, { FC } from 'react';
import { SelectInputProps } from '../typings';

const SelectInputComponent: FC<SelectInputProps> = ({ onIconClick, open, placeholder }) => {
  return (
    <div className="o-select-input-container">
      <div className="o-select-input-marker" />
      <input placeholder={placeholder} className="o-select-input" />
      <div className="o-select-arrow-container">
        <button className="o-select-arrow-button" onClick={onIconClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform={`rotate(${open ? '0' : '180'})`}
            className="o-select-arrow-svg"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SelectInputComponent;
