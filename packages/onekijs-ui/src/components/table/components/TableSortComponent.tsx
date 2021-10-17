import React, { FC } from 'react';
import { TableSortProps } from '../typings';

const TableSortComponent: FC<TableSortProps> = ({ sort }) => {
  const style: React.CSSProperties = sort === undefined ? { visibility: 'hidden' } : {};
  return (
    <div className="o-table-sort-container" style={style}>
      <button type="button" tabIndex={-1} className="o-table-sort-icon">
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
          transform={`rotate(${sort && sort.dir === 'desc' ? '0' : '180'})`}
          className="o-table-sort-svg"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default TableSortComponent;
