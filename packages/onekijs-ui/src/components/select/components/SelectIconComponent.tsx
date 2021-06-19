import React, { FC } from 'react';
import { SelectIconProps } from '../typings';
import LoadingIcon from '../../icon/LoadingIcon';

const SelectIconComponent: FC<SelectIconProps> = ({ onClick, open, loading }) => {
  if (!loading) {
    return (
      <div className="o-select-icon-container" onClick={onClick}>
        <button type="button" tabIndex={-1} className="o-select-icon">
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
    );
  } else {
    return (
      <div className="o-select-icon-container" onClick={onClick}>
        <div className="o-select-icon">
          <LoadingIcon />
        </div>
      </div>
    );
  }
};

export default SelectIconComponent;
