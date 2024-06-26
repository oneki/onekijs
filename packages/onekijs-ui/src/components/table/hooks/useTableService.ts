import React, { useContext } from 'react';
import { TableController, TableItem } from '../typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TableServiceContext = React.createContext<TableController<any, any>>(null!);
const useTableService = <T = any, I extends TableItem<T> = TableItem<T>>(): TableController<T, I> => {
  return useContext(TableServiceContext);
};

export default useTableService;
