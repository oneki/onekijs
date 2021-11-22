import React, { useContext } from 'react';
import { TableItem, TableState } from '../typings';

export const TableStateContext = React.createContext<TableState<any, any>>(null!);
export const useTableState = <T = any, I extends TableItem<T> = TableItem<T>>(): TableState<T, I> => {
  return useContext(TableStateContext);
};
