import React from 'react';
import { TableFilterOperator, TableHeaderCellProps } from '../../typings';
import TableInputFilterComponent from './TableInputFilterComponent';

const operators: TableFilterOperator[] = [
  { text: 'equals', operator: 'eq', not: false },
  { text: 'is not equal', operator: 'eq', not: true },
  { text: 'greater than', operator: 'gt', not: false },
  { text: 'greater than or equals', operator: 'gte', not: false },
  { text: 'lesser than', operator: 'lt', not: false },
  { text: 'lesser than or equals', operator: 'lte', not: false },
];

const TableNumberFilterComponent: React.FC<TableHeaderCellProps> = (props) => {
  return <TableInputFilterComponent {...props} operators={operators} />;
};

export default TableNumberFilterComponent;
