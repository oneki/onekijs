import React from 'react';
import { TableFilterOperator, TableHeaderCellProps } from '../../typings';
import TableInputFilterComponent from './TableInputFilterComponent';

const operators: TableFilterOperator[] = [
  { text: 'contains', operator: 'like', not: false },
  { text: 'ends with', operator: 'ew', not: false },
  { text: 'equals', operator: 'eq', not: false },
  { text: 'starts with', operator: 'sw', not: false },
  { text: 'does not contain', operator: 'like', not: true },
  { text: 'does not end with', operator: 'ew', not: true },
  { text: 'is not equal', operator: 'eq', not: true },
  { text: 'does not start with', operator: 'sw', not: true },
];

const TableTextFilterComponent: React.FC<TableHeaderCellProps> = (props) => {
  return <TableInputFilterComponent {...props} operators={operators} />;
};

export default TableTextFilterComponent;
