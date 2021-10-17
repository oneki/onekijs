import React, { useContext } from 'react';
import { TableColumn } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TableColumnsContext = React.createContext<TableColumn<any>[]>([]);
const useTableColumns = <T>(): TableColumn<T>[] => {
  return useContext(TableColumnsContext);
};

export default useTableColumns;
