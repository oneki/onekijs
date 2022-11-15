import React from 'react';
import DefaultCellComponent from '../components/cells/DefaultCellComponent';
import TableSelectFilterComponent from '../components/filters/TableSelectFilterComponent';
import { EnumColumnOptions, TableColumn, TableHeaderCellProps, TableItem } from '../typings';

const enumColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: EnumColumnOptions<T, I>,
): TableColumn<T, I> => {
  return Object.assign(
    {
      CellComponent: DefaultCellComponent,
      filterable: true,
      FilterComponent: (props: TableHeaderCellProps) => (
        <TableSelectFilterComponent {...props} dataSource={options.filterDataSource} />
      ),
      sortable: true,
    },
    options,
    {
      id,
    },
  );
};

export default enumColumn;
