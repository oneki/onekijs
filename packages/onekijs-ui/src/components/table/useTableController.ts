import React, { useContext } from 'react';
import { TableController, TableItem, TableItemMeta } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TableContext = React.createContext<TableController<any, any, any>>(null!);
const useTableController = <
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>
>(): TableController<T, M, I> => {
  return useContext(TableContext);
};

export default useTableController;
