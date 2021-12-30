import React, { FC } from 'react';
import LoadingIcon from './LoadingIcon';
import { TogglerIconProps } from './typings';

const TogglerIcon: FC<TogglerIconProps> = ({ onClick, open, loading, visible = true }) => {
  if (!visible) {
    return <div className="o-toggler-icon-container"></div>;
  } else if (!loading) {
    return (
      <div className="o-toggler-icon-container" onClick={onClick}>
        <div className="o-toggler-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform={`rotate(${open ? '180' : '90'})`}
            className="o-toggler-arrow-svg"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
      </div>
    );
  } else {
    return (
      <div className="o-toggler-icon-container">
        <LoadingIcon />
      </div>
    );
  }
};

export default TogglerIcon;
