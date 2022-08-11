import React from 'react';
import CloseAllIcon from '../../icon/CloseAllIcon';
import { TableNotFoundProps } from '../typings';

const TableNotFoundComponent: React.FC<TableNotFoundProps> = ({ text = 'No data' }) => {
  return (
    <div className="o-table-not-found">
      <CloseAllIcon width="64px" height="64px" />
      <span>{text}</span>
    </div>
  );
};

export default TableNotFoundComponent;
