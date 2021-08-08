import React, { FC } from 'react';
import { GridSortProps } from '../typings';

const GridSortComponent: FC<GridSortProps> = ({ order }) => {
  if (order !== undefined) {
    return (
      <div className="o-grid-sort-container">
        <button type="button" tabIndex={-1} className="o-grid-sort-icon">
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
            transform={`rotate(${order === 'desc' ? '0' : '180'})`}
            className="o-grid-sort-svg"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      </div>
    );
  }
  return null;
};

export default GridSortComponent;
