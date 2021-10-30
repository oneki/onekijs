import React, { useContext } from 'react';
import { TableColumn, TableItem, TableItemMeta } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TableColumnsContext = React.createContext<TableColumn<any, any, any>[]>([]);
const useTableColumns = <
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>
>(): TableColumn<T, M, I>[] => {
  return useContext(TableColumnsContext);
};

export default useTableColumns;
