import React, { useContext } from 'react';
import { TableController, TableItem } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TableContext = React.createContext<TableController<any, any>>(null!);
const useTableController = <T = any, I extends TableItem<T> = TableItem<T>>(): TableController<T, I> => {
  return useContext(TableContext);
};

export default useTableController;
