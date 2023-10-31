import React from 'react';
import DefaultCellComponent from '../components/cells/DefaultCellComponent';
import TableSelectFilterComponent from '../components/filters/TableSelectFilterComponent';
import { EnumColumnOptions, TableColumn, TableHeaderCellProps, TableItem } from '../typings';
import DefaultCellDisplayer from '../displayers/DefaultCellDisplayer';

const enumColumn = <T extends any = any, I extends TableItem<T> = TableItem<T>>(
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
      Displayer: DefaultCellDisplayer,
    },
    options,
    {
      id,
    },
  );
};

export default enumColumn;
