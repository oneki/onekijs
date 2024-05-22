import React from 'react';
import DefaultCellComponent from '../components/cells/DefaultCellComponent';
import TableSelectFilterComponent from '../components/filters/TableSelectFilterComponent';
import { EnumColumnOptions, TableCellSerializer, TableColumn, TableHeaderCellProps, TableItem } from '../typings';
import DefaultCellDisplayer from '../displayers/DefaultCellDisplayer';
import { get } from 'onekijs-framework';
import defaultCellSerializer from '../seralizers/defaultCellSerializer';


const enumColumn = <T extends any = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: EnumColumnOptions<T, I>,
): TableColumn<T, I> => {
  const serializer: TableCellSerializer<T, I> = (data: any, column, format) => {
    const value = get(data, column.id, null);
    const entry = options.filterDataSource.find((item) => {
      if (Array.isArray(item)) {
        if (item[0] === value) {
          return true;
        }
      }
      return false;
    })
    if (entry) {
      return entry[1];
    }
    return defaultCellSerializer(data, column, format);
  }
  return Object.assign(
    {
      CellComponent: DefaultCellComponent,
      filterable: true,
      FilterComponent: (props: TableHeaderCellProps) => (
        <TableSelectFilterComponent {...props} dataSource={options.filterDataSource} />
      ),
      sortable: true,
      Displayer: DefaultCellDisplayer,
      serializer,
    },
    options,
    {
      id,
    },
  );
};

export default enumColumn;
