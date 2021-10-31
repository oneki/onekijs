import React, { useContext } from 'react';
import { TableColumn, TableItem } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TableColumnsContext = React.createContext<TableColumn<any, any>[]>([]);
const useTableColumns = <T = any, I extends TableItem<T> = TableItem<T>>(): TableColumn<T, I>[] => {
  return useContext(TableColumnsContext);
};

export default useTableColumns;
