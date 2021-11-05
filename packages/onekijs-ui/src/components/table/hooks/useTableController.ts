import React, { useContext } from 'react';
import { TableController, TableItem } from '../typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TableImmutableControllerContext = React.createContext<TableController<any, any>>(null!);
export const useTableController = <T = any, I extends TableItem<T> = TableItem<T>>(): TableController<T, I> => {
  return useContext(TableImmutableControllerContext);
};

export const TableMutableControllerContext = React.createContext<TableController<any, any>>(null!);
export const useMutableTableController = <T = any, I extends TableItem<T> = TableItem<T>>(): TableController<T, I> => {
  return useContext(TableMutableControllerContext);
};
