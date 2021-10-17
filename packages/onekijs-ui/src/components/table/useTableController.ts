import React, { useContext } from 'react';
import { TableController, TableItemMeta } from './typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TableContext = React.createContext<TableController>(null!);
const useTableController = <T = any, M extends TableItemMeta = TableItemMeta>(): TableController<T, M> => {
  return useContext(TableContext) as TableController<T, M>;
};

export default useTableController;
